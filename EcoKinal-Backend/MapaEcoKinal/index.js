import "./configs/env.js"; // ← debe ser el PRIMER import (carga dotenv antes que todo)
import { createApp } from "./configs/server.js";

const app = createApp();
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Mapa Eco Kinal (API corriendo en puerto ${PORT})`);
});