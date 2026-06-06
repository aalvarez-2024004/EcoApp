const BADGE_CONFIG = {
  'Reciclador Básico':     { icon: 'ti-award',      color: '#8fa88b', bg: 'rgba(143,168,139,0.12)'  },
  'Reciclador Intermedio': { icon: 'ti-medal',       color: '#5b7c56', bg: 'rgba(91,124,86,0.12)' },
  'Experto':               { icon: 'ti-trophy',      color: '#21491e', bg: 'rgba(33,73,30,0.12)'   },
}

export default function BadgeItem({ name }) {
  const cfg = BADGE_CONFIG[name] || { icon: 'ti-star', color: '#21491e', bg: 'rgba(33,73,30,0.12)' }
  return (
    <span className="gam-badge-chip" style={{ '--bc': cfg.color, '--bb': cfg.bg }}>
      <i className={`ti ${cfg.icon}`} /> {name}
    </span>
  )
}