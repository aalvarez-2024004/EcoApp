import { useRef, useEffect, useState } from 'react'
import { useDetectorReciclaje } from '../store/useDetectorStore'
import useGamificacionStore from '../store/useGamificacionStore'
import { detectorStyles, LEYENDA } from '../../../Styles/DetectorPage'
import UploadPanel  from '../components/DetectorReciclajeComps/UploadPanel'
import CameraPanel  from '../components/DetectorReciclajeComps/CameraPanel'
import ResultPanel  from '../components/DetectorReciclajeComps/ResultPanel'

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`transition-all duration-300 ${active ? 'active' : ''}`}
      style={{
        padding: '10px 24px',
        fontSize: 13,
        fontWeight: 600,
        borderRadius: '30px',
        border: 'none',
        cursor: 'pointer',
        background: active ? '#2d5a27' : 'transparent',
        color: active ? '#ffffff' : '#6b8e66',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: active ? '0 4px 12px rgba(45, 90, 39, 0.2)' : 'none'
      }}
    >
      {children}
    </button>
  )
}

export default function DetectorReciclajePage() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [toast, setToast] = useState(null)

  const {
    resultado, isLoading, error,
    activeTab, camaraActiva, fotoCapturada, preview,
    seleccionarImagen, clasificar, limpiar,
    setTab, activarCamara, detenerCamara, capturarFoto, retomar,
  } = useDetectorReciclaje()

  const challenges = useGamificacionStore(s => s.challenges)

  const showToast = (ok, msg) => {
    setToast({ ok, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const handleClasificar = async () => {
    // Guardar estado de retos ANTES de clasificar para detectar cuáles se completaron
    const prevChallenges = useGamificacionStore.getState().challenges
    const response = await clasificar()
    if (response?.success) {
      // Esperar brevemente a que el store se actualice
      setTimeout(() => {
        const nextChallenges = useGamificacionStore.getState().challenges
        const recienCompletados = nextChallenges.filter(ch => {
          const prev = prevChallenges.find(p => p._id === ch._id)
          return ch.completed && prev && !prev.completed
        })
        if (recienCompletados.length > 0) {
          const nombres = recienCompletados.map(c => c.title).join(' y ')
          showToast(true, `✅ ¡Reto completado! "${nombres}" — ve a Gamificación para reclamar tus puntos.`)
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
    <div className="cyber-page-container">
      <style>{detectorStyles}</style>
      <style>{`
        .cyber-page-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* ── Toast de gamificación ── */
        .detector-toast {
          position: fixed;
          top: 80px;
          right: 24px;
          z-index: 9999;
          padding: 14px 20px;
          border-radius: 16px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,.15);
          animation: toastSlideIn .3s cubic-bezier(0.16,1,0.3,1);
          max-width: 420px;
          line-height: 1.4;
        }
        .detector-toast.ok  { background: #21491e; color: white; }
        .detector-toast.err { background: #c0392b; color: white; }
        @keyframes toastSlideIn {
          from { transform: translateX(120%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }

        /* ── Gran Contenedor Glassmorphic Futurista ── */
        .glass-main-card {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 32px;
          padding: 2.5rem;
          box-shadow: 0 24px 50px rgba(27, 60, 26, 0.04), 
                      inset 0 1px 2px rgba(255, 255, 255, 0.5);
        }

        /* Sub-paneles internos consistentes */
        .glass-sub-panel {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.01);
        }

        .glass-tabs-container {
          display: flex;
          padding: 6px;
          gap: 4px;
          border-radius: 100px;
          width: fit-content;
          background: rgba(45, 90, 39, 0.05);
          border: 1px solid rgba(45, 90, 39, 0.03);
          margin-bottom: 1.5rem;
        }

        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
          align-items: start;
        }

        .cyber-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          width: fit-content;
          background: rgba(45, 90, 39, 0.08);
          border: 1px solid rgba(45, 90, 39, 0.15);
          color: #2d5a27;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .legend-section {
          margin-top: 2.5rem;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding-top: 1.5rem;
        }

        .legend-grid-box {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .legend-item-card {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.01);
        }

        @media (max-width: 1100px) {
          .grid-layout {
            grid-template-columns: 1fr;
          }
          .glass-main-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      {/* ── Toast de notificación de reto completado ── */}
      {toast && (
        <div className={`detector-toast ${toast.ok ? 'ok' : 'err'}`}>
          {toast.msg}
        </div>
      )}

      {/* ── Encabezado Limpio Superior ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div className="cyber-badge">
          <i className="ti ti-cpu" style={{ fontSize: '13px' }} />
          <span>AI Vision Engine v2.6 · Google Cloud</span>
        </div>
        <h1 className="eco-font" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1b3c1a', margin: 0, letterSpacing: '-0.02em' }}>
          Detector de <span style={{ color: '#2d5a27' }}>Reciclaje</span>
        </h1>
        <p style={{ fontSize: '15px', color: '#4a4a4a', margin: 0, maxWidth: '600px', lineHeight: 1.5 }}>
          Analiza flujos de residuos mediante captura óptica. Nuestra inteligencia artificial segmentará los materiales indicando su respectivo contenedor.
        </p>
      </div>

      {/* ── Macro Contenedor Glassmorphic Translúcido ── */}
      <div className="glass-main-card">
        <div className="grid-layout">
          
          {/* Columna Izquierda: Captura/Subida */}
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            
            {/* Pestañas */}
            <div className="glass-tabs-container">
              <TabBtn active={activeTab === 'subir'} onClick={() => handleSwitchTab('subir')}>
                <i className="ti ti-upload" style={{ fontSize: 15 }} />
                Subir Imagen
              </TabBtn>
              <TabBtn active={activeTab === 'camara'} onClick={() => handleSwitchTab('camara')}>
                <i className="ti ti-camera" style={{ fontSize: 15 }} />
                Cámara en Vivo
              </TabBtn>
            </div>

            {/* Panel de interacción */}
            <div className="glass-sub-panel">
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
                  onActivar={() => activarCamara(videoRef)}
                  onDetener={() => detenerCamara(videoRef)}
                  onCapturar={() => capturarFoto(videoRef, canvasRef)}
                  onClasificar={handleClasificar}
                  onRetomar={retomar}
                />
              )}
            </div>

            {/* Errores */}
            {error && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 16px', borderRadius: '14px', fontSize: '13px', fontWeight: 600,
                background: '#fff5f5', border: '1px solid #ffcccc', color: '#dc2626', marginTop: '1rem'
              }}>
                <i className="ti ti-alert-circle" style={{ fontSize: '16px' }} />
                {error}
              </div>
            )}
          </div>

          {/* Columna Derecha: Resultados */}
          <div style={{ minWidth: 0 }}>
            <div className="glass-sub-panel" style={{ height: '100%', boxSizing: 'border-box' }}>
              <ResultPanel resultado={resultado} isLoading={isLoading} onLimpiar={limpiar} />
            </div>
          </div>

        </div>

        {/* Sección Inferior: Leyendas de Contenedores */}
        <div className="legend-section">
          <p style={{ fontSize: '11px', fontWeight: 800, color: '#2d5a27', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
            Infraestructura de Depósitos
          </p>
          <div className="legend-grid-box">
            {LEYENDA.map(({ color, label, desc, icon }) => (
              <div key={label} className="legend-item-card">
                <div
                  className={color}
                  style={{
                    width: 38, height: 38, borderRadius: '12px', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px'
                  }}
                >
                  {icon}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#121212', margin: 0 }}>{label}</p>
                  <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}