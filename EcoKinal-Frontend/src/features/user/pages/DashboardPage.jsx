import { useNavigate } from 'react-router-dom'
import { useUser } from '../store/useUserStore'

const MODULES = [
  {
    to: '/dashboard/usuario/detector',
    icon: 'ti-camera',
    label: 'Detector de reciclaje',
    desc: 'Escanea objetos con IA en tiempo real para clasificarlos correctamente.',
    color: '#0f6e56',
    bg: 'rgba(15, 110, 86, 0.08)',
    tag: 'Popular'
  },
  {
    to: '/dashboard/usuario/foro',
    icon: 'ti-messages',
    label: 'Foro eco',
    desc: 'Comparte tips, publica fotos y debate soluciones con la comunidad verde.',
    color: '#185fa5',
    bg: 'rgba(24, 95, 165, 0.08)',
    tag: 'Comunidad'
  },
  {
    to: '/dashboard/usuario/puntos',
    icon: 'ti-trophy',
    label: 'Gamificación',
    desc: 'Revisa tus eco-puntos acumulados y escala posiciones en el podio.',
    color: '#854f0b',
    bg: 'rgba(133, 79, 11, 0.08)',
    tag: 'Retos'
  },
  {
    to: '/dashboard/usuario/impacto',
    icon: 'ti-chart-bar',
    label: 'Mi impacto',
    desc: 'Estadísticas analíticas detalladas del CO₂ y residuos que has salvado.',
    color: '#3b6d11',
    bg: 'rgba(59, 109, 17, 0.08)',
    tag: null
  },
  {
    to: '/dashboard/usuario/mapa',
    icon: 'ti-map-pin',
    label: 'Mapa reciclaje',
    desc: 'Encuentra los contenedores inteligentes y centros limpios más cercanos.',
    color: '#534ab7',
    bg: 'rgba(83, 74, 183, 0.08)',
    tag: 'Nuevo'
  }
]

export default function DashboardPage() {
  const { name, username } = useUser()
  const navigate = useNavigate()

  return (
    <div className="db-page-container">

      <section className="db-hero-banner">
        {/* Ruido sutil igual que el landing */}
        <div className="db-hero-noise" />

        <div className="db-hero-text">
          <span className="db-hero-badge">
            <i className="ti ti-shield-check" aria-hidden="true" />
            <span>Panel Ecológico Verificado</span>
          </span>
          <h2>¡Bienvenido de vuelta, {name}!</h2>
          <p>
            @{username} · Tu cuenta está activa. Cada residuo procesado mitiga el calentamiento global. Revisa los accesos directos abajo para comenzar.
          </p>
        </div>

        <div className="db-hero-illustration">
          <i className="ti ti-seeding" aria-hidden="true" />
        </div>
      </section>

      <p className="db-section-title">Módulos de sistema disponibles</p>

      <div className="db-modules-grid">
        {MODULES.map(({ to, icon, label, desc, color, bg, tag }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="db-module-card"
            style={{
              '--brand-color': color,
              '--brand-bg': bg
            }}
          >
            {tag && <span className="db-card-badge">{tag}</span>}

            <div className="db-card-icon-box">
              <i className={`ti ${icon}`} aria-hidden="true" />
            </div>

            <h3>{label}</h3>
            <p>{desc}</p>

            <span className="db-card-arrow">
              <i className="ti ti-arrow-up-right" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

    </div>
  )
}