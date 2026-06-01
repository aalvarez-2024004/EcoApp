'use strict';

import {
    getChallengesForUser,
    completeManualChallenge,
    getUserChallengeHistory
} from './dailyChallenge.service.js';

export const getDailyChallenges = async (req, res) => {
    try {
        const userId = req.user?.uid || req.user?.id;
        if (!userId) return res.status(400).json({ ok: false, message: 'Usuario no identificado' });

        const challenges = await getChallengesForUser(userId);
        return res.status(200).json({ ok: true, challenges });
    } catch (error) {
        console.error('Error en getDailyChallenges:', error);
        return res.status(500).json({ ok: false, message: 'Error al obtener retos', error: error.message });
    }
};

export const completeDailyChallenge = async (req, res) => {
    try {
        const userId   = req.user?.uid || req.user?.id;
        const name     = req.user?.name     || '';
        const username = req.user?.username || '';

        if (!userId) return res.status(400).json({ ok: false, message: 'Usuario no identificado' });

        const { id: challengeId } = req.params;
        const { confirmed } = req.body || {};

        if (!confirmed) {
            return res.status(400).json({
                ok: false,
                message: 'Debes confirmar que ya realizaste el reto antes de reclamarlo'
            });
        }

        const result = await completeManualChallenge(
            userId,
            challengeId,
            { name, username }
        );

        return res.status(200).json({
            ok: true,
            message: `¡Reto completado! Ganaste ${result.pointsEarned} eco-puntos 🌿`,
            data: result
        });
    } catch (error) {
        const known = [
            'Ya completaste este reto hoy',
            'Reto no encontrado o inactivo',
            'Este reto se completa automáticamente al usar el Detector de reciclaje'
        ];
        if (known.includes(error.message)) {
            return res.status(409).json({ ok: false, message: error.message });
        }
        console.error('Error en completeDailyChallenge:', error);
        return res.status(500).json({ ok: false, message: 'Error al completar reto', error: error.message });
    }
};

export const getChallengeHistory = async (req, res) => {
    try {
        const userId = req.user?.uid || req.user?.id;
        if (!userId) return res.status(400).json({ ok: false, message: 'Usuario no identificado' });

        const history = await getUserChallengeHistory(userId);
        return res.status(200).json({ ok: true, history });
    } catch (error) {
        console.error('Error en getChallengeHistory:', error);
        return res.status(500).json({ ok: false, message: 'Error al obtener historial', error: error.message });
    }
};

export const completeAutoByKey = async (req, res) => {
    try {
        const userId   = req.user?.uid || req.user?.id;
        const name     = req.user?.name     || '';
        const username = req.user?.username || '';
        if (!userId) return res.status(400).json({ ok: false, message: 'Usuario no identificado' });

        const { key } = req.params;

        if (key === 'detector_3_check') {
            const { tryCompleteDetector3 } = await import('./dailyChallenge.service.js');
            const result = await tryCompleteDetector3(userId, { name, username });
            if (!result) return res.status(200).json({ ok: true, alreadyDone: true });
            return res.status(200).json({
                ok: true,
                message: `¡Reto 3 clasificaciones completado! +${result.pointsEarned} pts 🌿`,
                data: result
            });
        }

        const { completeAutoChallenge } = await import('./dailyChallenge.service.js');
        const result = await completeAutoChallenge(userId, key, { name, username });

        if (!result) {
            return res.status(200).json({ ok: true, message: 'Reto ya completado anteriormente o no existe', alreadyDone: true });
        }

        return res.status(200).json({
            ok: true,
            message: `¡Reto completado! Ganaste ${result.pointsEarned} eco-puntos 🌿`,
            data: result
        });
    } catch (error) {
        console.error('Error en completeAutoByKey:', error);
        return res.status(500).json({ ok: false, message: 'Error al completar reto', error: error.message });
    }
};
