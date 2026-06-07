import dotenv from "dotenv";
dotenv.config(); 


console.log("ENV TEST:", process.env.GEMINI_API_KEY);

import { createApp } from "./configs/app.js";
import { dbConnection } from "./configs/db.js";

const app = createApp();
const PORT = process.env.PORT || 3005;

const startServer = async () => {
    await dbConnection();

    app.listen(PORT, () => {
        console.log(`DETECTOR DE IMAGEN API - corriendo en puerto ${PORT}`);
    });
};

startServer();