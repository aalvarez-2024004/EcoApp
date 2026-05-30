import axios from 'axios'

const MapaApi = axios.create({
    baseURL: import.meta.env.VITE_MAPA_URL
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