'use strict';

import { Router } from 'express';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import {
    addPoints,
    getMyGamification,
    getRanking
} from './gamification.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Gamification
 *   description: Endpoints de gamificación y puntos de reciclaje
 */

/**
 * @swagger
 * /gamification/add-points:
 *   post:
 *     summary: Agregar 10 puntos por reciclaje validado
 *     description: Llamado automáticamente desde DetectorDeReciclaje al clasificar una imagen. Requiere JWT válido.
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Puntos agregados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Usuario no identificado en el token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token inválido o no enviado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/add-points', validateJWT, addPoints);

/**
 * @swagger
 * /gamification/me:
 *   get:
 *     summary: Obtener perfil de gamificación del usuario autenticado
 *     description: Devuelve los puntos, insignias y conteo de reciclajes del usuario.
 *     tags: [Gamification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Usuario no identificado en el token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token inválido o no enviado
 *       404:
 *         description: El usuario aún no tiene puntos registrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/me', validateJWT, getMyGamification);

/**
 * @swagger
 * /gamification/ranking:
 *   get:
 *     summary: Obtener ranking global top 10
 *     description: Devuelve los 10 usuarios con más puntos ordenados de mayor a menor.
 *     tags: [Gamification]
 *     responses:
 *       200:
 *         description: Ranking obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RankingResponse'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/ranking', getRanking);

export default router;