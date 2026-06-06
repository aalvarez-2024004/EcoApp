import { useState, useEffect } from 'react'
import { ScanOverlay } from '../../../../icons/DetectorIcons'

function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute', top: 12, right: 12, zIndex: 20,
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.9)', 
        border: '1px solid rgba(220, 38, 38, 0.2)',
        color: '#dc2626', fontSize: 18, lineHeight: 1, cursor: 'pointer',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'; e.currentTarget.style.color = '#dc2626' }}
    >
      ×
    </button>
  )
}

function Viewfinder() {
  const cornerStyle = (pos) => ({ position: 'absolute', width: 24, height: 24, ...pos })
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, padding: 20 }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ ...cornerStyle({ top: 0, left: 0 }), borderTop: '2.5px solid #52b788', borderLeft: '2.5px solid #52b788', borderRadius: '8px 0 0 0' }} />
        <div style={{ ...cornerStyle({ top: 0, right: 0 }), borderTop: '2.5px solid #52b788', borderRight: '2.5px solid #52b788', borderRadius: '0 8px 0 0' }} />
        <div style={{ ...cornerStyle({ bottom: 0, left: 0 }), borderBottom: '2.5px solid #52b788', borderLeft: '2.5px solid #52b788', borderRadius: '0 0 0 8px' }} />
        <div style={{ ...cornerStyle({ bottom: 0, right: 0 }), borderBottom: '2.5px solid #52b788', borderRight: '2.5px solid #52b788', borderRadius: '0 0 8px 0' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 14, height: 1, background: 'rgba(255,255,255,0.25)' }} />
          <div style={{ position: 'absolute', width: 1, height: 14, background: 'rgba(255,255,255,0.25)' }} />
        </div>
      </div>
    </div>
  )
}

export default function CameraPanel({
  videoRef,
  canvasRef,
  camaraActiva,
  fotoCapturada,
  isLoading,
  onActivar,
  onDetener,
  onCapturar,
  onClasificar,
  onRetomar,
}) {
  const [capturedSrc, setCapturedSrc] = useState(null)

  const camIdle      = !camaraActiva && !fotoCapturada
  const camLive      = camaraActiva  && !fotoCapturada
  const camCapturada = fotoCapturada

  useEffect(() => {
    if (fotoCapturada && canvasRef.current) {
      setCapturedSrc(canvasRef.current.toDataURL('image/jpeg', 0.92))
    }
    if (!fotoCapturada) {
      setCapturedSrc(null)
    }
  }, [fotoCapturada])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>

      {/* Visor Óptico / Render de Cámara */}
      <div
        style={{
          position: 'relative', overflow: 'hidden',
          width: '100%',
          maxWidth: '420px',
          aspectRatio: '1.2 / 1',
          alignSelf: 'center',
          borderRadius: 20,
          background: camIdle ? 'rgba(45, 90, 39, 0.02)' : '#0a1409',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: camIdle ? '2px dashed rgba(45, 90, 39, 0.25)' : '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Stream de Video en Vivo */}
        <video
          ref={videoRef}
          autoPlay playsInline muted
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: camLive ? 1 : 0,
            pointerEvents: camLive ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Captura de fotogramas */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Congelamiento Estático de Captura */}
        {camCapturada && capturedSrc && (
          <>
            <img
              src={capturedSrc}
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'blur(20px) brightness(0.4) saturate(0.8)',
                transform: 'scale(1.1)',
              }}
            />
            <img
              src={capturedSrc}
              alt="Foto capturada"
              style={{
                position: 'relative', zIndex: 2,
                maxWidth: '85%',
                maxHeight: '85%',
                objectFit: 'contain',
                borderRadius: 12,
                boxShadow: '0 12px 30px rgba(0,0,0,0.5)'
              }}
            />
          </>
        )}

        {camCapturada && isLoading && <ScanOverlay />}

        {/* Panel Inactivo Inicial */}
        {camIdle && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', padding: '0 24px', zIndex: 10 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 8px 24px rgba(45, 90, 39, 0.08)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 30, height: 30 }} stroke="#2d5a27" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#1b3c1a', margin: 0 }}>Inicializar Capturador Óptico</p>
              <p style={{ fontSize: 13, color: '#6b8e66', marginTop: 4, margin: 0 }}>Apunta directamente a la estructura del residuo</p>
            </div>
          </div>
        )}

        {camLive && <Viewfinder />}

        {/* Feedback visual de Capturado */}
        {camCapturada && !isLoading && (
          <div style={{
            position: 'absolute', bottom: 12, left: 12, zIndex: 10,
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 99,
            background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)',
            border: '1px solid rgba(45, 90, 39, 0.15)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#52b788', boxShadow: '0 0 8px #52b788' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#1b3c1a' }}>Fotograma fijado</span>
          </div>
        )}

        {/* Feedback de Análisis Core */}
        {camCapturada && isLoading && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', zIndex: 20,
            transform: 'translate(-50%,-50%)',
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 20px', borderRadius: 16,
            background: 'rgba(13, 31, 13, 0.85)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)'
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#ffffff', letterSpacing: '0.02em' }}>Analizando redes moleculares…</span>
          </div>
        )}

        {camCapturada && <CloseBtn onClick={onRetomar} />}
      </div>

      {/* Interfaz de Botones y Triggers */}
      {camIdle && (
        <button onClick={onActivar}
          style={{
            width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#2d5a27', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: 600, fontSize: 14,
            cursor: 'pointer', boxShadow: '0 8px 20px rgba(45, 90, 39, 0.15)', transition: 'all 0.2s'
          }}>
          <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
          </svg>
          Activar Cámara
        </button>
      )}

      {camLive && (
        <div style={{ display: 'flex', gap: 12, width: '100%' }}>
          <button onClick={onDetener}
            style={{
              padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,0,0,0.03)', color: '#2d5a27', border: '1px solid rgba(45, 90, 39, 0.2)', 
              borderRadius: '14px', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s'
            }}>
            Cancelar
          </button>
          <button onClick={onCapturar}
            style={{
              flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: '#52b788', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', boxShadow: '0 6px 18px rgba(82, 183, 136, 0.25)', transition: 'all 0.2s'
            }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" stroke="currentColor" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
            Capturar Foto
          </button>
        </div>
      )}

      {camCapturada && (
        <div style={{ display: 'flex', gap: 12, width: '100%' }}>
          <button onClick={onRetomar}
            style={{
              padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,0,0,0.03)', color: '#2d5a27', border: '1px solid rgba(45, 90, 39, 0.2)', 
              borderRadius: '14px', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s'
            }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Reintentar
          </button>
          <button onClick={onClasificar} disabled={isLoading}
            style={{
              flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: isLoading ? 'rgba(45, 90, 39, 0.4)' : '#2d5a27', color: '#ffffff', border: 'none', 
              borderRadius: '14px', fontWeight: 600, fontSize: 14, cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: isLoading ? 'none' : '0 8px 20px rgba(45, 90, 39, 0.15)', transition: 'all 0.2s'
            }}>
            {isLoading ? (
              <>
                <svg style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" opacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Analizando…
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
                Clasificar Material
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}