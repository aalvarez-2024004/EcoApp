import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import recyclingRoutes from "../src/recycling/recycling.routes.js";
import { swaggerDocs } from "../docs/swagger.js";

export const createApp = () => {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());

    app.use("/api", recyclingRoutes);

    swaggerDocs(app);

    return app;
};