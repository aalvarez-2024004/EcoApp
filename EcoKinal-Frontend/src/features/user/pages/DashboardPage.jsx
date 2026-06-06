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
      {/* ✅ FIX 1: Carga global de Tabler Icons y Plus Jakarta Sans */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

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

        /* ✅ FIX 2: El main nunca tapa el menú móvil del PillNav */
        .db-main {
          padding-top: 68px;   /* altura exacta del PillNav */
          padding-left: 20px;
          padding-right: 20px;
          padding-bottom: 28px;
          min-height: 100vh;
          position: relative;
          z-index: 1;          /* siempre por debajo del menú (z-index 999) */
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