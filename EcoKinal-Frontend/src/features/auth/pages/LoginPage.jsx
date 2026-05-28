import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import Spinner from '../components/Spinner'
import {css} from '../../../Styles/LoginPage.js'
import icon from "../../../assets/icon.png";
import { ArrowLeftIcon, LeafIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from '../../../icons/IconsAuth.jsx'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, clearError } = useAuthStore()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    clearError()
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const showToast = (msg, type = 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return showToast('Completa todos los campos')

    const result = await login(form.email, form.password)

    if (result.success) {
      showToast('¡Bienvenido de nuevo!', 'success')
      const role = result.user?.role?.name  // 👈 role.name, no role directo

      setTimeout(() => {
        if (role === 'ADMIN_GENERAL') {
          navigate('/dashboard/admin')
        } else {
          navigate('/dashboard/usuario')
        }
      }, 800)
    } else {
      showToast(result.message)
    }
  }

  return (
    <>
      <style>{css}</style>

      {toast && <div className={`ek-toast ek-toast--${toast.type}`}>{toast.msg}</div>}

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
            
          </div>

          {/* Heading */}
          <div className="ek-heading">
            <h1>Hola,<br />Bienvenido</h1>
            <p>Ingresa a tu espacio ecológico</p>
          </div>

          {/* Form */}
          <form className="ek-form" onSubmit={handleSubmit} noValidate>

            <div className="ek-field">
              <label htmlFor="email">Correo electrónico</label>
              <div className="ek-input-wrap">
                <span className="ek-icon"><MailIcon /></span>
                <input
                  id="email" name="email" type="email"
                  autoComplete="email" placeholder="usuario@correo.com"
                  value={form.email} onChange={handleChange} disabled={isLoading}
                />
              </div>
            </div>

            <div className="ek-field">
              <label htmlFor="password">Contraseña</label>
              <div className="ek-input-wrap">
                <span className="ek-icon"><LockIcon /></span>
                <input
                  id="password" name="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password" placeholder="••••••••"
                  value={form.password} onChange={handleChange} disabled={isLoading}
                />
                <button type="button" className="ek-eye" onClick={() => setShowPass(p => !p)} aria-label="Mostrar contraseña">
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="ek-row">
              <label className="ek-check">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <span className="ek-checkmark" />
                Recuérdame
              </label>
              <Link to="/forgot-password" className="ek-forgot">¿Olvidaste tu contraseña?</Link>
            </div>

            <button type="submit" className="ek-btn" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" color="#fff" /> : 'Iniciar sesión'}
            </button>

          </form>

          <p className="ek-signup">
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>

        </div>

        {/* ── RIGHT ── */}
        <div className="ek-right">
          <div className="ek-image-slot">
            <img
              src={icon}
              alt="Logo"
              className="ek-right-icon"
            />
          </div>

          <div className="ek-right-text">
            <h2>Cuida el planeta,<br />un paso a la vez.</h2>
            <p>Gestiona tus recursos de forma inteligente y sostenible.</p>
          </div>
        </div>

      </div>
    </>
  )
}