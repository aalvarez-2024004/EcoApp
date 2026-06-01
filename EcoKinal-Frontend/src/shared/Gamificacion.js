import axios from 'axios'

const GamificacionApi = axios.create({
  baseURL: import.meta.env.VITE_GAMIFICACION_URL || 'http://localhost:3008/GamificationEcoKinal/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

GamificacionApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

GamificacionApi.interceptors.response.use(
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

export const getMyGamification = async () => {
  const { data } = await GamificacionApi.get('/gamification/me')
  return data.data
}

export const getRanking = async () => {
  const { data } = await GamificacionApi.get('/gamification/ranking')
  return data.ranking
}

export { GamificacionApi }
export const completarRetoPorAccion = async (key) => {
  try {
    const { data } = await GamificacionApi.post(`/daily-challenges/auto/${key}`)
    return data
  } catch (_) {
    return null 
  }
}
