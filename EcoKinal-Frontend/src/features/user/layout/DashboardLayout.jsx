import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useUser } from '../store/useUserStore'
import Avatar from '../components/Avatar'
// Importamos los estilos del dashboard desde tu archivo JS de Styles
import { css as dashboardStyles } from '../../../Styles/DashboardPage'

export default function DashboardLayout() {
  const [showEditModal, setShowEditModal] = useState(false)
  const { name, username, email, image, initials } = useUser()

  return (
    <>
      {/* Inyectamos el string de CSS en el documento */}
      <style>{dashboardStyles}</style>

      <div className="db-layout">
        {/* Sidebar integrado */}
        <Sidebar onEditProfile={() => setShowEditModal(true)} />

        {/* Espacio del contenido donde se renderiza DashboardPage */}
        <main className="db-main-content">
          <Outlet />
        </main>

        {/* Modal de edición */}
        {showEditModal && (
          <div
            onClick={() => setShowEditModal(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(17, 33, 23, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{ background: 'var(--white)', borderRadius: 24, padding: 28, width: 380, border: '1px solid var(--card-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>Mi perfil</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4 }}
                >
                  <i className="ti ti-x" style={{ fontSize: 18 }} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <Avatar image={image} initials={initials} size={72} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>{name}</p>
                  <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>@{username}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid var(--card-border)', paddingTop: 20 }}>
                <div>
                  <p style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>Correo Electrónico</p>
                  <p style={{ fontSize: 14, color: 'var(--ink)', margin: 0, fontWeight: 500 }}>{email}</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>Nombre de usuario</p>
                  <p style={{ fontSize: 14, color: 'var(--ink)', margin: 0, fontWeight: 500 }}>@{username}</p>
                </div>
              </div>

              <div style={{ marginTop: 24, background: 'var(--bone)', borderRadius: 14, padding: '12px 16px', border: '1px solid var(--card-border)' }}>
                <p style={{ fontSize: 12, color: 'var(--green-800)', margin: 0, fontWeight: 500, textAlign: 'center' }}>
                  ✏️ La edición de perfil estará disponible próximamente.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}