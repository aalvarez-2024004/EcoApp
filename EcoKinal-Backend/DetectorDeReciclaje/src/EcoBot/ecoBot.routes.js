'use strict'

import { Router } from 'express'

import {
    enviarMensaje,
    obtenerHistorial
} from './ecoBot.controller.js'

const router = Router()

router.post(
    '/chat',
    enviarMensaje
)

router.get(
    '/historial',
    obtenerHistorial
)

export default router