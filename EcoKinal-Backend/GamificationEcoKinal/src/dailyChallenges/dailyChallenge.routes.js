'use strict';

import { Router } from 'express';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import {
    getDailyChallenges,
    completeDailyChallenge,
    getChallengeHistory,
    completeAutoByKey
} from './dailyChallenge.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: DailyChallenges
 *   description: Retos diarios de gamificación
 */

/**
 * @swagger
 * /daily-challenges:
 *   get:
 *     summary: Obtener todos los retos del día con estado del usuario
 *     tags: [DailyChallenges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de retos con campo "completed"
 */
router.get('/', validateJWT, getDailyChallenges);

/**
 * @swagger
 * /daily-challenges/history:
 *   get:
 *     summary: Historial de retos completados por el usuario (últimos 30)
 *     tags: [DailyChallenges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial de completaciones
 */
router.get('/history', validateJWT, getChallengeHistory);

/**
 * @swagger
 * /daily-challenges/{id}/complete:
 *   post:
 *     summary: Marcar un reto como completado y obtener los puntos
 *     tags: [DailyChallenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del reto a completar
 *     responses:
 *       200:
 *         description: Reto completado, puntos entregados
 *       409:
 *         description: Ya completaste este reto hoy
 */
router.post('/:id/complete', validateJWT, completeDailyChallenge);

router.post('/auto/:key', validateJWT, completeAutoByKey);


export default router;


import { seedChallengesIfEmpty } from './dailyChallenge.service.js';
import DailyChallenge from './dailyChallenge.model.js';

router.delete('/reset-seed', async (req, res) => {
    try {
        await DailyChallenge.deleteMany({});
        await seedChallengesIfEmpty();
        return res.status(200).json({ ok: true, message: 'Seed reiniciado correctamente' });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
});
