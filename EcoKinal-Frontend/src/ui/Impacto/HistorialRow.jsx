import {fmt, fmtDate, TIPO_META} from '../../Styles/constants/ImpactoPage.js'

export function HistorialRow({ item, index }) {
  const meta = TIPO_META[item.tipo] || { color: '#888', bg: 'rgba(128,128,128,.1)', icon: '📦', label: item.tipo }
  return (
    <div className="imp-hist-row" style={{ animationDelay: `${index * 60}ms` }}>
      <span className="imp-hist-icon" style={{ background: meta.bg, color: meta.color }}>{meta.icon}</span>
      <div className="imp-hist-info">
        <span className="imp-hist-tipo" style={{ color: meta.color }}>{item.tipo}</span>
        <span className="imp-hist-fecha">{fmtDate(item.fecha)}</span>
      </div>
      <div className="imp-hist-nums">
        <span>🌱 {fmt(item.co2NoEmitidoKg)} kg CO₂</span>
        <span>⚡ {fmt(item.energiaAhorradaKWh)} kWh</span>
      </div>
    </div>
  )
}

