'use strict';

import DailyChallenge from './dailyChallenge.model.js';
import UserChallenge  from './userChallenge.model.js';
import { addPointsService, addPointsOnlyService } from '../gamification/gamification.service.js';

const getTodayKey = () => {
    const now = new Date();
    const gt  = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    return gt.toISOString().split('T')[0];
};

export const seedChallengesIfEmpty = async () => {
    const count = await DailyChallenge.countDocuments();
    if (count > 0) return;

    const challenges = [
        {
            title: 'Recicla un objeto con el detector',
            description: 'Clasifica al menos 1 objeto usando el Detector de reciclaje hoy.',
            howTo: 'Ve al Detector, sube o captura una foto y presiona "Clasificar". Los puntos se otorgan automáticamente al clasificar.',
            pointsReward: 15,
            icon: 'ti-camera',
            category: 'reciclaje',
            verificationKey: 'detector'
        },
        {
            title: 'Publica en el foro eco',
            description: 'Comparte un tip o experiencia de reciclaje con la comunidad.',
            howTo: 'Serás llevado al Foro. Crea una nueva publicación sobre reciclaje o medio ambiente para ganar los puntos automáticamente.',
            pointsReward: 10,
            icon: 'ti-messages',
            category: 'comunidad',
            verificationKey: 'foro_publicar'
        },
        {
            title: 'Clasifica 3 materiales con el detector',
            description: 'Detecta 3 materiales distintos (plástico, papel, vidrio…) con la IA.',
            howTo: 'Serás llevado al Detector. Clasifica 3 objetos distintos hoy para completar el reto automáticamente.',
            pointsReward: 25,
            icon: 'ti-recycle',
            category: 'reciclaje',
            verificationKey: 'detector_3'
        },
        {
            title: 'Comenta una publicación del foro',
            description: 'Deja un comentario en cualquier publicación del foro eco.',
            howTo: 'Serás llevado al Foro. Deja un comentario en cualquier publicación para ganar los puntos automáticamente.',
            pointsReward: 5,
            icon: 'ti-message-circle',
            category: 'comunidad',
            verificationKey: 'foro_comentar'
        },
        {
            title: 'Revisa tu impacto ambiental',
            description: 'Visita "Mi impacto" para ver cuánto CO₂ has ahorrado.',
            howTo: 'Serás llevado a Mi Impacto. Al abrir la sección, los puntos se registran automáticamente.',
            pointsReward: 5,
            icon: 'ti-chart-bar',
            category: 'educacion',
            verificationKey: 'impacto'
        },
        {
            title: 'Localiza un punto de reciclaje',
            description: 'Usa el mapa para encontrar el contenedor más cercano a ti.',
            howTo: 'Serás llevado al Mapa de reciclaje. Al abrirlo, los puntos se registran automáticamente.',
            pointsReward: 10,
            icon: 'ti-map-pin',
            category: 'impacto',
            verificationKey: 'mapa'
        }
    ];

    await DailyChallenge.insertMany(challenges);
    console.log('✅ Retos diarios iniciales creados');
};

export const getChallengesForUser = async (userId) => {
    const today       = getTodayKey();
    const challenges  = await DailyChallenge.find({ isActive: true }).lean();
    const completed   = await UserChallenge.find({ userId, dateKey: today }).lean();
    const completedSet = new Set(completed.map(uc => uc.challengeId.toString()));

    return challenges.map(ch => ({
        ...ch,
        completed: completedSet.has(ch._id.toString())
    }));
};

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

    await UserChallenge.create({ userId, challengeId, dateKey: today });

    const gamification = await addPointsOnlyService(userId, challenge.pointsReward, userInfo);

    return { challenge, pointsEarned: challenge.pointsReward, gamification };
};

export const completeDetectorChallenge = async (userId, userInfo = {}) => {
    const today     = getTodayKey();
    const challenge = await DailyChallenge.findOne({ verificationKey: 'detector', isActive: true });
    if (!challenge) return null;

    const already = await UserChallenge.findOne({ userId, challengeId: challenge._id, dateKey: today });
    if (already) return null; 

    await UserChallenge.create({ userId, challengeId: challenge._id, dateKey: today });

    const gamification = await addPointsService(userId, challenge.pointsReward, userInfo);

    return { challenge, pointsEarned: challenge.pointsReward, gamification };
};

export const getUserChallengeHistory = async (userId) => {
    return await UserChallenge.find({ userId })
        .populate('challengeId')
        .sort({ completedAt: -1 })
        .limit(30)
        .lean();
};

export const completeAutoChallenge = async (userId, verificationKey, userInfo = {}) => {
    const today = getTodayKey();

    const challenge = await DailyChallenge.findOne({ verificationKey, isActive: true });
    if (!challenge) return null;

    const already = await UserChallenge.findOne({ userId, challengeId: challenge._id, dateKey: today });
    if (already) return null; 
    await UserChallenge.create({ userId, challengeId: challenge._id, dateKey: today });

    const gamification = await addPointsOnlyService(userId, challenge.pointsReward, userInfo);

    return { challenge, pointsEarned: challenge.pointsReward, gamification };
};

export const tryCompleteDetector3 = async (userId, userInfo = {}) => {
    const today = getTodayKey();

    // Buscar el reto detector_3
    const challenge = await DailyChallenge.findOne({ verificationKey: 'detector_3', isActive: true });
    if (!challenge) return null;

    const already = await UserChallenge.findOne({ userId, challengeId: challenge._id, dateKey: today });
    if (already) return null;

    const detectorChallenge = await DailyChallenge.findOne({ verificationKey: 'detector', isActive: true });
    if (!detectorChallenge) return null;

    const Gamification = (await import('../gamification/gamification.model.js')).default;
    const userGam = await Gamification.findOne({ userId });

    if (userGam && userGam.recyclingCount > 0 && userGam.recyclingCount % 3 === 0) {
        await UserChallenge.create({ userId, challengeId: challenge._id, dateKey: today });
        const gamification = await addPointsOnlyService(userId, challenge.pointsReward, userInfo);
        return { challenge, pointsEarned: challenge.pointsReward, gamification };
    }
    return null;
};
