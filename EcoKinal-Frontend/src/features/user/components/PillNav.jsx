// 📁 src/features/user/components/PillNav.jsx
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function PillNav({ items = [], onLogoutAction, onProfileClick }) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const currentPath = location.pathname

  return (
    <>
      <style>{`
        .econav-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          /* ✅ FIX: SIN pointer-events: none en el wrapper — bloqueaba los clicks */
        }

        .econav {
          width: 100%;
          background: linear-gradient(135deg, #162e15 0%, #1f4a1c 50%, #2b5626 100%);
          padding: 0 32px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 1px solid rgba(168,216,154,0.12);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.04) inset,
            0 8px 32px rgba(0,0,0,0.25),
            0 2px 8px rgba(0,0,0,0.15);
          position: relative;
        }

        .econav::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px;
          opacity: 0.03;
          pointer-events: none;
        }

        .econav-brand {
          display: flex; align-items: center; gap: 11px;
          text-decoration: none; flex-shrink: 0;
        }

        .econav-brand-icon {
          width: 40px; height: 40px; border-radius: 11px;
          background: linear-gradient(135deg, rgba(168,216,154,0.25) 0%, rgba(168,216,154,0.1) 100%);
          border: 1px solid rgba(168,216,154,0.3);
          display: grid; place-items: center;
          color: #a8d89a; font-size: 20px;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .econav-brand:hover .econav-brand-icon {
          background: rgba(168,216,154,0.28);
          transform: rotate(-8deg) scale(1.05);
        }

        .econav-brand-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 17px; font-weight: 800;
          color: #fff; letter-spacing: -0.03em;
        }

        .econav-brand-sub {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 10px; font-weight: 500;
          color: rgba(168,216,154,0.6);
          letter-spacing: 0.12em; text-transform: uppercase;
          display: block; margin-top: -2px;
        }

        .econav-links {
          display: flex; align-items: center; gap: 2px;
          background: rgba(0,0,0,0.22);
          border-radius: 14px; padding: 5px;
          flex: 1; justify-content: center; max-width: 720px;
          border: 1px solid rgba(255,255,255,0.04);
        }

        .econav-link {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 16px; border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none; border: none;
          background: transparent; cursor: pointer;
          transition: color 0.18s, background 0.18s;
          white-space: nowrap;
        }

        .econav-link i { font-size: 16px; flex-shrink: 0; }

        .econav-link:hover {
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.07);
        }

        .econav-link.active {
          background: linear-gradient(135deg, #a8d89a 0%, #7ec86e 100%);
          color: #162e15; font-weight: 700;
          box-shadow: 0 2px 12px rgba(126,200,110,0.35), inset 0 1px 0 rgba(255,255,255,0.3);
        }

        .econav-link.active:hover {
          background: linear-gradient(135deg, #b8e4ac 0%, #8ed47e 100%);
          color: #162e15;
        }

        .econav-actions {
          display: flex; align-items: center; gap: 8px; flex-shrink: 0;
        }

        .econav-icon-btn {
          width: 40px; height: 40px; border-radius: 11px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          display: grid; place-items: center;
          color: rgba(255,255,255,0.7); font-size: 18px;
          cursor: pointer; transition: all 0.18s;
        }

        .econav-icon-btn:hover {
          background: rgba(255,255,255,0.14); color: #fff;
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }

        .econav-logout-btn {
          display: flex; align-items: center; justify-content: flex-start;
          width: 44px; height: 44px;
          background: #dc2626; border-radius: 50%;
          cursor: pointer; position: relative; overflow: hidden;
          border: none;
          transition: width 0.25s ease, border-radius 0.25s ease;
          box-shadow: 0 4px 14px rgba(220,38,38,0.4); flex-shrink: 0;
        }

        .econav-logout-btn:hover { width: 108px; border-radius: 12px; }
        .econav-logout-btn:active { transform: translate(1px, 1px); }

        .econav-logout-icon {
          display: flex; align-items: center; justify-content: center;
          min-width: 44px; width: 44px; height: 44px; flex-shrink: 0;
        }

        .econav-logout-label {
          position: absolute; left: 44px; right: 0;
          display: flex; align-items: center; justify-content: flex-start;
          transform: translateX(30px); opacity: 0;
          color: white; font-size: 14px; font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: transform 0.25s ease, opacity 0.25s ease;
          white-space: nowrap; pointer-events: none;
        }

        .econav-logout-btn:hover .econav-logout-label {
          transform: translateX(0); opacity: 1;
        }

        .econav-hamburger {
          display: none;
          width: 42px; height: 42px; border-radius: 11px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          align-items: center; justify-content: center;
          color: rgba(255,255,255,0.8); font-size: 20px;
          cursor: pointer; transition: background 0.18s; flex-shrink: 0;
        }

        .econav-hamburger:hover { background: rgba(255,255,255,0.14); }

        /* ✅ FIX: menú móvil con pointer-events activos y z-index sobre el main */
        .econav-mobile {
          display: none;
          position: fixed;
          top: 76px; left: 12px; right: 12px;
          background: linear-gradient(160deg, #162e15 0%, #2b5626 100%);
          border-radius: 18px;
          border: 1px solid rgba(168,216,154,0.12);
          box-shadow: 0 24px 56px rgba(0,0,0,0.4);
          padding: 10px;
          z-index: 1001;        /* ✅ Por encima del main (z-index 1) */
          pointer-events: all;  /* ✅ Clicks habilitados */
          flex-direction: column; gap: 3px;
        }

        .econav-mobile.open { display: flex; }

        .econav-mobile-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 16px; border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none; border: none;
          background: transparent; cursor: pointer;
          width: 100%; text-align: left; transition: all 0.15s;
        }

        .econav-mobile-link:hover {
          background: rgba(255,255,255,0.06); color: #fff;
        }

        .econav-mobile-link.active {
          background: rgba(168,216,154,0.15);
          color: #a8d89a; font-weight: 700;
        }

        .econav-mobile-link span {
          display: inline-flex; align-items: center; gap: 10px;
        }

        .econav-mobile-link i { font-size: 17px; }

        .econav-mobile-divider {
          height: 1px; background: rgba(255,255,255,0.07); margin: 4px 2px;
        }

        .econav-mobile-logout { color: rgba(255,120,120,0.7) !important; }
        .econav-mobile-logout:hover {
          background: rgba(255,100,100,0.08) !important;
          color: #ff8585 !important;
        }

        @media (max-width: 960px) {
          .econav-links   { display: none; }
          .econav-actions { display: none; }
          .econav-hamburger { display: flex; }
        }

        @media (max-width: 480px) {
          .econav { padding: 0 16px; height: 60px; }
          .econav-brand-name { font-size: 15px; }
          .econav-brand-sub { display: none; }
        }
      `}</style>

      <div className="econav-wrap">
        <nav className="econav" aria-label="Navegación principal">

          <Link to="/dashboard/usuario" className="econav-brand">
            <div className="econav-brand-icon">
              <i className="ti ti-leaf" aria-hidden="true" />
            </div>
            <div>
              <span className="econav-brand-name">EcoKinal</span>
              <span className="econav-brand-sub">Dashboard</span>
            </div>
          </Link>

          <div className="econav-links">
            {items.map((item) => {
              const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`econav-link ${isActive ? 'active' : ''}`}
                >
                  {item.icon && <i className={item.icon} aria-hidden="true" />}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="econav-actions">
            {onProfileClick && (
              <button className="econav-icon-btn" onClick={onProfileClick} aria-label="Mi perfil">
                <i className="ti ti-user" aria-hidden="true" />
              </button>
            )}
            {onLogoutAction && (
              <button className="econav-logout-btn" onClick={onLogoutAction} aria-label="Cerrar sesión">
                <div className="econav-logout-icon">
                  <svg width="16" height="16" viewBox="0 0 512 512" fill="white">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                  </svg>
                </div>
                <span className="econav-logout-label">Salir</span>
              </button>
            )}
          </div>

          <button
            className="econav-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            <i className={isOpen ? 'ti ti-x' : 'ti ti-menu-2'} aria-hidden="true" />
          </button>
        </nav>

        <div className={`econav-mobile ${isOpen ? 'open' : ''}`} role="menu">
          {items.map((item) => {
            const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`econav-mobile-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <span>
                  {item.icon && <i className={item.icon} aria-hidden="true" />}
                  {item.label}
                </span>
                <i className="ti ti-chevron-right" style={{ opacity: 0.35, fontSize: 14 }} aria-hidden="true" />
              </Link>
            )
          })}

          {onProfileClick && (
            <>
              <div className="econav-mobile-divider" />
              <button
                className="econav-mobile-link"
                onClick={() => { onProfileClick(); setIsOpen(false) }}
                role="menuitem"
              >
                <span>
                  <i className="ti ti-user" aria-hidden="true" />
                  Mi perfil
                </span>
                <i className="ti ti-chevron-right" style={{ opacity: 0.35, fontSize: 14 }} aria-hidden="true" />
              </button>
            </>
          )}

          {onLogoutAction && (
            <button
              className="econav-mobile-link econav-mobile-logout"
              onClick={onLogoutAction}
              role="menuitem"
            >
              <span>
                <i className="ti ti-logout" aria-hidden="true" />
                Cerrar sesión
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  )
}