// src/features/user/components/EcoBotMessages.jsx
import { useEffect, useRef } from 'react'
import { useUser } from '../../store/useUserStore'

const G = {
  green1:    '#1b3c1a',
  green2:    '#2d5a27',
  green3:    '#52b788',
  green5:    '#d8eed8',
  border:    '#ddeedd',
  textMuted: '#6b8e66',
}

function ParsedText({ text }) {
  const lines = text.split('\n')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 4 }} />
        const parts = line.split(/(\*\*[^*]+\*\*)/g)
        return (
          <p key={i} style={{ margin: 0, lineHeight: 1.65 }}>
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={j} style={{ fontWeight: 700, color: G.green1 }}>
                    {part.slice(2, -2)}
                  </strong>
                )
              }
              return <span key={j}>{part}</span>
            })}
          </p>
        )
      })}
    </div>
  )
}

function BotBubble({ texto }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', animation: 'slideInLeft 0.25s ease both' }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%',
        background: `linear-gradient(135deg, ${G.green2} 0%, #3d7a35 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginTop: 2,
        boxShadow: '0 2px 8px rgba(45,90,39,0.20)',
      }}>
        <i className="ti ti-leaf" style={{ fontSize: 14, color: 'white' }} />
      </div>
      <div style={{
        background: '#f0f8f0',
        border: `1px solid ${G.border}`,
        borderRadius: '4px 18px 18px 18px',
        padding: '11px 15px',
        maxWidth: '78%',
        fontSize: 13.5,
        color: G.green1,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <ParsedText text={texto} />
      </div>
    </div>
  )
}

function UserBubble({ texto, image, initials }) {
  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'flex-start',
      flexDirection: 'row-reverse',
      animation: 'slideInRight 0.25s ease both',
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%',
        flexShrink: 0, marginTop: 2,
        overflow: 'hidden',
        border: `1.5px solid ${G.border}`,
      }}>
        {image
          ? <img src={image} alt="avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{
              width: '100%', height: '100%',
              background: G.green5,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: G.green2,
            }}>
              {initials?.charAt(0) ?? '?'}
            </div>
        }
      </div>
      <div style={{
        background: G.green2,
        borderRadius: '18px 4px 18px 18px',
        padding: '11px 15px',
        maxWidth: '78%',
        fontSize: 13.5,
        color: 'white',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
      }}>
        {texto}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', animation: 'slideInLeft 0.2s ease both' }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%',
        background: `linear-gradient(135deg, ${G.green2} 0%, #3d7a35 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <i className="ti ti-leaf" style={{ fontSize: 14, color: 'white' }} />
      </div>
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

function WelcomeBubble() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '12px 0 4px' }}>
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: `linear-gradient(135deg, ${G.green2} 0%, #3d7a35 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(45,90,39,0.25)',
      }}>
        <i className="ti ti-robot" style={{ fontSize: 26, color: 'white' }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{
          margin: '0 0 4px', fontSize: 14, fontWeight: 700,
          color: G.green1, fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          ¡Hola! Soy EcoBot 🌿
        </p>
        <p style={{
          margin: 0, fontSize: 12.5, color: G.textMuted,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          lineHeight: 1.5, maxWidth: 300,
        }}>
          Pregúntame cómo clasificar residuos, ideas de upcycling o cualquier duda eco.
        </p>
      </div>
      <div style={{
        width: '100%', height: 1,
        background: 'linear-gradient(90deg, transparent, #ddeedd, transparent)',
        marginTop: 4,
      }} />
    </div>
  )
}

export default function EcoBotMessages({ mensajes, isLoading, error }) {
  const { image, initials } = useUser()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, isLoading])

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      padding: '20px 20px 12px',
      scrollbarWidth: 'thin',
      scrollbarColor: '#ddeedd transparent',
    }}>
      <WelcomeBubble />

      {mensajes.map((m, i) =>
        m.rol === 'user'
          ? <UserBubble key={i} texto={m.texto} image={image} initials={initials} />
          : <BotBubble  key={i} texto={m.texto} />
      )}

      {isLoading && <TypingIndicator />}

      {error && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 14px', borderRadius: 12,
          background: '#fff5f5', border: '1px solid #ffdddd',
          color: '#dc2626', fontSize: 12.5, fontWeight: 600,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          <i className="ti ti-alert-circle" style={{ fontSize: 15 }} />
          {error}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}