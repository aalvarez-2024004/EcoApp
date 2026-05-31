'use strict'
import { Schema, model } from "mongoose";

const commentSchema = Schema(
    {
        content: {
            type: String,
            required: [true, 'El contenido del comentario no puede estar vacío']
        },
        autorId: {
            type: String,
            required: true
        },
        _authorName: {
            type: String
        },
        _authorPhoto: {
            type: String,
            default: null
        },
        publicationId: {
            type: Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, 'El comentario debe estar ligado a una publicación']
        }
    },
    {
        timestamps: true
    }
)

export default model('Comment', commentSchema);