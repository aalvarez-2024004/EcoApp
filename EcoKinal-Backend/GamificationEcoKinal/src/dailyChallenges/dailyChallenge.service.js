'use strict';

import DailyChallenge from './dailyChallenge.model.js';
import UserChallenge from './userChallenge.model.js';
import { addPointsService } from '../gamification/gamification.service.js';

const getTodayKey = () => {
    const now = new Date();
    const gt = new Date(now.getTime() - 6 * 60 * 60 * 1000); 
    return gt.toISOString().split('T')[0];
};

export const seedChallengesIfEmpty = async () => {
    const count = await DailyChallenge.countDocuments();
    if (count > 0) return;

    const challenges = [
        {
            title: 'Recicla tu primer objeto del día',
            description: 'Usa el detector de reciclaje para clasificar al menos un objeto hoy.',
            pointsReward: 15,
            icon: 'ti-camera',
            category: 'reciclaje'
        },
        {
            title: 'Publica en el foro eco',
            description: 'Comparte un tip o experiencia de reciclaje con la comunidad.',
            pointsReward: 10,
            icon: 'ti-messages',
            category: 'comunidad'
        },
        {
            title: 'Clasifica 3 objetos plásticos',
            description: 'Detecta y clasifica correctamente 3 objetos plásticos con la IA.',
            pointsReward: 25,
            icon: 'ti-recycle',
            category: 'reciclaje'
        },
        {
            title: 'Comenta una publicación',
            description: 'Deja un comentario positivo en una publicación del foro.',
            pointsReward: 5,
            icon: 'ti-message-circle',
            category: 'comunidad'
        },
        {
            title: 'Revisa tu impacto ambiental',
            description: 'Visita la sección "Mi impacto" y revisa tus estadísticas del día.',
            pointsReward: 5,
            icon: 'ti-chart-bar',
            category: 'educacion'
        },
        {
            title: 'Encuentra un punto de reciclaje',
            description: 'Consulta el mapa y localiza el contenedor más cercano a ti.',
            pointsReward: 10,
            icon: 'ti-map-pin',
            category: 'impacto'
        }
    ];

    await DailyChallenge.insertMany(challenges);
    console.log('✅ Retos diarios iniciales creados');
};

export const getChallengesForUser = async (userId) => {
    const today = getTodayKey();
    const allChallenges = await DailyChallenge.find({ isActive: true }).lean();

    const completedToday = await UserChallenge.find({
        userId,
        dateKey: today
    }).lean();

    const completedIds = new Set(completedToday.map(uc => uc.challengeId.toString()));

    return allChallenges.map(ch => ({
        ...ch,
        completed: completedIds.has(ch._id.toString())
    }));
};

export const completeChallenge = async (userId, challengeId) => {
    const today = getTodayKey();

    const challenge = await DailyChallenge.findById(challengeId);
    if (!challenge || !challenge.isActive) {
        throw new Error('Reto no encontrado o inactivo');
    }

    const alreadyDone = await UserChallenge.findOne({ userId, challengeId, dateKey: today });
    if (alreadyDone) {
        throw new Error('Ya completaste este reto hoy');
    }

    await UserChallenge.create({ userId, challengeId, dateKey: today });

    const updatedGamification = await addPointsService(userId, challenge.pointsReward);

    return {
        challenge,
        pointsEarned: challenge.pointsReward,
        gamification: updatedGamification
    };
};

export const getUserChallengeHistory = async (userId) => {
    return await UserChallenge.find({ userId })
        .populate('challengeId')
        .sort({ completedAt: -1 })
        .limit(30)
        .lean();
};
