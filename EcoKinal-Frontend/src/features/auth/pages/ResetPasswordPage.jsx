import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import Spinner from '../components/Spinner'
import { css } from '../../../Styles/ResetPasswordPage.js'
import { ArrowLeftIcon, LeafIcon, LockIcon, EyeIcon, EyeOffIcon, CheckIcon, XIcon } from '../../../icons/IconsAuth.jsx'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { resetPassword, isLoading, clearError } = useAuthStore()

  const [form, setForm] = useState({ password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3800)
  }

  const handleChange = (e) => {
    clearError()
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { password, confirm } = form

    if (!password || !confirm) return showToast('Completa todos los campos')
    if (password.length < 8) return showToast('La contraseña debe tener al menos 8 caracteres')
    if (password !== confirm) return showToast('Las contraseñas no coinciden')
    if (!token) return showToast('Token inválido, solicita un nuevo enlace')

    const result = await resetPassword(token, password)
    if (result.success) {
      setDone(true)
      showToast('¡Contraseña actualizada!', 'success')
      setTimeout(() => navigate('/login'), 2500)
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

          <Link
            to="/login"
            style={{ textDecoration: 'none', marginBottom: 28, display: 'block', width: 'fit-content' }}
          >
            <button type="button" className="ek-back-btn">
              <div className="ek-back-slider">
                <ArrowLeftIcon size={25} />
              </div>
              <span className="ek-back-text">Login</span>
            </button>
          </Link>

          <div className="ek-brand">
            <LeafIcon size={32} />
            <span className="ek-brand-name">EcoKinal</span>
          </div>

          <div className="ek-heading">
            {!done ? (
              <>
                <h1>Nueva<br />contraseña</h1>
                <p>Elige una contraseña segura para proteger tu cuenta.</p>
              </>
            ) : (
              <>
                <h1>¡Todo<br />listo!</h1>
                <p>Tu contraseña fue actualizada. Redirigiendo al login...</p>
              </>
            )}
          </div>

          {/* ── FORMULARIO ── */}
          {!done && (
            <form className="ek-form" onSubmit={handleSubmit} noValidate>

              <div className="ek-field">
                <label htmlFor="password">Nueva contraseña</label>
                <div className="ek-input-wrap">
                  <span className="ek-icon"><LockIcon /></span>
                  <input
                    id="password"
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Mín. 8 caracteres"
                    value={form.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <button type="button" className="ek-eye" onClick={() => setShowPass(p => !p)}>
                    {showPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                {/* Strength bar */}
                {form.password && (
                  <div className="ek-strength">
                    <div className="ek-strength-bar">
                      {[1, 2, 3, 4].map(i => (
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
                  <span className="ek-icon"><LockIcon /></span>
                  <input
                    id="confirm"
                    name="confirm"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Repite la contraseña"
                    value={form.confirm}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {form.confirm && (
                    <span className="ek-match-icon">
                      {form.password === form.confirm ? <CheckIcon /> : <XIcon />}
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" className="ek-btn" disabled={isLoading}>
                {isLoading ? <Spinner size="sm" color="#fff" /> : 'Guardar nueva contraseña'}
              </button>

            </form>
          )}

          {/* ── ÉXITO ── */}
          {done && (
            <div className="ek-state-card ek-state-card--success">
              <div className="ek-state-icon ek-state-icon--success">
                <CheckIcon size={28} />
              </div>
              <p>Contraseña actualizada correctamente. Serás redirigido al login en unos segundos.</p>
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
              <LockIcon size={64} />
            </div>
            <h2>Crea una<br />contraseña segura</h2>
            <p>Una buena contraseña protege tu cuenta y tus datos. Usa una combinación de letras, números y símbolos.</p>

            <div className="ek-features">
              {[
                'Mínimo 8 caracteres',
                'Combina mayúsculas y números',
                'Agrega un símbolo para más seguridad',
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