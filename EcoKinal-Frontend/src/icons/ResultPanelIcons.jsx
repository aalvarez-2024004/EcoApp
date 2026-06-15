import { G } from '../Styles/constants/ImpactoPage.js'
import { ConfidenceBar } from '../ui/DetectorReciclaje/ConfidenceBar.jsx'
import { LeafSpinner } from '../ui/DetectorReciclaje/LeafSpinner.jsx'
import {
  emptyHeaderStyle, emptyHeaderIconWrapStyle, emptyHeaderLabelStyle,
  emptyStepNumberStyle, emptyStepConnectorStyle,
  emptyStepBadgeStyle, emptyStepTitleStyle, emptyStepDescStyle,
  emptyFooterStyle, emptyFooterDotStyle, emptyFooterTextStyle,
  loadingWrapStyle, loadingTitleStyle, loadingSubStyle, loadingBarsWrapStyle,
} from '../Styles/constants/ResultPanel.js'

const STEPS = [
  { n: '01', label: 'Sube o captura',      desc: 'Introduce un registro visual claro del residuo sólido.',      icon: <i className="ti ti-upload" style={{ fontSize: 16, color: G.green2 }} /> },
  { n: '02', label: 'Google Vision Core',  desc: 'Nuestros modelos procesan texturas y contornos vectoriales.', icon: <i className="ti ti-cpu"    style={{ fontSize: 16, color: G.green2 }} /> },
  { n: '03', label: 'Segmentación óptima', desc: 'Descubre en tiempo real el contenedor ecológico correcto.',   icon: <i className="ti ti-bell"   style={{ fontSize: 16, color: G.green2 }} /> },
]

export function EmptyState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Header */}
      <div style={emptyHeaderStyle(G.border)}>
        <div style={emptyHeaderIconWrapStyle}>
          <i className="ti ti-scan" style={{ color: G.green2, fontSize: 14 }} />
        </div>
        <p style={emptyHeaderLabelStyle(G.green2)}>Protocolo de escaneo</p>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
        {STEPS.map(({ n, label, desc, icon }, idx) => (
          <div key={n} style={{ display: 'flex', gap: 14, position: 'relative', paddingBottom: idx < 2 ? 20 : 0 }}>
            {idx < 2 && <div style={emptyStepConnectorStyle(G.border)} />}
            <div style={emptyStepNumberStyle(G.border)}>{icon}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={emptyStepBadgeStyle(G.green3)}>{n}</span>
                <p style={emptyStepTitleStyle(G.green1)}>{label}</p>
              </div>
              <p style={emptyStepDescStyle(G.textMuted)}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={emptyFooterStyle(G.border)}>
        <div style={emptyFooterDotStyle(G.green3)} />
        <p style={emptyFooterTextStyle(G.textMuted)}>Redes neuronales activas</p>
      </div>

      <style>{`@keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  )
}

export function LoadingState() {
  return (
    <div style={loadingWrapStyle}>
      <LeafSpinner />
      <div style={{ textAlign: 'center' }}>
        <p style={loadingTitleStyle(G.green1)}>Computando muestra…</p>
        <p style={loadingSubStyle(G.textMuted)}>Extrayendo descriptores de geometría</p>
      </div>
      <div style={loadingBarsWrapStyle(G.border)}>
        <ConfidenceBar label="Análisis del material"  value={88} color={G.green2} />
        <ConfidenceBar label="Cromatismo superficial" value={65} color={G.green3} />
        <ConfidenceBar label="Densidad estimada"      value={79} color={G.green4} />
      </div>
    </div>
  )
}