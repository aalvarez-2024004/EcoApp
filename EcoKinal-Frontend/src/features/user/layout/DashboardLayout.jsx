// 📁 src/features/user/layout/DashboardLayout.jsx
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import PillNav from '../components/PillNav'
import ProfileModal from '../components/ProfileModal'
import useAuthStore from '../../auth/store/useAuthStore'

const navigationItems = [
  { label: 'Detector de reciclaje', href: '/dashboard/usuario/detector', icon: 'ti ti-camera',    hoverLabel: 'Clasificar'   },
  { label: 'Foro eco',              href: '/dashboard/usuario/foro',      icon: 'ti ti-messages',  hoverLabel: 'Comunidad'    },
  { label: 'Gamificación',          href: '/dashboard/usuario/puntos',    icon: 'ti ti-trophy',    hoverLabel: 'Retos'        },
  { label: 'Mi impacto',            href: '/dashboard/usuario/impacto',   icon: 'ti ti-chart-bar', hoverLabel: 'Estadísticas' },
  { label: 'Mapa reciclaje',        href: '/dashboard/usuario/mapa',      icon: 'ti ti-map-pin',   hoverLabel: 'Ubicar'       },
  { label: 'EcoBot', href: '/dashboard/usuario/ecobot', icon: 'ti ti-robot', hoverLabel: 'Chatbot' },
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
      {/* ✅ Solo estilos de layout — fuentes e iconos van en index.html */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        body {
          margin: 0;
          background-color: #f8f9f2;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .db-layout {
          min-height: 100vh;
          position: relative;
        }

        .db-main {
          padding-top: 68px;
          padding-left: 20px;
          padding-right: 20px;
          padding-bottom: 28px;
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }
      `}</style>

      <div className="db-layout">
        <PillNav
          items={navigationItems}
          onLogoutAction={handleLogout}
          onProfileClick={() => setShowEditModal(true)}
        />

        <main className="db-main">
          <Outlet />
        </main>

        {showEditModal && (
          <ProfileModal onClose={() => setShowEditModal(false)} />
        )}
      </div>
    </>
  )
}