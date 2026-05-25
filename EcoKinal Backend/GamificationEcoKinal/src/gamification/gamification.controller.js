'use strict';

import {
    addPointsService,
    getGamificationByUser,
    getRankingService
} from './gamification.service.js';

// Agregar puntos
export const addPoints = async (req, res) => {
    try {
        console.log('REQ.USER:', req.user);
        const userId = req.user.id || req.user.uid;

        if (!userId) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario no identificado desde el token'
            });
        }

        const data = await addPointsService(userId, 10);

        return res.status(200).json({
            ok: true,
            message: 'Puntos agregados correctamente',
            data
        });
    } catch (error) {
        console.error('Error en addPoints:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error al agregar puntos',
            error: error.message
        });
    }
};

// Obtener mi perfil
export const getMyGamification = async (req, res) => {
    try {
        const userId = req.user.id || req.user.uid;

        if (!userId) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario no identificado desde el token'
            });
        }

        const data = await getGamificationByUser(userId);

        if (!data) {
            return res.status(404).json({
                ok: false,
                message: 'El usuario aún no tiene puntos'
            });
        }

        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.error('Error en getMyGamification:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error al obtener datos',
            error: error.message
        });
    }
};

// Obtener ranking top 10
export const getRanking = async (req, res) => {
    try {
        const ranking = await getRankingService();
        return res.status(200).json({
            ok: true,
            ranking
        });
    } catch (error) {
        console.error('Error en getRanking:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error al obtener ranking',
            error: error.message
        });
    }
};