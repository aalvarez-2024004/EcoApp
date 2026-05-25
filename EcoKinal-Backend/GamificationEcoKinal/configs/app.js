'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { swaggerDocs } from '../docs/swagger.js';

import { corsOptions } from './cors-configuration.js';
import { helmetConfiguration } from './helmet-configuration.js';

import gamificationRoutes from '../src/gamification/gamification.routes.js';

const BASE_PATH = '/GamificationEcoKinal/v1';

export const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(helmet(helmetConfiguration));

    // Rutas principales
    app.use(`${BASE_PATH}/gamification`, gamificationRoutes);

    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.status(200).json({
            ok: true,
            service: 'GamificationEcoKinal',
            message: 'API funcionando correctamente'
        });
    });
    // Swagger
    swaggerDocs(app);
    return app;
};