import { Schema, model } from 'mongoose';

const publicationSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio']
    },

    content: {
        type: String,
        required: [true, 'El contenido es obligatorio']
    },

    // Imagen única (compatibilidad)
    photo: {
        type: String,
        default: null
    },

    // Carrusel de imágenes
    photos: {
        type: [String],
        default: []
    },

    autorId: {
        type: String,
        required: [true, 'El ID del autor es obligatorio']
    },

    _authorName: {
        type: String
    },

    _authorPhoto: {
        type: String,
        default: null
    },

    tag: {
        type: String,
        enum: [
            'Todos',
            'Logro',
            'Punto Verde',
            'Pregunta',
            'Consejo',
            'Noticia'
        ],
        default: 'Todos'
    },

    // Hashtags detectados automáticamente
    hashtags: {
        type: [String],
        default: []
    },

    // Reacciones estilo Facebook
    reactions: {
        like: {
            type: [String],
            default: []
        },

        love: {
            type: [String],
            default: []
        },

        haha: {
            type: [String],
            default: []
        },

        wow: {
            type: [String],
            default: []
        },

        sad: {
            type: [String],
            default: []
        }
    }

}, {
    timestamps: true,
    versionKey: false
});

export default model('Publication', publicationSchema);