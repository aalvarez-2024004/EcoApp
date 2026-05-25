import axios from 'axios'

export const AuthApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  headers: { 'Content-Type': 'application/json' },
})

AuthApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
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