// src/shared/Impacto.js
import axios from 'axios'
const isLocal = window.location.hostname === 'localhost'

const ImpactoApi = axios.create({
    baseURL: isLocal
    ? 'http://localhost:3002/api/impacto'
    : import.meta.env.VITE_IMPACTO_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
        ...(!isLocal && { 'ngrok-skip-browser-warning': 'true' }),
        }
})

ImpactoApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

ImpactoApi.interceptors.response.use(
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

/** Obtiene el dashboard personal del usuario autenticado */
export const getDashboardPersonal = async () => {
    const response = await ImpactoApi.get('/dashboard')
    return response.data
}

/** Obtiene las estadísticas globales de toda la comunidad */
export const getDashboardGlobal = async () => {
    const response = await ImpactoApi.get('/dashboard/global')
    return response.data
}

/** Registra un impacto manualmente (normalmente lo llama DetectorDeReciclaje) */
export const registrarImpacto = async (tipo) => {
    const response = await ImpactoApi.post('/registrar', { tipo })
    return response.data
}

export { ImpactoApi }