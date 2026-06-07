// ecoBot.routes.js
'use strict'
import { Router } from 'express'
import { enviarMensaje, obtenerHistorial } from './ecoBot.controller.js'
import { verifyToken } from '../../middlewares/validate-JWT.js'  // 👈 importar

const router = Router()

router.post('/chat',      verifyToken, enviarMensaje)      // 👈 agregar
router.get('/historial',  verifyToken, obtenerHistorial)   // 👈 agregar

export default router