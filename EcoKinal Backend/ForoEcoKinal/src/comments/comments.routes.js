import { Router } from "express";
import { addComment, updateComment, deleteComment, getCommentsByPublication } from "./comments.controller.js";
import { verifyToken } from "../../middlewares/validate-JWT.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Gestión de comentarios de las publicaciones
 */

/**
 * @swagger
 * /comments/add:
 *   post:
 *     summary: Agregar un comentario a una publicación
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               publicationId:
 *                 type: string
 *                 example: 65b4f8d2e23a1
 *               content:
 *                 type: string
 *                 example: Este es un comentario en la publicación
 *     responses:
 *       200:
 *         description: Comentario agregado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/add", verifyToken, addComment);

/**
 * @swagger
 * /comments/get/{publicationId}:
 *   get:
 *     summary: Obtener comentarios de una publicación
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: publicationId
 *         required: true
 *         description: ID de la publicación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *       404:
 *         description: Publicación no encontrada
 */
router.get("/get/:publicationId", getCommentsByPublication);

/**
 * @swagger
 * /comments/update/{id}:
 *   put:
 *     summary: Actualizar un comentario
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Comentario actualizado
 *     responses:
 *       200:
 *         description: Comentario actualizado
 *       404:
 *         description: Comentario no encontrado
 */
router.put("/update/:id", verifyToken, updateComment);

/**
 * @swagger
 * /comments/delete/{id}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario eliminado
 *       404:
 *         description: Comentario no encontrado
 */
router.delete("/delete/:id", verifyToken, deleteComment);

export default router;