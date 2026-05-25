import { Router } from "express";
import multer from "multer";
import path from "path";
import { clasificarImagen } from "./clasificacion.controller.js";
import { verifyToken } from "../../middlewares/validate-JWT.js";
 
const router = Router();
 
// configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Guarda la extensión original
  }
});
 
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Solo se permiten imágenes"), false);
  }
});
 
/**
 * @swagger
 * tags:
 *   name: Clasificacion
 *   description: Endpoints para clasificación de imágenes reciclables
 */
 
/**
 * @swagger
 * /api/vision/clasificar:
 *   post:
 *     summary: Clasificar imagen reciclable
 *     description: Recibe una imagen y devuelve el tipo de material detectado
 *     tags: [Clasificacion]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen clasificada correctamente
 *       401:
 *         description: Token inválido o no enviado
 *       400:
 *         description: Error en la petición
 */
 
router.post(
    "/clasificar",
    verifyToken,
    upload.single("imagen"),
    clasificarImagen
);
 
export default router;
 