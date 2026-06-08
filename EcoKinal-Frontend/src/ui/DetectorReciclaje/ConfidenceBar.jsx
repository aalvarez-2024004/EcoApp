export const ConfidenceBar = ({ label, value, color = '#23376d' }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between" style={{ fontSize: 12 }}>
      <span style={{ color: '#23376d' }}>{label}</span>
      <span style={{ color: '#eb7207', fontWeight: 600 }}>{value}%</span>
    </div>
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#eef1f9' }}>
      <div
        className="h-full rounded-full bar-animated"
        style={{ width: `${value}%`, background: color, transition: 'width 1s ease' }}
      />
    </div>
  </div>
)
