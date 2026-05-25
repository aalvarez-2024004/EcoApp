'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

import publicationRoutes from '../src/publications/public.routes.js';
import commentRoutes from '../src/comments/comments.routes.js';

const BASE_PATH = '/ForoEcoKinal/v1';

export const createApp = () => {
    const app = express();

    // Middlewares
    app.use(express.json());
    app.use(cors());
    app.use(helmet());

    // Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Rutas
    app.use(`${BASE_PATH}/posts`, publicationRoutes);
    app.use(`${BASE_PATH}/comments`, commentRoutes);

    // Ruta de prueba
    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.json({ message: 'API ForoEcoKinal corriendo' });
    });

    return app;
};