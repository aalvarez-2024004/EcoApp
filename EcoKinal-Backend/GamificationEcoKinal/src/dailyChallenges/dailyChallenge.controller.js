'use strict';

import {
    getChallengesForUser,
    completeManualChallenge,
    getUserChallengeHistory,
    markActionDone,
    claimChallengeService,
    completeDetectorChallenge,
    tryCompleteDetector3
} from './dailyChallenge.service.js';

/* ─── GET /daily-challenges ─────────────────────────────────────────────── */

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

/* ─── POST /daily-challenges/:id/complete  (manual, sin página externa) ─── */

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

        const result = await completeManualChallenge(userId, challengeId, { name, username });

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

/* ─── GET /daily-challenges/history ─────────────────────────────────────── */

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

/* ─── POST /daily-challenges/auto/:key  (FASE 1: marcar acción, sin puntos) */
/*
 * Llamado desde Foro, Impacto, Mapa cuando el usuario realiza la acción.
 * Solo crea el registro UserChallenge con claimed:false.
 * Los retos 'detector' y 'detector_3' tienen su propio handler.
 */
export const markActionByKey = async (req, res) => {
    try {
        const userId   = req.user?.uid || req.user?.id;
        if (!userId) return res.status(400).json({ ok: false, message: 'Usuario no identificado' });

        const { key } = req.params;

        // Retos detector siguen su propio flujo (se completan y reclaman solos)
        if (key === 'detector') {
            const name     = req.user?.name     || '';
            const username = req.user?.username || '';
            const result   = await completeDetectorChallenge(userId, { name, username });
            if (!result) return res.status(200).json({ ok: true, alreadyDone: true });
            return res.status(200).json({
                ok: true,
                message: `¡Reto completado! Ganaste ${result.pointsEarned} eco-puntos 🌿`,
                data: result,
                autoComplete: true
            });
        }

        if (key === 'detector_3_check') {
            const name     = req.user?.name     || '';
            const username = req.user?.username || '';
            const result   = await tryCompleteDetector3(userId, { name, username });
            if (!result) return res.status(200).json({ ok: true, alreadyDone: true });
            return res.status(200).json({
                ok: true,
                message: `¡Reto 3 clasificaciones completado! +${result.pointsEarned} pts 🌿`,
                data: result,
                autoComplete: true
            });
        }

        // Todos los demás: solo marcar la acción como realizada (sin puntos)
        const result = await markActionDone(userId, key);

        if (!result) {
            return res.status(200).json({
                ok: true,
                message: 'Acción ya registrada anteriormente',
                alreadyDone: true
            });
        }

        return res.status(200).json({
            ok: true,
            message: 'Acción registrada. Regresa a Gamificación para reclamar tus puntos 🌿',
            readyToClaim: true,
            data: result
        });
    } catch (error) {
        console.error('Error en markActionByKey:', error);
        return res.status(500).json({ ok: false, message: 'Error al registrar acción', error: error.message });
    }
};

/* ─── POST /daily-challenges/:id/claim  (FASE 2: reclamar puntos) ─────────*/
/*
 * Llamado desde GamificacionPage cuando el usuario presiona "Reclamar".
 * Aquí se suman los puntos y se marca claimed:true.
 */
export const claimDailyChallenge = async (req, res) => {
    try {
        const userId   = req.user?.uid || req.user?.id;
        const name     = req.user?.name     || '';
        const username = req.user?.username || '';

        if (!userId) return res.status(400).json({ ok: false, message: 'Usuario no identificado' });

        const { id: challengeId } = req.params;

        const result = await claimChallengeService(userId, challengeId, { name, username });

        return res.status(200).json({
            ok: true,
            message: `¡+${result.pointsEarned} eco-puntos reclamados! 🌿`,
            data: result
        });
    } catch (error) {
        const known = [
            'Primero debes realizar la acción del reto',
            'Ya reclamaste los puntos de este reto hoy',
            'Reto no encontrado o inactivo'
        ];
        if (known.includes(error.message)) {
            return res.status(409).json({ ok: false, message: error.message });
        }
        console.error('Error en claimDailyChallenge:', error);
        return res.status(500).json({ ok: false, message: 'Error al reclamar puntos', error: error.message });
    }
};
