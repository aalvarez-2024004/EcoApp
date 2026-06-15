import { G } from '../../../../Styles/constants/ImpactoPage.js'
import {
  headerWrapStyle,avatarBoxStyle, avatarBadgeStyle,
  botNameStyle, botBadgeStyle, botSubtitleStyle,
  pillStyle,clearBtnStyle, clearBtnHover,
} from '../../../../Styles/constants/EcoBotHeader.js'

export default function EcoBotHeader({ onLimpiar, hayMensajes }) {
  return (
    <div style={headerWrapStyle}>

      {/* Avatar con pulse ring */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={avatarBoxStyle(G.green2)}>
          <i className="ti ti-leaf" style={{ fontSize: 22, color: 'white' }} />
        </div>
        <div style={avatarBadgeStyle(G.green3)} />
      </div>

      {/* Nombre y subtítulo */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <h2 style={botNameStyle(G.green1)}>EcoBot</h2>
          <span style={botBadgeStyle(G.green3)}>Gemini AI</span>
        </div>
        <p style={botSubtitleStyle(G.textMuted)}>
          Asistente oficial de EcoKinal · Siempre activo
        </p>
      </div>

      {/* Pills + botón limpiar */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
        <div style={pillStyle(G.textMuted)}>
          <i className="ti ti-recycle" style={{ fontSize: 13, color: G.green3 }} />
          Reciclaje
        </div>
        <div style={pillStyle(G.textMuted)}>
          <i className="ti ti-plant" style={{ fontSize: 13, color: G.green3 }} />
          Eco
        </div>

        {hayMensajes && onLimpiar && (
          <button
            onClick={onLimpiar}
            title="Limpiar conversación"
            style={clearBtnStyle}
            onMouseEnter={e => Object.assign(e.currentTarget.style, clearBtnHover.enter)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, clearBtnHover.leave)}
          >
            <i className="ti ti-trash" style={{ fontSize: 13 }} />
            Limpiar
          </button>
        )}
      </div>
    </div>
  )
}