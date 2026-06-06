'use strict';

import DailyChallenge from './dailyChallenge.model.js';
import UserChallenge  from './userChallenge.model.js';
import { addPointsService, addPointsOnlyService } from '../gamification/gamification.service.js';

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

const getTodayKey = () => {
    const now = new Date();
    const gt  = new Date(now.getTime() - 6 * 60 * 60 * 1000); // GMT-6
    return gt.toISOString().split('T')[0];
};

/**
 * Selecciona 6 retos del pool de forma determinista por fecha.
 * Así cada día son distintos pero predecibles (mismo día = mismos retos).
 */
const selectDailyChallenges = (allChallenges, dateKey) => {
    if (allChallenges.length <= 6) return allChallenges;

    // Seed numérico desde la fecha ("2025-06-06" → 20250606)
    const seed = parseInt(dateKey.replace(/-/g, ''), 10);

    // Fisher-Yates seeded shuffle
    const arr = [...allChallenges];
    let s = seed;
    for (let i = arr.length - 1; i > 0; i--) {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        const j = Math.abs(s) % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Garantizar que siempre aparezca al menos 1 reto de detector
    const selected = arr.slice(0, 6);
    const hasDetector = selected.some(c =>
        c.verificationKey === 'detector' || c.verificationKey === 'detector_3'
    );

    if (!hasDetector) {
        const detectorIdx = arr.findIndex(c =>
            c.verificationKey === 'detector' || c.verificationKey === 'detector_3'
        );
        if (detectorIdx !== -1) selected[5] = arr[detectorIdx];
    }

    return selected;
};

/* ─── Seed inicial ────────────────────────────────────────────────────────── */

export const seedChallengesIfEmpty = async () => {
    const count = await DailyChallenge.countDocuments();
    if (count > 0) return;

    const challenges = [
        {
            title: 'Recicla un objeto con el detector',
            description: 'Clasifica al menos 1 objeto usando el Detector de reciclaje hoy.',
            howTo: 'Ve al Detector, sube o captura una foto y presiona "Clasificar". Los puntos se otorgan al reclamar el reto.',
            pointsReward: 15,
            icon: 'ti-camera',
            category: 'reciclaje',
            verificationKey: 'detector'
        },
        {
            title: 'Publica en el foro eco',
            description: 'Comparte un tip o experiencia de reciclaje con la comunidad.',
            howTo: 'Crea una nueva publicación en el Foro sobre reciclaje o medio ambiente. Luego regresa y reclama tus puntos.',
            pointsReward: 10,
            icon: 'ti-messages',
            category: 'comunidad',
            verificationKey: 'foro_publicar'
        },
        {
            title: 'Clasifica 3 materiales con el detector',
            description: 'Detecta 3 materiales distintos (plástico, papel, vidrio…) con la IA.',
            howTo: 'Clasifica 3 objetos distintos usando el Detector. Los puntos se asignan automáticamente al completar el tercero.',
            pointsReward: 25,
            icon: 'ti-recycle',
            category: 'reciclaje',
            verificationKey: 'detector_3'
        },
        {
            title: 'Comenta una publicación del foro',
            description: 'Deja un comentario en cualquier publicación del foro eco.',
            howTo: 'Abre una publicación en el Foro y deja tu comentario. Luego regresa y reclama tus puntos.',
            pointsReward: 5,
            icon: 'ti-message-circle',
            category: 'comunidad',
            verificationKey: 'foro_comentar'
        },
        {
            title: 'Revisa tu impacto ambiental',
            description: 'Visita "Mi impacto" para ver cuánto CO₂ has ahorrado.',
            howTo: 'Abre la sección Mi Impacto. Luego regresa y reclama tus puntos.',
            pointsReward: 5,
            icon: 'ti-chart-bar',
            category: 'educacion',
            verificationKey: 'impacto'
        },
        {
            title: 'Localiza un punto de reciclaje',
            description: 'Usa el mapa para encontrar el contenedor más cercano a ti.',
            howTo: 'Abre el Mapa de reciclaje. Luego regresa y reclama tus puntos.',
            pointsReward: 10,
            icon: 'ti-map-pin',
            category: 'impacto',
            verificationKey: 'mapa'
        }
    ];

    await DailyChallenge.insertMany(challenges);
    console.log('✅ Retos diarios iniciales creados');
};

/* ─── Obtener retos del día para un usuario ───────────────────────────────── */

export const getChallengesForUser = async (userId) => {
    const today      = getTodayKey();
    const all        = await DailyChallenge.find({ isActive: true }).lean();
    const daily      = selectDailyChallenges(all, today);
    const dailyIds   = daily.map(c => c._id.toString());

    const userRecords = await UserChallenge.find({
        userId,
        challengeId: { $in: dailyIds },
        dateKey: today
    }).lean();

    // Mapas rápidos
    const completedMap = {};
    const claimedMap   = {};
    for (const uc of userRecords) {
        const id = uc.challengeId.toString();
        completedMap[id] = true;
        if (uc.claimed) claimedMap[id] = true;
    }

    return daily.map(ch => ({
        ...ch,
        completed: !!completedMap[ch._id.toString()],
        claimed:   !!claimedMap[ch._id.toString()]
    }));
};

/* ─── FASE 1: Marcar acción realizada (sin puntos aún) ───────────────────── */
/*
 * Llamado desde otras páginas (Foro, Impacto, Mapa) cuando el usuario
 * realiza la acción. Solo crea el registro UserChallenge con claimed:false.
 * Los puntos se otorgan en FASE 2 (claimChallengeService).
 *
 * Los retos 'detector' y 'detector_3' tienen su propio flujo y NO pasan
 * por esta función.
 */
export const markActionDone = async (userId, verificationKey) => {
    const today = getTodayKey();

    const challenge = await DailyChallenge.findOne({ verificationKey, isActive: true });
    if (!challenge) return null;

    // Si ya existe el registro (sea claimed o no) no hacemos nada
    const already = await UserChallenge.findOne({
        userId,
        challengeId: challenge._id,
        dateKey: today
    });
    if (already) return null;

    await UserChallenge.create({
        userId,
        challengeId: challenge._id,
        dateKey: today,
        claimed: false
    });

    return { challenge, readyToClaim: true };
};

/* ─── FASE 2: Reclamar puntos de un reto ya marcado ──────────────────────── */
/*
 * Llamado desde GamificacionPage cuando el usuario presiona "Reclamar".
 * Aquí se suman los puntos y se marca claimed:true.
 */
export const claimChallengeService = async (userId, challengeId, userInfo = {}) => {
    const today = getTodayKey();

    const challenge = await DailyChallenge.findById(challengeId);
    if (!challenge || !challenge.isActive) throw new Error('Reto no encontrado o inactivo');

    const record = await UserChallenge.findOne({ userId, challengeId, dateKey: today });

    if (!record) throw new Error('Primero debes realizar la acción del reto');
    if (record.claimed) throw new Error('Ya reclamaste los puntos de este reto hoy');

    // Marcar como claimed
    record.claimed = true;
    await record.save();

    // Dar puntos
    const gamification = await addPointsOnlyService(userId, challenge.pointsReward, userInfo);

    return { challenge, pointsEarned: challenge.pointsReward, gamification };
};

/* ─── Reto manual ────────────────────────────────────────────────────────── */
/*
 * Solo para retos que NO tienen una página externa (actualmente no usados,
 * pero se deja por compatibilidad).
 */
export const completeManualChallenge = async (userId, challengeId, userInfo = {}) => {
    const today = getTodayKey();

    const challenge = await DailyChallenge.findById(challengeId);
    if (!challenge || !challenge.isActive) throw new Error('Reto no encontrado o inactivo');

    const autoKeys = ['detector', 'detector_3'];
    if (autoKeys.includes(challenge.verificationKey)) {
        throw new Error('Este reto se completa automáticamente al usar el Detector de reciclaje');
    }

    const already = await UserChallenge.findOne({ userId, challengeId, dateKey: today });
    if (already) throw new Error('Ya completaste este reto hoy');

    await UserChallenge.create({ userId, challengeId, dateKey: today, claimed: true });

    const gamification = await addPointsOnlyService(userId, challenge.pointsReward, userInfo);

    return { challenge, pointsEarned: challenge.pointsReward, gamification };
};

/* ─── Detector: 1 clasificación ──────────────────────────────────────────── */
/*
 * Se completa y reclama automáticamente al clasificar (flujo especial).
 * addPointsService incrementa también recyclingCount.
 */
export const completeDetectorChallenge = async (userId, userInfo = {}) => {
    const today     = getTodayKey();
    const challenge = await DailyChallenge.findOne({ verificationKey: 'detector', isActive: true });
    if (!challenge) return null;

    const already = await UserChallenge.findOne({ userId, challengeId: challenge._id, dateKey: today });
    if (already) return null;

    await UserChallenge.create({ userId, challengeId: challenge._id, dateKey: today, claimed: true });

    const gamification = await addPointsService(userId, challenge.pointsReward, userInfo);

    return { challenge, pointsEarned: challenge.pointsReward, gamification };
};

/* ─── Detector: 3 clasificaciones ───────────────────────────────────────── */

export const tryCompleteDetector3 = async (userId, userInfo = {}) => {
    const today = getTodayKey();

    const challenge = await DailyChallenge.findOne({ verificationKey: 'detector_3', isActive: true });
    if (!challenge) return null;

    const already = await UserChallenge.findOne({ userId, challengeId: challenge._id, dateKey: today });
    if (already) return null;

    const Gamification = (await import('../gamification/gamification.model.js')).default;
    const userGam = await Gamification.findOne({ userId });

    if (userGam && userGam.recyclingCount > 0 && userGam.recyclingCount % 3 === 0) {
        await UserChallenge.create({ userId, challengeId: challenge._id, dateKey: today, claimed: true });
        const gamification = await addPointsOnlyService(userId, challenge.pointsReward, userInfo);
        return { challenge, pointsEarned: challenge.pointsReward, gamification };
    }
    return null;
};

/* ─── Historial ──────────────────────────────────────────────────────────── */

export const getUserChallengeHistory = async (userId) => {
    return await UserChallenge.find({ userId })
        .populate('challengeId')
        .sort({ completedAt: -1 })
        .limit(30)
        .lean();
};
