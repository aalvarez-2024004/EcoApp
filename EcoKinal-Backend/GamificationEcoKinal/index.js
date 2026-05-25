'use strict';

import dotenv from 'dotenv';
import { createApp } from './configs/app.js';
import { dbConnection } from './configs/db.js';


dotenv.config();

const app = createApp();

const PORT = process.env.PORT || 3008;

const startServer = async () => {
    try {
        await dbConnection();

        app.listen(PORT, () => {
            console.log(`GamificationEcoKinal corriendo en puerto ${PORT}`);
            console.log(`Swagger disponible en: http://localhost:${PORT}/GamificationEcoKinal/v1/docs`);
        });

    } catch (error) {
        console.error('Error iniciando el servidor:', error);
        process.exit(1);
    }
};

startServer();