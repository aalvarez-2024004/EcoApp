'use strict';
 
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import{swaggerUi, swaggerDocs} from '../docs/swagger.js';
 
import visionRoutes from '../src/ClasificacionImagen/clasificacion.routes.js';
 
const BASE_PATH = '/DetectorImagenReciclaje/v1';
 
export const createApp = () => {
    const app = express();
 
    // Middlewares
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
 
    //se ignoran los errores de certificados SSL
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
 
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
 
    // Rutas
    app.use('/api/vision', visionRoutes);
 
    // Ruta de prueba
    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.json({ message: 'API DetectorReciclaje corriendo' });
    });
 
    return app;
};