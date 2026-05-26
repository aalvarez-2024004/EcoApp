import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import Spinner from '../components/Spinner'
import {css} from '../../../Styles/RegisterPage.js'
import { ArrowLeftIcon, LeafIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from '../../../icons/IconsAuth.jsx'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, isLoading, clearError } = useAuthStore()

  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    clearError()
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const showToast = (msg, type = 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3800)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, username, email, password, confirm } = form

    if (!name || !username || !email || !password || !confirm) {
      return showToast('Completa todos los campos')
    }
    if (password.length < 8) {
      return showToast('La contraseña debe tener al menos 8 caracteres')
    }
    if (password !== confirm) {
      return showToast('Las contraseñas no coinciden')
    }

    const result = await register({ name, username, email, password })
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
          <Link
            to="/"
            style={{
              textDecoration: "none",
              marginBottom: 28,
              display: "block",
              width: "fit-content"
            }}
          >
            <button type="button" className="ek-back-btn">
              <div className="ek-back-slider">
                <ArrowLeftIcon size={25} />
              </div>

              <span className="ek-back-text">
                Volver
              </span>
            </button>
          </Link>
          {/* Brand */}
          <div className="ek-brand">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#2d6a4f" />
              <path d="M8 24C8 24 10 10 24 8C24 8 26 22 8 24Z" fill="white" />
              <path d="M8 24C16 16 22 12 24 8" stroke="#b7e4c7" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="ek-brand-name">EcoKinal</span>
          </div>

          <div className="ek-heading">
            <h1>Únete a<br />EcoKinal</h1>
            <p>Crea tu cuenta y comienza a gestionar mejor</p>
          </div>

          <form className="ek-form" onSubmit={handleSubmit} noValidate>
            {/* Name */}
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

            {/* Email */}
            <div className="ek-field">
              <label htmlFor="email">Correo electrónico</label>
              <div className="ek-input-wrap">
                <span className="ek-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <input id="email" name="email" type="email" placeholder="usuario@correo.com" value={form.email} onChange={handleChange} disabled={isLoading} />
              </div>
            </div>

            {/* Password */}
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
              {/* Strength bar */}
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

            {/* Confirm */}
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
              {isLoading ? <Spinner size="sm" color="#fff" /> : 'Crear cuenta'}
            </button>
          </form>

          <p className="ek-signup">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login">Inicia sesión</Link>
          </p>
        </div>

        {/* ── RIGHT ── */}
        <div className="ek-right">
          <div className="ek-right-text">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: 16 }}>
              <circle cx="32" cy="32" r="32" fill="rgba(255,255,255,0.1)" />
              <path d="M16 48C16 48 20 20 48 16C48 16 52 44 16 48Z" fill="white" opacity="0.7" />
              <path d="M16 48C32 32 44 24 48 16" stroke="#b7e4c7" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h2>Juntos por un<br />mundo más verde</h2>
            <p>Tu cuenta te da acceso a herramientas diseñadas para promover la sostenibilidad y el cuidado del medio ambiente.</p>

            <div className="ek-features">
              {['Gestión inteligente de recursos', 'Reportes ambientales en tiempo real', 'Comunidad comprometida con el planeta'].map((f) => (
                <div className="ek-feature" key={f}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#74c69d" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}