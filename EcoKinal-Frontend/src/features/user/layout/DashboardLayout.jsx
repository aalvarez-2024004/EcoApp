import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useUser } from '../store/useUserStore'
import Avatar from '../components/Avatar'

export default function DashboardLayout() {
  const [showEditModal, setShowEditModal] = useState(false)
  const { name, username, email, image, initials } = useUser()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-background-tertiary)' }}>

      <Sidebar onEditProfile={() => setShowEditModal(true)} />

      {/* Contenido principal */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>

      {/* Modal — editar perfil */}
      {showEditModal && (
        <div
          onClick={() => setShowEditModal(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: 'var(--color-background-primary)', borderRadius: 12, padding: 28, width: 360, border: '0.5px solid var(--color-border-tertiary)' }}
          >
            {/* Cabecera del modal */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 500 }}>Mi perfil</h2>
              <button
                onClick={() => setShowEditModal(false)}
                aria-label="Cerrar"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', padding: 4 }}
              >
                <i className="ti ti-x" style={{ fontSize: 18 }} />
              </button>
            </div>

            {/* Avatar centrado */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Avatar image={image} initials={initials} size={64} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 15, fontWeight: 500 }}>{name}</p>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>@{username}</p>
              </div>
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '0.5px solid var(--color-border-tertiary)', paddingTop: 16 }}>
              <div>
                <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 3 }}>Correo</p>
                <p style={{ fontSize: 14 }}>{email}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 3 }}>Nombre de usuario</p>
                <p style={{ fontSize: 14 }}>@{username}</p>
              </div>
            </div>

            {/* Aviso próximamente */}
            <div style={{ marginTop: 20, background: 'var(--color-background-secondary)', borderRadius: 8, padding: '10px 14px' }}>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                ✏️ La edición de perfil estará disponible próximamente.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}