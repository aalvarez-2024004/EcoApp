import { useState, useEffect } from 'react'
import { ScanOverlay } from '../../../icons/DetectorIcons'

function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute', top: 12, right: 12, zIndex: 20,
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#fff', border: '0.5px solid rgba(35,55,109,0.15)',
        color: '#23376d', fontSize: 18, lineHeight: 1, cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#FCEBEB'; e.currentTarget.style.color = '#E24B4A'; e.currentTarget.style.borderColor = '#F09595' }}
      onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#23376d'; e.currentTarget.style.borderColor = 'rgba(35,55,109,0.15)' }}
    >
      ×
    </button>
  )
}

function Viewfinder() {
  const cornerStyle = (pos) => ({ position: 'absolute', width: 28, height: 28, ...pos })
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      <div style={{ ...cornerStyle({ top: 16, left: 16 }), borderTop: '2px solid #23376d', borderLeft: '2px solid #23376d', borderRadius: '6px 0 0 0' }} />
      <div style={{ ...cornerStyle({ top: 16, right: 16 }), borderTop: '2px solid #23376d', borderRight: '2px solid #23376d', borderRadius: '0 6px 0 0' }} />
      <div style={{ ...cornerStyle({ bottom: 16, left: 16 }), borderBottom: '2px solid #23376d', borderLeft: '2px solid #23376d', borderRadius: '0 0 0 6px' }} />
      <div style={{ ...cornerStyle({ bottom: 16, right: 16 }), borderBottom: '2px solid #23376d', borderRight: '2px solid #23376d', borderRadius: '0 0 6px 0' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 16, height: 1, background: 'rgba(35,55,109,0.4)' }} />
        <div style={{ position: 'absolute', width: 1, height: 16, background: 'rgba(35,55,109,0.4)' }} />
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
  }, [fotoCapturada]) // eslint-disable-line

  return (
    <div className="eco-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Visor de cámara */}
      <div
        style={{
          position: 'relative', overflow: 'hidden',
          width: '65%',
          aspectRatio: '1 / 1',
          alignSelf: 'center',
          borderRadius: 16,
          background: camIdle ? '#eef1f9' : '#0d150f',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: camIdle ? '2px dashed #23376d' : 'none',
        }}
      >
        {/* Video en vivo — cover para que llene bien */}
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

        {/* Canvas oculto — solo para capturar */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Foto capturada: fondo desenfocado + imagen completa */}
        {camCapturada && capturedSrc && (
          <>
            <img
              src={capturedSrc}
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'blur(18px) brightness(0.5) saturate(0.7)',
                transform: 'scale(1.1)',
              }}
            />
            <img
              src={capturedSrc}
              alt="Foto capturada"
              style={{
                position: 'relative', zIndex: 2,
                maxWidth: '80%',
                maxHeight: '80%',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: 8,
              }}
            />
          </>
        )}

        {camCapturada && isLoading && <ScanOverlay />}

        {/* Estado idle */}
        {camIdle && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', padding: '0 24px', zIndex: 10 }}>
            <div className="animate-float" style={{
              width: 80, height: 80, borderRadius: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#fff', border: '0.5px solid rgba(35,55,109,0.15)',
              boxShadow: '0 4px 20px rgba(35,55,109,0.15)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 36, height: 36 }} stroke="#23376d" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#23376d', margin: 0 }}>Activa tu cámara</p>
              <p style={{ fontSize: 12, color: '#4b5a8a', marginTop: 4 }}>Apunta al residuo que quieres clasificar</p>
            </div>
          </div>
        )}

        {camLive && <Viewfinder />}

        {/* Badge foto capturada */}
        {camCapturada && !isLoading && (
          <div style={{
            position: 'absolute', bottom: 12, left: 12, zIndex: 10,
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 99,
            background: 'rgba(238,241,249,0.95)', border: '0.5px solid #23376d',
          }}>
            <div className="pulse-ring" style={{ width: 8, height: 8, borderRadius: '50%', background: '#23376d', color: '#23376d', position: 'relative' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#23376d' }}>Foto capturada</span>
          </div>
        )}

        {/* Badge analizando */}
        {camCapturada && isLoading && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', zIndex: 20,
            transform: 'translate(-50%,-50%)',
            padding: '10px 20px', borderRadius: 14,
            background: 'rgba(35,55,109,0.85)',
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#eef1f9' }}>Analizando material…</span>
          </div>
        )}

        {camCapturada && <CloseBtn onClick={onRetomar} />}
      </div>

      {/* ── Botones según estado ── */}
      {camIdle && (
        <button onClick={onActivar} className="eco-btn-primary"
          style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
          </svg>
          Activar cámara
        </button>
      )}

      {camLive && (
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onDetener} className="eco-btn-secondary"
            style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
            Cancelar
          </button>
          <button onClick={onCapturar} className="eco-btn-primary"
            style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" stroke="currentColor" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
            Capturar foto
          </button>
        </div>
      )}

      {camCapturada && (
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onRetomar} className="eco-btn-secondary"
            style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Nueva foto
          </button>
          <button onClick={onClasificar} disabled={isLoading} className="eco-btn-primary"
            style={{
              flex: 1, padding: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              ...(isLoading ? { background: 'rgba(35,55,109,0.3)', cursor: 'not-allowed' } : {}),
            }}>
            {isLoading ? (
              <>
                <svg style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(35,55,109,0.3)" strokeWidth="3" opacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="rgba(35,55,109,0.3)" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Analizando…
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
                Clasificar material
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}