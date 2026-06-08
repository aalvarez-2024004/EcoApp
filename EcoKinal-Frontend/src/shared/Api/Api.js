import axios from 'axios'

const isLocal = window.location.hostname === 'localhost'

const AuthApi = axios.create({
  baseURL: isLocal
    ? 'http://localhost:3005/api'
    : import.meta.env.VITE_AUTH_URL,
})

const DetectorApi = axios.create({
  baseURL: isLocal
    ? 'http://localhost:3007/api/vision'
    : import.meta.env.VITE_DETECTOR_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
})

const GamificationApi = axios.create({
  baseURL: import.meta.env.VITE_GAMIFICATION_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

AuthApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`

  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

AuthApi.interceptors.response.use(
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

DetectorApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

DetectorApi.interceptors.response.use(
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

GamificationApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

GamificationApi.interceptors.response.use(
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

export { AuthApi, DetectorApi, GamificationApi }
