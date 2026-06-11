// src/features/user/components/EcoBotHeader.jsx

const G = {
  green1:    '#1b3c1a',
  green2:    '#2d5a27',
  green3:    '#52b788',
  textMuted: '#6b8e66',
}

export default function EcoBotHeader({ onLimpiar, hayMensajes }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '18px 24px',
      borderBottom: '1px solid #ddeedd',
      background: 'white',
      borderRadius: '24px 24px 0 0',
      flexShrink: 0,
    }}>
      {/* Avatar con pulse ring */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 13,
          background: `linear-gradient(135deg, ${G.green2} 0%, #3d7a35 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 14px rgba(45,90,39,0.30)`,
        }}>
          <i className="ti ti-leaf" style={{ fontSize: 22, color: 'white' }} />
        </div>
        {/* Badge activo */}
        <div style={{
          position: 'absolute', bottom: -2, right: -2,
          width: 12, height: 12, borderRadius: '50%',
          background: G.green3,
          border: '2px solid white',
          boxShadow: `0 0 0 2px rgba(82,183,136,0.35)`,
          animation: 'pulse-ring 2s ease-in-out infinite',
        }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <h2 style={{
            margin: 0, fontSize: '1.1rem', fontWeight: 800,
            color: G.green1, letterSpacing: '-0.02em', lineHeight: 1.2,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            EcoBot
          </h2>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
            color: G.green3, textTransform: 'uppercase',
            background: 'rgba(82,183,136,0.12)',
            padding: '2px 7px', borderRadius: 20,
          }}>
            Gemini AI
          </span>
        </div>
        <p style={{
          margin: 0, fontSize: 12, color: G.textMuted,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          Asistente oficial de EcoKinal · Siempre activo
        </p>
      </div>

      {/* Info pills + botón limpiar */}
      <div style={{
        display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 10px', borderRadius: 20,
          background: 'rgba(82,183,136,0.10)',
          fontSize: 11, color: G.textMuted, fontWeight: 600,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          <i className="ti ti-recycle" style={{ fontSize: 13, color: G.green3 }} />
          Reciclaje
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 10px', borderRadius: 20,
          background: 'rgba(82,183,136,0.10)',
          fontSize: 11, color: G.textMuted, fontWeight: 600,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          <i className="ti ti-plant" style={{ fontSize: 13, color: G.green3 }} />
          Eco
        </div>

        {/* Botón limpiar — solo visible cuando hay mensajes */}
        {hayMensajes && onLimpiar && (
          <button
            onClick={onLimpiar}
            title="Limpiar conversación"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 20,
              background: 'rgba(220,38,38,0.07)',
              border: '1px solid rgba(220,38,38,0.15)',
              fontSize: 11, color: '#dc2626', fontWeight: 600,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.13)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(220,38,38,0.07)'}
          >
            <i className="ti ti-trash" style={{ fontSize: 13 }} />
            Limpiar
          </button>
        )}
      </div>
    </div>
  )
}
