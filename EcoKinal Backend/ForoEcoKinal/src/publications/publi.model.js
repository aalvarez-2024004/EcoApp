'use strict'
import mongoose, { Schema, model } from "mongoose";
 
const publicationSchema = mongoose.Schema(
    {
        title :{
            type:String,
            required: [true, 'Es necesario que añadas un título al foro']
        },
        content:{
            type: String,
            required: [true, 'Tu publicacion en el foro no puede ir vacía']
        },
        photo:{
            type: String,
            default: null
        },
        autorId: {
            type: String,
            required: true
        }
       
    },
        {
            timestamps: true
        }
)
 
export default model('Publication', publicationSchema);