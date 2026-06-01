'use strict';

import { Schema, model } from 'mongoose';

const dailyChallengeSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },

        howTo: { type: String, default: '' },

        pointsReward: { type: Number, required: true, min: 1 },
        icon: { type: String, default: 'ti-leaf' },
        category: {
            type: String,
            enum: ['reciclaje', 'comunidad', 'educacion', 'impacto'],
            default: 'reciclaje'
        },
        verificationKey: {
            type: String,
            enum: ['detector', 'foro_publicar', 'detector_3', 'foro_comentar', 'impacto', 'mapa'],
            default: 'detector'
        },

        isActive: { type: Boolean, default: true }
    },
    { timestamps: true, versionKey: false }
);

export default model('DailyChallenge', dailyChallengeSchema);
