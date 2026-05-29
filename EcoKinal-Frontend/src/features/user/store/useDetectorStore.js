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
  // Nuevos estados
camaraActiva: false,
streamRef: null,

// Nueva acción
activarCamara: async (videoRef) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    })
    if (videoRef.current) videoRef.current.srcObject = stream
    set({ camaraActiva: true, streamRef: stream, error: null })
  } catch {
    set({ error: 'No se pudo acceder a la cámara. Revisa los permisos.' })
  }
},

capturarFoto: (videoRef) => {
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0)
    canvas.toBlob((blob) => {
      const file = new File([blob], 'captura.jpg', { type: 'image/jpeg' })
      useDetectorReciclaje.getState().seleccionarImagen(file)
    }, 'image/jpeg', 0.9)
  },

  detenerCamara: () => {
    const { streamRef } = useDetectorReciclaje.getState()
    if (streamRef) streamRef.getTracks().forEach(t => t.stop())
    set({ camaraActiva: false, streamRef: null })
  },
}))



