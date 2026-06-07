'use strict'

import mongoose from 'mongoose'

const ecoBotSchema = mongoose.Schema({

    usuarioId: {
        type: String,
        required: true
    },

    mensajeUsuario: {
        type: String,
        required: true
    },

    respuestaIA: {
        type: String,
        required: true
    },

    fecha: {
        type: Date,
        default: Date.now
    }

}, {
    versionKey: false
})

export default mongoose.model('EcoBot', ecoBotSchema)