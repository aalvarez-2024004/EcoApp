import { Router } from "express";
import { getRecyclingCenters } from "./recycling.controller.js";
import { validateJWT } from "../../middlewares/validate-jwt.js";

const router = Router();

/**
 * @swagger
 * /api/recycling-centers:
 *   post:
 *     summary: Obtener centros de reciclaje cercanos
 *     description: >
 *       Retorna los centros de reciclaje más cercanos a las coordenadas enviadas,
 *       usando Google Places API (New). Los resultados incluyen nombre, dirección,
 *       teléfono, horario, estado (abierto/cerrado), calificación y distancia.
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
 *                 description: Latitud del usuario
 *                 example: 14.6349
 *               lon:
 *                 type: number
 *                 description: Longitud del usuario
 *                 example: -90.5069
 *               radius:
 *                 type: number
 *                 description: Radio de búsqueda en metros (default 5000, máximo 50000)
 *                 example: 5000
 *               limit:
 *                 type: number
 *                 description: Número máximo de resultados (default 20, máximo 20)
 *                 example: 10
 *     responses:
 *       200:
 *         description: Lista de centros de reciclaje cercanos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   example: 3
 *                 centers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "ChIJN1t_tDeuEmsRUsoyG83frY4"
 *                       name:
 *                         type: string
 *                         example: "Centro de Reciclaje Verde"
 *                       address:
 *                         type: string
 *                         example: "8a Calle 14-45, Zona 10, Ciudad de Guatemala"
 *                       phone:
 *                         type: string
 *                         example: "+502 2345-6789"
 *                       open_status:
 *                         type: string
 *                         example: "Abierto"
 *                       opening_hours:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Lunes: 8:00 – 17:00", "Martes: 8:00 – 17:00"]
 *                       rating:
 *                         type: number
 *                         example: 4.2
 *                       total_ratings:
 *                         type: number
 *                         example: 87
 *                       website:
 *                         type: string
 *                         example: "https://centroverde.com.gt"
 *                       google_maps_url:
 *                         type: string
 *                         example: "https://maps.google.com/?cid=..."
 *                       distance_km:
 *                         type: string
 *                         example: "1.23"
 *                       lat:
 *                         type: number
 *                         example: 14.62
 *                       lon:
 *                         type: number
 *                         example: -90.51
 *       400:
 *         description: Faltan parámetros o son inválidos
 *       401:
 *         description: Token JWT inválido o no proporcionado
 *       502:
 *         description: Error al conectar con Google Places API
 *       500:
 *         description: Error interno del servidor
 */
router.post("/recycling-centers", validateJWT, getRecyclingCenters);

export default router;