import { useRef } from 'react'
import { ScanOverlay } from '../../../icons/DetectorIcons'

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

export default function UploadPanel({ preview, isLoading, onSelect, onLimpiar, onClasificar }) {
  const fileInputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) onSelect(file)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>

      {/* Zona de Drop / Preview */}
      <div
        style={{
          position: 'relative', overflow: 'hidden',
          width: '100%',
          maxWidth: '420px',
          aspectRatio: '1.2 / 1',
          alignSelf: 'center',
          borderRadius: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...(preview
            ? { background: '#0a1409', border: '1px solid rgba(255,255,255,0.1)' }
            : {
                border: '2px dashed rgba(45, 90, 39, 0.25)',
                background: 'rgba(45, 90, 39, 0.02)',
                cursor: 'pointer',
              }
          ),
        }}
        onClick={() => !preview && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onMouseEnter={e => { if (!preview) { e.currentTarget.style.borderColor = '#2d5a27'; e.currentTarget.style.background = 'rgba(45, 90, 39, 0.05)' }}}
        onMouseLeave={e => { if (!preview) { e.currentTarget.style.borderColor = 'rgba(45, 90, 39, 0.25)'; e.currentTarget.style.background = 'rgba(45, 90, 39, 0.02)' }}}
      >
        {preview ? (
          <>
            <img
              src={preview}
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
              src={preview} alt="Vista previa"
              style={{
                position: 'relative', zIndex: 2,
                maxWidth: '85%',
                maxHeight: '85%',
                objectFit: 'contain',
                borderRadius: 12,
                boxShadow: '0 12px 30px rgba(0,0,0,0.5)'
              }}
            />
            {isLoading && <ScanOverlay />}
            <CloseBtn onClick={(e) => { e.stopPropagation(); onLimpiar() }} />

            {!isLoading && (
              <div style={{
                position: 'absolute', bottom: 12, left: 12, zIndex: 10,
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 14px', borderRadius: 99,
                background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)',
                border: '1px solid rgba(45, 90, 39, 0.15)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#52b788', boxShadow: '0 0 8px #52b788' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1b3c1a' }}>Imagen cargada</span>
              </div>
            )}

            {isLoading && (
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
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '0 24px', textAlign: 'center' }}>
            <div
              style={{
                width: 72, height: 72, borderRadius: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 8px 24px rgba(45, 90, 39, 0.08)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 30, height: 30 }} stroke="#2d5a27" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#1b3c1a', margin: 0 }}>Arrastra tu muestra óptica</p>
              <p style={{ fontSize: 13, color: '#6b8e66', marginTop: 4, margin: 0 }}>o explora los archivos locales</p>
            </div>
            <span style={{
              padding: '5px 14px', borderRadius: 99, fontSize: 11,
              fontWeight: 600, color: '#2d5a27',
              background: 'rgba(45, 90, 39, 0.06)', border: '1px solid rgba(45, 90, 39, 0.1)',
            }}>
              JPG · PNG · WEBP · MAX 5MB
            </span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={(e) => onSelect(e.target.files[0])}
      />

      {/* Acciones de Botones */}
      {!preview ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#2d5a27', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: 600, fontSize: 14,
            cursor: 'pointer', boxShadow: '0 8px 20px rgba(45, 90, 39, 0.15)', transition: 'all 0.2s'
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          Seleccionar Imagen
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 12, width: '100%' }}>
          <button
            onClick={() => { onLimpiar(); setTimeout(() => fileInputRef.current?.click(), 50) }}
            style={{
              padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,0,0,0.03)', color: '#2d5a27', border: '1px solid rgba(45, 90, 39, 0.2)', 
              borderRadius: '14px', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Cambiar
          </button>
          <button
            onClick={onClasificar}
            disabled={isLoading}
            style={{
              flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: isLoading ? 'rgba(45, 90, 39, 0.4)' : '#2d5a27', color: '#ffffff', border: 'none', 
              borderRadius: '14px', fontWeight: 600, fontSize: 14, cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: isLoading ? 'none' : '0 8px 20px rgba(45, 90, 39, 0.15)', transition: 'all 0.2s'
            }}
          >
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
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