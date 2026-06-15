import { G } from '../Styles/constants/ImpactoPage.js'
import { closeBtnHover } from '../Styles/constants/UploadPanel.js'

export function LeafIllustration() {
  return (
    <svg viewBox="0 0 80 80" style={{ width: 64, height: 64 }} fill="none">
      <circle cx="40" cy="40" r="36" fill="#e8f5e9" />
      <path d="M40 58 Q28 44 28 32 Q34 20 40 18 Q46 20 52 32 Q52 44 40 58Z" fill={G.green3} opacity="0.7" />
      <path d="M40 58 Q32 46 30 34 Q36 24 40 22 Q44 24 50 34 Q48 46 40 58Z" fill={G.green2} opacity="0.5" />
      <line x1="40" y1="58" x2="40" y2="24" stroke={G.green1} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="38" x2="34" y2="32" stroke={G.green1} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="40" y1="44" x2="46" y2="38" stroke={G.green1} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export function CloseBtn({ style, hoverEnter, hoverLeave, onClick }) {
  return (
    <button
      onClick={onClick}
      style={style}
      onMouseEnter={e => Object.assign(e.currentTarget.style, hoverEnter)}
      onMouseLeave={e => Object.assign(e.currentTarget.style, hoverLeave)}
    >
      ×
    </button>
  )
}