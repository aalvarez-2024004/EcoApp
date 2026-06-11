import { useRef, useEffect, useState } from 'react'
import { useDetectorReciclaje } from '../store/useDetectorStore'
import useGamificacionStore from '../store/useGamificacionStore'
import { LEYENDA } from '../../../Styles/constants/detector.styles.js'
import { detectorCss, BIN_COLORS} from '../../../Styles/constants/DetectorPage.js'
import {BgPattern} from '../../../icons/DetectorIcons.jsx'
import { TabBtn } from '../../../ui/DetectorReciclaje/TabBtn.jsx'
import UploadPanel from '../components/DetectorReciclajeComps/UploadPanel'
import CameraPanel from '../components/DetectorReciclajeComps/CameraPanel'
import ResultPanel from '../components/DetectorReciclajeComps/ResultPanel'
import EcoBotFlotante from './EcoBotFlotante.jsx'

export default function DetectorReciclajePage() {
  const videoRef  = useRef(null)
  const canvasRef = useRef(null)
  const [toast, setToast] = useState(null)

  const {
      resultado, isLoading, error,
      activeTab, camaraActiva, fotoCapturada, preview,
      facingMode, toggleFacingMode, 
      seleccionarImagen, clasificar, limpiar,
      setTab, activarCamara, detenerCamara, capturarFoto, retomar,
  } = useDetectorReciclaje()

  const showToast = (ok, msg) => {
    setToast({ ok, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const handleClasificar = async () => {
    const prevChallenges = useGamificacionStore.getState().challenges
    const response = await clasificar()

    if (response?.success) {
      setTimeout(() => {
        const nextChallenges = useGamificacionStore.getState().challenges
        const recienCompletados = nextChallenges.filter(ch => {
          const prev = prevChallenges.find(p => p._id === ch._id)
          return ch.completed && prev && !prev.completed
        })

        if (recienCompletados.length > 0) {
          const nombres = recienCompletados.map(c => c.title).join(' y ')
          showToast(true, `✅ ¡Reto desbloqueado! "${nombres}" — ve a Gamificación para reclamar tus puntos 🌿`)
        } else {
          showToast(true, '♻️ ¡Reciclaje registrado correctamente!')
        }
      }, 800)
    }
  }

  useEffect(() => {
    return () => detenerCamara(videoRef)
  }, [])

  const handleSwitchTab = (tab) => {
    if (camaraActiva) detenerCamara(videoRef)
    setTab(tab)
  }

  return (
    <>
      <style>{detectorCss}</style>

      {toast && (
        <div className={`detector-toast ${toast.ok ? 'ok' : 'err'}`}>
          {toast.msg}
        </div>
      )}

      <div className="detector-page">
        <BgPattern />

        {/* ── Fila superior: header izquierda + stats derecha ── */}
        <div className="top-row anim-1">

          {/* Header */}
          <div className="detector-header">
            <div className="detector-badge">
              <i className="ti ti-cpu" />
              AI Vision Engine v2.6 · Google Cloud
            </div>
            <h1 className="detector-title">Detector de Reciclaje</h1>
            <p className="detector-subtitle">
              Analiza flujos de residuos mediante captura óptica. Nuestra inteligencia
              artificial segmentará los materiales indicando su respectivo contenedor.
            </p>
          </div>

          {/* Stats */}
          <div className="stats-strip">
            {[
              { val: '+ 10k', lbl: 'Residuos analizados', icon: 'ti-chart-bar' },
              { val: '96%',   lbl: 'Precisión del modelo', icon: 'ti-brain' },
            ].map(({ val, lbl, icon }) => (
              <div className="stat-card" key={lbl}>
                <div className="stat-icon">
                  <i className={`ti ${icon}`} />
                </div>
                <div className="stat-val">{val}</div>
                <div className="stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Fila inferior: main-card izquierda + protocolo derecha ── */}
        <div className="bottom-row anim-2">

          {/* Card izquierda: tabs + upload/cámara */}
          <div className="main-card">
            <div className="tabs-bar">
              <TabBtn active={activeTab === 'subir'} onClick={() => handleSwitchTab('subir')}>
                <i className="ti ti-upload" />
                Subir imagen
              </TabBtn>
              <TabBtn active={activeTab === 'camara'} onClick={() => handleSwitchTab('camara')}>
                <i className="ti ti-camera" />
                Cámara en vivo
              </TabBtn>
              <div className="tabs-spacer" />
              <div className="module-indicator">
                <div className="module-dot" />
                Módulo activo
              </div>
            </div>

            <div className="upload-area">
              {activeTab === 'subir' ? (
                <UploadPanel
                  preview={preview}
                  isLoading={isLoading}
                  onSelect={seleccionarImagen}
                  onLimpiar={limpiar}
                  onClasificar={handleClasificar}
                />
              ) : (
                <CameraPanel
                  videoRef={videoRef}
                  canvasRef={canvasRef}
                  camaraActiva={camaraActiva}
                  fotoCapturada={fotoCapturada}
                  isLoading={isLoading}
                  facingMode={facingMode}                              
                  onToggleFacingMode={() => toggleFacingMode(videoRef)} 
                  onActivar={() => activarCamara(videoRef)}
                  onDetener={() => detenerCamara(videoRef)}
                  onCapturar={() => capturarFoto(videoRef, canvasRef)}
                  onClasificar={handleClasificar}
                  onRetomar={retomar}
              />
              )}

              {error && (
                <div className="error-banner">
                  <i className="ti ti-alert-circle" />
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Panel derecho: protocolo/resultado */}
          <div className="right-panel anim-3">
            <ResultPanel resultado={resultado} isLoading={isLoading} onLimpiar={limpiar} />
          </div>

        </div>

        {/* Legend — centrado, fuera de todo */}
        <div className="legend-footer">
          <span className="legend-label">Contenedores</span>
          {LEYENDA.map(({ label, desc }) => (
            <div className="bin-chip" key={label}>
              <div className="bin-dot" style={{ background: BIN_COLORS[label] ?? '#888' }} />
              <span className="bin-name">{label}</span>
              <span className="bin-type">· {desc}</span>
            </div>
          ))}
        </div>

      </div>

      <EcoBotFlotante />
    </>
  )
}