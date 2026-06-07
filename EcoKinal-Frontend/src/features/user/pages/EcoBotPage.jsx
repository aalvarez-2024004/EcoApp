import { useEffect, useRef, useState } from 'react'
import { useEcoBotStore } from '../store/useEcoBotStore'

const G = {
  pageBg:    '#f4f8f3',
  cardBg:    '#ffffff',
  green1:    '#1b3c1a',
  green2:    '#2d5a27',
  green3:    '#52b788',
  green5:    '#d8eed8',
  border:    '#ddeedd',
  textMuted: '#6b8e66',
  textSub:   '#9db89a',
}

function BotBubble({ texto }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: G.green2, display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0,
      }}>
        <i className="ti ti-leaf" style={{ fontSize: 15, color: 'white' }} />
      </div>
      <div style={{
        background: '#f0f7f0', border: `1px solid ${G.border}`,
        borderRadius: '16px 16px 16px 4px', padding: '12px 16px',
        maxWidth: '75%', fontSize: 13.5, color: G.green1,
        lineHeight: 1.6, whiteSpace: 'pre-wrap',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {texto}
      </div>
    </div>
  )
}

function UserBubble({ texto }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexDirection: 'row-reverse' }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: G.green5, display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0,
      }}>
        <i className="ti ti-user" style={{ fontSize: 15, color: G.green2 }} />
      </div>
      <div style={{
        background: G.green2, borderRadius: '16px 16px 4px 16px',
        padding: '12px 16px', maxWidth: '75%', fontSize: 13.5,
        color: 'white', lineHeight: 1.6, whiteSpace: 'pre-wrap',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {texto}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: G.green2, display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0,
      }}>
        <i className="ti ti-leaf" style={{ fontSize: 15, color: 'white' }} />
      </div>
      <div style={{
        background: '#f0f7f0', border: `1px solid ${G.border}`,
        borderRadius: '16px 16px 16px 4px', padding: '12px 16px',
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

export default function EcoBotPage() {
  const { mensajes, isLoading, error, enviar, cargarHistorial } = useEcoBotStore()
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => { cargarHistorial() }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, isLoading])

  const handleEnviar = async () => {
    const texto = input.trim()
    if (!texto || isLoading) return
    setInput('')
    await enviar(texto)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEnviar()
    }
  }

  const mensajeInicial = mensajes.length === 0

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" />
      <style>{`
        * { box-sizing: border-box; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ecobot-page {
          width: 100%; max-width: 800px; margin: 0 auto;
          min-height: 100vh; background: ${G.pageBg};
          display: flex; flex-direction: column;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 60px 24px 24px;
          gap: 20px;
        }
        .chat-window {
          flex: 1; background: white;
          border: 1px solid ${G.border};
          border-radius: 24px; padding: 24px;
          display: flex; flex-direction: column;
          gap: 18px; min-height: 420px;
          max-height: 60vh; overflow-y: auto;
          scroll-behavior: smooth;
        }
        .chat-window::-webkit-scrollbar { width: 4px; }
        .chat-window::-webkit-scrollbar-track { background: transparent; }
        .chat-window::-webkit-scrollbar-thumb { background: ${G.border}; border-radius: 4px; }
        .input-bar {
          display: flex; gap: 10px; align-items: flex-end;
          background: white; border: 1px solid ${G.border};
          border-radius: 20px; padding: 10px 10px 10px 18px;
          box-shadow: 0 2px 16px rgba(45,90,39,0.06);
        }
        .input-bar textarea {
          flex: 1; border: none; outline: none; resize: none;
          font-size: 14px; font-family: 'Plus Jakarta Sans', sans-serif;
          background: transparent; color: ${G.green1};
          line-height: 1.5; max-height: 120px;
          padding: 4px 0;
        }
        .input-bar textarea::placeholder { color: ${G.textSub}; }
        .send-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: ${G.green2}; border: none; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .send-btn:hover { background: ${G.green1}; }
        .send-btn:active { transform: scale(0.94); }
        .send-btn:disabled { background: ${G.textSub}; cursor: not-allowed; }
        .chip-grid {
          display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;
        }
        .chip {
          padding: 7px 14px; border-radius: 100px;
          border: 1px solid ${G.border}; background: white;
          font-size: 12.5px; color: ${G.green2}; font-weight: 600;
          cursor: pointer; transition: all 0.18s;
        }
        .chip:hover { background: ${G.green5}; border-color: ${G.green3}; }
      `}</style>

      <div className="ecobot-page">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, animation: 'fadeUp 0.4s ease both' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: G.green2, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 16px rgba(45,90,39,0.25)`,
          }}>
            <i className="ti ti-robot" style={{ fontSize: 24, color: 'white' }} />
          </div>
          <div>
            <h1 style={{
              margin: 0, fontSize: '1.6rem', fontWeight: 800,
              color: G.green1, letterSpacing: '-0.02em', lineHeight: 1.1,
            }}>
              EcoBot
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: G.textMuted, fontWeight: 500 }}>
              Asistente de EcoKinal · Gemini AI
            </p>
          </div>
          <div style={{
            marginLeft: 'auto', display: 'flex', alignItems: 'center',
            gap: 6, fontSize: 11, color: G.textMuted, fontWeight: 600,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: G.green3, boxShadow: `0 0 6px ${G.green3}`,
              animation: 'bounce 2s ease-in-out infinite',
            }} />
            Activo
          </div>
        </div>

        {/* Chat window */}
        <div className="chat-window" style={{ animation: 'fadeUp 0.4s 0.08s ease both' }}>
          {/* Mensaje de bienvenida */}
          <BotBubble texto={"¡Hola! Soy EcoBot, tu asistente de EcoKinal 🌿\nPregúntame cómo clasificar residuos, ideas de upcycling o cualquier duda eco."} />

          {mensajes.map((m, i) =>
            m.rol === 'user'
              ? <UserBubble key={i} texto={m.texto} />
              : <BotBubble   key={i} texto={m.texto} />
          )}

          {isLoading && <TypingIndicator />}

          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 14px', borderRadius: 12,
              background: '#fff5f5', border: '1px solid #ffcccc',
              color: '#dc2626', fontSize: 13, fontWeight: 600,
            }}>
              <i className="ti ti-alert-circle" style={{ fontSize: 16 }} />
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Chips de sugerencias (solo si no hay mensajes) */}
        {mensajeInicial && (
          <div className="chip-grid" style={{ animation: 'fadeUp 0.4s 0.16s ease both' }}>
            {[
              '♻️ ¿Dónde tiro una botella de vidrio?',
              '🥫 ¿Cómo reciclo una lata?',
              '📱 ¿Qué hago con un celular viejo?',
              '🌿 Upcycling con cartón',
            ].map(txt => (
              <button
                key={txt}
                className="chip"
                onClick={() => { setInput(txt); }}
              >
                {txt}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="input-bar" style={{ animation: 'fadeUp 0.4s 0.2s ease both' }}>
          <textarea
            rows={1}
            placeholder="Escribe tu pregunta eco…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={e => {
              e.target.style.height = 'auto'
              e.target.style.height = e.target.scrollHeight + 'px'
            }}
          />
          <button
            className="send-btn"
            onClick={handleEnviar}
            disabled={!input.trim() || isLoading}
            aria-label="Enviar mensaje"
          >
            <i className="ti ti-send" style={{ fontSize: 17, color: 'white' }} />
          </button>
        </div>

        <p style={{ margin: 0, textAlign: 'center', fontSize: 11, color: G.textSub }}>
          EcoBot puede cometer errores. Verifica información importante.
        </p>
      </div>
    </>
  )
}