import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { swaggerDocs } from '../docs/swagger.js';
import impactoRoutes from '../src/impacto/impacto.routes.js';

export const createApp = () => {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());

    app.use('/api/impacto', impactoRoutes);

    swaggerDocs(app);

    return app;
};
