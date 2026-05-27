import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import Spinner from '../components/Spinner'
import { css } from '../../../Styles/RegisterPage.js'
import logo from "../../../assets/logo_3.png"
import icon from "../../../assets/icon.png"
import { ArrowLeftIcon } from '../../../icons/IconsAuth.jsx'

/* ── Avatar default ── */
const DefaultAvatar = () => (
  <div style={{
    width: 110, height: 110, borderRadius: '50%',
    background: 'linear-gradient(135deg, #d8ede3, #b7d9c6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '3px solid #c8ddd2', flexShrink: 0,
  }}>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
      stroke="rgba(45,106,79,0.5)" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  </div>
)

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, isLoading, clearError } = useAuthStore()

  const [step, setStep]             = useState(1)
  const [form, setForm]             = useState({ name: '', username: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass]     = useState(false)
  const [toast, setToast]           = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleChange = (e) => {
    clearError()
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setProfileImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const showToast = (msg, type = 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3800)
  }

  const handleContinue = () => {
    const { name, username, email, password, confirm } = form
    if (!name || !username || !email || !password || !confirm)
      return showToast('Completa todos los campos')
    if (password.length < 8)
      return showToast('La contraseña debe tener al menos 8 caracteres')
    if (password !== confirm)
      return showToast('Las contraseñas no coinciden')
    setStep(2)
  }

  const handleSubmit = async (skipImage = false) => {
    const { name, username, email, password } = form
    const formData = new FormData()
    formData.append('name', name.trim())
    formData.append('username', username.trim())
    formData.append('email', email.trim())
    formData.append('password', password)
    if (!skipImage && profileImage) formData.append('profileImage', profileImage)

    const result = await register(formData)
    if (result.success) {
      showToast('¡Cuenta creada! Revisa tu correo para verificarla.', 'success')
      setTimeout(() => navigate('/login'), 2200)
    } else {
      showToast(Array.isArray(result.message) ? result.message[0] : result.message)
    }
  }

  const strength = (() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()
  const strengthLabel = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'][strength]
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#2d6a4f'][strength]

  return (
    <>
      <style>{css}</style>

      {toast && (
        <div className={`ek-toast ek-toast--${toast.type}`}>{toast.msg}</div>
      )}

      <div className="ek-wrap">

        {/* ── LEFT ── */}
        <div className="ek-left">

          {/* Botón volver */}
          {step === 1 ? (
            <Link to="/" style={{ textDecoration: 'none', marginBottom: 28, display: 'block', width: 'fit-content' }}>
              <button type="button" className="ek-back-btn">
                <div className="ek-back-slider"><ArrowLeftIcon size={25} /></div>
                <span className="ek-back-text">Volver</span>
              </button>
            </Link>
          ) : (
            <div style={{ marginBottom: 28 }}>
              <button type="button" className="ek-back-btn" onClick={() => setStep(1)}>
                <div className="ek-back-slider"><ArrowLeftIcon size={25} /></div>
                <span className="ek-back-text">Volver</span>
              </button>
            </div>
          )}

          {/* Brand */}
          <div className="ek-brand">
            <img src={icon} alt="EcoKinal" style={{ width: 22, height: 22 }} />
            <span>EcoKinal</span>
          </div>

          {/* Heading */}
          <div className="ek-heading">
            <h1>Únete a<br />EcoKinal</h1>
            <p>Crea tu cuenta y comienza a gestionar mejor</p>
          </div>

          {/* Indicador de pasos */}
          <div className="ek-steps">
            <div className={`ek-step-dot ${step >= 1 ? 'ek-step-dot--active' : ''}`} />
            <div className={`ek-step-line ${step >= 2 ? 'ek-step-line--done' : ''}`} />
            <div className={`ek-step-dot ${step >= 2 ? 'ek-step-dot--active' : ''}`} />
            <span className="ek-step-label">
              {step === 1 ? 'Paso 1 de 2 · Tus datos' : 'Paso 2 de 2 · Foto de perfil'}
            </span>
          </div>

          {/* ── PASO 1 ── */}
          {step === 1 && (
            <form className="ek-form" onSubmit={e => { e.preventDefault(); handleContinue() }} noValidate>

              <div className="ek-row-fields">
                <div className="ek-field">
                  <label htmlFor="name">Nombre</label>
                  <div className="ek-input-wrap">
                    <span className="ek-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="7" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></svg>
                    </span>
                    <input id="name" name="name" type="text" placeholder="Tu nombre" value={form.name} onChange={handleChange} disabled={isLoading} />
                  </div>
                </div>
                <div className="ek-field">
                  <label htmlFor="username">Usuario</label>
                  <div className="ek-input-wrap">
                    <span className="ek-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input id="username" name="username" type="text" placeholder="@usuario" value={form.username} onChange={handleChange} disabled={isLoading} />
                  </div>
                </div>
              </div>

              <div className="ek-field">
                <label htmlFor="email">Correo electrónico</label>
                <div className="ek-input-wrap">
                  <span className="ek-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                  <input id="email" name="email" type="email" placeholder="usuario@correo.com" value={form.email} onChange={handleChange} disabled={isLoading} />
                </div>
              </div>

              <div className="ek-field">
                <label htmlFor="password">Contraseña</label>
                <div className="ek-input-wrap">
                  <span className="ek-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input id="password" name="password" type={showPass ? 'text' : 'password'} placeholder="Mín. 8 caracteres" value={form.password} onChange={handleChange} disabled={isLoading} />
                  <button type="button" className="ek-eye" onClick={() => setShowPass(p => !p)}>
                    {showPass
                      ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                {form.password && (
                  <div className="ek-strength">
                    <div className="ek-strength-bar">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="ek-strength-seg" style={{ background: i <= strength ? strengthColor : '#e2e8e5' }} />
                      ))}
                    </div>
                    <span style={{ color: strengthColor }}>{strengthLabel}</span>
                  </div>
                )}
              </div>

              <div className="ek-field">
                <label htmlFor="confirm">Confirmar contraseña</label>
                <div className="ek-input-wrap">
                  <span className="ek-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </span>
                  <input id="confirm" name="confirm" type={showPass ? 'text' : 'password'} placeholder="Repite la contraseña" value={form.confirm} onChange={handleChange} disabled={isLoading} />
                  {form.confirm && (
                    <span className="ek-match-icon">
                      {form.password === form.confirm
                        ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      }
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" className="ek-btn" disabled={isLoading}>
                Continuar
              </button>

              <p className="ek-signup">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login">Inicia sesión</Link>
              </p>
            </form>
          )}

          {/* ── PASO 2 ── */}
          {step === 2 && (
            <div className="ek-form">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '8px 0 4px' }}>

                {/* Avatar */}
                <div style={{ position: 'relative' }}>
                  {imagePreview
                    ? <img src={imagePreview} alt="Vista previa" style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', border: '3px solid #c8ddd2' }} />
                    : <DefaultAvatar />
                  }
                  <label htmlFor="profileImageInput" style={{
                    position: 'absolute', bottom: 4, right: 4,
                    width: 30, height: 30, borderRadius: '50%',
                    background: '#2d6a4f', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', border: '2px solid #f8faf8',
                    transition: 'background .2s',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </label>
                  <input id="profileImageInput" type="file" accept="image/jpg,image/jpeg,image/png,image/webp,image/avif" style={{ display: 'none' }} onChange={handleImageChange} />
                </div>

                {/* Nombre preview */}
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontWeight: 700, fontSize: 15, color: '#1a2e1e' }}>{form.name || 'Tu nombre'}</p>
                  <p style={{ fontSize: 13, color: '#7a9e8a', marginTop: 2 }}>@{form.username || 'usuario'}</p>
                </div>

                <p style={{ fontSize: 12, color: '#a0b8ac', textAlign: 'center', lineHeight: 1.5 }}>
                  Toca el ícono de cámara para subir tu foto.<br />
                  JPG, PNG, WEBP · Máx. 10MB · (opcional)
                </p>

                {profileImage && (
                  <div className="ek-upload-filename">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74c69d" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {profileImage.name}
                    <button type="button" className="ek-upload-remove"
                      onClick={() => { setProfileImage(null); setImagePreview(null) }}>×</button>
                  </div>
                )}
              </div>

              <button type="button" className="ek-btn" disabled={isLoading} onClick={() => handleSubmit(false)}>
                {isLoading ? <Spinner size="sm" color="#fff" /> : 'Crear cuenta'}
              </button>

              <button type="button" disabled={isLoading}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#7a9e8a', textAlign: 'center', padding: '4px 0', fontFamily: 'inherit', textDecoration: 'underline' }}
                onClick={() => handleSubmit(true)}>
                Omitir por ahora
              </button>
            </div>
          )}

        </div>

        {/* ── RIGHT (solo decorativo — pon tu imagen de fondo en RegisterPage.css) ── */}
        <div className="ek-right">
          {/* El contenido visual va en tu CSS como background-image en .ek-right */}
          {/* El texto de abajo lo puedes dejar o quitar según tu imagen */}
          <div className="ek-right-text">
            <h2>Únete al<br />cambio verde.</h2>
            <p>Gestiona tus recursos de forma inteligente y sostenible.</p>
          </div>
        </div>

      </div>
    </>
  )
}