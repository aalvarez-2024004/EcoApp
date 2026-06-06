import { create } from 'zustand'
import { MapaApi } from '../../../shared/MapaReciclaje'
import { completarRetoPorAccion } from '../../../shared/Gamificacion'

const useMapaStore = create((set, get) => ({
    centers: [],
    total: 0,
    isLoading: false,
    error: null,
    // Coordenadas del usuario
    userLat: null,
    userLon: null,
    // Parámetros de búsqueda
    radius: 5000,
    // Controla que la acción de gamificación solo se dispare una vez por sesión
    _gamificacionRegistrada: false,

    // ─── OBTENER UBICACIÓN Y BUSCAR ────────────────────────────────────────
    // Al encontrar centros exitosamente, registra la acción del reto "mapa"
    // (FASE 1: sin puntos, para reclamar después en GamificacionPage).
    buscarCentros: async () => {
        set({ isLoading: true, error: null, centers: [] })

        // 1. Pedir ubicación GPS al navegador
        const coords = await new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Tu navegador no soporta geolocalización.'))
                return
            }
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
                () => reject(new Error('No se pudo obtener tu ubicación. Verifica los permisos del navegador.'))
            )
        }).catch((err) => {
            set({ error: err.message, isLoading: false })
            return null
        })

        if (!coords) return

        set({ userLat: coords.lat, userLon: coords.lon })

        // 2. Consultar el microservicio
        try {
            const { data } = await MapaApi.post('/recycling-centers', {
                lat: coords.lat,
                lon: coords.lon,
                radius: get().radius,
                limit: 20
            })

            set({
                centers: data.centers || [],
                total: data.total || 0,
                isLoading: false
            })

            // Registrar acción de gamificación solo la primera vez en la sesión
            if (!get()._gamificacionRegistrada) {
                set({ _gamificacionRegistrada: true })
                completarRetoPorAccion('mapa')
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Error al buscar centros de reciclaje.'
            set({ error: message, isLoading: false })
        }
    },

    // ─── CAMBIAR RADIO Y REBUSCAR ──────────────────────────────────────────
    setRadius: (radius) => {
        set({ radius })
    },

    clearError: () => set({ error: null }),
    reset: () => set({ centers: [], total: 0, error: null, userLat: null, userLon: null, _gamificacionRegistrada: false })
}))

export default useMapaStore