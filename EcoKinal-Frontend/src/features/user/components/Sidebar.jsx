import { NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../store/useUserStore'
import useAuthStore from '../../auth/store/useAuthStore'
import Avatar from './Avatar'

const NAV = [
  { to: '/dashboard/usuario',          icon: 'ti-home',      label: 'Inicio',               end: true },
  { to: '/dashboard/usuario/detector', icon: 'ti-camera',    label: 'Detector de reciclaje', end: false },
  { to: '/dashboard/usuario/foro',     icon: 'ti-messages',  label: 'Foro eco',              end: false },
  { to: '/dashboard/usuario/puntos',   icon: 'ti-trophy',    label: 'Gamificación',          end: false },
  { to: '/dashboard/usuario/impacto',  icon: 'ti-chart-bar', label: 'Mi impacto',            end: false },
  { to: '/dashboard/usuario/mapa',     icon: 'ti-map-pin',   label: 'Mapa reciclaje',        end: false },
]

const navStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '8px 10px',
  borderRadius: 8,
  fontSize: 13,
  textDecoration: 'none',
  color:      isActive ? '#0F6E56' : 'var(--color-text-secondary)',
  background: isActive ? '#E1F5EE' : 'transparent',
})

export default function Sidebar({ onEditProfile }) {
  const { name, username, image, initials } = useUser()
  const logout   = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const { user } = useUser()
  console.log('USER COMPLETO:', user)


  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside style={{
      width: 230,
      flexShrink: 0,
      background: 'var(--color-background-primary)',
      borderRight: '0.5px solid var(--color-border-tertiary)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
    }}>

      {/* Logo */}
      <div style={{ padding: '18px 16px 14px', borderBottom: '0.5px solid var(--color-border-tertiary)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1D9E75', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>
          <i className="ti ti-leaf" aria-hidden="true" />
        </div>
        <span style={{ fontSize: 15, fontWeight: 500 }}>EcoKinal</span>
      </div>

      {/* Perfil */}
      <div style={{ padding: '14px 16px', borderBottom: '0.5px solid var(--color-border-tertiary)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar image={image} initials={initials} size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
            @{username}
          </div>
        </div>
        <button
          onClick={onEditProfile}
          aria-label="Editar perfil"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: 4 }}
        >
          <i className="ti ti-pencil" style={{ fontSize: 16 }} aria-hidden="true" />
        </button>
      </div>

      {/* Navegación */}
      <nav style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--color-text-tertiary)', padding: '8px 8px 4px', letterSpacing: '.06em' }}>
          PRINCIPAL
        </span>

        {NAV.slice(0, 1).map(({ to, icon, label, end }) => (
          <NavLink key={to} to={to} end={end} style={({ isActive }) => navStyle(isActive)}>
            <i className={`ti ${icon}`} style={{ fontSize: 17 }} aria-hidden="true" />
            {label}
          </NavLink>
        ))}

        <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--color-text-tertiary)', padding: '8px 8px 4px', letterSpacing: '.06em' }}>
          MÓDULOS
        </span>

        {NAV.slice(1).map(({ to, icon, label, end }) => (
          <NavLink key={to} to={to} end={end} style={({ isActive }) => navStyle(isActive)}>
            <i className={`ti ${icon}`} style={{ fontSize: 17 }} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: '12px 16px', borderTop: '0.5px solid var(--color-border-tertiary)' }}>
        <button
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--color-text-secondary)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 4px', width: '100%', borderRadius: 6 }}
        >
          <i className="ti ti-logout" style={{ fontSize: 17 }} aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>

    </aside>
  )
}