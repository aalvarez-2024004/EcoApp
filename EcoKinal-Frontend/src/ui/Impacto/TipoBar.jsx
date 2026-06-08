import { TIPO_META, fmt } from '../../Styles/constants/ImpactoPage.js'
import{ useCountUp } from '../../features/user/pages/ImpactoPage.jsx'

export function TipoBar({ tipo, data, total }) {
  const meta = TIPO_META[tipo] || { color: '#888', bg: 'rgba(128,128,128,.1)', icon: '📦', label: tipo }
  const pct = total > 0 ? Math.round((data.cantidad / total) * 100) : 0
  return (
    <div className="imp-tipo-row">
      <div className="imp-tipo-header">
        <span className="imp-tipo-icon" style={{ background: meta.bg }}>{meta.icon}</span>
        <span className="imp-tipo-label">{meta.label}</span>
        <span className="imp-tipo-count">{data.cantidad} scan{data.cantidad !== 1 ? 's' : ''}</span>
        <span className="imp-tipo-pct" style={{ color: meta.color }}>{pct}%</span>
      </div>
      <div className="imp-tipo-track">
        <div
          className="imp-tipo-fill"
          style={{ '--bar-color': meta.color, '--bar-pct': `${pct}%` }}
        />
      </div>
      <div className="imp-tipo-stats">
        <span>🌱 {fmt(data.co2NoEmitidoKg)} kg CO₂</span>
        <span>⚡ {fmt(data.energiaAhorradaKWh)} kWh</span>
        <span>🌳 {fmt(data.arbolesEquivalentes, 4)} árboles</span>
      </div>
    </div>
  )
}