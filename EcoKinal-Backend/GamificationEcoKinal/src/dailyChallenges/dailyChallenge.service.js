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
            howTo: 'Ve al Detector, sube o captura una foto y presiona "Clasificar". Los puntos se otorgan automáticamente.',
            pointsReward: 15,
            icon: 'ti-camera',
            category: 'reciclaje',
            verificationKey: 'detector'  
        },
        {
            title: 'Publica en el foro eco',
            description: 'Comparte un tip o experiencia de reciclaje con la comunidad.',
            howTo: 'Ve al Foro, escribe y publica algo sobre reciclaje o medio ambiente, luego vuelve aquí y confirma.',
            pointsReward: 10,
            icon: 'ti-messages',
            category: 'comunidad',
            verificationKey: 'manual'
        },
        {
            title: 'Clasifica 3 materiales distintos',
            description: 'Detecta 3 materiales diferentes (plástico, papel, vidrio…) con la IA.',
            howTo: 'Usa el detector al menos 3 veces con materiales distintos hoy. Luego vuelve aquí y confirma.',
            pointsReward: 25,
            icon: 'ti-recycle',
            category: 'reciclaje',
            verificationKey: 'manual'
        },
        {
            title: 'Comenta una publicación del foro',
            description: 'Deja un comentario en cualquier publicación del foro eco.',
            howTo: 'Ve al Foro, abre una publicación y deja un comentario. Luego vuelve aquí y confirma.',
            pointsReward: 5,
            icon: 'ti-message-circle',
            category: 'comunidad',
            verificationKey: 'manual'
        },
        {
            title: 'Revisa tu impacto ambiental',
            description: 'Visita "Mi impacto" para ver cuánto CO₂ has ahorrado.',
            howTo: 'Abre "Mi impacto" en el menú lateral, revisa tus estadísticas y luego vuelve aquí a confirmar.',
            pointsReward: 5,
            icon: 'ti-chart-bar',
            category: 'educacion',
            verificationKey: 'manual'
        },
        {
            title: 'Localiza un punto de reciclaje',
            description: 'Usa el mapa para encontrar el contenedor más cercano a ti.',
            howTo: 'Ve a "Mapa reciclaje", explora los puntos en tu área. Luego vuelve aquí y confirma.',
            pointsReward: 10,
            icon: 'ti-map-pin',
            category: 'impacto',
            verificationKey: 'manual'
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

    if (challenge.verificationKey === 'detector') {
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
