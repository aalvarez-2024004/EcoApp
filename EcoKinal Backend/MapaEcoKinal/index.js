import dotenv from "dotenv";
import { createApp } from "./configs/server.js";

dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Mapa Eco Kinal (API corriendo en puerto ${PORT})`);
});