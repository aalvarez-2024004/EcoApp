import { create } from 'zustand'
import { clasificarImagen } from '../../../shared/DetectorReciclaje'
import useGamificacionStore from './useGamificacionStore'

export const useDetectorReciclaje = create((set, get) => ({

  imagen:        null,
  preview:       null,
  resultado:     null,
  isLoading:     false,
  error:         null,
  activeTab:     'subir',
  camaraActiva:  false,
  fotoCapturada: false,
  _stream:       null,

  // ── seleccionar imagen (upload) ───────────────────────────────────────────
  seleccionarImagen: (file) => {
    if (!file) return
    const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']
    if (!ALLOWED.includes(file.type)) {
      set({ error: 'Formato no permitido. Usa JPG, PNG o WEBP.' }); return
    }
    if (file.size > 5 * 1024 * 1024) {
      set({ error: 'La imagen supera los 5 MB. Elige una más pequeña.' }); return
    }
    set((state) => {
      if (state.preview) URL.revokeObjectURL(state.preview)
      return { imagen: file, preview: URL.createObjectURL(file), resultado: null, error: null }
    })
  },

  // ── clasificar ────────────────────────────────────────────────────────────
  clasificar: async () => {
    const { imagen } = get()
    if (!imagen) { set({ error: 'Selecciona o captura una imagen primero.' }); return }
    try {
      set({ isLoading: true, error: null })
      const response = await clasificarImagen(imagen)
      if (response.success) {
        set({ resultado: response.data })
        // Notificar al módulo de gamificación que se realizó un reciclaje exitoso
        const { completarRetoPorAccion } = useGamificacionStore.getState()
        await completarRetoPorAccion('detector')
        // También intentar completar el reto de 3 reciclajes
        await completarRetoPorAccion('detector_3')
      }
      return response
    } catch (err) {
      set({ error: err.response?.data?.message || 'Error al clasificar la imagen.' })
      throw err
    } finally {
      set({ isLoading: false })
    }
  },

  // ── limpiar todo ──────────────────────────────────────────────────────────
  limpiar: () => {
    const { _stream } = get()
    if (_stream) _stream.getTracks().forEach(t => t.stop())
    set((state) => {
      if (state.preview) URL.revokeObjectURL(state.preview)
      return { imagen: null, preview: null, resultado: null, error: null, isLoading: false,
               camaraActiva: false, fotoCapturada: false, _stream: null }
    })
  },

  // ── cambiar tab ───────────────────────────────────────────────────────────
  setTab: (tab) => {
    const { _stream } = get()
    if (_stream) _stream.getTracks().forEach(t => t.stop())
    set((state) => {
      if (state.preview && state.fotoCapturada) URL.revokeObjectURL(state.preview)
      return {
        activeTab:     tab,
        camaraActiva:  false,
        fotoCapturada: false,
        _stream:       null,
        // limpiar preview de cámara al cambiar tab, pero no el de upload
        imagen:        tab === 'camara' ? null : state.imagen,
        preview:       (tab === 'camara' && state.fotoCapturada) ? null : state.preview,
        resultado:     null,
        error:         null,
      }
    })
  },

  // ── activar cámara ────────────────────────────────────────────────────────
  // videoRef: React ref del elemento <video>
  activarCamara: async (videoRef) => {
    set({ error: null })

    try {

      console.log("Solicitando acceso a cámara...")

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })

      console.log("Stream obtenido:", stream)

      const video = videoRef?.current

      console.log("Video ref:", video)

      if (!video) {
        console.error("No existe videoRef.current")
        return
      }

      video.addEventListener("loadedmetadata", () => {
        console.log("EVENTO loadedmetadata")
      })

      video.addEventListener("loadeddata", () => {
        console.log("EVENTO loadeddata")
      })

      video.addEventListener("canplay", () => {
        console.log("EVENTO canplay")
      })

      video.addEventListener("playing", () => {
        console.log("EVENTO playing")
      })

      video.addEventListener("error", (e) => {
        console.log("ERROR VIDEO:", e)
      })

      video.srcObject = stream

      console.log("Stream asignado al video")

      setTimeout(async () => {

        console.log("========== ESTADO VIDEO ==========")

        console.log("readyState:", video.readyState)
        console.log("networkState:", video.networkState)
        console.log("videoWidth:", video.videoWidth)
        console.log("videoHeight:", video.videoHeight)
        console.log("paused:", video.paused)

        try {
          await video.play()
          console.log("PLAY EXITOSO")
        } catch (error) {
          console.error("ERROR PLAY:", error)
        }

        console.log("==================================")

      }, 2000)

      set({
        camaraActiva: true,
        _stream: stream
      })

    } catch (err) {

      console.error("ERROR DE CAMARA:", err)

      const msg =
        err.name === 'NotAllowedError'
          ? 'Permiso de cámara denegado.'
          : err.name === 'NotFoundError'
          ? 'No se encontró ninguna cámara.'
          : err.name === 'NotReadableError'
          ? 'La cámara está siendo utilizada por otra aplicación.'
          : `No se pudo acceder a la cámara: ${err.message}`

      set({ error: msg })
    }
  },

  // ── detener cámara ────────────────────────────────────────────────────────
  detenerCamara: (videoRef) => {
    const { _stream } = get()
    if (_stream) _stream.getTracks().forEach(t => t.stop())
    if (videoRef?.current) videoRef.current.srcObject = null
    set({ camaraActiva: false, _stream: null })
  },

  // ── capturar foto del video ───────────────────────────────────────────────
  capturarFoto: (videoRef, canvasRef) => {
    const video  = videoRef?.current
    const canvas = canvasRef?.current
    if (!video || !canvas) { set({ error: 'Error interno: refs no disponibles.' }); return }

    const w = video.videoWidth  || 640
    const h = video.videoHeight || 480
    canvas.width  = w
    canvas.height = h
    canvas.getContext('2d').drawImage(video, 0, 0, w, h)

    // Detener stream tras captura
    const { _stream } = get()
    if (_stream) _stream.getTracks().forEach(t => t.stop())
    if (videoRef?.current) videoRef.current.srcObject = null

    // Convertir canvas → File y guardar
    canvas.toBlob((blob) => {
      if (!blob) { set({ error: 'No se pudo capturar la foto.' }); return }
      const file = new File([blob], `ecokinal-${Date.now()}.jpg`, { type: 'image/jpeg' })
      set((state) => {
        if (state.preview) URL.revokeObjectURL(state.preview)
        return { imagen: file, preview: URL.createObjectURL(file), resultado: null, error: null }
      })
    }, 'image/jpeg', 0.92)

    set({ camaraActiva: false, fotoCapturada: true, _stream: null })
  },

  // ── retomar (nueva foto) ──────────────────────────────────────────────────
  retomar: () => {
    set((state) => {
      if (state.preview) URL.revokeObjectURL(state.preview)
      return { imagen: null, preview: null, resultado: null, error: null,
               camaraActiva: false, fotoCapturada: false }
    })
  },
}))