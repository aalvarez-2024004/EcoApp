import { useRef, useEffect, useState } from 'react'
import { useDetectorReciclaje } from '../store/useDetectorStore'
import useGamificacionStore from '../store/useGamificacionStore'
import { LEYENDA } from '../../../Styles/DetectorPage'
import UploadPanel  from '../components/DetectorReciclajeComps/UploadPanel'
import CameraPanel  from '../components/DetectorReciclajeComps/CameraPanel'
import ResultPanel  from '../components/DetectorReciclajeComps/ResultPanel'

/* ── Paleta & tokens globales ── */
const G = {
  pageBg:    '#f4f8f3',
  cardBg:    '#ffffff',
  green1:    '#1b3c1a',
  green2:    '#2d5a27',
  green3:    '#52b788',
  green4:    '#74c69d',
  green5:    '#d8eed8',
  border:    '#ddeedd',
  textMuted: '#6b8e66',
  textSub:   '#9db89a',
}

const BIN_COLORS = {
  Verde:    '#2d8a3e',
  Azul:     '#2563eb',
  Amarillo: '#d97706',
  Rojo:     '#dc2626',
  Gris:     '#6b7280',
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 22px',
        fontSize: 13,
        fontWeight: 600,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        border: 'none',
        borderBottom: active ? `2.5px solid ${G.green2}` : '2.5px solid transparent',
        cursor: 'pointer',
        background: 'transparent',
        color: active ? G.green2 : G.textSub,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transition: 'color 0.2s, border-color 0.2s',
        borderRadius: 0,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}

/* ── Decoración SVG de fondo ── */
function BgPattern() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
        opacity: 0.035,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="leaf-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.5" fill={G.green2} />
          <circle cx="0"  cy="0"  r="1"   fill={G.green2} />
          <circle cx="60" cy="0"  r="1"   fill={G.green2} />
          <circle cx="0"  cy="60" r="1"   fill={G.green2} />
          <circle cx="60" cy="60" r="1"   fill={G.green2} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#leaf-grid)" />
    </svg>
  )
}

/* ── Ilustración decorativa header ── */
function HeaderIllustration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      style={{ width: 200, height: 120, opacity: 0.12, flexShrink: 0 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="90" rx="80" ry="20" fill={G.green3} />
      <path d="M100 80 Q80 40 60 20 Q100 30 100 80Z" fill={G.green2} />
      <path d="M100 80 Q120 40 140 20 Q100 30 100 80Z" fill={G.green3} />
      <path d="M100 80 Q70 55 50 60 Q80 45 100 80Z" fill={G.green4} />
      <path d="M100 80 Q130 55 150 60 Q120 45 100 80Z" fill={G.green4} />
      <circle cx="100" cy="78" r="5" fill={G.green1} />
    </svg>
  )
}

export default function DetectorReciclajePage() {
  const videoRef  = useRef(null)
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

  // ── Clasificar + detectar retos completados y notificar ──────────────────
  const handleClasificar = async () => {
    // Snapshot del estado de retos ANTES de clasificar
    const prevChallenges = useGamificacionStore.getState().challenges
    const response = await clasificar()

    if (response?.success) {
      // Esperar brevemente a que el store actualice los retos
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
      {/* Google Font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />

      <style>{`
        * { box-sizing: border-box; }

        .detector-page {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          min-height: 100vh;
          background: ${G.pageBg};
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 60px 24px;
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

        /* ── Animaciones de entrada ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeUp 0.45s ease both; }
        .anim-2 { animation: fadeUp 0.45s 0.08s ease both; }
        .anim-3 { animation: fadeUp 0.45s 0.16s ease both; }
        .anim-4 { animation: fadeUp 0.45s 0.24s ease both; }

        /* ── Stats strip ── */
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .stat-card {
          background: #ffffff;
          border: 1px solid ${G.border};
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 2px 12px rgba(45,90,39,0.05);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .stat-card:hover {
          box-shadow: 0 6px 20px rgba(45,90,39,0.1);
          transform: translateY(-1px);
        }
        .stat-val {
          font-size: 26px;
          font-weight: 800;
          color: ${G.green2};
          line-height: 1;
        }
        .stat-lbl {
          font-size: 12px;
          color: ${G.textMuted};
          font-weight: 500;
        }

        /* ── Main card ── */
        .main-card {
          background: ${G.cardBg};
          border: 1px solid ${G.border};
          border-radius: 24px;
          box-shadow: 0 4px 32px rgba(45,90,39,0.07);
          overflow: hidden;
        }

        /* ── Tabs bar ── */
        .tabs-bar {
          display: flex;
          align-items: center;
          border-bottom: 1px solid ${G.border};
          padding: 0 24px;
          background: #fafcfa;
        }
        .tabs-spacer { flex: 1; }
        .module-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: ${G.textMuted};
          letter-spacing: 0.04em;
        }
        .module-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: ${G.green3};
          box-shadow: 0 0 6px ${G.green3};
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* ── Content grid ── */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          align-items: start;
        }
        .left-col {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .right-col {
          padding: 28px;
          border-left: 1px solid ${G.border};
          background: #fafcfa;
          min-height: 480px;
          display: flex;
          flex-direction: column;
        }

        /* ── Legend footer ── */
        .legend-footer {
          border-top: 1px solid ${G.border};
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          background: #fafcfa;
        }
        .legend-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: ${G.textSub};
          margin-right: 6px;
        }
        .bin-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 100px;
          background: #ffffff;
          border: 1px solid ${G.border};
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: box-shadow 0.2s;
        }
        .bin-chip:hover { box-shadow: 0 3px 10px rgba(0,0,0,0.08); }
        .bin-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .bin-name { font-size: 12px; font-weight: 600; color: ${G.green1}; }
        .bin-type { font-size: 11px; color: ${G.textMuted}; }

        /* ── Error banner ── */
        .error-banner {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px; border-radius: 12px;
          font-size: 13px; font-weight: 600;
          background: #fff5f5; border: 1px solid #ffcccc; color: #dc2626;
        }

        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr; }
          .right-col { border-left: none; border-top: 1px solid ${G.border}; min-height: auto; }
          .stats-strip { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 600px) {
          .stats-strip { grid-template-columns: 1fr; }
          .left-col, .right-col { padding: 20px; }
        }
      `}</style>

      {/* ── Toast de notificación de reto completado ── */}
      {toast && (
        <div className={`detector-toast ${toast.ok ? 'ok' : 'err'}`}>
          {toast.msg}
        </div>
      )}

      <div className="detector-page">
        <BgPattern />

        {/* ── Header ── */}
        <div className="anim-1" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 14px', borderRadius: 100, width: 'fit-content',
              background: '#e8f5e9', border: `1px solid rgba(82,183,136,0.35)`,
              color: G.green2, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              <i className="ti ti-cpu" style={{ fontSize: 12 }} />
              AI Vision Engine v2.6 · Google Cloud
            </div>

            {/* Título */}
            <h1 style={{
              margin: 0,
              fontSize: '2.2rem',
              fontWeight: 800,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              background: `linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 60%, ${G.green3} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Detector de Reciclaje
            </h1>

            <p style={{
              margin: 0, fontSize: 14, color: G.textMuted,
              maxWidth: 520, lineHeight: 1.6, fontWeight: 400,
            }}>
              Analiza flujos de residuos mediante captura óptica. Nuestra inteligencia
              artificial segmentará los materiales indicando su respectivo contenedor.
            </p>
          </div>

          <HeaderIllustration />
        </div>

        {/* ── Stats strip ── */}
        <div className="stats-strip anim-2" style={{ position: 'relative', zIndex: 1 }}>
          {[
            { val: '+ 10k', lbl: 'Residuos analizados', icon: 'ti-chart-bar' },
            { val: '96%',   lbl: 'Precisión del modelo', icon: 'ti-brain' },
          ].map(({ val, lbl, icon }) => (
            <div className="stat-card" key={lbl}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <i className={`ti ${icon}`} style={{ fontSize: 14, color: G.green2 }} />
                </div>
              </div>
              <div className="stat-val">{val}</div>
              <div className="stat-lbl">{lbl}</div>
            </div>
          ))}
        </div>

        {/* ── Main card ── */}
        <div className="main-card anim-3" style={{ position: 'relative', zIndex: 1 }}>

          {/* Tabs */}
          <div className="tabs-bar">
            <TabBtn active={activeTab === 'subir'} onClick={() => handleSwitchTab('subir')}>
              <i className="ti ti-upload" style={{ fontSize: 15 }} />
              Subir imagen
            </TabBtn>
            <TabBtn active={activeTab === 'camara'} onClick={() => handleSwitchTab('camara')}>
              <i className="ti ti-camera" style={{ fontSize: 15 }} />
              Cámara en vivo
            </TabBtn>
            <div className="tabs-spacer" />
            <div className="module-indicator">
              <div className="module-dot" />
              Módulo activo
            </div>
          </div>

          {/* Grid */}
          <div className="content-grid">
            {/* Izquierda */}
            <div className="left-col">
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

              {error && (
                <div className="error-banner">
                  <i className="ti ti-alert-circle" style={{ fontSize: 16 }} />
                  {error}
                </div>
              )}
            </div>

            {/* Derecha */}
            <div className="right-col">
              <ResultPanel resultado={resultado} isLoading={isLoading} onLimpiar={limpiar} />
            </div>
          </div>

          {/* Legend footer */}
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
      </div>
    </>
  )
}