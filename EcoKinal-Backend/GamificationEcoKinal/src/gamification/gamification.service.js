'use strict';

import Gamification from './gamification.model.js';

export const addPointsService = async (userId, pointsToAdd = 10, userInfo = {}) => {
    let record = await Gamification.findOne({ userId });

    if (!record) {
        record = new Gamification({
            userId,
            name:     userInfo.name     || 'Usuario',
            username: userInfo.username || 'usuario',
            points: 0,
            badges: [],
            recyclingCount: 0
        });
    } else {
        if (userInfo.name)     record.name     = userInfo.name;
        if (userInfo.username) record.username = userInfo.username;
    }

    record.points         += pointsToAdd;
    record.recyclingCount += 1;

    unlockBadges(record);
    await record.save();
    return record;
};

export const addPointsOnlyService = async (userId, pointsToAdd, userInfo = {}) => {
    let record = await Gamification.findOne({ userId });

    if (!record) {
        record = new Gamification({
            userId,
            name:     userInfo.name     || 'Usuario',
            username: userInfo.username || 'usuario',
            points: 0,
            badges: [],
            recyclingCount: 0
        });
    } else {
        if (userInfo.name)     record.name     = userInfo.name;
        if (userInfo.username) record.username = userInfo.username;
    }

    record.points += pointsToAdd;

    unlockBadges(record);
    await record.save();
    return record;
};

export const getGamificationByUser = async (userId) => {
    return await Gamification.findOne({ userId });
};

export const getRankingService = async () => {
    return await Gamification
        .find()
        .sort({ points: -1 })
        .limit(10)
        .select('userId name username points recyclingCount badges');
};

export const getUserRankPosition = async (userId) => {
    const count = await Gamification.countDocuments();
    const user  = await Gamification.findOne({ userId });
    if (!user) return { position: count + 1, total: count };

    const position = await Gamification.countDocuments({ points: { $gt: user.points } });
    return { position: position + 1, total: count, user };
};

const unlockBadges = (record) => {
    if (record.points >= 50  && !record.badges.includes('Reciclador Básico'))     record.badges.push('Reciclador Básico');
    if (record.points >= 150 && !record.badges.includes('Reciclador Intermedio')) record.badges.push('Reciclador Intermedio');
    if (record.points >= 300 && !record.badges.includes('Experto'))               record.badges.push('Experto');
};
