'use strict';

import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | no se pudo conectar a MongoDB');
            mongoose.disconnect();
        });

        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | intentando conectar a MongoDB');
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | conectado a MongoDB');
        });

        mongoose.connection.on('open', () => {
            console.log('MongoDB | base de datos GamificationEcoKinal lista');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconectando a MongoDB');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | desconectado de MongoDB');
        });

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10
        });

    } catch (error) {
        console.log(`Error al conectar la db: ${error}`);
    }
};

const gracefulShutdown = async (signal) => {
    console.log(`MongoDB | Received ${signal}. Closing database connection...`);
    try {
        await mongoose.connection.close();
        console.log('MongoDB | Database connection closed successfully');
        process.exit(0);
    } catch (error) {
        console.error('MongoDB | Error during graceful shutdown:', error.message);
        process.exit(1);
    }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));