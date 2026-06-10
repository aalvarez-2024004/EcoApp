import { useState, useEffect } from 'react'
import { ScanOverlay } from '../../../../ui/DetectorReciclaje/ScanOverlay.jsx'
import SparkleClasificar from './SparkleClasificar'

const G = {
  green1:    '#1b3c1a',
  green2:    '#2d5a27',
  green3:    '#52b788',
  green4:    '#74c69d',
  border:    '#ddeedd',
  textMuted: '#6b8e66',
}

function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute', top: 12, right: 12, zIndex: 20,
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,255,255,0.92)',
        border: '1px solid rgba(220,38,38,0.2)',
        color: '#dc2626', fontSize: 18, lineHeight: 1, cursor: 'pointer',
        backdropFilter: 'blur(4px)', transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.92)'; e.currentTarget.style.color = '#dc2626' }}
    >×</button>
  )
}

function Viewfinder() {
  const c = (pos) => ({ position: 'absolute', width: 24, height: 24, ...pos })
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, padding: 20 }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ ...c({ top: 0, left: 0 }),    borderTop: `2.5px solid ${G.green3}`, borderLeft:  `2.5px solid ${G.green3}`, borderRadius: '8px 0 0 0' }} />
        <div style={{ ...c({ top: 0, right: 0 }),   borderTop: `2.5px solid ${G.green3}`, borderRight: `2.5px solid ${G.green3}`, borderRadius: '0 8px 0 0' }} />
        <div style={{ ...c({ bottom: 0, left: 0 }),  borderBottom: `2.5px solid ${G.green3}`, borderLeft:  `2.5px solid ${G.green3}`, borderRadius: '0 0 0 8px' }} />
        <div style={{ ...c({ bottom: 0, right: 0 }), borderBottom: `2.5px solid ${G.green3}`, borderRight: `2.5px solid ${G.green3}`, borderRadius: '0 0 8px 0' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 14, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          <div style={{ position: 'absolute', width: 1, height: 14, background: 'rgba(255,255,255,0.3)' }} />
        </div>
      </div>
    </div>
  )
}

/* Idle placeholder */
function CameraIdle() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', padding: '0 24px', zIndex: 10 }}>
      <div style={{
        width: 72, height: 72, borderRadius: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f0f9f0', border: `1px solid ${G.border}`,
        boxShadow: `0 8px 24px rgba(45,90,39,0.1)`,
      }}>
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 30, height: 30 }} stroke={G.green2} strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
        </svg>
      </div>
      <div>
        <p style={{ fontSize: 15, fontWeight: 700, color: G.green1, margin: 0 }}>Inicializar capturador óptico</p>
        <p style={{ fontSize: 13, color: G.textMuted, marginTop: 4, margin: 0 }}>Apunta directamente al residuo</p>
      </div>
    </div>
  )
}

export default function CameraPanel({
  videoRef, canvasRef,
  camaraActiva, fotoCapturada, isLoading,
  onActivar, onDetener, onCapturar, onClasificar, onRetomar,
}) {
  const [capturedSrc, setCapturedSrc] = useState(null)

  const camIdle      = !camaraActiva && !fotoCapturada
  const camLive      = camaraActiva  && !fotoCapturada
  const camCapturada = fotoCapturada

  useEffect(() => {
    if (fotoCapturada && canvasRef.current) {
      setCapturedSrc(canvasRef.current.toDataURL('image/jpeg', 0.92))
    }
    if (!fotoCapturada) setCapturedSrc(null)
  }, [fotoCapturada])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Visor */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        width: '100%', maxWidth: 560,
        aspectRatio: '4 / 3',
        alignSelf: 'center',
        borderRadius: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s ease',
        ...(camIdle
          ? { background: '#f7fdf7', border: `2px dashed rgba(82,183,136,0.4)` }
          : { background: '#0a1409', border: '1px solid rgba(255,255,255,0.08)' }
        ),
      }}>
        {/* Video stream */}
        <video
          ref={videoRef} autoPlay playsInline muted
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: camLive ? 1 : 0,
            pointerEvents: camLive ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Foto capturada */}
        {camCapturada && capturedSrc && (
          <>
            <img src={capturedSrc} aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'blur(20px) brightness(0.35) saturate(0.7)',
                transform: 'scale(1.1)',
              }}
            />
            <img src={capturedSrc} alt="Foto capturada"
              style={{
                position: 'relative', zIndex: 2,
                maxWidth: '85%', maxHeight: '85%',
                objectFit: 'contain', borderRadius: 14,
                boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              }}
            />
          </>
        )}

        {camCapturada && isLoading && <ScanOverlay />}
        {camIdle && <CameraIdle />}
        {camLive && <Viewfinder />}

        {/* Badge fotograma fijado */}
        {camCapturada && !isLoading && (
          <div style={{
            position: 'absolute', bottom: 14, left: 14, zIndex: 10,
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '6px 14px', borderRadius: 100,
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(82,183,136,0.25)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: G.green3, boxShadow: `0 0 6px ${G.green3}` }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: G.green1 }}>Fotograma fijado</span>
          </div>
        )}

        {/* Overlay analizando */}
        {camCapturada && isLoading && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', zIndex: 20,
            transform: 'translate(-50%,-50%)',
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 20px', borderRadius: 14,
            background: 'rgba(13,31,13,0.88)',
            border: '1px solid rgba(82,183,136,0.2)',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.02em' }}>
              Analizando redes moleculares…
            </span>
          </div>
        )}

        {camCapturada && <CloseBtn onClick={onRetomar} />}
      </div>

      {/* Tip card (Mejores resultados) - Se muestra cuando NO hay una foto fijada */}
      {!camCapturada && (
        <div style={{
          display: 'flex', gap: 10, alignItems: 'flex-start',
          padding: '12px 16px', borderRadius: 14,
          background: '#f0f9f0', border: `1px solid ${G.border}`,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <i className="ti ti-bulb" style={{ fontSize: 14, color: G.green2 }} />
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: G.green1, margin: 0 }}>Mejores resultados</p>
            <p style={{ fontSize: 12, color: G.textMuted, margin: '2px 0 0 0', lineHeight: 1.5 }}>
              Asegúrate de que el residuo ocupe al menos el 60% del encuadre con buena iluminación.
            </p>
          </div>
        </div>
      )}

      {/* Botones según estado */}
      {camIdle && (
        <button
          onClick={onActivar}
          style={{
            width: '100%', padding: '13px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: G.green2, color: '#fff', border: 'none',
            borderRadius: 14, fontWeight: 600, fontSize: 14,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(45,90,39,0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(45,90,39,0.28)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(45,90,39,0.2)' }}
        >
          <i className="ti ti-camera" style={{ fontSize: 17 }} />
          Activar cámara
        </button>
      )}

      {camLive && (
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <button
            onClick={onDetener}
            style={{
              padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              background: '#fff', color: G.green2,
              border: `1px solid ${G.border}`,
              borderRadius: 14, fontWeight: 600, fontSize: 13,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f7fdf7'; e.currentTarget.style.borderColor = G.green3 }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = G.border }}
          >
            Cancelar
          </button>
          <button
            onClick={onCapturar}
            style={{
              flex: 1, padding: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: G.green3, color: '#fff', border: 'none',
              borderRadius: 14, fontWeight: 600, fontSize: 14,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: 'pointer',
              boxShadow: `0 4px 16px rgba(82,183,136,0.3)`,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(82,183,136,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(82,183,136,0.3)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" stroke="currentColor" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
            Capturar foto
          </button>
        </div>
      )}

      {camCapturada && (
        <div style={{ display: 'flex', gap: 10, width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onRetomar}
            style={{
              padding: '12px 20px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 7, flex: '1 1 auto',
              background: '#fff', color: G.green2,
              border: `1px solid ${G.border}`,
              borderRadius: 14, fontWeight: 600, fontSize: 13,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f7fdf7'; e.currentTarget.style.borderColor = G.green3 }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = G.border }}
          >
            <i className="ti ti-refresh" style={{ fontSize: 15 }} />
            Reintentar
          </button>

          <div style={{ flex: '2 1 200px', display: 'flex' }}>
            <SparkleClasificar onClick={onClasificar} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  )
}