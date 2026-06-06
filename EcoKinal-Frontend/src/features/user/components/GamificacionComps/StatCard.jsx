export default function StatCard({ icon, value, label, color = '#21491e' }) {
  return (
    <div className="gam-stat-card" style={{ '--c': color }}>
      <div className="gam-stat-icon">
        <i className={`ti ${icon}`} />
      </div>
      <p className="gam-stat-value">{value}</p>
      <p className="gam-stat-label">{label}</p>
    </div>
  )
}