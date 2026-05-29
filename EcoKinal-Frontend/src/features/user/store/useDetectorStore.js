import { create } from 'zustand'
import { clasificarImagen } from '../../../shared/DetectorReciclaje'

export const useDetectorReciclaje = create((set) => ({

  imagen: null,
  preview: null,
  resultado: null,
  isLoading: false,
  error: null,

  seleccionarImagen: (file) => {
    if (!file) return
    set((state) => {
      if (state.preview) URL.revokeObjectURL(state.preview)
      return {
        imagen: file,
        preview: URL.createObjectURL(file),
        resultado: null,
        error: null,
      }
    })
  },

  clasificar: async () => {
    const { imagen } = useDetectorReciclaje.getState()
    if (!imagen) {
      set({ error: 'Por favor selecciona una imagen primero' })
      return
    }
    try {
      set({ isLoading: true, error: null })
      const response = await clasificarImagen(imagen)
      if (response.success) {
        set({ resultado: response.data })
      }
      return response
    } catch (error) {
      console.log('ERROR CLASIFICAR IMAGEN:', error)
      set({ error: error.response?.data?.message || 'Error al clasificar la imagen' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  limpiar: () => {
    set((state) => {
      if (state.preview) URL.revokeObjectURL(state.preview)
      return {
        imagen: null,
        preview: null,
        resultado: null,
        error: null,
        isLoading: false,
      }
    })
  },
}))