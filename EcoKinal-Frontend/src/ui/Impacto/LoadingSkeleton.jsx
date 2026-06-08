export function LoadingSkeleton() {
  return (
    <div className="imp-skeleton-grid">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="imp-skel-card">
          <div className="imp-skel-icon" />
          <div className="imp-skel-lines">
            <div className="imp-skel-line short" />
            <div className="imp-skel-line long" />
          </div>
        </div>
      ))}
    </div>
  )
}