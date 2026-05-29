import { useNavigate } from 'react-router-dom'
import { useUser } from '../store/useUserStore'
import Avatar from '../components/Avatar'

const MODULES = [
  { to: '/dashboard/usuario/detector', icon: 'ti-camera',    label: 'Detector de reciclaje', desc: 'Escanea objetos con IA',      bg: '#E1F5EE', color: '#0F6E56' },
  { to: '/dashboard/usuario/foro',     icon: 'ti-messages',  label: 'Foro eco',               desc: 'Publicaciones y comentarios', bg: '#E6F1FB', color: '#185FA5' },
  { to: '/dashboard/usuario/puntos',   icon: 'ti-trophy',    label: 'Gamificación',           desc: 'Puntos y leaderboard',        bg: '#FAEEDA', color: '#854F0B' },
  { to: '/dashboard/usuario/impacto',  icon: 'ti-chart-bar', label: 'Mi impacto',             desc: 'Estadísticas de reciclaje',   bg: '#EAF3DE', color: '#3B6D11' },
  { to: '/dashboard/usuario/mapa',     icon: 'ti-map-pin',   label: 'Mapa reciclaje',         desc: 'Centros cercanos a ti',       bg: '#EEEDFE', color: '#534AB7' },
]

export default function DashboardPage() {
  const { name, username, image, initials } = useUser()
  const navigate = useNavigate()

  return (
    <div style={{ padding: 24, maxWidth: 820 }}>

      {/* Bienvenida */}
      <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Avatar image={image} initials={initials} size={52} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>
            Bienvenido, {name} 👋
          </h1>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
            @{username} · Sigue reciclando y sumando puntos para el planeta.
          </p>
        </div>
      </div>

      {/* Módulos */}
      <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 12, letterSpacing: '.06em' }}>
        MÓDULOS DISPONIBLES
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {MODULES.map(({ to, icon, label, desc, bg, color }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12, padding: 16, display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer', textAlign: 'left', width: '100%' }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className={`ti ${icon}`} style={{ fontSize: 20, color }} aria-hidden="true" />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{desc}</p>
            </div>
          </button>
        ))}
      </div>

    </div>
  )
}