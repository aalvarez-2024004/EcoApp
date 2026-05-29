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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (allowed.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Formato no permitido. Usa JPG, PNG o WEBP.'), false)
  }
})



 
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
 
router.post('/clasificar', verifyToken,
  (req, res, next) => {
    upload.single('imagen')(req, res, (err) => {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE')
        return res.status(400).json({ success: false, message: 'La imagen supera los 5 MB.' })
      if (err)
        return res.status(400).json({ success: false, message: err.message })
      next()
    })
  },
  clasificarImagen
)
 
export default router;
 