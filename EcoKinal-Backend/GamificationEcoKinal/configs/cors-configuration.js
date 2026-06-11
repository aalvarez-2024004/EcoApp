'use strict';

export const corsOptions = {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'ngrok-skip-browser-warning',
        'cf-skip-browser-warning'
    ]
};