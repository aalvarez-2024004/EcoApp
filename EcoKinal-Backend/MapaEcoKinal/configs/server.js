import express from "express";
import recyclingRoutes from "../src/recycling/recycling.routes.js";
import { swaggerDocs } from "../docs/swagger.js";

export const createApp = () => {
    const app = express();

    app.use(express.json());

    app.use("/api", recyclingRoutes);

    swaggerDocs(app);

    return app;
};