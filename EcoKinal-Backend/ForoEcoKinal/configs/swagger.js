import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API ForoEcoKinal",
            version: "1.0.0",
            description: "Documentación de la API del ForoEcoKinal",
        },

        servers: [
            {
                url: "http://localhost:3006/ForoEcoKinal/v1",
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ]

    },

    apis: ["./src/publications/*.js", "./src/comments/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);