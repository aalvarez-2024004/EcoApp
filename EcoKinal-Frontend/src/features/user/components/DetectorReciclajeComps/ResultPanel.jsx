import { BinIcon, ConfidenceBar, LeafSpinner } from '../../../../icons/DetectorIcons'
import { detectarColorSet, CONSEJOS } from '../../../../Styles/detector.styles'

/* ─────────────────────────────────────────
    Estado Vacío — Cómo funciona (Glass)
───────────────────────────────────────── */
function EmptyState() {
  const steps = [
    {
      n: '01',
      label: 'Sube o captura',
      desc: 'Introduce un registro visual claro del residuo sólido.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="#2d5a27" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
      ),
    },
    {
      n: '02',
      label: 'Google Vision Core',
      desc: 'Nuestros modelos procesan texturas y contornos vectoriales.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="#2d5a27" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        </svg>
      ),
    },
    {
      n: '03',
      label: 'Segmentación Óptima',
      desc: 'Descubre en tiempo real el contenedor ecológico correcto.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="#2d5a27" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header interno */}
      <div style={{
        paddingBottom: '1rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(45, 90, 39, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="ti ti-info-circle" style={{ color: '#2d5a27', fontSize: 14 }} />
        </div>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#2d5a27', textTransform: 'uppercase', margin: 0 }}>
          Protocolo de Escaneo
        </p>
      </div>

      {/* Pasos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1.25rem 0' }}>
        {steps.map(({ n, label, desc, icon }) => (
          <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '10px 0' }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12, flexShrink: 0,
              background: '#ffffff', border: '1px solid rgba(45, 90, 39, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
            }}>
              {icon}
            </div>
            <div style={{ paddingTop: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#52b788' }}>{n}</span>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1b3c1a', margin: 0 }}>{label}</p>
              </div>
              <p style={{ fontSize: 12, color: '#555555', lineHeight: 1.5, margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 'auto', paddingTop: '1rem',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <i className="ti ti-shield-check" style={{ color: '#52b788', fontSize: 16 }} />
        <p style={{ fontSize: 11, fontWeight: 600, color: '#6b8e66', margin: 0 }}>Módulo de Redes Neuronales Activo</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
    Estado de Carga (Analítico)
───────────────────────────────────────── */
function LoadingState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', minHeight: 360, width: '100%' }}>
      <LeafSpinner />

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#1b3c1a', margin: 0 }}>Computando Muestra…</p>
        <p style={{ fontSize: 12, color: '#6b8e66', marginTop: 4, margin: 0 }}>Extrayendo descriptores de geometría</p>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, background: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '16px' }}>
        <ConfidenceBar label="Análisis del material" value={88} color="#2d5a27" />
        <ConfidenceBar label="Cromatismo superficial" value={65} color="#52b788" />
        <ConfidenceBar label="Densidad estimada" value={79} color="#74c69d" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
    Resultado Final Completado
───────────────────────────────────────── */
export default function ResultPanel({ resultado, isLoading, onLimpiar }) {
  if (isLoading) return <LoadingState />
  if (!resultado) return <EmptyState />

  const { set: colorSet, nombre: nombreBin } = detectarColorSet(resultado.contenedor)
  const consejo = CONSEJOS[resultado.tipo]

  return (
    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}>

      {/* Tarjeta de Material Detectado */}
      <div style={{
        borderRadius: 20, overflow: 'hidden', 
        background: `linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))`,
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)'
      }}>
        {/* Header Dinámico según Contenedor */}
        <div style={{
          padding: '1.25rem',
          background: `linear-gradient(135deg, ${colorSet.hex}10, ${colorSet.hex}22)`,
          borderBottom: `1px solid ${colorSet.hex}30`,
        }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: colorSet.hex, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            Material Identificado
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: colorSet.hex, boxShadow: `0 0 10px ${colorSet.hex}` }} />
                <h2 className="eco-font" style={{ fontSize: 22, fontWeight: 800, color: '#1b3c1a', margin: 0 }}>
                  {resultado.tipo}
                </h2>
              </div>
              <p style={{ fontSize: 12, color: '#4a4a4a', lineHeight: 1.5, margin: 0 }}>{resultado.descripcion}</p>
            </div>
            <BinIcon color={colorSet.hex} size={64} />
          </div>
        </div>

        {/* Labels del modelo de visión */}
        {resultado.labels?.length > 0 && (
          <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: '#6b8e66', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
              Metadatos de Detección
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {resultado.labels.slice(0, 4).map((label, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 10px', borderRadius: '8px', fontSize: 11, fontWeight: 600,
                    background: 'rgba(255, 255, 255, 0.6)',
                    color: '#2d5a27',
                    border: '1px solid rgba(45, 90, 39, 0.1)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Destino de Celda */}
        <div style={{ padding: '1.25rem' }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: '#6b8e66', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            Ubicación de Depósito
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 14px', borderRadius: 14,
            background: '#ffffff', border: '1px solid rgba(0,0,0,0.03)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', flexShrink: 0, background: colorSet.hex, boxShadow: `0 0 8px ${colorSet.hex}` }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1b3c1a', margin: 0 }}>Contenedor {nombreBin}</p>
              <p style={{ fontSize: 11, color: '#6b8e66', margin: 0, marginTop: 2 }}>{resultado.contenedor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consejos Verdes Integrados */}
      {consejo && (
        <div style={{
          display: 'flex', gap: 12, padding: '1rem 1.25rem',
          borderRadius: 16, background: 'rgba(239, 159, 39, 0.06)', border: '1px solid rgba(239, 159, 39, 0.2)',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, background: 'rgba(239, 159, 39, 0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, color: '#bc6c25'
          }}>
            <i className="ti ti-leaf" style={{ fontSize: 15 }} />
          </div>
          <p style={{ fontSize: 12, color: '#7a4419', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{consejo}</p>
        </div>
      )}

      {/* Botón de reinicio */}
      <button 
        onClick={onLimpiar} 
        style={{
          width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: 'rgba(0,0,0,0.02)', color: '#2d5a27', border: '1px solid rgba(45, 90, 39, 0.25)', 
          borderRadius: '14px', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
          marginTop: 'auto'
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Escanear Nueva Muestra
      </button>
    </div>
  )
}