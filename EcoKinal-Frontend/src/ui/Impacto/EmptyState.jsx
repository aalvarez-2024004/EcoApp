
export function EmptyState({ onGoDetector }) {
  return (
    <div className="imp-empty">
      <div className="imp-empty-visual">
        <div className="imp-empty-orbit">
          <span className="imp-empty-planet">🌍</span>
          <span className="imp-empty-moon">♻️</span>
        </div>
      </div>
      <h3>¡Aún no tienes registros!</h3>
      <p>Cada vez que uses el Detector de Reciclaje, tu impacto ambiental quedará registrado aquí automáticamente.</p>
      <button className="imp-cta-btn" onClick={onGoDetector}>
        <i className="ti ti-scan" style={{ fontSize: 16 }} /> Ir al Detector de Reciclaje
      </button>
    </div>
  )
}
