import { useNavigate } from 'react-router-dom'
import { useUser } from '../store/useUserStore'
import useAuthStore from '../../auth/store/useAuthStore'
import Avatar from './Avatar'
import PillNav from './PillNav'

// Navegación principal del dashboard
const navigationItems = [
  {
    label: 'Detector de reciclaje',
    href: '/dashboard/usuario/detector',
    icon: 'ti ti-camera',
    hoverLabel: 'Clasificar'
  },
  {
    label: 'Foro eco',
    href: '/dashboard/usuario/foro',
    icon: 'ti ti-messages',
    hoverLabel: 'Comunidad'
  },
  {
    label: 'Gamificación',
    href: '/dashboard/usuario/puntos',
    icon: 'ti ti-trophy',
    hoverLabel: 'Retos'
  },
  {
    label: 'Mi impacto',
    href: '/dashboard/usuario/impacto',
    icon: 'ti ti-chart-bar',
    hoverLabel: 'Estadísticas'
  },
  {
    label: 'Mapa reciclaje',
    href: '/dashboard/usuario/mapa',
    icon: 'ti ti-map-pin',
    hoverLabel: 'Ubicar'
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

      {/* Navegación Principal con PillNav */}
      <PillNav
        items={navigationItems}
        baseColor="#f8fbf4"
        pillColor="#9ecd6f"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#18311f"
        logoAlt="EcoKinal"
        initialLoadAnimation={false}
        onLogoutAction={handleLogout}
      />

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