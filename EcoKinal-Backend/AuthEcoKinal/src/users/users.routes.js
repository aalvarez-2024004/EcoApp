import { Router } from 'express'
import { validateJWT } from '../../middlewares/validate-jwt.js'
import { validateRole } from '../../middlewares/validate-role.js'
import { updateMyPassword, updateProfile, getPublicProfile } from './users.controller.js'
import { cleanUploaderFileOnFinish, deleteFileOnError } from '../../middlewares/delete-file-on-error.js'
import { createCloudinaryUploader } from '../../middlewares/file-uploader.js'
import { uploadUserImage } from '../../middlewares/file-uploader.js';
const router = Router()

/**
 * @swagger
 * /api/users/change-password:
 *   patch:
 *     summary: Cambiar contraseña del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       401:
 *         description: No autorizado
 */
router.patch(
  '/change-password',
  validateJWT,
  validateRole('ADMIN_GENERAL', 'USUARIO'),
  updateMyPassword
)

/**
 * @swagger
 * /api/users/update-profile:
 *   put:
 *     summary: Actualizar perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       401:
 *         description: No autorizado
 */
router.put(
  '/update-profile',
  validateJWT,
  validateRole('ADMIN_GENERAL', 'USUARIO'),
  uploadUserImage.single('image'), 
  updateProfile
)

router.get('/profile/:uid', getPublicProfile)

export default router