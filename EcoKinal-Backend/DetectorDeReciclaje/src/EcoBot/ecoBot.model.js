'use strict'

import mongoose from 'mongoose'

const ecoBotSchema = mongoose.Schema({

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