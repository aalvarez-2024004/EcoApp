// src/features/user/components/EcoBotInput.jsx
import { useState } from 'react'

const G = {
  green1:    '#1b3c1a',
  green2:    '#2d5a27',
  green3:    '#52b788',
  green5:    '#d8eed8',
  border:    '#ddeedd',
  textSub:   '#9db89a',
}

const CHIPS = [
  { icon: '♻️', label: '¿Botella de vidrio?' },
  { icon: '🥫', label: '¿Cómo reciclo una lata?' },
  { icon: '📱', label: '¿Celular viejo?' },
  { icon: '🌿', label: 'Upcycling con cartón' },
  { icon: '🍌', label: 'Residuos orgánicos' },
]

export default function EcoBotInput({ onEnviar, isLoading, hayMensajes }) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    const texto = input.trim()
    if (!texto || isLoading) return
    setInput('')
    onEnviar(texto)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChip = (txt) => {
    setInput(txt)
  }

  return (
    <div style={{
      borderTop: '1px solid #ddeedd',
      background: 'white',
      borderRadius: '0 0 24px 24px',
      padding: '14px 20px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flexShrink: 0,
    }}>
      {/* Chips — solo si no hay mensajes o input vacío */}
      {!hayMensajes && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {CHIPS.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => handleChip(`${icon} ${label}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 12px', borderRadius: 100,
                border: `1px solid ${G.border}`,
                background: 'white',
                fontSize: 12, color: G.green2, fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = G.green5
                e.currentTarget.style.borderColor = G.green3
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.borderColor = G.border
              }}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div style={{
        display: 'flex', gap: 8, alignItems: 'flex-end',
        background: '#f4f8f3',
        border: `1.5px solid ${input.trim() ? G.green3 : G.border}`,
        borderRadius: 16,
        padding: '8px 8px 8px 14px',
        transition: 'border-color 0.2s',
      }}>
        <textarea
          rows={1}
          placeholder="Escribe tu pregunta eco…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={e => {
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
          }}
          style={{
            flex: 1, border: 'none', outline: 'none', resize: 'none',
            fontSize: 13.5,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            background: 'transparent',
            color: G.green1, lineHeight: 1.5,
            padding: '3px 0',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          aria-label="Enviar"
          style={{
            width: 36, height: 36, borderRadius: 11,
            background: input.trim() && !isLoading
              ? `linear-gradient(135deg, ${G.green2} 0%, #3d7a35 100%)`
              : '#d8eed8',
            border: 'none', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            boxShadow: input.trim() && !isLoading ? '0 2px 8px rgba(45,90,39,0.25)' : 'none',
          }}
        >
          <i className="ti ti-send"
            style={{ fontSize: 15, color: input.trim() && !isLoading ? 'white' : G.textSub }} />
        </button>
      </div>

      <p style={{
        margin: 0, textAlign: 'center',
        fontSize: 10.5, color: G.textSub,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        EcoBot puede cometer errores · Verifica información importante
      </p>
    </div>
  )
}
