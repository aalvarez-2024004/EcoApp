import dotenv from "dotenv";
import { createApp } from "./configs/app.js";
import { dbConnection } from "./configs/db.js";
 
dotenv.config();
 
const app = createApp();
const PORT = process.env.PORT || 3005;
 
const startServer = async () => {
    await dbConnection();
 
    app.listen(PORT, () => {
        console.log(`DETECTOR DE IMAGEN API - corriendo en puerto ${PORT}`);
    });
};
 
startServer();