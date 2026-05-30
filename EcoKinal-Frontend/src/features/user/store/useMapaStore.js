import { create } from 'zustand'
import { MapaApi } from '../../../shared/MapaReciclaje'

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

    // ─── OBTENER UBICACIÓN Y BUSCAR ────────────────────────────────────────
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
    reset: () => set({ centers: [], total: 0, error: null, userLat: null, userLon: null })
}))

export default useMapaStore