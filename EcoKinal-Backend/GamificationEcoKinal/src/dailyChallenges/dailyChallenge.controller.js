'use strict';

import {
    getChallengesForUser,
    completeChallenge,
    getUserChallengeHistory
} from './dailyChallenge.service.js';

export const getDailyChallenges = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.uid;
        if (!userId) {
            return res.status(400).json({ ok: false, message: 'Usuario no identificado' });
        }

        const challenges = await getChallengesForUser(userId);
        return res.status(200).json({ ok: true, challenges });
    } catch (error) {
        console.error('Error en getDailyChallenges:', error);
        return res.status(500).json({ ok: false, message: 'Error al obtener retos', error: error.message });
    }
};

export const completeDailyChallenge = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.uid;
        if (!userId) {
            return res.status(400).json({ ok: false, message: 'Usuario no identificado' });
        }

        const { id: challengeId } = req.params;

        const result = await completeChallenge(userId, challengeId);
        return res.status(200).json({
            ok: true,
            message: `¡Reto completado! Ganaste ${result.pointsEarned} eco-puntos`,
            data: result
        });
    } catch (error) {
        if (
            error.message === 'Ya completaste este reto hoy' ||
            error.message === 'Reto no encontrado o inactivo'
        ) {
            return res.status(409).json({ ok: false, message: error.message });
        }
        console.error('Error en completeDailyChallenge:', error);
        return res.status(500).json({ ok: false, message: 'Error al completar reto', error: error.message });
    }
};

export const getChallengeHistory = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.uid;
        if (!userId) {
            return res.status(400).json({ ok: false, message: 'Usuario no identificado' });
        }

        const history = await getUserChallengeHistory(userId);
        return res.status(200).json({ ok: true, history });
    } catch (error) {
        console.error('Error en getChallengeHistory:', error);
        return res.status(500).json({ ok: false, message: 'Error al obtener historial', error: error.message });
    }
};
