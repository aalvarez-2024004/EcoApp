import { useState } from 'react'
import { G } from '../../../../Styles/constants/ImpactoPage.js'
import {
  CHIPS,chipStyle, chipHover,
  inputWrapStyle,getInputRowStyle,
  textareaStyle,getSendBtnStyle, 
  getSendIconStyle,disclaimerStyle,
} from '../../../../Styles/constants/EcoBotInput.js'

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

  const isActive = !!input.trim() && !isLoading
  const hover = chipHover(G.green5, G.green3, G.border)

  return (
    <div style={inputWrapStyle}>

      {/* Chips — solo si no hay mensajes */}
      {!hayMensajes && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {CHIPS.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => setInput(`${icon} ${label}`)}
              style={chipStyle(G.border, G.green2)}
              onMouseEnter={e => Object.assign(e.currentTarget.style, hover.enter)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, hover.leave)}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div style={getInputRowStyle(input, G.border, G.green3)}>
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
          style={textareaStyle(G.green1)}
        />
        <button
          onClick={handleSend}
          disabled={!isActive}
          aria-label="Enviar"
          style={getSendBtnStyle(isActive, G.green2)}
        >
          <i className="ti ti-send" style={getSendIconStyle(isActive, G.textSub)} />
        </button>
      </div>

      <p style={disclaimerStyle(G.textSub)}>
        EcoBot puede cometer errores · Verifica información importante
      </p>
    </div>
  )
}