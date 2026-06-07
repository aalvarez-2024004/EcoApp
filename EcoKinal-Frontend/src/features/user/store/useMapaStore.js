import { create } from 'zustand'
import { MapaApi } from '../../../shared/Api/MapaReciclaje'

const useMapaStore = create((set, get) => ({
    centers: [],
    total: 0,
    isLoading: false,
    error: null,
    userLat: null,
    userLon: null,
    radius: 5000,

    // ── OBTENER UBICACIÓN Y BUSCAR CENTROS ──────────────────────────────────
    // NOTA: La acción de gamificación se registra en MapaPage.handleBuscar
    // DESPUÉS de que esta función termina, para evitar doble llamada.
    buscarCentros: async () => {
        set({ isLoading: true, error: null, centers: [] })

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

        if (!coords) return false

        set({ userLat: coords.lat, userLon: coords.lon })

        try {
            const { data } = await MapaApi.post('/recycling-centers', {
                lat: coords.lat,
                lon: coords.lon,
                radius: get().radius,
                limit: 20
            })
            set({ centers: data.centers || [], total: data.total || 0, isLoading: false })
            return true
        } catch (error) {
            const message = error.response?.data?.message || 'Error al buscar centros de reciclaje.'
            set({ error: message, isLoading: false })
            return false
        }
    },

    setRadius: (radius) => { set({ radius }) },
    clearError: () => set({ error: null }),
    reset: () => set({ centers: [], total: 0, error: null, userLat: null, userLon: null }),
}))

export default useMapaStore