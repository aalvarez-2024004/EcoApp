'use strict'

import EcoBot from './ecoBot.model.js'
import { generarRespuesta } from './ecoBot.service.js'

export const enviarMensaje = async (req, res) => {

    console.log('req.user:', req.user) 

    try {

        const { mensaje } = req.body

        if (!mensaje || mensaje.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Debes enviar un mensaje'
            })
        }

        if (mensaje.length > 1000) {
            return res.status(400).json({
                success: false,
                message: 'Máximo 1000 caracteres'
            })
        }

        const respuestaIA = await generarRespuesta(mensaje)

        const conversacion = await EcoBot.create({
            usuarioId: req.user.uid,
            mensajeUsuario: mensaje,
            respuestaIA
        })

        return res.status(200).json({

            success: true,
            
            data: conversacion

        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({

            success: false,

            message: error.message

        })

    }

}

// ecoBot.controller.js — obtenerHistorial
export const obtenerHistorial = async (req, res) => {
  try {
    const historial = await EcoBot
    .find({ usuarioId: req.user.uid })
    .sort({ fecha: 1 })

    return res.status(200).json({
      success: true,
      total: historial.length,
      historial
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: error.message })
  }
}