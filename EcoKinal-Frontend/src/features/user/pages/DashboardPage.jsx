import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../store/useUserStore'
import { dashboardCss, dashboardImg } from '../../../Styles/constants/DashboardPage.js'
import { ecoBotCss } from '../../../Styles/constants/EcoBot.js'
const MODULES = [
  {
    href: '/dashboard/usuario/detector',
    icon: 'ti ti-camera',
    name: 'Detector de reciclaje',
    desc: 'Escanea objetos con IA en tiempo real para clasificarlos correctamente.',
    badge: 'Popular',
    iconClass: 'icon-green',
    badgeClass: 'badge-popular',
  },
  {
    href: '/dashboard/usuario/foro',
    icon: 'ti ti-messages',
    name: 'Foro eco',
    desc: 'Comparte tips, publica fotos y debate soluciones con la comunidad verde.',
    badge: 'Comunidad',
    iconClass: 'icon-teal',
    badgeClass: 'badge-comunidad',
  },
  {
    href: '/dashboard/usuario/puntos',
    icon: 'ti ti-trophy',
    name: 'Gamificación',
    desc: 'Revisa tus eco-puntos acumulados y escala posiciones en el podio.',
    badge: 'Retos',
    iconClass: 'icon-amber',
    badgeClass: 'badge-retos',
  },
  {
    href: '/dashboard/usuario/impacto',
    icon: 'ti ti-chart-bar',
    name: 'Mi impacto',
    desc: 'Estadísticas analíticas detalladas del CO₂ y residuos que has salvado.',
    badge: null,
    iconClass: 'icon-blue',
    badgeClass: null,
  },
  {
    href: '/dashboard/usuario/mapa',
    icon: 'ti ti-map-pin',
    name: 'Mapa reciclaje',
    desc: 'Encuentra los contenedores inteligentes y centros limpios más cercanos.',
    badge: 'Nuevo',
    iconClass: 'icon-purple',
    badgeClass: 'badge-nuevo',
  },
]

export default function DashboardPage() {
  const { name, username } = useUser()
  const navigate = useNavigate()
  const [botOpen, setBotOpen] = useState(false)
  const [botInput, setBotInput] = useState('')
  const [botMessages, setBotMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy EcoBot 🌿 ¿En qué puedo ayudarte hoy?' }
  ])
  const [botLoading, setBotLoading] = useState(false)

  const sendBotMessage = async () => {
    const text = botInput.trim()
    if (!text || botLoading) return
    setBotMessages(prev => [...prev, { from: 'user', text }])
    setBotInput('')
    setBotLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: 'Eres EcoBot, un asistente ecológico amigable de la plataforma EcoKinal. Ayudas a los usuarios con preguntas sobre reciclaje, sostenibilidad y el uso de la plataforma. Responde siempre en español, de forma concisa y amigable.',
          messages: [{ role: 'user', content: text }],
        }),
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || 'No pude procesar tu pregunta, intenta de nuevo.'
      setBotMessages(prev => [...prev, { from: 'bot', text: reply }])
    } catch {
      setBotMessages(prev => [...prev, { from: 'bot', text: 'Ocurrió un error. Intenta de nuevo.' }])
    } finally {
      setBotLoading(false)
    }
  }

  return (
    <>
      <style>{dashboardCss}</style>
      <style>{ecoBotCss}</style>

      <div className="db-page-container">

        {/* ── Hero pantalla completa ── */}
        <section
          className="db-hero-banner"
          style={{ backgroundImage: `url(${dashboardImg})` }}
        >
          <div className="db-hero-text">
            <span className="db-hero-badge">
              <i className="ti ti-shield-check" />
              <span>Panel Ecológico Verificado</span>
            </span>
            <h2>¡Bienvenido de vuelta, {name}!</h2>
            <p>@{username} · Tu cuenta está activa. Cada residuo procesado mitiga el calentamiento global</p>
          </div>
          <div className="db-hero-illustration">
            <i className="ti ti-seeding" />
          </div>
        </section>

        {/* ── Módulos ── */}
        <div className="db-content">
          <p className="db-section-title">Módulos de sistema</p>
          <div className="db-modules-grid">
            {MODULES.map((mod) => (
              <button
                key={mod.href}
                onClick={() => navigate(mod.href)}
                className="db-module-card"
              >
                <div className="dp-card-top">
                  <div className={`dp-icon-wrap ${mod.iconClass}`}>
                    <i className={mod.icon} aria-hidden="true" />
                  </div>
                  {mod.badge && (
                    <span className={`dp-badge ${mod.badgeClass}`}>{mod.badge}</span>
                  )}
                </div>
                <div>
                  <p className="dp-card-name">{mod.name}</p>
                  <p className="dp-card-desc">{mod.desc}</p>
                </div>
                <div className="dp-arrow">
                  <i className="ti ti-arrow-right" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ── EcoBot flotante ── */}
      <div className="ecobot-wrap">

        {/* Ventana del chat */}
        {botOpen && (
          <div className="ecobot-window">
            <div className="ecobot-header">
              <div className="ecobot-header-left">
                <div className="ecobot-avatar-sm">
                  <i className="ti ti-leaf" />
                </div>
                <div>
                  <p className="ecobot-header-name">EcoBot</p>
                  <p className="ecobot-header-sub">Asistente ecológico IA</p>
                </div>
              </div>
              <button className="ecobot-close-btn" onClick={() => setBotOpen(false)}>
                <i className="ti ti-x" />
              </button>
            </div>

            <div className="ecobot-messages">
              {botMessages.map((msg, i) => (
                <div key={i} className={`ecobot-msg ecobot-msg--${msg.from}`}>
                  {msg.text}
                </div>
              ))}
              {botLoading && (
                <div className="ecobot-msg ecobot-msg--bot ecobot-typing">
                  <span /><span /><span />
                </div>
              )}
            </div>

            <div className="ecobot-input-row">
              <input
                className="ecobot-input"
                value={botInput}
                onChange={e => setBotInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendBotMessage()}
                placeholder="Escribe tu pregunta..."
              />
              <button
                className="ecobot-send-btn"
                onClick={sendBotMessage}
                disabled={botLoading}
              >
                <i className="ti ti-send" />
              </button>
            </div>
          </div>
        )}

        {/* Botón flotante */}
        <button className="ecobot-fab" onClick={() => setBotOpen(o => !o)}>
          <i className={botOpen ? 'ti ti-x' : 'ti ti-robot'} />
          {!botOpen && <span>EcoBot</span>}
        </button>

      </div>
    </>
  )
}