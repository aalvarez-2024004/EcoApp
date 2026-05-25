import { create } from 'zustand'
import { setToken, setUser, logout as clearStorage, getToken, getUser } from '../../../shared/Auth'
import { AuthApi } from '../../../shared/Api'

const useAuthStore = create((set) => ({
  user: getUser(),
  token: getToken(),
  isLoading: false,
  error: null,

  // ─── LOGIN ─────────────────────────────────────────────────────────────
  // POST http://localhost:3005/api/v1/auth/login
  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await AuthApi.post('/auth/login', { email, password })
      setToken(data.token)
      setUser(data.user)
      set({ user: data.user, token: data.token, isLoading: false })
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión'
      set({ error: message, isLoading: false })
      return { success: false, message }
    }
  },

  // ─── REGISTER ──────────────────────────────────────────────────────────
  // POST http://localhost:3005/api/v1/auth/register
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

  // ─── FORGOT PASSWORD ───────────────────────────────────────────────────
  // POST http://localhost:3005/api/v1/auth/forgot-password
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

  // ─── RESET PASSWORD ────────────────────────────────────────────────────
  // POST http://localhost:3005/api/v1/auth/reset-password
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

  // ─── LOGOUT ────────────────────────────────────────────────────────────
  logout: () => {
    clearStorage()
    set({ user: null, token: null, error: null })
  },

  clearError: () => set({ error: null }),
}))

export default useAuthStore