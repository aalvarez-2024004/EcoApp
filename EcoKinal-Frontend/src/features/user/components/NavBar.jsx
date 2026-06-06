// 📁 src/features/user/components/NavBar.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom' // ✅ agrega useLocation
import useAuthStore from '../../auth/store/useAuthStore'

const NAV_ITEMS = [
  { label: 'Detector de reciclaje', href: '/dashboard/usuario/detector', icon: 'ti ti-camera', hoverLabel: 'Clasificar' },
  { label: 'Foro eco', href: '/dashboard/usuario/foro', icon: 'ti ti-messages', hoverLabel: 'Comunidad' },
  { label: 'Gamificación', href: '/dashboard/usuario/puntos', icon: 'ti ti-trophy', hoverLabel: 'Retos' },
  { label: 'Mi impacto', href: '/dashboard/usuario/impacto', icon: 'ti ti-chart-bar', hoverLabel: 'Estadísticas' },
  { label: 'Mapa reciclaje', href: '/dashboard/usuario/mapa', icon: 'ti ti-map-pin', hoverLabel: 'Ubicar' }
]

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const location = useLocation()        // ✅ hook reactivo
  const currentPath = location.pathname // ✅ reemplaza window.location.pathname

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleNavigation = (href) => {
    navigate(href)
    setIsOpen(false)
  }

  return (
    <>
      <style>{`
        :root {
          --nav-forest: #1b3c1a;
          --nav-leaf: #2d5a27;
          --nav-bone: #f8f9f2;
          --nav-black: #121212;
        }
        .eco-navbar {
          background-color: white;
          border-bottom: 1px solid rgba(45, 90, 39, 0.08);
          padding: 0.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0; left: 0;
          width: 100%;
          box-sizing: border-box;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(27, 60, 26, 0.02);
        }
        .eco-nav-brand {
          display: flex; align-items: center; gap: 0.6rem;
          font-weight: 800; color: var(--nav-forest);
          font-size: 1.3rem; font-family: 'Inter', sans-serif; user-select: none;
        }
        .eco-nav-brand i { color: var(--nav-leaf); font-size: 1.6rem; }
        .eco-menu-toggle {
          display: none; background: transparent; border: none;
          color: var(--nav-forest); font-size: 1.5rem; cursor: pointer;
          padding: 0.5rem; border-radius: 8px; transition: background 0.2s;
        }
        .eco-menu-toggle:hover { background: var(--nav-bone); }
        .eco-nav-container {
          display: flex; align-items: center; justify-content: space-between;
          flex: 1; margin-left: 2rem; max-height: none !important;
        }
        .eco-nav-links {
          display: flex; align-items: center; gap: 0.25rem;
          background: var(--nav-bone); padding: 0.35rem;
          border-radius: 100px; border: 1px solid rgba(45, 90, 39, 0.06);
        }
        .eco-nav-item {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 1.1rem; color: var(--nav-leaf);
          font-size: 0.88rem; font-weight: 600; border-radius: 100px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: none; background: transparent; cursor: pointer;
        }
        .eco-nav-item:hover { color: var(--nav-forest); background: rgba(45, 90, 39, 0.06); }
        .eco-nav-item.active { background: var(--nav-forest); color: white; box-shadow: 0 4px 10px rgba(27, 60, 26, 0.15); }
        .eco-logout-btn {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 1.2rem; background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.08); color: var(--nav-black);
          border-radius: 100px; font-weight: 600; font-size: 0.88rem;
          cursor: pointer; transition: all 0.2s ease;
        }
        .eco-logout-btn:hover { background: #fff5f5; border-color: #ffcccc; color: #dc2626; }
        @media (max-width: 1024px) {
          .eco-navbar { padding: 1rem 1.5rem; flex-wrap: wrap; }
          .eco-menu-toggle { display: block; }
          .eco-nav-container {
            display: flex; flex-direction: column; width: 100%; margin-left: 0;
            max-height: 0px; overflow: hidden;
            transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            background: white;
          }
          .eco-nav-container.is-open { max-height: 500px; padding-bottom: 1rem; }
          .eco-nav-links {
            flex-direction: column; width: 100%; background: transparent;
            border: none; padding: 1rem 0 0.5rem 0; gap: 0.5rem;
          }
          .eco-nav-item {
            width: 100%; padding: 0.75rem 1.2rem; border-radius: 12px;
            background: var(--nav-bone); justify-content: flex-start;
          }
          .eco-nav-item.active { box-shadow: none; background: var(--nav-forest); color: white; }
          .eco-logout-btn {
            width: 100%; justify-content: center; margin-top: 0.5rem;
            padding: 0.75rem; border-radius: 12px; background: var(--nav-bone);
          }
        }
      `}</style>

      <nav className="eco-navbar">
        <div className="eco-nav-brand">
          <i className="ti ti-leaf" />
          <span>EcoKinal</span>
        </div>

        <button className="eco-menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menú">
          <i className={isOpen ? 'ti ti-x' : 'ti ti-menu-2'} />
        </button>

        <div className={`eco-nav-container ${isOpen ? 'is-open' : ''}`}>
          <div className="eco-nav-links">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`eco-nav-item ${isActive ? 'active' : ''}`}
                  title={item.hoverLabel}
                >
                  <i className={item.icon} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
          <button onClick={handleLogout} className="eco-logout-btn">
            <i className="ti ti-logout" />
            <span>Salir</span>
          </button>
        </div>
      </nav>
    </>
  )
}