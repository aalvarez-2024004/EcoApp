import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import PillNav from '../components/PillNav'
import { css as dashboardStyles } from '../../../Styles/DashboardPage'
import ProfileModal from '../components/ProfileModal'
import useAuthStore from '../../auth/store/useAuthStore'

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

export default function DashboardLayout() {
  const [showEditModal, setShowEditModal] = useState(false)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <style>{dashboardStyles}</style>
      <div className="db-layout">
        <PillNav
            items={navigationItems}
            baseColor="#f8fbf4"
            pillColor="#9ecd6f"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#18311f"
            onLogoutAction={handleLogout}
            onProfileClick={() => setShowEditModal(true)}
        />
        <main
          className="db-main-content"
          style={{
            paddingTop: '6rem',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '28px'
          }}
        >
          <Outlet />
        </main>
        {showEditModal && (
          <ProfileModal onClose={() => setShowEditModal(false)} />
        )}
      </div>
    </>
  )
}