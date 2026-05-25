'use strict'
import mongoose, { Schema, model } from "mongoose";

const clasificacionSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    imagen:{
        type:String,
        required: [true, 'Es necesario que añadas una imagen para clasificar en que lugar va']
    },
    labels:{
        type:[String],
        default: []
    },
    tipo:{
        type: String,
        required: true
    },
    contenedor: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
})

export default mongoose.model('Clasificacion', clasificacionSchema);
