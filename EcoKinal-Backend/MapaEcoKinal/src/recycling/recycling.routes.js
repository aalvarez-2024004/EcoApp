import { Router } from "express";
import { getRecyclingCenters } from "./recycling.controller.js";
import { validateJWT } from "../../middlewares/validate-jwt.js";

const router = Router();

/**
 * @swagger
 * /api/recycling-centers:
 *   post:
 *     summary: Obtener centros de reciclaje cercanos
 *     description: Retorna los 5 centros de reciclaje más cercanos según la latitud y longitud enviadas.
 *     tags:
 *       - Recycling
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lat
 *               - lon
 *             properties:
 *               lat:
 *                 type: number
 *                 example: 14.6349
 *               lon:
 *                 type: number
 *                 example: -90.5069
 *     responses:
 *       200:
 *         description: Lista de centros de reciclaje cercanos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Centro de reciclaje
 *                   address:
 *                     type: string
 *                     example: Zona 1, Ciudad de Guatemala
 *                   phone:
 *                     type: string
 *                     example: "+502 12345678"
 *                   opening_hours:
 *                     type: string
 *                     example: Mo-Fr 08:00-17:00
 *                   open_status:
 *                     type: string
 *                     example: Abierto
 *                   distance_km:
 *                     type: string
 *                     example: "1.23"
 *                   lat:
 *                     type: number
 *                     example: 14.635
 *                   lon:
 *                     type: number
 *                     example: -90.507
 *       400:
 *         description: Faltan parámetros
 *       401:
 *         description: Token inválido o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */

router.post("/recycling-centers", validateJWT, getRecyclingCenters);

export default router;