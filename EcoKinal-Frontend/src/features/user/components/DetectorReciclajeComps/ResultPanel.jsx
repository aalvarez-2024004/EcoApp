import { BinIcon} from '../../../../icons/DetectorIcons'
import {ConfidenceBar} from '../../../../ui/DetectorReciclaje/ConfidenceBar.jsx'
import { LeafSpinner } from '../../../../ui/DetectorReciclaje/LeafSpinner.jsx'
import { detectarColorSet, CONSEJOS } from '../../../../Styles/constants/detector.styles'

const G = {
  green1:    '#1b3c1a',
  green2:    '#2d5a27',
  green3:    '#52b788',
  green4:    '#74c69d',
  border:    '#ddeedd',
  pageBg:    '#f4f8f3',
  textMuted: '#6b8e66',
  textSub:   '#9db89a',
}

/* ── Estado vacío ── */
function EmptyState() {
  const steps = [
    {
      n: '01', label: 'Sube o captura',
      desc: 'Introduce un registro visual claro del residuo sólido.',
      icon: <i className="ti ti-upload" style={{ fontSize: 16, color: G.green2 }} />,
    },
    {
      n: '02', label: 'Google Vision Core',
      desc: 'Nuestros modelos procesan texturas y contornos vectoriales.',
      icon: <i className="ti ti-cpu" style={{ fontSize: 16, color: G.green2 }} />,
    },
    {
      n: '03', label: 'Segmentación óptima',
      desc: 'Descubre en tiempo real el contenedor ecológico correcto.',
      icon: <i className="ti ti-bell" style={{ fontSize: 16, color: G.green2 }} />,
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div style={{
        paddingBottom: 14, marginBottom: 16,
        borderBottom: `1px solid ${G.border}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <i className="ti ti-scan" style={{ color: G.green2, fontSize: 14 }} />
        </div>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: G.green2, textTransform: 'uppercase', margin: 0 }}>
          Protocolo de escaneo
        </p>
      </div>

      {/* Steps con conector vertical */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
        {steps.map(({ n, label, desc, icon }, idx) => (
          <div key={n} style={{ display: 'flex', gap: 14, position: 'relative', paddingBottom: idx < 2 ? 20 : 0 }}>
            {/* Línea conectora */}
            {idx < 2 && (
              <div style={{
                position: 'absolute', left: 13, top: 28, bottom: 0,
                width: 1, background: `linear-gradient(to bottom, ${G.border}, transparent)`,
              }} />
            )}
            {/* Número */}
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              background: '#e8f5e9', border: `1px solid ${G.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1,
            }}>
              {icon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: G.green3 }}>{n}</span>
                <p style={{ fontSize: 13, fontWeight: 700, color: G.green1, margin: 0 }}>{label}</p>
              </div>
              <p style={{ fontSize: 12, color: G.textMuted, lineHeight: 1.55, margin: 0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 'auto', paddingTop: 14,
        borderTop: `1px solid ${G.border}`,
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: G.green3, boxShadow: `0 0 5px ${G.green3}`, animation: 'pulse-dot 2s infinite' }} />
        <p style={{ fontSize: 11, fontWeight: 600, color: G.textMuted, margin: 0 }}>Redes neuronales activas</p>
      </div>

      <style>{`@keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  )
}

/* ── Estado de carga ── */
function LoadingState() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 20, minHeight: 380, width: '100%',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <LeafSpinner />

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: G.green1, margin: 0 }}>Computando muestra…</p>
        <p style={{ fontSize: 12, color: G.textMuted, marginTop: 4, margin: 0 }}>Extrayendo descriptores de geometría</p>
      </div>

      <div style={{
        width: '100%', display: 'flex', flexDirection: 'column', gap: 12,
        background: '#f0f9f0', padding: '16px', borderRadius: 16,
        border: `1px solid ${G.border}`,
      }}>
        <ConfidenceBar label="Análisis del material"   value={88} color={G.green2} />
        <ConfidenceBar label="Cromatismo superficial"  value={65} color={G.green3} />
        <ConfidenceBar label="Densidad estimada"       value={79} color={G.green4} />
      </div>
    </div>
  )
}

/* ── Resultado final ── */
export default function ResultPanel({ resultado, isLoading, onLimpiar }) {
  if (isLoading) return <LoadingState />
  if (!resultado) return <EmptyState />

  const { set: colorSet, nombre: nombreBin } = detectarColorSet(resultado.contenedor)
  const consejo = CONSEJOS[resultado.tipo]

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 14,
      height: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif",
      animation: 'fadeUp 0.35s ease both',
    }}>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`}</style>

      {/* Tarjeta material detectado */}
      <div style={{
        borderRadius: 18, overflow: 'hidden',
        border: `1px solid ${G.border}`,
        boxShadow: '0 4px 20px rgba(45,90,39,0.06)',
      }}>
        {/* Header dinámico */}
        <div style={{
          padding: '16px 18px',
          background: `linear-gradient(135deg, ${colorSet.hex}12, ${colorSet.hex}28)`,
          borderBottom: `1px solid ${colorSet.hex}30`,
        }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: colorSet.hex, textTransform: 'uppercase', margin: '0 0 10px 0' }}>
            Material identificado
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: colorSet.hex, boxShadow: `0 0 8px ${colorSet.hex}` }} />
                <h2 style={{ fontSize: 20, fontWeight: 800, color: G.green1, margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {resultado.tipo}
                </h2>
              </div>
              <p style={{ fontSize: 12, color: G.textMuted, lineHeight: 1.5, margin: 0 }}>{resultado.descripcion}</p>
            </div>
            <BinIcon color={colorSet.hex} size={58} />
          </div>
        </div>

        {/* Labels detección */}
        {resultado.labels?.length > 0 && (
          <div style={{ padding: '14px 18px', borderBottom: `1px solid rgba(0,0,0,0.04)`, background: '#fff' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: G.textSub, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
              Metadatos de detección
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {resultado.labels.slice(0, 4).map((label, i) => (
                <span key={i} style={{
                  padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600,
                  background: '#f0f9f0', color: G.green2,
                  border: `1px solid ${G.border}`,
                }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Destino */}
        <div style={{ padding: '14px 18px', background: '#fff' }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: G.textSub, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            Ubicación de depósito
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 12,
            background: '#f7fdf7', border: `1px solid ${G.border}`,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, background: colorSet.hex, boxShadow: `0 0 6px ${colorSet.hex}` }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.green1, margin: 0 }}>Contenedor {nombreBin}</p>
              <p style={{ fontSize: 11, color: G.textMuted, margin: 0, marginTop: 1 }}>{resultado.contenedor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consejo */}
      {consejo && (
        <div style={{
          display: 'flex', gap: 10, padding: '12px 14px',
          borderRadius: 14, background: 'rgba(239,159,39,0.06)',
          border: '1px solid rgba(239,159,39,0.22)',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'rgba(239,159,39,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, color: '#bc6c25',
          }}>
            <i className="ti ti-leaf" style={{ fontSize: 14 }} />
          </div>
          <p style={{ fontSize: 12, color: '#7a4419', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{consejo}</p>
        </div>
      )}

      {/* Botón reinicio */}
      <button
        onClick={onLimpiar}
        style={{
          width: '100%', padding: '13px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          background: '#fff', color: G.green2,
          border: `1px solid ${G.border}`,
          borderRadius: 14, fontWeight: 600, fontSize: 13,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          cursor: 'pointer', transition: 'all 0.2s',
          marginTop: 'auto',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#f7fdf7'; e.currentTarget.style.borderColor = G.green3; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = G.border; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        <i className="ti ti-refresh" style={{ fontSize: 15 }} />
        Escanear nueva muestra
      </button>
    </div>
  )
}