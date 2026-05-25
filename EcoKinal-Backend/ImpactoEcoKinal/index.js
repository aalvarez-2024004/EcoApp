import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './configs/app.js';
import { connectDB } from './configs/db.js';

const PORT = process.env.PORT || 3002;

const start = async () => {
    await connectDB();
    const app = createApp();
    app.listen(PORT, () => {
        console.log(`ImpactoEcoKinal corriendo en puerto ${PORT}`);
        console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    });
};

start();
