import { BinIcon, ConfidenceBar, LeafSpinner } from '../../../icons/DetectorIcons'
import { detectarColorSet, CONSEJOS } from '../../../Styles/detector.styles'

/* ─────────────────────────────────────────
   Estado vacío — panel "Cómo funciona"
───────────────────────────────────────── */
function EmptyState() {
  const steps = [
    {
      n: '01',
      label: 'Sube o captura',
      desc: 'Una foto clara del residuo que quieres clasificar.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }} stroke="#3B6D11" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
      ),
    },
    {
      n: '02',
      label: 'Google Vision lo analiza',
      desc: 'La IA identifica el tipo de material automáticamente.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }} stroke="#3B6D11" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        </svg>
      ),
    },
    {
      n: '03',
      label: 'Descubre el contenedor',
      desc: 'Sabrás exactamente en qué basurero depositarlo.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }} stroke="#3B6D11" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      ),
    },
  ]

  return (
    <div className="eco-card" style={{ overflow: 'hidden' }}>

      {/* Header de la tarjeta */}
      <div style={{
        padding: '1rem 1.25rem',
        borderBottom: '0.5px solid #C0DD97',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 24, height: 24, borderRadius: 8, background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" style={{ width: 13, height: 13 }} stroke="#3B6D11" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
          </svg>
        </div>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#97C459', textTransform: 'uppercase', margin: 0 }}>
          Cómo funciona
        </p>
      </div>

      {/* Pasos */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map(({ n, label, desc, icon }, i) => (
          <div
            key={n}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 16,
              padding: '1.25rem',
              borderBottom: i < steps.length - 1 ? '0.5px solid #C0DD97' : 'none',
            }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 12, flexShrink: 0,
              background: '#EAF3DE', border: '0.5px solid #C0DD97',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {icon}
            </div>
            <div style={{ paddingTop: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#97C459' }}>{n}</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#27500A', margin: 0 }}>{label}</p>
              </div>
              <p style={{ fontSize: 12, color: '#639922', lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '1rem 1.25rem',
        borderTop: '0.5px solid #C0DD97',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }} stroke="#3B6D11" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>
        <p style={{ fontSize: 11, color: '#97C459', margin: 0 }}>Tecnología Google Vision · IA</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Estado de carga
───────────────────────────────────────── */
function LoadingState() {
  return (
    <div className="eco-card" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', minHeight: 380 }}>
      <LeafSpinner />

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#27500A', margin: 0 }}>Identificando material…</p>
        <p style={{ fontSize: 12, color: '#639922', marginTop: 4 }}>Google Vision está analizando tu imagen</p>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ConfidenceBar label="Análisis de textura"       value={72} color="#639922" />
        <ConfidenceBar label="Reconocimiento de forma"   value={58} color="#3B6D11" />
        <ConfidenceBar label="Clasificación de material" value={89} color="#97C459" />
      </div>

      <div style={{ width: '100%', height: 4, borderRadius: 99, overflow: 'hidden', background: '#EAF3DE' }}>
        <div className="shimmer-bar" style={{ height: '100%', borderRadius: 99 }} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Resultado
───────────────────────────────────────── */
export default function ResultPanel({ resultado, isLoading, onLimpiar }) {
  if (isLoading) return <LoadingState />
  if (!resultado) return <EmptyState />

  const { set: colorSet, nombre: nombreBin } = detectarColorSet(resultado.contenedor)
  const consejo = CONSEJOS[resultado.tipo]

  return (
    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Tarjeta principal */}
      <div className="eco-card" style={{ overflow: 'hidden' }}>

        {/* Header coloreado */}
        <div style={{
          padding: '1.25rem',
          background: `linear-gradient(135deg, ${colorSet.hex}18, ${colorSet.hex}30)`,
          borderBottom: `0.5px solid ${colorSet.hex}40`,
        }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: colorSet.hex, textTransform: 'uppercase', margin: '0 0 12px 0' }}>
            Material identificado
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div className="pulse-ring" style={{ width: 10, height: 10, borderRadius: '50%', background: colorSet.hex, color: colorSet.hex, position: 'relative' }} />
                <h2 className="eco-font" style={{ fontSize: 22, fontWeight: 700, color: colorSet.hex, margin: 0 }}>
                  {resultado.tipo}
                </h2>
              </div>
              <p style={{ fontSize: 12, color: '#444', lineHeight: 1.6, maxWidth: 180, margin: 0 }}>{resultado.descripcion}</p>
            </div>
            <BinIcon color={colorSet.hex} size={72} />
          </div>
        </div>

        {/* Labels detectados */}
        {resultado.labels?.length > 0 && (
          <div style={{ padding: '1rem 1.25rem', borderBottom: '0.5px solid #C0DD97' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#97C459', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
              Labels detectados
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {resultado.labels.slice(0, 5).map((label, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 10px', borderRadius: 99, fontSize: 11,
                    background: i < 2 ? '#EAF3DE' : '#F1EFE8',
                    color: i < 2 ? '#27500A' : '#888780',
                    border: `0.5px solid ${i < 2 ? '#C0DD97' : '#D3D1C7'}`,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contenedor destino */}
        <div style={{ padding: '1rem 1.25rem' }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#97C459', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
            ¿Dónde depositarlo?
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 14px', borderRadius: 12,
            background: '#EAF3DE', border: '0.5px solid #C0DD97',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', flexShrink: 0, background: colorSet.hex }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#27500A', margin: 0 }}>Contenedor {nombreBin}</p>
              <p style={{ fontSize: 11, color: '#639922', marginTop: 2 }}>{resultado.contenedor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consejo */}
      {consejo && (
        <div style={{
          display: 'flex', gap: 12, padding: '1rem',
          borderRadius: 16, background: '#FAEEDA', border: '0.5px solid #EF9F27',
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8, background: '#FAC775',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 2,
          }}>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 15, height: 15 }} stroke="#633806" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </div>
          <p style={{ fontSize: 12, color: '#633806', lineHeight: 1.75, margin: 0 }}>{consejo}</p>
        </div>
      )}

      {/* Reset */}
      <button onClick={onLimpiar} className="eco-btn-secondary" style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Clasificar otro objeto
      </button>
    </div>
  )
}