import { create } from 'zustand'
import axios from 'axios'

const FORO_BASE = import.meta.env.VITE_FORO_URL || 'http://localhost:3006/ForoEcoKinal/v1'

const ForoApi = axios.create({ baseURL: FORO_BASE })

ForoApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    
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
    posts: [],
    loading: false,
    filter: 'Todos',

    setFilter: (filter) => set({ filter }),

    fetchPosts: async () => {
        set({ loading: true })
        try {
            const { data } = await ForoApi.get('/posts/listar')
            set({ posts: data.data || [] })
        } catch (error) {
            console.error('Error al listar publicaciones desde el Store:', error)
        } finally {
            set({ loading: false })
        }
    },

    createPost: async (formData) => {
        try {
            await ForoApi.post('/posts/create', formData)
            await get().fetchPosts() 
            return { success: true }
        } catch (error) {
            console.error('Error detallado al crear post:', error.response?.data)
            return { 
                success: false, 
                message: error.response?.data?.message || 'Error al validar los campos en el servidor.' 
            }
        }
    },

    updatePost: async (id, formData) => {
        try {
            await ForoApi.put(`/posts/update/${id}`, formData)
            await get().fetchPosts()
            return { success: true }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Error al actualizar' }
        }
    },

    deletePost: async (id) => {
        try {
            await ForoApi.delete(`/posts/delete/${id}`)
            await get().fetchPosts()
            return { success: true }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Error al eliminar' }
        }
    },

    toggleLikePost: async (id) => {
        try {
            await ForoApi.post(`/posts/like/${id}`)
            await get().fetchPosts()
        } catch (error) {
            console.error('Error al procesar el like:', error)
        }
    }
}))