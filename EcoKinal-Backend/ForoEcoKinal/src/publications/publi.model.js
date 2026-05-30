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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _authorName: {
        type: String
    },
    tag: {
        type: String,
        enum: ['Todos', 'Logro', 'Punto Verde', 'Pregunta', 'Consejo', 'Noticia'],
        default: 'Todos'
    },
    likes: {
        type: [Schema.Types.ObjectId],
        default: []
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Publication', publicationSchema);