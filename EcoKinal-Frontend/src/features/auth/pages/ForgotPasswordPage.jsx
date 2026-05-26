import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import Spinner from '../components/Spinner'
import { css } from '../../../Styles/ForgotPasswordPage.js'
import { ArrowLeftIcon, LeafIcon, MailIcon, CheckIcon } from '../../../icons/IconsAuth.jsx'

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading, clearError } = useAuthStore()

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3800)
  }

  const maskEmail = (e) => {
    const [user, domain] = e.split('@')
    return `${user.slice(0, 2)}${'*'.repeat(Math.max(user.length - 2, 3))}@${domain}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()
    if (!email) return showToast('Ingresa tu correo electrónico')
    if (!/\S+@\S+\.\S+/.test(email)) return showToast('Ingresa un correo válido')

    const result = await forgotPassword(email)
    if (result.success) {
      setSent(true)
    } else {
      showToast(Array.isArray(result.message) ? result.message[0] : result.message)
    }
  }

  const handleResend = async () => {
    const result = await forgotPassword(email)
    if (result.success) {
      showToast('Correo reenviado correctamente', 'success')
    } else {
      showToast(Array.isArray(result.message) ? result.message[0] : result.message)
    }
  }

  return (
    <>
      <style>{css}</style>

      {toast && (
        <div className={`ek-toast ek-toast--${toast.type}`}>{toast.msg}</div>
      )}

      <div className="ek-wrap">

        {/* ── LEFT ── */}
        <div className="ek-left">

          <Link to="/login" style={{ textDecoration: 'none', marginBottom: 28, display: 'block', width: 'fit-content' }}>
            <button type="button" className="ek-back-btn">
              <div className="ek-back-slider">
                <ArrowLeftIcon size={25} />
              </div>
              <span className="ek-back-text">Login</span>
            </button>
          </Link>

          <div className="ek-brand">
            
          </div>

          <div className="ek-heading">
            {!sent ? (
              <>
                <h1>¿Olvidaste tu<br />contraseña?</h1>
                <p>Ingresa tu correo y te enviaremos un enlace para restablecerla.</p>
              </>
            ) : (
              <>
                <h1>Revisa tu<br />correo</h1>
                <p>Enviamos las instrucciones a <strong>{maskEmail(email)}</strong></p>
              </>
            )}
          </div>

          {/* ── PASO 1: formulario ── */}
          {!sent && (
            <form className="ek-form" onSubmit={handleSubmit} noValidate>
              <div className="ek-field">
                <label htmlFor="email">Correo electrónico</label>
                <div className="ek-input-wrap">
                  <span className="ek-icon"><MailIcon /></span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="usuario@correo.com"
                    value={email}
                    onChange={(e) => { clearError(); setEmail(e.target.value) }}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>
              </div>

              <button type="submit" className="ek-btn" disabled={isLoading}>
                {isLoading ? <Spinner size="sm" color="#fff" /> : 'Enviar instrucciones'}
              </button>
            </form>
          )}

          {/* ── PASO 2: confirmación enviada ── */}
          {sent && (
            <div className="ek-sent-state">
              <div className="ek-state-card ek-state-card--success">
                <div className="ek-state-icon ek-state-icon--success">
                  <CheckIcon size={28} />
                </div>
                <p>Correo enviado. Sigue el enlace para crear una nueva contraseña.</p>
              </div>

              <div className="ek-sent-actions">
                <button
                  type="button"
                  className="ek-btn ek-btn--outline"
                  onClick={handleResend}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="sm" color="#2d6a4f" /> : '¿No llegó? Reenviar'}
                </button>

                <button
                  type="button"
                  className="ek-btn"
                  onClick={() => { setSent(false); setEmail('') }}
                >
                  Usar otro correo
                </button>
              </div>
            </div>
          )}

          <p className="ek-signup" style={{ marginTop: 24 }}>
            ¿Recuerdas tu contraseña?{' '}
            <Link to="/login">Inicia sesión</Link>
          </p>

        </div>

        {/* ── RIGHT ── */}
        <div className="ek-right">
          <LeafIcon style={{ position: 'absolute', top: 30, right: 40, width: 120, height: 120, color: '#b7e4c7' }} />
          <LeafIcon style={{ position: 'absolute', bottom: 60, left: 30, width: 90, height: 90, color: '#95d5b2', transform: 'rotate(200deg)' }} />

          <div className="ek-right-text">
            <div className="ek-right-icon">
              <MailIcon size={64} />
            </div>
            <h2>Recupera el<br />acceso fácil</h2>
            <p>Te enviaremos un enlace seguro para que puedas crear una nueva contraseña sin complicaciones.</p>

            <div className="ek-features">
              {[
                'El enlace expira en 15 minutos',
                'Revisa spam si no ves el correo',
                'Puedes pedir otro si expiró',
              ].map((f) => (
                <div className="ek-feature" key={f}>
                  <CheckIcon />
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