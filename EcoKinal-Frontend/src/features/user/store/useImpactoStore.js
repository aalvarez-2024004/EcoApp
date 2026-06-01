// src/features/user/store/useImpactoStore.js
import { create } from 'zustand'
import { getDashboardPersonal, getDashboardGlobal } from '../../../shared/Impacto'

export const useImpactoStore = create((set, get) => ({
    // ── State ──────────────────────────────────────────────────────────────────
    personal:     null,   // { totalClasificaciones, totales, porTipo, historial }
    global:       null,   // { totalUsuarios, totalClasificaciones, totales, porTipo, mensaje }
    isLoading:    false,
    isLoadingGlobal: false,
    error:        null,
    activeView:   'personal',  // 'personal' | 'global'

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

    fetchAll: async () => {
        const { fetchPersonal, fetchGlobal } = get()
        await Promise.all([fetchPersonal(), fetchGlobal()])
    },

    reset: () => set({ personal: null, global: null, error: null, isLoading: false })
}))