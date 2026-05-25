'use strict';

import { Schema, model } from 'mongoose';

const gamificationSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },

        points: {
            type: Number,
            default: 0,
            min: 0
        },

        recyclingCount: {
            type: Number,
            default: 0,
            min: 0
        },

        badges: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

//  ranking rápido orden por puntos
gamificationSchema.index({ points: -1 });

export default model('Gamification', gamificationSchema);