import { fmt } from '../../Styles/constants/ImpactoPage.js'
import { useCountUp } from '../../features/user/pages/ImpactoPage.jsx'
export function StatCard({ icon, label, value, unit, color, delay = 0 }) {
  const animated = useCountUp(value, 1200)
  return (
    <div
      className="imp-stat-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="imp-stat-icon" style={{ background: `${color}18` }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <div className="imp-stat-content">
        <p className="imp-stat-label">{label}</p>
        <div className="imp-stat-value-row">
          <span className="imp-stat-value" style={{ color }}>
            {fmt(animated, value < 1 ? 4 : 2)}
          </span>
          <span className="imp-stat-unit">{unit}</span>
        </div>
      </div>
    </div>
  )
}