import { NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../store/useUserStore'
import useAuthStore from '../../auth/store/useAuthStore'
import Avatar from './Avatar'

// Estructura de navegación segmentada y limpia
const NAVIGATION_SECTIONS = [
  {
    title: 'PRINCIPAL',
    links: [
      { to: '/dashboard/usuario', icon: 'ti-home', label: 'Inicio', end: true }
    ]
  },
  {
    title: 'MÓDULOS',
    links: [
      { to: '/dashboard/usuario/detector', icon: 'ti-camera',    label: 'Detector de reciclaje' },
      { to: '/dashboard/usuario/foro',     icon: 'ti-messages',  label: 'Foro eco' },
      { to: '/dashboard/usuario/puntos',   icon: 'ti-trophy',    label: 'Gamificación' },
      { to: '/dashboard/usuario/impacto',  icon: 'ti-chart-bar', label: 'Mi impacto' },
      { to: '/dashboard/usuario/mapa',     icon: 'ti-map-pin',   label: 'Mapa reciclaje' }
    ]
  }
]

export default function Sidebar({ onEditProfile }) {
  const { name, username, image, initials } = useUser()
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="db-sidebar">
      
      {/* Logo */}
      <div className="db-logo">
        <div className="db-logo-icon">
          <i className="ti ti-leaf" aria-hidden="true" />
        </div>
        <h2>EcoKinal</h2>
      </div>

      {/* Perfil */}
      <div className="db-profile-section">
        <Avatar image={image} initials={initials} size={36} />
        <div className="db-profile-info">
          <h4>{name}</h4>
          <p>@{username}</p>
        </div>
        <button onClick={onEditProfile} className="db-edit-btn" aria-label="Editar perfil">
          <i className="ti ti-pencil" aria-hidden="true" />
        </button>
      </div>

      {/* Navegación Principal */}
      <nav className="db-nav-container">
        {NAVIGATION_SECTIONS.map((section) => (
          <div key={section.title} className="db-nav-section">
            <span className="db-nav-section-title">{section.title}</span>
            <div className="db-nav-list">
              {section.links.map(({ to, icon, label, end }) => (
                <NavLink 
                  key={to} 
                  to={to} 
                  end={end} 
                  className={({ isActive }) => `db-nav-link ${isActive ? 'active' : ''}`}
                >
                  <i className={`ti ${icon}`} aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Cerrar Sesión */}
      <div className="db-logout-wrapper">
        <button onClick={handleLogout} className="db-logout-btn">
          <i className="ti ti-logout" aria-hidden="true" />
          <span>Cerrar sesión</span>
        </button>
      </div>

    </aside>
  )
}