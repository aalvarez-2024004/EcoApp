// src/shared/EcoBot.js
import axios from 'axios'

// Instancia propia apuntando a la raíz del backend, no a /api/vision
const EcoBotApi = axios.create({
  baseURL: import.meta.env.VITE_DETECTOR_URL.replace('/api/vision', ''),
})

// Inyectar token igual que los demás
EcoBotApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  config.headers['Content-Type'] = 'application/json'
  return config
})

EcoBotApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const enviarMensaje = async (mensaje) => {
  const response = await EcoBotApi.post('/api/ecobot/chat', { mensaje })
  return response.data
}

export const obtenerHistorial = async () => {
  const response = await EcoBotApi.get('/api/ecobot/historial')
  return response.data
}