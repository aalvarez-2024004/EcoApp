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
    photo: {
        type: String,
        default: null
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
        enum: ['Todos', 'Logro', 'Punto Verde', 'Pregunta', 'Consejo', 'Noticia'],
        default: 'Todos'
    },
    likes: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Publication', publicationSchema);