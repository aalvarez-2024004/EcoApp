import { create } from 'zustand'
import { listarPosts, buscarPosts, crearPost, actualizarPost, eliminarPost, reaccionarPost } from '../../../shared/Api/ForoApi'

export const useForoStore = create((set, get) => ({
    posts:          [],
    loading:        false,
    filter:         'Todos',
    searchQuery:    '',
    searchResults:  [],
    searchLoading:  false,

    setFilter: (filter) => set({ filter }),

    fetchPosts: async () => {
        set({ loading: true })
        try {
            const posts = await listarPosts()
            set({ posts })
        } catch (error) {
            console.error('Error al listar publicaciones:', error)
        } finally {
            set({ loading: false })
        }
    },

    searchPosts: async (q) => {
        if (!q?.trim()) {
            set({ searchResults: [], searchQuery: '' })
            return
        }
        set({ searchLoading: true, searchQuery: q })
        try {
            const searchResults = await buscarPosts(q)
            set({ searchResults })
        } catch (error) {
            console.error('Error al buscar:', error)
            set({ searchResults: [] })
        } finally {
            set({ searchLoading: false })
        }
    },

    clearSearch: () => set({ searchResults: [], searchQuery: '' }),

    createPost: async (formData) => {
        try {
            await crearPost(formData)
            await get().fetchPosts()
            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al crear la publicación.',
            }
        }
    },

    updatePost: async (id, formData) => {
        try {
            await actualizarPost(id, formData)
            await get().fetchPosts()
            return { success: true }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Error al actualizar' }
        }
    },

    deletePost: async (id) => {
        try {
            await eliminarPost(id)
            await get().fetchPosts()
            return { success: true }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Error al eliminar' }
        }
    },

    reactToPost: async (id, reaction) => {
        try {
            await reaccionarPost(id, reaction)
            const posts = await listarPosts()
            set({ posts })
        } catch (error) {
            console.error('Error al reaccionar:', error)
            throw error
        }
    },
}))