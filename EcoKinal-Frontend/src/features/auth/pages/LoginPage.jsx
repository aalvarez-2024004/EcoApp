import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import Spinner from '../components/Spinner'

// ─── Leaf SVG decoration ──────────────────────────────────────────────────────
const LeafIcon = ({ style }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path
      d="M10 70 C10 70 15 20 60 10 C60 10 65 55 10 70Z"
      fill="currentColor"
      opacity="0.18"
    />
    <path d="M10 70 C35 45 55 30 60 10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
  </svg>
)

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()

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
    if (!form.email || !form.password) {
      showToast('Completa todos los campos')
      return
    }
    const result = await login(form.email, form.password)
    if (result.success) {
      showToast('¡Bienvenido de nuevo!', 'success')
      setTimeout(() => navigate('/dashboard'), 800)
    } else {
      showToast(result.message)
    }
  }

  return (
    <>
      <style>{css}</style>

      {/* Toast */}
      {toast && (
        <div className={`ek-toast ek-toast--${toast.type}`}>{toast.msg}</div>
      )}

      <div className="ek-wrap">
        {/* ── LEFT PANEL ── */}
        <div className="ek-left">
          {/* Brand */}
          <div className="ek-brand">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#2d6a4f" />
              <path d="M8 24C8 24 10 10 24 8C24 8 26 22 8 24Z" fill="white" />
              <path d="M8 24C16 16 22 12 24 8" stroke="#b7e4c7" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="ek-brand-name">EcoKinal</span>
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
                <span className="ek-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="usuario@correo.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="ek-field">
              <label htmlFor="password">Contraseña</label>
              <div className="ek-input-wrap">
                <span className="ek-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="ek-eye"
                  onClick={() => setShowPass((p) => !p)}
                  aria-label="Mostrar contraseña"
                >
                  {showPass
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            <div className="ek-row">
              <label className="ek-check">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
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
            ¿No tienes cuenta?{' '}
            <Link to="/register">Regístrate aquí</Link>
          </p>
        </div>

        <div className="ek-right">
          <LeafIcon style={{ position: 'absolute', top: 30, right: 40, width: 120, height: 120, color: '#b7e4c7' }} />
          <LeafIcon style={{ position: 'absolute', bottom: 60, left: 30, width: 90, height: 90, color: '#95d5b2', transform: 'rotate(200deg)' }} />

          <div className="ek-image-slot">
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" style={{ opacity: 0.25 }}>
              <circle cx="90" cy="90" r="70" stroke="white" strokeWidth="2" strokeDasharray="8 6" />
              <path d="M40 140C40 140 50 60 140 40C140 40 150 120 40 140Z" fill="white" />
              <path d="M40 140C90 90 130 65 140 40" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 12, fontFamily: 'inherit' }}>
              Tu imagen va aquí
            </p>
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

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --eco-green:   #2d6a4f;
    --eco-mid:     #40916c;
    --eco-light:   #74c69d;
    --eco-pale:    #d8f3dc;
    --eco-dark:    #1b4332;
    --eco-cream:   #fafaf8;
    --eco-ink:     #1a2e22;
    --eco-muted:   #6b7c72;
    --radius:      14px;
    --shadow:      0 8px 40px rgba(27,67,50,0.13);
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--eco-cream); }

  /* ── WRAP ── */
  .ek-wrap {
    display: flex;
    min-height: 100vh;
    background: var(--eco-cream);
  }

  /* ── LEFT ── */
  .ek-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 64px;
    max-width: 520px;
    animation: fadeSlideIn 0.6s ease both;
  }

  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* Brand */
  .ek-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 48px;
  }
  .ek-brand-name {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: var(--eco-dark);
    letter-spacing: -0.3px;
  }

  /* Heading */
  .ek-heading { margin-bottom: 36px; }
  .ek-heading h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(32px, 4vw, 44px);
    color: var(--eco-ink);
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 8px;
  }
  .ek-heading p {
    font-size: 14px;
    color: var(--eco-muted);
    font-weight: 400;
  }

  /* Form */
  .ek-form { display: flex; flex-direction: column; gap: 18px; }
  .ek-field { display: flex; flex-direction: column; gap: 6px; }
  .ek-field label {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--eco-ink);
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .ek-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .ek-icon {
    position: absolute;
    left: 14px;
    color: var(--eco-light);
    display: flex;
    align-items: center;
    pointer-events: none;
  }
  .ek-input-wrap input {
    width: 100%;
    padding: 13px 42px 13px 40px;
    border: 1.5px solid #d1e8da;
    border-radius: var(--radius);
    background: white;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: var(--eco-ink);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ek-input-wrap input::placeholder { color: #b0c4b8; }
  .ek-input-wrap input:focus {
    border-color: var(--eco-mid);
    box-shadow: 0 0 0 3px rgba(64,145,108,0.12);
  }
  .ek-input-wrap input:disabled { opacity: 0.6; cursor: not-allowed; }

  .ek-eye {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--eco-muted);
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: 6px;
    transition: color 0.15s;
  }
  .ek-eye:hover { color: var(--eco-green); }

  /* Remember + forgot */
  .ek-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -4px;
  }
  .ek-check {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--eco-muted);
    cursor: pointer;
    user-select: none;
  }
  .ek-check input { display: none; }
  .ek-checkmark {
    width: 17px;
    height: 17px;
    border: 1.5px solid #b0c4b8;
    border-radius: 5px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.15s, border-color 0.15s;
  }
  .ek-check input:checked + .ek-checkmark {
    background: var(--eco-mid);
    border-color: var(--eco-mid);
  }
  .ek-check input:checked + .ek-checkmark::after {
    content: '';
    display: block;
    width: 5px;
    height: 9px;
    border: 2px solid white;
    border-top: none;
    border-left: none;
    transform: rotate(45deg) translate(-1px,-1px);
  }
  .ek-forgot {
    font-size: 13px;
    color: var(--eco-mid);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.15s;
  }
  .ek-forgot:hover { color: var(--eco-dark); }

  /* Button */
  .ek-btn {
    margin-top: 4px;
    padding: 14px;
    background: var(--eco-green);
    color: white;
    border: none;
    border-radius: var(--radius);
    font-size: 15px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.2s, transform 0.12s, box-shadow 0.2s;
    box-shadow: 0 4px 18px rgba(45,106,79,0.28);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 50px;
  }
  .ek-btn:hover:not(:disabled) {
    background: var(--eco-mid);
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(45,106,79,0.35);
  }
  .ek-btn:active:not(:disabled) { transform: translateY(0); }
  .ek-btn:disabled { opacity: 0.65; cursor: not-allowed; }

  /* Sign up */
  .ek-signup {
    margin-top: 28px;
    font-size: 14px;
    color: var(--eco-muted);
    text-align: center;
  }
  .ek-signup a {
    color: var(--eco-green);
    font-weight: 600;
    text-decoration: none;
  }
  .ek-signup a:hover { text-decoration: underline; }

  /* ── RIGHT ── */
  .ek-right {
    flex: 1;
    background: linear-gradient(145deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    animation: fadeIn 0.8s ease both 0.2s;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .ek-image-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .ek-right-text {
    padding: 0 48px 52px;
    text-align: center;
  }
  .ek-right-text h2 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(22px, 2.5vw, 30px);
    color: white;
    line-height: 1.3;
    margin-bottom: 10px;
  }
  .ek-right-text p {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
  }

  /* Toast */
  .ek-toast {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    z-index: 9999;
    animation: toastIn 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    white-space: nowrap;
  }
  .ek-toast--error   { background: #dc2626; color: white; }
  .ek-toast--success { background: var(--eco-green); color: white; }
  @keyframes toastIn { from { opacity: 0; transform: translate(-50%, -10px); } to { opacity: 1; transform: translate(-50%, 0); } }

  /* Responsive */
  @media (max-width: 768px) {
    .ek-right { display: none; }
    .ek-left { max-width: 100%; padding: 40px 28px; }
  }
`
