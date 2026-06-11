import { create } from 'zustand'
import { clasificarImagen } from '../../../shared/Api/DetectorReciclaje'
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
  facingMode:    'environment',
  cameraIndex:   0,
  totalCameras:  1,
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
        const { completarRetoPorAccion } = useGamificacionStore.getState()
        await completarRetoPorAccion('detector')
        await completarRetoPorAccion('detector_3_check')
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
        imagen:        tab === 'camara' ? null : state.imagen,
        preview:       (tab === 'camara' && state.fotoCapturada) ? null : state.preview,
        resultado:     null,
        error:         null,
      }
    })
  },

  // ── cambiar cámara (frontal/trasera) ──────────────────────────────────────
  toggleFacingMode: async (videoRef) => {
    const { camaraActiva, _stream } = get()

    if (_stream) _stream.getTracks().forEach(t => t.stop())

    const video = videoRef?.current
    if (video) {
      video.pause()
      video.srcObject = null
      video.load()
    }

    // Alterna entre índice 0 y 1 de la lista de cámaras
    set((state) => ({
      cameraIndex: state.cameraIndex === 0 ? 1 : 0,
      _stream: null,
      camaraActiva: false
    }))

    await new Promise(resolve => setTimeout(resolve, 400))

    if (camaraActiva) {
      await get().activarCamara(videoRef)
    }
  },

  // ── activar cámara ────────────────────────────────────────────────────────
  activarCamara: async (videoRef) => {
    set({ error: null })

    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameras = devices.filter(d => d.kind === 'videoinput')

      const { cameraIndex = 0 } = get()
      const index = Math.min(cameraIndex, cameras.length - 1)
      const selectedCamera = cameras[index]

      const constraints = selectedCamera?.deviceId
        ? { video: { deviceId: { exact: selectedCamera.deviceId } }, audio: false }
        : { video: true, audio: false }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      const video = videoRef?.current
      if (!video) return

      video.srcObject = stream

      await new Promise((resolve) => {
        video.onloadedmetadata = () => resolve()
      })

      await video.play().catch(() => {})

      set({ camaraActiva: true, _stream: stream, totalCameras: cameras.length })

    } catch (err) {
      const msg =
        err.name === 'NotAllowedError'
          ? 'Permiso de cámara denegado.'
          : err.name === 'NotFoundError'
          ? 'No se encontró ninguna cámara.'
          : err.name === 'NotReadableError'
          ? 'La cámara está siendo utilizada por otra aplicación.'
          : `No se pudo acceder a la cámara: ${err.message}`

      set({ error: msg, camaraActiva: false })
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

    const { _stream } = get()
    if (_stream) _stream.getTracks().forEach(t => t.stop())
    if (videoRef?.current) videoRef.current.srcObject = null

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