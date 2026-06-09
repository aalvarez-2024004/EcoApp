import axios from 'axios'
const isLocal = window.location.hostname === 'localhost'

const MapaApi = axios.create({
    baseURL: isLocal
    ? 'http://localhost:3001/api'
    : import.meta.env.VITE_MAPA_URL,
    timeout: 60000,
    headers: {
    'Content-Type': 'application/json',
    ...(!isLocal && { 'ngrok-skip-browser-warning': 'true' }),
    }
})

MapaApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    config.headers['Content-Type'] = 'application/json'
    return config
})

MapaApi.interceptors.response.use(
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

export { MapaApi }