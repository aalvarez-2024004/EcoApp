'use strict';

import { Router } from 'express';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import {
    getDailyChallenges,
    completeDailyChallenge,
    getChallengeHistory,
    markActionByKey,
    claimDailyChallenge
} from './dailyChallenge.controller.js';
import { seedChallengesIfEmpty } from './dailyChallenge.service.js';
import DailyChallenge from './dailyChallenge.model.js';

const router = Router();

/**
 * GET /daily-challenges
 * Devuelve los 6 retos del día para el usuario autenticado,
 * con campos: completed, claimed.
 */
router.get('/', validateJWT, getDailyChallenges);

/**
 * GET /daily-challenges/history
 * Historial de retos completados (últimos 30).
 */
router.get('/history', validateJWT, getChallengeHistory);

/**
 * POST /daily-challenges/auto/:key
 * FASE 1: El usuario realizó la acción en otra sección.
 * Marca el reto como completado (claimed:false), SIN dar puntos aún.
 * Excepción: 'detector' y 'detector_3_check' se completan y reclaman solos.
 */
router.post('/auto/:key', validateJWT, markActionByKey);

/**
 * POST /daily-challenges/:id/claim
 * FASE 2: El usuario presiona "Reclamar" en GamificacionPage.
 * Suma los puntos y marca claimed:true.
 */
router.post('/:id/claim', validateJWT, claimDailyChallenge);

/**
 * POST /daily-challenges/:id/complete
 * Uso manual / legacy (sin página externa).
 */
router.post('/:id/complete', validateJWT, completeDailyChallenge);

/**
 * DELETE /daily-challenges/reset-seed  (solo desarrollo)
 */
/**
 * DELETE /daily-challenges/reset-seed  (solo desarrollo)
 * Borra todos los retos y los vuelve a crear con los datos correctos.
 * USAR ESTO si los challenges en DB tienen verificationKey incorrecto.
 */
router.delete('/reset-seed', async (req, res) => {
    try {
        await DailyChallenge.deleteMany({});
        await seedChallengesIfEmpty();
        const challenges = await DailyChallenge.find({}).lean();
        return res.status(200).json({ ok: true, message: 'Seed reiniciado correctamente', challenges });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
});

/**
 * GET /daily-challenges/debug  (solo desarrollo)
 * Muestra todos los challenges en DB para verificar verificationKey.
 */
router.get('/debug', async (req, res) => {
    try {
        const challenges = await DailyChallenge.find({}).lean();
        return res.status(200).json({ ok: true, count: challenges.length, challenges });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
});

export default router;