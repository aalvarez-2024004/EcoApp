export function OpenChip({ status }) {
  if (status === 'Abierto') return <span className="mapa-chip mapa-chip-open">● Abierto</span>
  if (status === 'Cerrado') return <span className="mapa-chip mapa-chip-closed">● Cerrado</span>
  return <span className="mapa-chip mapa-chip-unknown">Horario N/D</span>
}