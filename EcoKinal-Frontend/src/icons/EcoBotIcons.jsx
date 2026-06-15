import { G } from '../Styles/constants/ImpactoPage.js'
import {styles} from '../Styles/constants/EcoBotMessages.js'

export function BotAvatar({ size = 30, marginTop = 2 }) {
  return (
    <div style={{ ...styles.botAvatar, width: size, height: size, marginTop }}>
      <i className="ti ti-leaf" style={{ fontSize: size * 0.47, color: 'white' }} />
    </div>
  )
}

export function UserAvatar({ image, initials, size = 30 }) {
  return (
    <div style={{ ...styles.userAvatar, width: size, height: size }}>
      {image
        ? (
          <img
            src={image}
            alt="avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: G.green5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: size * 0.37, fontWeight: 700, color: G.green2,
          }}>
            {initials?.charAt(0) ?? '?'}
          </div>
        )
      }
    </div>
  )
}

export function WelcomeAvatar({ size = 72 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: 22,
      background: `linear-gradient(135deg, ${G.green2} 0%, #3d7a35 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 28px rgba(45,90,39,0.28)',
    }}>
      <i className="ti ti-robot" style={{ fontSize: size * 0.47, color: 'white' }} />
    </div>
  )
}

export function AlertIcon({ size = 15 }) {
  return <i className="ti ti-alert-circle" style={{ fontSize: size }} />
}

export function ParsedText({ text }) {
  const lines = text.split('\n')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 4 }} />
        const parts = line.split(/(\*\*[^*]+\*\*)/g)
        return (
          <p key={i} style={{ margin: 0, lineHeight: 1.65 }}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} style={{ fontWeight: 700, color: G.green1 }}>{part.slice(2, -2)}</strong>
                : <span key={j}>{part}</span>
            )}
          </p>
        )
      })}
    </div>
  )
}

export function BotBubble({ texto }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', animation: 'slideInLeft 0.25s ease both' }}>
      <BotAvatar />
      <div style={styles.botBubble}>
        <ParsedText text={texto} />
      </div>
    </div>
  )
}

export function UserBubble({ texto, image, initials }) {
  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'flex-start',
      flexDirection: 'row-reverse',
      animation: 'slideInRight 0.25s ease both',
    }}>
      <UserAvatar image={image} initials={initials} />
      <div style={styles.userBubble}>{texto}</div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', animation: 'slideInLeft 0.2s ease both' }}>
      <BotAvatar />
      <div style={{
        background: '#f0f8f0', border: `1px solid ${G.border}`,
        borderRadius: '4px 18px 18px 18px',
        padding: '14px 18px',
      }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: '50%',
              background: G.green3,
              animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite`,
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const SUGGESTION_CARDS = [
  { icon: '♻️', title: 'Clasificar residuos',  desc: '¿Qué basura va en cada contenedor?' },
  { icon: '🍌', title: 'Residuos orgánicos',   desc: 'Cómo compostar en casa fácilmente' },
  { icon: '📱', title: 'Electrónicos viejos',  desc: '¿Dónde tirar celulares y baterías?' },
  { icon: '🌿', title: 'Ideas de upcycling',   desc: 'Transforma lo que ibas a botar' },
]
export function WelcomeScreen() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', flex: 1,
      padding: '32px 24px', gap: 28,
      animation: 'fadeUp 0.4s ease both',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <WelcomeAvatar />
        <div style={{ textAlign: 'center' }}>
          <p style={{
            margin: '0 0 6px', fontSize: 20, fontWeight: 800,
            color: G.green1, fontFamily: styles.fontFamily,
            letterSpacing: '-0.02em',
          }}>
            ¡Hola! Soy EcoBot 🌿
          </p>
          <p style={{
            margin: 0, fontSize: 13.5, color: G.textMuted,
            fontFamily: styles.fontFamily,
            lineHeight: 1.6, maxWidth: 360, textAlign: 'center',
          }}>
            Tu asistente de reciclaje. Pregúntame sobre clasificación de residuos,
            upcycling o cualquier duda eco.
          </p>
        </div>
      </div>

      <div style={{
        width: '100%', maxWidth: 480, height: 1,
        background: 'linear-gradient(90deg, transparent, #ddeedd, transparent)',
      }} />

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 10, width: '100%', maxWidth: 480,
      }}>
        {SUGGESTION_CARDS.map(({ icon, title, desc }) => (
          <div key={title} style={styles.suggestionCard}>
            <span style={{ fontSize: 22 }}>{icon}</span>
            <p style={{
              margin: 0, fontSize: 12.5, fontWeight: 700,
              color: G.green1, fontFamily: styles.fontFamily,
            }}>{title}</p>
            <p style={{
              margin: 0, fontSize: 11.5, color: G.textMuted,
              fontFamily: styles.fontFamily, lineHeight: 1.45,
            }}>{desc}</p>
          </div>
        ))}
      </div>

      <p style={{
        margin: 0, fontSize: 11.5, color: '#b0c8b0',
        fontFamily: styles.fontFamily, textAlign: 'center',
      }}>
        Escribe tu pregunta abajo para comenzar ↓
      </p>
    </div>
  )
}