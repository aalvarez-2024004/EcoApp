import { create } from 'zustand'
import axios from 'axios'
import { completarRetoPorAccion } from '../../../shared/Gamificacion'

const FORO_BASE = import.meta.env.VITE_FORO_URL || 'http://localhost:3006/ForoEcoKinal/v1'

const ForoApi = axios.create({ baseURL: FORO_BASE })

ForoApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`

    if (config.method === 'get') {
        delete config.headers['Content-Type']
    } else if (config.data instanceof FormData) {
        delete config.headers['Content-Type']
    } else {
        config.headers['Content-Type'] = 'application/json'
    }
    return config
})

export const useForoStore = create((set, get) => ({
    posts:          [],
    loading:        false,
    filter:         'Todos',
    searchQuery:    '',
    searchResults:  [],
    searchLoading:  false,

    setFilter: (filter) => set({ filter }),

    // ── Listar todos los posts ────────────────────────────────────────────────
    fetchPosts: async () => {
        set({ loading: true })
        try {
            const { data } = await ForoApi.get('/posts/listar')
            set({ posts: data.data || [] })
        } catch (error) {
            console.error('Error al listar publicaciones:', error)
        } finally {
            set({ loading: false })
        }
    },

    // ── Buscar posts ──────────────────────────────────────────────────────────
    searchPosts: async (q) => {
        if (!q?.trim()) {
            set({ searchResults: [], searchQuery: '' })
            return
        }
        set({ searchLoading: true, searchQuery: q })
        try {
            const { data } = await ForoApi.get('/posts/search', { params: { q } })
            set({ searchResults: data.data || [] })
        } catch (error) {
            console.error('Error al buscar:', error)
            set({ searchResults: [] })
        } finally {
            set({ searchLoading: false })
        }
    },

    clearSearch: () => set({ searchResults: [], searchQuery: '' }),

    // ── Crear post ────────────────────────────────────────────────────────────
    // Después de crear el post, registra la acción del reto "foro_publicar".
    // Esto marca el reto como completado (sin puntos), el usuario los reclamará
    // desde GamificacionPage.
    createPost: async (formData) => {
        try {
            await ForoApi.post('/posts/create', formData)
            await get().fetchPosts()

            // Registrar acción de gamificación (FASE 1: sin puntos aún)
            completarRetoPorAccion('foro_publicar')

            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al crear la publicación.',
            }
        }
    },

    // ── Actualizar post ───────────────────────────────────────────────────────
    updatePost: async (id, formData) => {
        try {
            await ForoApi.put(`/posts/update/${id}`, formData)
            await get().fetchPosts()
            return { success: true }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Error al actualizar' }
        }
    },

    // ── Eliminar post ─────────────────────────────────────────────────────────
    deletePost: async (id) => {
        try {
            await ForoApi.delete(`/posts/delete/${id}`)
            await get().fetchPosts()
            return { success: true }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Error al eliminar' }
        }
    },

    // ── Reaccionar ────────────────────────────────────────────────────────────
    reactToPost: async (id, reaction) => {
        try {
            await ForoApi.post(`/posts/react/${id}`, { reaction })
            const { data } = await ForoApi.get('/posts/listar')
            set({ posts: data.data || [] })
        } catch (error) {
            console.error('Error al reaccionar:', error)
            throw error
        }
    },
}))