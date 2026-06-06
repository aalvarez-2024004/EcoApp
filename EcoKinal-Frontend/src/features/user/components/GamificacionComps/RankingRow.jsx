export default function RankingRow({ entry, index, currentUserId }) {
  const medals  = ['🥇', '🥈', '🥉']
  const isMe    = entry.userId === currentUserId
  const display = entry.username ? `@${entry.username}` : (entry.name || `Usuario ${index + 1}`)
  return (
    <div className={`gam-rank-row ${index < 3 ? 'top' : ''} ${isMe ? 'me' : ''}`}>
      <span className="gam-rank-pos">{medals[index] ?? index + 1}</span>
      <div className="gam-rank-info">
        <span className="gam-rank-name">{entry.name || 'Usuario'}</span>
        <span className="gam-rank-user">{display}</span>
      </div>
      <span className="gam-rank-pts">{entry.points} pts</span>
      <span className="gam-rank-rc">{entry.recyclingCount} ♻️</span>
      {isMe && <span className="gam-rank-you">Tú</span>}
    </div>
  )
}