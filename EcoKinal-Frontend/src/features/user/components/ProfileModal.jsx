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
        profilePicture: data.user?.profilePicture ?? data.user?.photo ?? data.user?.image ?? previewImage,
        photo: data.user?.profilePicture ?? data.user?.photo ?? data.user?.image ?? previewImage,
        image: data.user?.profilePicture ?? data.user?.photo ?? data.user?.image ?? previewImage,
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
      setTimeout(() => {
        setPwSuccess(false)
        setMode('view')
        setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }, 1500)
    } catch (err) {
      setPwError(err.response?.data?.error || 'Error al cambiar la contraseña')
    } finally {
      setPwSaving(false)
    }
  }

  const styles = {
    overlay: {
      position: 'fixed', inset: 0,
      background: 'rgba(10, 26, 10, 0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, backdropFilter: 'blur(6px)',
    },
    modal: {
      background: '#FAFAF7',
      borderRadius: 28,
      width: 420,
      maxHeight: '92vh',
      overflowY: 'auto',
      border: '1px solid rgba(60, 109, 17, 0.15)',
      boxShadow: '0 32px 64px rgba(10, 40, 10, 0.18), 0 0 0 1px rgba(60,109,17,0.08)',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    },
    topBanner: {
      background: 'linear-gradient(135deg, #1B4D1B 0%, #2D6A2D 60%, #3B7A2A 100%)',
      borderRadius: '28px 28px 0 0',
      padding: '24px 24px 60px',
      position: 'relative',
      overflow: 'hidden',
    },
    bannerLeaf1: {
      position: 'absolute', right: -20, top: -20,
      width: 120, height: 120,
      borderRadius: '60% 40% 70% 30%',
      background: 'rgba(255,255,255,0.05)',
    },
    bannerLeaf2: {
      position: 'absolute', right: 30, bottom: -30,
      width: 80, height: 80,
      borderRadius: '40% 60% 30% 70%',
      background: 'rgba(255,255,255,0.04)',
    },
    headerRow: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    headerTitle: {
      fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)',
      margin: 0, letterSpacing: '0.01em',
    },
    iconBtn: {
      background: 'rgba(255,255,255,0.12)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: 10, width: 32, height: 32,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', color: '#fff', transition: 'background 0.15s',
    },
    avatarFloat: {
      position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      marginTop: -44,
      marginBottom: 12,
    },
    avatarRing: {
      padding: 4,
      background: '#FAFAF7',
      borderRadius: '50%',
      boxShadow: '0 4px 16px rgba(27,77,27,0.18)',
    },
    body: {
      padding: '0 24px 28px',
    },
    nameBlock: {
      textAlign: 'center', marginBottom: 24,
    },
    nameText: {
      fontSize: 20, fontWeight: 700, color: '#1A2E1A', margin: '0 0 2px',
      letterSpacing: '-0.01em',
    },
    usernameText: {
      fontSize: 13, color: '#5A7A5A', margin: 0, fontWeight: 500,
    },
    infoCard: {
      background: '#fff',
      border: '1px solid rgba(60,109,17,0.12)',
      borderRadius: 16,
      padding: '4px 0',
      marginBottom: 20,
    },
    infoRow: {
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 16px',
    },
    infoRowBorder: {
      borderTop: '1px solid rgba(60,109,17,0.08)',
    },
    infoIcon: {
      width: 34, height: 34, borderRadius: 10,
      background: 'rgba(60,109,17,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      color: '#2D6A2D', fontSize: 16,
    },
    infoLabel: {
      fontSize: 11, color: '#8A9E8A', fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 2px',
    },
    infoValue: {
      fontSize: 14, color: '#1A2E1A', fontWeight: 500, margin: 0,
    },
    btnPrimary: {
      width: '100%', padding: '13px',
      borderRadius: 14, fontSize: 14, fontWeight: 600,
      cursor: 'pointer', border: 'none',
      background: 'linear-gradient(135deg, #1B4D1B 0%, #2D6A2D 100%)',
      color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      letterSpacing: '0.01em', transition: 'opacity 0.15s',
    },
    btnSecondary: {
      width: '100%', padding: '13px',
      borderRadius: 14, fontSize: 14, fontWeight: 500,
      cursor: 'pointer',
      border: '1px solid rgba(60,109,17,0.2)',
      background: '#fff', color: '#2D6A2D',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      transition: 'background 0.15s',
    },
    btnStack: {
      display: 'flex', flexDirection: 'column', gap: 10,
    },
    label: {
      fontSize: 11, color: '#8A9E8A', fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '0.06em',
      margin: '0 0 6px',
    },
    input: {
      width: '100%', padding: '11px 14px',
      borderRadius: 12, fontSize: 14,
      border: '1px solid rgba(60,109,17,0.18)',
      background: '#fff', color: '#1A2E1A',
      outline: 'none', boxSizing: 'border-box',
      fontFamily: 'inherit', transition: 'border-color 0.15s',
    },
    inputDisabled: {
      opacity: 0.5, cursor: 'not-allowed',
      background: '#F5F5F0',
    },
    fieldGroup: {
      display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 22,
    },
    alertError: {
      padding: '10px 14px', borderRadius: 12, marginBottom: 14,
      background: '#FEF2F2', border: '1px solid #FECACA',
      fontSize: 13, color: '#991B1B', lineHeight: 1.4,
    },
    alertSuccess: {
      padding: '10px 14px', borderRadius: 12, marginBottom: 14,
      background: '#F0FDF4', border: '1px solid rgba(60,109,17,0.25)',
      fontSize: 13, color: '#166534', fontWeight: 500,
    },
    btnRow: {
      display: 'flex', gap: 10,
    },
    btnCancel: {
      flex: 1, padding: '12px',
      borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: 'pointer',
      border: '1px solid rgba(60,109,17,0.18)',
      background: '#fff', color: '#5A7A5A',
    },
    btnSave: (disabled) => ({
      flex: 2, padding: '12px',
      borderRadius: 14, fontSize: 14, fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: 'none',
      background: disabled
        ? 'rgba(45,106,45,0.35)'
        : 'linear-gradient(135deg, #1B4D1B 0%, #2D6A2D 100%)',
      color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }),
  }

  const Spinner = () => (
    <svg style={{ width: 15, height: 15, animation: 'ekSpin 1s linear infinite' }} viewBox="0 0 24 24" fill="none">
      <style>{`@keyframes ekSpin { to { transform: rotate(360deg) } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={styles.modal}>

        {/* ── Top banner ── */}
        <div style={styles.topBanner}>
          <div style={styles.bannerLeaf1} />
          <div style={styles.bannerLeaf2} />
          <div style={styles.headerRow}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {mode !== 'view' && (
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); // Evita interferencias
                    setMode('view'); 
                    setSaveError(null); 
                    setPwError(null); 
                  }}
                  style={styles.iconBtn}
                  type="button"
                >
                  <i className="ti ti-arrow-left" style={{ fontSize: 16 }} />
                </button>
              )}
              <p style={styles.headerTitle}>
                {mode === 'view' && 'Mi perfil'}
                {mode === 'edit' && 'Editar perfil'}
                {mode === 'password' && 'Cambiar contraseña'}
              </p>
            </div>
            
            {/* AQUÍ ESTÁ EL AJUSTE IMPORTANTE: Forzamos la ejecución limpia del onClose */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                console.log('CLICK X')
                onClose()
              }}
              style={{
                ...styles.iconBtn,
                zIndex: 9999
              }}
              type="button"
            >
              <i
                className="ti ti-x"
                style={{
                  fontSize: 16,
                  pointerEvents: 'none'
                }}
              />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={styles.body}>

          {mode === 'view' && (
            <>
              <div style={styles.avatarFloat}>
                <div style={styles.avatarRing}>
                  <Avatar image={image} initials={initials} size={72} />
                </div>
              </div>

              <div style={styles.nameBlock}>
                <p style={styles.nameText}>{name}</p>
                <p style={styles.usernameText}>@{username}</p>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.infoRow}>
                  <div style={styles.infoIcon}>
                    <i className="ti ti-mail" />
                  </div>
                  <div>
                    <p style={styles.infoLabel}>Correo electrónico</p>
                    <p style={styles.infoValue}>{email}</p>
                  </div>
                </div>
                <div style={{ ...styles.infoRow, ...styles.infoRowBorder }}>
                  <div style={styles.infoIcon}>
                    <i className="ti ti-at" />
                  </div>
                  <div>
                    <p style={styles.infoLabel}>Nombre de usuario</p>
                    <p style={styles.infoValue}>@{username}</p>
                  </div>
                </div>
              </div>

              <div style={styles.btnStack}>
                <button
                  onClick={() => { setForm({ name, username }); setPreviewImage(image); setImageFile(null); setMode('edit') }}
                  style={styles.btnPrimary}
                  type="button"
                >
                  <i className="ti ti-pencil" style={{ fontSize: 16 }} />
                  Editar perfil
                </button>
                <button onClick={() => setMode('password')} style={styles.btnSecondary} type="button">
                  <i className="ti ti-lock" style={{ fontSize: 16 }} />
                  Cambiar contraseña
                </button>
              </div>
            </>
          )}

          {mode === 'edit' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 24, marginTop: 8 }}>
                <div style={{ position: 'relative' }}>
                  <div style={styles.avatarRing}>
                    <Avatar image={previewImage} initials={initials} size={72} />
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute', bottom: 2, right: 2,
                      width: 26, height: 26, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1B4D1B, #2D6A2D)',
                      border: '2px solid #FAFAF7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    type="button"
                  >
                    <i className="ti ti-camera" style={{ fontSize: 12, color: '#fff' }} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </div>
                <p style={{ fontSize: 12, color: '#8A9E8A', margin: 0 }}>Toca la cámara para cambiar tu foto</p>
              </div>

              <div style={styles.fieldGroup}>
                <div>
                  <p style={styles.label}>Nombre</p>
                  <input
                    style={styles.input}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <p style={styles.label}>Nombre de usuario</p>
                  <input
                    style={styles.input}
                    value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                    placeholder="tu_username"
                  />
                </div>
                <div>
                  <p style={styles.label}>Correo electrónico</p>
                  <input
                    style={{ ...styles.input, ...styles.inputDisabled }}
                    value={email}
                    disabled
                  />
                  <p style={{ fontSize: 11, color: '#8A9E8A', margin: '4px 0 0 4px' }}>El correo no se puede modificar</p>
                </div>
              </div>

              {saveError && <div style={styles.alertError}>{saveError}</div>}
              {saveSuccess && <div style={styles.alertSuccess}>✓ Perfil actualizado correctamente</div>}

              <div style={styles.btnRow}>
                <button onClick={() => setMode('view')} style={styles.btnCancel} type="button">Cancelar</button>
                <button onClick={handleSaveProfile} disabled={saving} style={styles.btnSave(saving)} type="button">
                  {saving ? <><Spinner /> Guardando…</> : 'Guardar cambios'}
                </button>
              </div>
            </>
          )}

          {mode === 'password' && (
            <>
              <div style={{ ...styles.fieldGroup, marginTop: 8 }}>
                <div>
                  <p style={styles.label}>Contraseña actual</p>
                  <input
                    style={styles.input} type="password"
                    value={pwForm.currentPassword}
                    onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))}
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <p style={styles.label}>Nueva contraseña</p>
                  <input
                    style={styles.input} type="password"
                    value={pwForm.newPassword}
                    onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))}
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <p style={styles.label}>Confirmar nueva contraseña</p>
                  <input
                    style={styles.input} type="password"
                    value={pwForm.confirmPassword}
                    onChange={e => setPwForm(f => ({ ...f, confirmPassword: e.target.value }))}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {pwError && <div style={styles.alertError}>{pwError}</div>}
              {pwSuccess && <div style={styles.alertSuccess}>✓ Contraseña actualizada correctamente</div>}

              <div style={styles.btnRow}>
                <button onClick={() => setMode('view')} style={styles.btnCancel} type="button">Cancelar</button>
                <button onClick={handleChangePassword} disabled={pwSaving} style={styles.btnSave(pwSaving)} type="button">
                  {pwSaving ? <><Spinner /> Guardando…</> : 'Actualizar contraseña'}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}