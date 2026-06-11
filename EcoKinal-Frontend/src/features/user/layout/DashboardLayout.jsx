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
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        body {
          margin: 0;
          background-color: #ffffff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: clip;
        }

        .db-layout {
          min-height: 100vh;
          position: relative;
          overflow-x: clip;
        }

        .db-main {
          padding-top: 68px;
          padding-left: 0;
          padding-right: 0;
          padding-bottom: 28px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 480px) {
          .db-main { padding-top: 60px; }
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