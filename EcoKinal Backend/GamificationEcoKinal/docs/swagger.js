'use strict';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const BASE_PATH = '/GamificationEcoKinal/v1';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GamificationEcoKinal API',
            version: '1.0.0',
            description: 'Microservicio de gamificación para reciclaje'
        },
        servers: [
            {
                url: `http://localhost:3008${BASE_PATH}`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                Gamification: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '665f2c4d9e3f8f2b5c123456'
                        },
                        userId: {
                            type: 'string',
                            example: '64af32a98f123abc45678901'
                        },
                        points: {
                            type: 'number',
                            example: 120
                        },
                        recyclingCount: {
                            type: 'number',
                            example: 12
                        },
                        badges: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Reciclador Básico']
                        },
                        createdAt: {
                            type: 'string',
                            example: '2025-03-05T18:00:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            example: '2025-03-05T18:10:00.000Z'
                        }
                    }
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        ok: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Operación realizada correctamente'
                        },
                        data: {
                            $ref: '#/components/schemas/Gamification'
                        }
                    }
                },
                RankingResponse: {
                    type: 'object',
                    properties: {
                        ok: {
                            type: 'boolean',
                            example: true
                        },
                        ranking: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Gamification'
                            }
                        }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        ok: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Error del servidor'
                        },
                        error: {
                            type: 'string',
                            example: 'Detalle del error'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/gamification/gamification.routes.js']
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
    app.use(
        `${BASE_PATH}/docs`,
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
    );
};