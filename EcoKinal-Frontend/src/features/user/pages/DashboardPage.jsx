import { useNavigate } from 'react-router-dom'
import { useUser } from '../store/useUserStore'

const MODULES = [
  {
    to: '/dashboard/usuario/detector',
    icon: 'ti-camera',
    label: 'Detector de reciclaje',
    desc: 'Escanea objetos con IA en tiempo real para clasificarlos correctamente.',
    color: '#2d5a27', // Verde bosque
    bg: '#f8f9f2',    // Blanco hueso
    tag: 'Popular'
  },
  {
    to: '/dashboard/usuario/foro',
    icon: 'ti-messages',
    label: 'Foro eco',
    desc: 'Comparte tips, publica fotos y debate soluciones con la comunidad verde.',
    color: '#3e7d32',
    bg: '#f8f9f2',
    tag: 'Comunidad'
  },
  {
    to: '/dashboard/usuario/puntos',
    icon: 'ti-trophy',
    label: 'Gamificación',
    desc: 'Revisa tus eco-puntos acumulados y escala posiciones en el podio.',
    color: '#1b3c1a',
    bg: '#f8f9f2',
    tag: 'Retos'
  },
  {
    to: '/dashboard/usuario/impacto',
    icon: 'ti-chart-bar',
    label: 'Mi impacto',
    desc: 'Estadísticas analíticas detalladas del CO₂ y residuos que has salvado.',
    color: '#2d5a27',
    bg: '#f8f9f2',
    tag: null
  },
  {
    to: '/dashboard/usuario/mapa',
    icon: 'ti-map-pin',
    label: 'Mapa reciclaje',
    desc: 'Encuentra los contenedores inteligentes y centros limpios más cercanos.',
    color: '#3e7d32',
    bg: '#f8f9f2',
    tag: 'Nuevo'
  }
]

export default function DashboardPage() {
  const { name, username } = useUser()
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        :root {
          --forest-green: #1b3c1a;
          --leaf-green: #2d5a27;
          --soft-green: #a8c69f;
          --bone-white: #f8f9f2;
          --pure-black: #121212;
          --text-gray: #4a4a4a;
        }

        .db-page-container {
          min-height: 100vh;
          background-color: var(--bone-white);
          padding: 2rem 1rem;
          color: var(--pure-black);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Decoración de hojas de fondo */
        .leaf-bg {
          position: absolute;
          color: var(--soft-green);
          opacity: 0.15;
          z-index: 0;
          pointer-events: none;
        }

        .db-hero-banner {
          position: relative;
          z-index: 1;
          background: var(--forest-green);
          border-radius: 24px;
          padding: 3rem 2rem;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3rem;
          box-shadow: 0 20px 40px rgba(27, 60, 26, 0.15);
        }

        .db-hero-text h2 {
          font-size: 2.5rem;
          margin: 1rem 0;
          font-weight: 800;
        }

        .db-hero-badge {
          background: rgba(255,255,255,0.15);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .db-hero-illustration {
          font-size: 6rem;
          opacity: 0.8;
        }

        .db-section-title {
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          padding-left: 0.5rem;
          border-left: 4px solid var(--leaf-green);
        }

        .db-modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          z-index: 1;
          position: relative;
        }

        .db-module-card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 20px;
          padding: 2rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .db-module-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.05);
          border-color: var(--leaf-green);
        }

        .db-card-icon-box {
          width: 50px;
          height: 50px;
          background: var(--brand-bg);
          color: var(--brand-color);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 1.5rem;
        }

        .db-module-card h3 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--pure-black);
        }

        .db-module-card p {
          font-size: 0.95rem;
          color: var(--text-gray);
          line-height: 1.5;
        }

        .db-card-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: var(--leaf-green);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Responsividad */
        @media (max-width: 768px) {
          .db-hero-banner {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1.5rem;
          }
          .db-hero-illustration {
            display: none;
          }
          .db-hero-text h2 {
            font-size: 1.8rem;
          }
          .db-modules-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="db-page-container">
        {/* Iconos de hojas decorativos */}
        <i className="ti ti-leaf leaf-bg" style={{ top: '5%', left: '5%', fontSize: '8rem', transform: 'rotate(-15deg)' }} />
        <i className="ti ti-leaf leaf-bg" style={{ bottom: '10%', right: '5%', fontSize: '10rem', transform: 'rotate(160deg)' }} />
        
        <section className="db-hero-banner">
          <div className="db-hero-text">
            <span className="db-hero-badge">
              <i className="ti ti-shield-check" />
              <span>Panel Ecológico Verificado</span>
            </span>
            <h2>¡Bienvenido de vuelta, {name}!</h2>
            <p>
              @{username} · Tu cuenta está activa. Cada residuo procesado mitiga el calentamiento global.
            </p>
          </div>

          <div className="db-hero-illustration">
            <i className="ti ti-seeding" />
          </div>
        </section>

        <p className="db-section-title">Módulos de sistema</p>

        <div className="db-modules-grid">
          {MODULES.map(({ to, icon, label, desc, color, bg, tag }) => (
            <button
              key={to}
              onClick={() => navigate(to)}
              className="db-module-card"
              style={{
                '--brand-color': color,
                '--brand-bg': 'rgba(45, 90, 39, 0.1)'
              }}
            >
              {tag && <span className="db-card-badge">{tag}</span>}

              <div className="db-card-icon-box">
                <i className={`ti ${icon}`} />
              </div>

              <h3>{label}</h3>
              <p>{desc}</p>
              
              <div style={{ color: 'var(--leaf-green)', fontSize: '1.2rem', marginTop: 'auto', textAlign: 'right' }}>
                <i className="ti ti-arrow-right" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}