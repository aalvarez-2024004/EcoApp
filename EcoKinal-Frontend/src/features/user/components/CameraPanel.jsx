import { ScanOverlay } from '../../../icons/DetectorIcons'

function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute', top: 12, right: 12, zIndex: 20,
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#fff', border: '0.5px solid #C0DD97',
        color: '#639922', fontSize: 18, lineHeight: 1, cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#FCEBEB'; e.currentTarget.style.color = '#E24B4A'; e.currentTarget.style.borderColor = '#F09595' }}
      onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#639922'; e.currentTarget.style.borderColor = '#C0DD97' }}
    >
      ×
    </button>
  )
}

function Viewfinder() {
  const cornerStyle = (pos) => ({
    position: 'absolute', width: 28, height: 28,
    ...pos,
  })
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      {/* Esquinas del visor */}
      <div style={{ ...cornerStyle({ top: 16, left: 16 }), borderTop: '2px solid #97C459', borderLeft: '2px solid #97C459', borderRadius: '6px 0 0 0' }} />
      <div style={{ ...cornerStyle({ top: 16, right: 16 }), borderTop: '2px solid #97C459', borderRight: '2px solid #97C459', borderRadius: '0 6px 0 0' }} />
      <div style={{ ...cornerStyle({ bottom: 16, left: 16 }), borderBottom: '2px solid #97C459', borderLeft: '2px solid #97C459', borderRadius: '0 0 0 6px' }} />
      <div style={{ ...cornerStyle({ bottom: 16, right: 16 }), borderBottom: '2px solid #97C459', borderRight: '2px solid #97C459', borderRadius: '0 0 6px 0' }} />
      {/* Crosshair central */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 16, height: 1, background: 'rgba(151,196,89,0.4)' }} />
        <div style={{ position: 'absolute', width: 1, height: 16, background: 'rgba(151,196,89,0.4)' }} />
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
  const camIdle      = !camaraActiva && !fotoCapturada
  const camLive      = camaraActiva  && !fotoCapturada
  const camCapturada = fotoCapturada

  return (
    <div className="eco-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Visor de cámara */}
      <div
        style={{
          position: 'relative', borderRadius: 16, overflow: 'hidden',
          height: 300,
          background: camIdle ? '#EAF3DE' : '#0d150f',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: camIdle ? '2px dashed #97C459' : 'none',
        }}
      >
        <video
          ref={videoRef}
          autoPlay playsInline muted
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: camLive ? 1 : 0,
            pointerEvents: camLive ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: camCapturada ? 1 : 0,
            pointerEvents: camCapturada ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        />

        {camCapturada && isLoading && <ScanOverlay />}

        {/* Estado idle */}
        {camIdle && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', padding: '0 24px', zIndex: 10 }}>
            <div className="animate-float" style={{
              width: 80, height: 80, borderRadius: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#fff', border: '0.5px solid #C0DD97',
              boxShadow: '0 4px 20px rgba(99,153,34,0.15)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 36, height: 36 }} stroke="#3B6D11" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#27500A', margin: 0 }}>Activa tu cámara</p>
              <p style={{ fontSize: 12, color: '#639922', marginTop: 4 }}>Apunta al residuo que quieres clasificar</p>
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
            background: 'rgba(234,243,222,0.95)', border: '0.5px solid #97C459',
          }}>
            <div className="pulse-ring" style={{ width: 8, height: 8, borderRadius: '50%', background: '#639922', color: '#639922', position: 'relative' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#27500A' }}>Foto capturada</span>
          </div>
        )}

        {/* Badge analizando */}
        {camCapturada && isLoading && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', zIndex: 20,
            transform: 'translate(-50%,-50%)',
            padding: '10px 20px', borderRadius: 14,
            background: 'rgba(39,80,10,0.85)',
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#C0DD97' }}>Analizando material…</span>
          </div>
        )}

        {camCapturada && <CloseBtn onClick={onRetomar} />}
      </div>

      {/* ── Botones según estado ── */}

      {camIdle && (
        <button
          onClick={onActivar}
          className="eco-btn-primary"
          style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
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
          <button
            onClick={onDetener}
            className="eco-btn-secondary"
            style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            Cancelar
          </button>
          <button
            onClick={onCapturar}
            className="eco-btn-primary"
            style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
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
          <button
            onClick={onRetomar}
            className="eco-btn-secondary"
            style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Nueva foto
          </button>
          <button
            onClick={onClasificar}
            disabled={isLoading}
            className="eco-btn-primary"
            style={{
              flex: 1, padding: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              ...(isLoading ? { background: '#97C459', cursor: 'not-allowed' } : {}),
            }}
          >
            {isLoading ? (
              <>
                <svg style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#C0DD97" strokeWidth="3" opacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#C0DD97" strokeWidth="3" strokeLinecap="round" />
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