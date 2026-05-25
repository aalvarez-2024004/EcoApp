'use strict';

import Gamification from './gamification.model.js';


//  Crear o actualizar puntos del usuario
export const addPointsService = async (userId, pointsToAdd = 10) => {

    let userGamification = await Gamification.findOne({ userId });

    // Si no existe registro, lo creamos
    if (!userGamification) {
        userGamification = new Gamification({
            userId,
            points: 0,
            badges: [],
            recyclingCount: 0
        });
    }

    // Sumar puntos
    userGamification.points += pointsToAdd;
    userGamification.recyclingCount += 1;

    // Sistema de insignias automático
    unlockBadges(userGamification);

    await userGamification.save();

    return userGamification;
};


// Obtener perfil
export const getGamificationByUser = async (userId) => {
    return await Gamification.findOne({ userId });
};


//  Obtener ranking top 10
export const getRankingService = async () => {
    return await Gamification
        .find()
        .sort({ points: -1 })
        .limit(10);
};


// desbloquear insignias
const unlockBadges = (user) => {

    if (user.points >= 50 && !user.badges.includes('Reciclador Básico')) {
        user.badges.push('Reciclador Básico');
    }

    if (user.points >= 150 && !user.badges.includes('Reciclador Intermedio')) {
        user.badges.push('Reciclador Intermedio');
    }

    if (user.points >= 300 && !user.badges.includes('Experto')) {
        user.badges.push('Experto');
    }
};