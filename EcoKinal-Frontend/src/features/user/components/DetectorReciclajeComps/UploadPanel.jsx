import { useRef } from 'react'
import {ScanOverlay} from '../../../../ui/DetectorReciclaje/ScanOverlay.jsx'
import SparkleClasificar from './SparkleClasificar'

const G = {
  green1: '#1b3c1a',
  green2: '#2d5a27',
  green3: '#52b788',
  green4: '#74c69d',
  border: '#ddeedd',
  pageBg: '#f4f8f3',
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
        backdropFilter: 'blur(4px)',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.92)'; e.currentTarget.style.color = '#dc2626' }}
    >×</button>
  )
}

/* Ilustración hoja para drop zone vacío */
function LeafIllustration() {
  return (
    <svg viewBox="0 0 80 80" style={{ width: 64, height: 64 }} fill="none">
      <circle cx="40" cy="40" r="36" fill="#e8f5e9" />
      <path d="M40 58 Q28 44 28 32 Q34 20 40 18 Q46 20 52 32 Q52 44 40 58Z" fill={G.green3} opacity="0.7" />
      <path d="M40 58 Q32 46 30 34 Q36 24 40 22 Q44 24 50 34 Q48 46 40 58Z" fill={G.green2} opacity="0.5" />
      <line x1="40" y1="58" x2="40" y2="24" stroke={G.green1} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="38" x2="34" y2="32" stroke={G.green1} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="40" y1="44" x2="46" y2="38" stroke={G.green1} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export default function UploadPanel({ preview, isLoading, onSelect, onLimpiar, onClasificar }) {
  const fileInputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) onSelect(file)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Drop zone */}
      <div
        style={{
          position: 'relative', overflow: 'hidden',
          width: '100%', maxWidth: 480,
          aspectRatio: '4 / 3',
          alignSelf: 'center',
          borderRadius: 20,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.25s ease',
          ...(preview
            ? { background: '#0a1409', border: '1px solid rgba(255,255,255,0.08)' }
            : {
                border: `2px dashed rgba(82,183,136,0.4)`,
                background: '#f7fdf7',
                cursor: 'pointer',
              }
          ),
        }}
        onClick={() => !preview && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onMouseEnter={e => {
          if (!preview) {
            e.currentTarget.style.borderColor = G.green2
            e.currentTarget.style.background = '#f0f9f0'
            e.currentTarget.style.boxShadow = `0 0 0 4px rgba(82,183,136,0.1)`
          }
        }}
        onMouseLeave={e => {
          if (!preview) {
            e.currentTarget.style.borderColor = 'rgba(82,183,136,0.4)'
            e.currentTarget.style.background = '#f7fdf7'
            e.currentTarget.style.boxShadow = 'none'
          }
        }}
      >
        {preview ? (
          <>
            <img
              src={preview} aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'blur(20px) brightness(0.35) saturate(0.7)',
                transform: 'scale(1.1)',
              }}
            />
            <img
              src={preview} alt="Vista previa"
              style={{
                position: 'relative', zIndex: 2,
                maxWidth: '85%', maxHeight: '85%',
                objectFit: 'contain',
                borderRadius: 14,
                boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              }}
            />
            {isLoading && <ScanOverlay />}
            <CloseBtn onClick={e => { e.stopPropagation(); onLimpiar() }} />

            {/* Badge imagen cargada */}
            {!isLoading && (
              <div style={{
                position: 'absolute', bottom: 14, left: 14, zIndex: 10,
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '6px 14px', borderRadius: 100,
                background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(82,183,136,0.25)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: G.green3, boxShadow: `0 0 6px ${G.green3}` }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: G.green1 }}>Imagen cargada</span>
              </div>
            )}

            {/* Overlay analizando */}
            {isLoading && (
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
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '0 24px', textAlign: 'center' }}>
            <LeafIllustration />
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: G.green1, margin: 0 }}>Arrastra tu muestra aquí</p>
              <p style={{ fontSize: 13, color: G.textMuted, margin: '4px 0 0 0' }}>o explora archivos locales</p>
            </div>
            <span style={{
              padding: '4px 14px', borderRadius: 100, fontSize: 11,
              fontWeight: 600, color: G.green2,
              background: 'rgba(45,90,39,0.07)',
              border: `1px solid rgba(45,90,39,0.15)`,
            }}>
              JPG · PNG · WEBP · máx. 5 MB
            </span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={e => onSelect(e.target.files[0])}
      />

      {/* Tip card */}
      {!preview && (
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

      {/* Botones */}
      {!preview ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: '100%', padding: '13px', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: 8,
            background: G.green2, color: '#fff', border: 'none',
            borderRadius: 14, fontWeight: 600, fontSize: 14,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            cursor: 'pointer',
            boxShadow: `0 4px 16px rgba(45,90,39,0.2)`,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(45,90,39,0.28)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(45,90,39,0.2)' }}
        >
          <i className="ti ti-upload" style={{ fontSize: 16 }} />
          Seleccionar imagen
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 10, width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => { onLimpiar(); setTimeout(() => fileInputRef.current?.click(), 50) }}
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
            Cambiar
          </button>

          <div style={{ flex: '2 1 200px', display: 'flex' }}>
            <SparkleClasificar onClick={onClasificar} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  )
}