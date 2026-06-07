import { create } from 'zustand'
import { getDashboardPersonal, getDashboardGlobal } from '../../../shared/Api/Impacto'

export const useImpactoStore = create((set, get) => ({
    personal:        null,
    global:          null,
    isLoading:       false,
    isLoadingGlobal: false,
    error:           null,
    activeView:      'personal',

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

    // fetchAll carga datos personales y globales.
    // NOTA: La acción de gamificación se registra en ImpactoPage.useEffect
    // DESPUÉS de que esta función termina, para evitar doble llamada.
    fetchAll: async () => {
        const { fetchPersonal, fetchGlobal } = get()
        await Promise.all([fetchPersonal(), fetchGlobal()])
    },

    reset: () => set({ personal: null, global: null, error: null, isLoading: false }),
}))