import { create } from 'zustand'
import { enviarMensaje, obtenerHistorial } from '../../../shared/Api/EcoBot'

export const useEcoBotStore = create((set, get) => ({
  mensajes: [],       // [{ rol: 'user'|'bot', texto, fecha }]
  isLoading: false,
  error: null,
  wasCleared: false,  // true cuando el usuario limpió manualmente el chat

  cargarHistorial: async () => {
    // Si el usuario ya limpió el chat, no recargar el historial del backend
    if (get().wasCleared) return
    try {
      const data = await obtenerHistorial()
      const mensajes = data.historial.flatMap(h => [
        { rol: 'user', texto: h.mensajeUsuario, fecha: h.fecha },
        { rol: 'bot',  texto: h.respuestaIA,    fecha: h.fecha },
      ])
      set({ mensajes })
    } catch (e) {
      set({ error: 'No se pudo cargar el historial.' })
    }
  },

  enviar: async (texto) => {
    if (!texto.trim()) return
    set(s => ({
      mensajes: [...s.mensajes, { rol: 'user', texto, fecha: new Date() }],
      isLoading: true,
      error: null,
    }))
    try {
      const data = await enviarMensaje(texto)
      set(s => ({
        mensajes: [...s.mensajes, { rol: 'bot', texto: data.data.respuestaIA, fecha: new Date() }],
      }))
    } catch (e) {
      set({ error: e.response?.data?.message || 'Error al enviar el mensaje.' })
    } finally {
      set({ isLoading: false })
    }
  },

  limpiar: () => set({ mensajes: [], error: null, wasCleared: true }),
}))