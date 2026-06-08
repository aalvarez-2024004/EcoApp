import { useNavigate } from 'react-router-dom'
import { useUser } from '../store/useUserStore'
import { dashboardCss } from '../../../Styles/constants/DashboardPage.js'

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

  return (
    <>
      <style>{dashboardCss}</style>

      <div className="db-page-container">
        <i className="ti ti-leaf leaf-bg leaf-bg--top" />
        <i className="ti ti-leaf leaf-bg leaf-bg--bottom" />

        <section className="db-hero-banner">
          <div className="db-hero-text">
            <span className="db-hero-badge">
              <i className="ti ti-shield-check" />
              <span>Panel Ecológico Verificado</span>
            </span>
            <h2>¡Bienvenido de vuelta, {name}!</h2>
            <p>@{username} · Tu cuenta está activa. Cada residuo procesado mitiga el calentamiento global.</p>
          </div>
          <div className="db-hero-illustration">
            <i className="ti ti-seeding" />
          </div>
        </section>

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
    </>
  )
}