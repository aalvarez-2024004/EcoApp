import { create } from 'zustand'
import { setToken, setUser, logout as clearStorage, getToken, getUser } from '../../../shared/Auth'
import { AuthApi } from '../../../shared/Api'

const useAuthStore = create((set) => ({
  user: getUser(),
  token: getToken(),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await AuthApi.post('/auth/login', { email, password })
      setToken(data.token)
      setUser(data.user)
      set({ user: data.user, token: data.token, isLoading: false })
      return { success: true, user: data.user }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión'
      set({ error: message, isLoading: false })
      return { success: false, message }
    }
  },

  register: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await AuthApi.post('/auth/register', formData)
      set({ isLoading: false })
      return { success: true, data }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al registrarse'
      set({ error: message, isLoading: false })
      return { success: false, message }
    }
  },

  verifyEmail: async (token) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await AuthApi.get(`/auth/verify/${token}`)
      set({ isLoading: false })
      return { success: true, message: data.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al verificar la cuenta'
      set({ error: message, isLoading: false })
      return { success: false, message }
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await AuthApi.post('/auth/forgot-password', { email })
      set({ isLoading: false })
      return { success: true, message: data.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al enviar el correo'
      set({ error: message, isLoading: false })
      return { success: false, message }
    }
  },

  resetPassword: async (token, newPassword) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await AuthApi.post('/auth/reset-password', { token, newPassword })
      set({ isLoading: false })
      return { success: true, message: data.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al restablecer contraseña'
      set({ error: message, isLoading: false })
      return { success: false, message }
    }
  },

  updateUser: (updatedUser) => {
    const merged = { ...getUser(), ...updatedUser }
    setUser(merged)
    set({ user: merged })
  },

  logout: () => {
    clearStorage()
    set({ user: null, token: null, error: null })
  },

  clearError: () => set({ error: null }),
}))

export default useAuthStore