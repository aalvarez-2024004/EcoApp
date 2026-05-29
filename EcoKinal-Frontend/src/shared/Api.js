import axios from 'axios'

export const AuthApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL
})

export const DetectorApi = axios.create({
  baseURL: import.meta.env.VITE_DETECTOR_URL
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

  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})