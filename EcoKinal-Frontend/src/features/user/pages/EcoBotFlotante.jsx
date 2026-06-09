import { useState, useEffect, useRef } from 'react'
import { useEcoBotStore } from '../store/useEcoBotStore'
import { ecoBotCss } from '../../../Styles/constants/EcoBot.js'

export default function EcoBotFlotante() {
  const [botOpen, setBotOpen] = useState(false)
  const [botInput, setBotInput] = useState('')
  const { mensajes, isLoading, error, enviar, limpiar } = useEcoBotStore()
  const messagesEndRef = useRef(null)

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (botOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [mensajes, isLoading, botOpen])

  const handleSend = async () => {
    const text = botInput.trim()
    if (!text || isLoading) return
    setBotInput('')
    await enviar(text)
  }

  return (
    <>
      <style>{ecoBotCss}</style>
      <div className="ecobot-wrap">
        {botOpen && (
          <div className="ecobot-window">
            <div className="ecobot-header">
              <div className="ecobot-header-left">
                <div className="ecobot-avatar-sm"><i className="ti ti-leaf" /></div>
                <div>
                  <p className="ecobot-header-name">EcoBot</p>
                  <p className="ecobot-header-sub">Asistente ecológico IA</p>
                </div>
              </div>
              <div className="ecobot-header-actions">
                <button className="ecobot-close-btn" onClick={limpiar} title="Limpiar chat">
                  <i className="ti ti-trash" />
                </button>
                <button className="ecobot-close-btn" onClick={() => setBotOpen(false)} title="Cerrar">
                  <i className="ti ti-x" />
                </button>
              </div>
            </div>

            <div className="ecobot-messages">
              {mensajes.length === 0 && (
                <div className="ecobot-msg ecobot-msg--bot">
                  ¡Hola! Soy EcoBot 🌿 ¿En qué puedo ayudarte hoy?
                </div>
              )}
              {mensajes.map((msg, i) => (
                <div key={i} className={`ecobot-msg ecobot-msg--${msg.rol === 'user' ? 'user' : 'bot'}`}>
                  {msg.texto}
                </div>
              ))}
              {isLoading && (
                <div className="ecobot-msg ecobot-msg--bot ecobot-typing">
                  <span /><span /><span />
                </div>
              )}
              {error && (
                <div className="ecobot-msg ecobot-msg--bot" style={{ color: '#dc2626', borderColor: '#fecaca' }}>
                  {error}
                </div>
              )}
              {/* Ancla para auto-scroll */}
              <div ref={messagesEndRef} />
            </div>

            <div className="ecobot-input-row">
              <input
                className="ecobot-input"
                value={botInput}
                onChange={e => setBotInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu pregunta..."
                inputMode="text"
                autoComplete="off"
                autoCorrect="off"
              />
              <button className="ecobot-send-btn" onClick={handleSend} disabled={isLoading}>
                <i className="ti ti-send" />
              </button>
            </div>
          </div>
        )}

        <button className="ecobot-fab" onClick={() => setBotOpen(o => !o)}>
          <i className={botOpen ? 'ti ti-x' : 'ti ti-robot'} />
          {!botOpen && <span>EcoBot</span>}
        </button>
      </div>
    </>
  )
}