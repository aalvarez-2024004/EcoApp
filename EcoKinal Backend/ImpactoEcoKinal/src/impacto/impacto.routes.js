import { Router } from 'express';
import { verifyToken } from '../../middlewares/validate-JWT.js';
import {
    registrarImpacto,
    getDashboard,
    getDashboardGlobal
} from './impacto.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Impacto
 *   description: Dashboard de impacto ambiental por usuario
 */

/**
 * @swagger
 * /api/impacto/registrar:
 *   post:
 *     summary: Registrar un impacto ambiental
 *     description: Llamado automáticamente por DetectorDeReciclaje tras clasificar una imagen. Requiere token JWT.
 *     tags: [Impacto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [Inorgánico, Orgánico, Reutilizable, Residuo Peligroso, No reciclable]
 *                 example: Inorgánico
 *     responses:
 *       201:
 *         description: Impacto registrado correctamente
 *       400:
 *         description: Tipo de residuo inválido o faltante
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.post('/registrar', verifyToken, registrarImpacto);

/**
 * @swagger
 * /api/impacto/dashboard:
 *   get:
 *     summary: Dashboard personal de impacto ambiental
 *     description: Retorna el resumen completo de impacto del usuario autenticado — kg evitados, energía ahorrada, CO₂ no emitido y árboles equivalentes.
 *     tags: [Impacto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalClasificaciones:
 *                       type: integer
 *                     totales:
 *                       type: object
 *                       properties:
 *                         kgEvitados:
 *                           type: number
 *                         energiaAhorradaKWh:
 *                           type: number
 *                         co2NoEmitidoKg:
 *                           type: number
 *                         arbolesEquivalentes:
 *                           type: number
 *                     porTipo:
 *                       type: object
 *                     historial:
 *                       type: array
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get('/dashboard', verifyToken, getDashboard);

/**
 * @swagger
 * /api/impacto/dashboard/global:
 *   get:
 *     summary: Estadísticas globales de todos los usuarios
 *     description: Muestra el impacto colectivo de la comunidad EcoKinal en Guatemala. No expone datos personales.
 *     tags: [Impacto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas globales
 */
router.get('/dashboard/global', getDashboardGlobal);

export default router;
