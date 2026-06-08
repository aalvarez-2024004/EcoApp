export const TabBtn = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`tab-btn ${active ? 'active' : ''}`}
    >
      {children}
    </button>
  )
}