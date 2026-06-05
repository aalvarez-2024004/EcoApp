import { useState, useRef } from 'react'
import { useUser } from '../store/useUserStore'
import useAuthStore from '../../auth/store/useAuthStore'
import Avatar from '../components/Avatar'
import { AuthApi } from '../../../shared/Api'
import { getToken } from '../../../shared/Auth'

export default function ProfileModal({ onClose }) {
  const { name, username, email, image, initials } = useUser()
  const updateUser = useAuthStore((s) => s.updateUser)

  const [mode, setMode] = useState('view') 

  const [form, setForm] = useState({ name, username })
  const [previewImage, setPreviewImage] = useState(image)
  const [imageFile, setImageFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError, setPwError] = useState(null)
  const [pwSuccess, setPwSuccess] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    setSaveError(null)
    setSaveSuccess(false)
    try {
      const formData = new FormData()
      formData.append('name', form.name.trim())
      formData.append('username', form.username.trim())
      if (imageFile) formData.append('image', imageFile)

      const { data } = await AuthApi.put('/users/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getToken()}`,
        },
      })

      updateUser({ 
        ...data.user,
        // Normaliza la imagen a los 3 campos que usa useUser
        profilePicture: data.user?.profilePicture ?? data.user?.photo ?? data.user?.image ?? previewImage,
        photo:          data.user?.profilePicture ?? data.user?.photo ?? data.user?.image ?? previewImage,
        image:          data.user?.profilePicture ?? data.user?.photo ?? data.user?.image ?? previewImage,
      })
      setSaveSuccess(true)
      setTimeout(() => { setSaveSuccess(false); setMode('view') }, 1500)
    } catch (err) {
      setSaveError(err.response?.data?.error || 'Error al guardar los cambios')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    setPwError(null)
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError('Las contraseñas nuevas no coinciden')
      return
    }
    if (pwForm.newPassword.length < 6) {
      setPwError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    setPwSaving(true)
    try {
      await AuthApi.patch('/users/change-password', {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      setPwSuccess(true)
      setTimeout(() => { setPwSuccess(false); setMode('view'); setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' }) }, 1500)
    } catch (err) {
      setPwError(err.response?.data?.error || 'Error al cambiar la contraseña')
    } finally {
      setPwSaving(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 12, fontSize: 14,
    border: '1px solid var(--card-border)', background: 'var(--bone)',
    color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit',
  }

  const labelStyle = {
    fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase',
    fontWeight: 600, margin: '0 0 5px 0',
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(17,33,23,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 100, backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--white)', borderRadius: 24, padding: 28,
          width: 400, border: '1px solid var(--card-border)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {mode !== 'view' && (
              <button
                onClick={() => { setMode('view'); setSaveError(null); setPwError(null) }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4, display: 'flex' }}
              >
                <i className="ti ti-arrow-left" style={{ fontSize: 18 }} />
              </button>
            )}
            <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--ink)', margin: 0 }}>
              {mode === 'view' && 'Mi perfil'}
              {mode === 'edit' && 'Editar perfil'}
              {mode === 'password' && 'Cambiar contraseña'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4 }}
          >
            <i className="ti ti-x" style={{ fontSize: 18 }} />
          </button>
        </div>

        {mode === 'view' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <Avatar image={image} initials={initials} size={72} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>{name}</p>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>@{username}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid var(--card-border)', paddingTop: 20, marginBottom: 24 }}>
              <div>
                <p style={labelStyle}>Correo Electrónico</p>
                <p style={{ fontSize: 14, color: 'var(--ink)', margin: 0, fontWeight: 500 }}>{email}</p>
              </div>
              <div>
                <p style={labelStyle}>Nombre de usuario</p>
                <p style={{ fontSize: 14, color: 'var(--ink)', margin: 0, fontWeight: 500 }}>@{username}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => { setForm({ name, username }); setPreviewImage(image); setImageFile(null); setMode('edit') }}
                style={{
                  width: '100%', padding: '11px', borderRadius: 14, fontSize: 14,
                  fontWeight: 600, cursor: 'pointer', border: '1px solid var(--card-border)',
                  background: 'var(--navy-700)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                <i className="ti ti-pencil" style={{ fontSize: 16 }} />
                Editar perfil
              </button>
              <button
                onClick={() => setMode('password')}
                style={{
                  width: '100%', padding: '11px', borderRadius: 14, fontSize: 14,
                  fontWeight: 500, cursor: 'pointer',
                  border: '1px solid var(--card-border)', background: 'var(--bone)', color: 'var(--ink)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                <i className="ti ti-lock" style={{ fontSize: 16 }} />
                Cambiar contraseña
              </button>
            </div>
          </>
        )}

        {mode === 'edit' && (
          <>
            {/* Avatar con botón de cambio */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ position: 'relative' }}>
                <Avatar image={previewImage} initials={initials} size={80} />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--green-800)', border: '2px solid var(--white)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <i className="ti ti-camera" style={{ fontSize: 13, color: '#fff' }} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>Haz clic en la cámara para cambiar tu foto</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <div>
                <p style={labelStyle}>Nombre</p>
                <input
                  style={inputStyle}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <p style={labelStyle}>Nombre de usuario</p>
                <input
                  style={inputStyle}
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  placeholder="tu_username"
                />
              </div>
              <div>
                <p style={labelStyle}>Correo electrónico</p>
                <input
                  style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed' }}
                  value={email}
                  disabled
                />
                <p style={{ fontSize: 11, color: 'var(--muted)', margin: '4px 0 0 4px' }}>El correo no se puede modificar</p>
              </div>
            </div>

            {saveError && (
              <div style={{
                padding: '10px 14px', borderRadius: 12, marginBottom: 16,
                background: '#FCEBEB', border: '1px solid #F09595',
                fontSize: 13, color: '#791F1F',
              }}>
                {saveError}
              </div>
            )}

            {saveSuccess && (
              <div style={{
                padding: '10px 14px', borderRadius: 12, marginBottom: 16,
                background: '#eef1f9', border: '1px solid rgba(35,55,109,0.15)',
                fontSize: 13, color: '#23376d', fontWeight: 500,
              }}>
                ✓ Perfil actualizado correctamente
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setMode('view')}
                style={{
                  flex: 1, padding: '11px', borderRadius: 14, fontSize: 14,
                  fontWeight: 500, cursor: 'pointer',
                  border: '1px solid var(--card-border)', background: 'var(--bone)', color: 'var(--ink)',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                style={{
                  flex: 2, padding: '11px', borderRadius: 14, fontSize: 14,
                  fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
                  border: 'none', background: saving ? 'rgba(35,55,109,0.3)' : '#23376d', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {saving ? (
                  <>
                    <svg style={{ width: 15, height: 15, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="3" opacity="0.3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Guardando…
                  </>
                ) : 'Guardar cambios'}
              </button>
            </div>
          </>
        )}

        {mode === 'password' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <div>
                <p style={labelStyle}>Contraseña actual</p>
                <input
                  style={inputStyle}
                  type="password"
                  value={pwForm.currentPassword}
                  onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <p style={labelStyle}>Nueva contraseña</p>
                <input
                  style={inputStyle}
                  type="password"
                  value={pwForm.newPassword}
                  onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <p style={labelStyle}>Confirmar nueva contraseña</p>
                <input
                  style={inputStyle}
                  type="password"
                  value={pwForm.confirmPassword}
                  onChange={e => setPwForm(f => ({ ...f, confirmPassword: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {pwError && (
              <div style={{
                padding: '10px 14px', borderRadius: 12, marginBottom: 16,
                background: '#FCEBEB', border: '1px solid #F09595',
                fontSize: 13, color: '#791F1F',
              }}>
                {pwError}
              </div>
            )}

            {pwSuccess && (
              <div style={{
                padding: '10px 14px', borderRadius: 12, marginBottom: 16,
                background: '#eef1f9', border: '1px solid rgba(35,55,109,0.15)',
                fontSize: 13, color: '#23376d', fontWeight: 500,
              }}>
                ✓ Contraseña actualizada correctamente
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setMode('view')}
                style={{
                  flex: 1, padding: '11px', borderRadius: 14, fontSize: 14,
                  fontWeight: 500, cursor: 'pointer',
                  border: '1px solid var(--card-border)', background: 'var(--bone)', color: 'var(--ink)',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleChangePassword}
                disabled={pwSaving}
                style={{
                  flex: 2, padding: '11px', borderRadius: 14, fontSize: 14,
                  fontWeight: 600, cursor: pwSaving ? 'not-allowed' : 'pointer',
                  border: 'none', background: pwSaving ? 'rgba(35,55,109,0.3)' : '#23376d', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {pwSaving ? (
                  <>
                    <svg style={{ width: 15, height: 15, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="3" opacity="0.3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="rgba(35,55,109,0.3)" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Guardando…
                  </>
                ) : 'Actualizar contraseña'}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}