import { create } from 'zustand'
import { getDashboardPersonal, getDashboardGlobal } from '../../../shared/Impacto'
import { completarRetoPorAccion } from '../../../shared/Gamificacion'

export const useImpactoStore = create((set, get) => ({
    // ── State ──────────────────────────────────────────────────────────────────
    personal:        null,   // { totalClasificaciones, totales, porTipo, historial }
    global:          null,   // { totalUsuarios, totalClasificaciones, totales, porTipo, mensaje }
    isLoading:       false,
    isLoadingGlobal: false,
    error:           null,
    activeView:      'personal',  // 'personal' | 'global'
    // Controla que la acción de gamificación solo se dispare una vez por sesión
    _gamificacionRegistrada: false,

    // ── Actions ────────────────────────────────────────────────────────────────

    setActiveView: (view) => set({ activeView: view }),

    fetchPersonal: async () => {
        if (get().isLoading) return
        set({ isLoading: true, error: null })
        try {
            const data = await getDashboardPersonal()
            set({ personal: data.data ?? data })
        } catch (err) {
            set({ error: err.response?.data?.message || 'Error al cargar tu impacto.' })
        } finally {
            set({ isLoading: false })
        }
    },

    fetchGlobal: async () => {
        if (get().isLoadingGlobal) return
        set({ isLoadingGlobal: true })
        try {
            const data = await getDashboardGlobal()
            set({ global: data.data ?? data })
        } catch (err) {
            console.error('Error cargando datos globales:', err)
        } finally {
            set({ isLoadingGlobal: false })
        }
    },

    // fetchAll es el punto de entrada principal al abrir ImpactoPage.
    // Al cargarse por primera vez en la sesión, registra la acción de
    // gamificación "impacto" (FASE 1: sin puntos, para reclamar después).
    fetchAll: async () => {
        const { fetchPersonal, fetchGlobal, _gamificacionRegistrada } = get()
        await Promise.all([fetchPersonal(), fetchGlobal()])

        if (!_gamificacionRegistrada) {
            set({ _gamificacionRegistrada: true })
            // Fire-and-forget: registrar acción sin bloquear la UI
            completarRetoPorAccion('impacto')
        }
    },

    reset: () => set({ personal: null, global: null, error: null, isLoading: false, _gamificacionRegistrada: false })
}))