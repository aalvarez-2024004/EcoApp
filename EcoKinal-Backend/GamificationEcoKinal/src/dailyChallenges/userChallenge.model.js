'use strict';

import { Schema, model } from 'mongoose';

const userChallengeSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        challengeId: {
            type: Schema.Types.ObjectId,
            ref: 'DailyChallenge',
            required: true
        },
        completedAt: {
            type: Date,
            default: Date.now
        },
        dateKey: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userChallengeSchema.index({ userId: 1, challengeId: 1, dateKey: 1 }, { unique: true });

export default model('UserChallenge', userChallengeSchema);
