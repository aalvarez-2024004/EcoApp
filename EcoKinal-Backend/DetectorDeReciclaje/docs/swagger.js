'use strict'

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Detector de Reciclaje",
            version: "1.0.0",
            description: "Documentación de la API para clasificar imágenes reciclables"
        },
        servers: [
            {
                url: "http://localhost:3007"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["./src/ClasificacionImagen/**/*.js"]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerDocs };