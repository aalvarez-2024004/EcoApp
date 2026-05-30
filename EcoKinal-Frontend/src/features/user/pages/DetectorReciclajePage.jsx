import { useRef, useEffect } from 'react'
import { useDetectorReciclaje } from '../store/useDetectorStore'
import { detectorStyles, LEYENDA } from '../../../Styles/DetectorPage'
import UploadPanel  from '../components/UploadPanel'
import CameraPanel  from '../components/CameraPanel'
import ResultPanel  from '../components/ResultPanel'

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 font-semibold transition-all duration-200 ${active ? 'tab-active' : 'tab-inactive'}`}
      style={{ padding: '12px 28px', fontSize: 14 }}
    >
      {children}
    </button>
  )
}

export default function DetectorReciclajePage() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const {
    resultado, isLoading, error,
    activeTab, camaraActiva, fotoCapturada, preview,
    seleccionarImagen, clasificar, limpiar,
    setTab, activarCamara, detenerCamara, capturarFoto, retomar,
  } = useDetectorReciclaje()

  useEffect(() => {
    return () => detenerCamara(videoRef)
  }, []) // eslint-disable-line

  const handleSwitchTab = (tab) => {
    if (camaraActiva) detenerCamara(videoRef)
    setTab(tab)
  }

  return (
    <div style={{ background: '#EAF3DE', minHeight: '100vh', padding: '2.5rem 3rem', boxSizing: 'border-box' }}>
      <style>{detectorStyles}</style>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 99, width: 'fit-content',
              background: '#C0DD97', border: '0.5px solid #97C459',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 13, height: 13 }} stroke="#27500A" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#27500A', textTransform: 'uppercase' }}>
              EcoKinal · Google Vision
            </span>
          </div>

          <h1 className="eco-font" style={{ fontSize: 48, fontWeight: 800, color: '#173404', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
            Detector de{' '}
            <span style={{ color: '#3B6D11' }}>reciclaje</span>
          </h1>
          <p style={{ fontSize: 15, color: '#639922', maxWidth: 500, lineHeight: 1.75, margin: 0 }}>
            Sube una foto o usa tu cámara para que la Inteligencia Artificial
            identifique el material y el contenedor correcto.
          </p>
        </div>

        {/* ── Main grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem', alignItems: 'start', width: '100%' }}>

          {/* ── Columna izquierda ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>

            {/* Tabs */}
            <div style={{
              display: 'flex', padding: 8, gap: 6,
              borderRadius: 20, width: 'fit-content',
              background: '#fff', border: '0.5px solid #C0DD97',
            }}>
              <TabBtn active={activeTab === 'subir'} onClick={() => handleSwitchTab('subir')}>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 17, height: 17 }} stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Subir imagen
              </TabBtn>
              <TabBtn active={activeTab === 'camara'} onClick={() => handleSwitchTab('camara')}>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 17, height: 17 }} stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                </svg>
                Cámara en vivo
              </TabBtn>
            </div>

            {/* Panel activo */}
            {activeTab === 'subir' ? (
              <UploadPanel
                preview={preview}
                isLoading={isLoading}
                onSelect={seleccionarImagen}
                onLimpiar={limpiar}
                onClasificar={clasificar}
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
                onClasificar={clasificar}
                onRetomar={retomar}
              />
            )}

            {/* Error */}
            {error && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 18px', borderRadius: 14, fontSize: 13, fontWeight: 500,
                background: '#FCEBEB', border: '0.5px solid #F09595', color: '#791F1F',
              }}>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }} stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                {error}
              </div>
            )}

            {/* Contenedores de referencia */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#97C459', textTransform: 'uppercase', margin: 0 }}>
                Contenedores de referencia
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                {LEYENDA.map(({ color, label, desc, icon }) => (
                  <div
                    key={label}
                    style={{
                      background: '#fff', border: '0.5px solid #C0DD97',
                      borderRadius: 18, padding: '18px 10px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center',
                    }}
                  >
                    <div className={`${color}`} style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.9 }}>
                      <span style={{ fontSize: 20 }}>{icon}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#27500A', margin: 0 }}>{label}</p>
                      <p style={{ fontSize: 10, color: '#639922', marginTop: 3 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Columna derecha — Resultados ── */}
          <div style={{ position: 'sticky', top: '2rem', minWidth: 0 }}>
            <ResultPanel resultado={resultado} isLoading={isLoading} onLimpiar={limpiar} />
          </div>

        </div>
      </div>
    </div>
  )
}