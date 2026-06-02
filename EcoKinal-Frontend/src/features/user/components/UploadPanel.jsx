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
        background: '#fff', border: '0.5px solid rgba(35,55,109,0.15)',
        color: '#23376d', fontSize: 18, lineHeight: 1, cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#FCEBEB'; e.currentTarget.style.color = '#E24B4A' }}
      onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#23376d' }}
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
    <div className="eco-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Zona de drop */}
      <div
        style={{
          position: 'relative', overflow: 'hidden',
          width: '65%',
          aspectRatio: '1 / 1',
          alignSelf: 'center',
          borderRadius: 16,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.25s ease',
          ...(preview
            ? { background: '#0d150f' }
            : {
                border: '2px dashed #23376d',
                background: '#eef1f9',
                cursor: 'pointer',
              }
          ),
        }}
        onClick={() => !preview && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onMouseEnter={e => { if (!preview) { e.currentTarget.style.border = '2px dashed #23376d'; e.currentTarget.style.background = '#eef1f9' }}}
        onMouseLeave={e => { if (!preview) { e.currentTarget.style.border = '2px dashed #23376d'; e.currentTarget.style.background = '#eef1f9' }}}
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
                filter: 'blur(18px) brightness(0.5) saturate(0.7)',
                transform: 'scale(1.1)',
              }}
            />
            <img
              src={preview} alt="Vista previa"
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
            {isLoading && <ScanOverlay />}
            <CloseBtn onClick={(e) => { e.stopPropagation(); onLimpiar() }} />

            {!isLoading && (
              <div style={{
                position: 'absolute', bottom: 12, left: 12, zIndex: 10,
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 14px', borderRadius: 99,
                background: 'rgba(238,241,249,0.95)', border: '0.5px solid #23376d',
              }}>
                <div className="pulse-ring" style={{ width: 8, height: 8, borderRadius: '50%', background: '#23376d', color: '#23376d', position: 'relative' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#23376d' }}>Imagen lista</span>
              </div>
            )}

            {isLoading && (
              <div style={{
                position: 'absolute', top: '50%', left: '50%', zIndex: 20,
                transform: 'translate(-50%,-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '12px 20px', borderRadius: 16,
                background: 'rgba(35,55,109,0.85)',
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#eef1f9' }}>Analizando material…</span>
              </div>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '0 24px', textAlign: 'center' }}>
            <div
              className="animate-float"
              style={{
                width: 80, height: 80, borderRadius: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#fff', border: '0.5px solid rgba(35,55,109,0.15)',
                boxShadow: '0 4px 20px rgba(35,55,109,0.15)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 36, height: 36 }} stroke="#23376d" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#23376d', margin: 0 }}>Arrastra tu imagen aquí</p>
              <p style={{ fontSize: 13, color: '#4b5a8a', marginTop: 6 }}>o haz clic para explorar archivos</p>
            </div>
            <span style={{
              padding: '6px 16px', borderRadius: 99, fontSize: 11,
              fontWeight: 500, color: '#23376d',
              background: '#fff', border: '0.5px solid rgba(35,55,109,0.15)',
            }}>
              JPG · PNG · WEBP · máx 5 MB
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

      {!preview ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="eco-btn-primary"
          style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          Seleccionar imagen
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => { onLimpiar(); setTimeout(() => fileInputRef.current?.click(), 50) }}
            className="eco-btn-secondary"
            style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Cambiar
          </button>
          <button
            onClick={onClasificar}
            disabled={isLoading}
            className="eco-btn-primary"
            style={{
              flex: 1, padding: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              ...(isLoading ? { background: 'rgba(35,55,109,0.3)', cursor: 'not-allowed' } : {}),
            }}
          >
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
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
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