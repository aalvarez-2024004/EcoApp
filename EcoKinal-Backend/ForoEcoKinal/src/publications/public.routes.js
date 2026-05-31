import { Router } from "express";
import {
    createPublication,
    getPublications,
    updatePublication,
    deletePublication,
    reactPublication,
    searchPublications
} from "./publi.controller.js";

import { verifyToken } from "../../middlewares/validate-JWT.js";
import { uploadPublicationImage } from "../../middlewares/file-uploader.js";
import { cleanUploaderFileOnFinish } from "../../middlewares/delete-file-on-error.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Publications
 *   description: Gestión de publicaciones
 */

/**
 * @swagger
 * /posts/create:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Mi primera publicación
 *               content:
 *                 type: string
 *                 example: Este es el contenido del post
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Publicación creada correctamente
 */
router.post(
    "/create",
    verifyToken,
    uploadPublicationImage.array("photos", 5),
    cleanUploaderFileOnFinish,
    createPublication
);

/**
 * @swagger
 * /posts/listar:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 */
router.get("/listar", verifyToken, getPublications);

/**
 * @swagger
 * /posts/update/{id}:
 *   put:
 *     summary: Actualizar una publicación
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la publicación
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Publicación actualizada
 *       404:
 *         description: Publicación no encontrada
 */
router.put(
    "/update/:id",
    verifyToken,
    uploadPublicationImage.array("photos", 5),
    updatePublication
);

/**
 * @swagger
 * /posts/delete/{id}:
 *   delete:
 *     summary: Eliminar una publicación
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la publicación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación eliminada
 *       404:
 *         description: Publicación no encontrada
 */
router.delete("/delete/:id", verifyToken, deletePublication);

router.post("/react/:id", verifyToken, reactPublication);

router.get("/search", verifyToken, searchPublications);


export default router;