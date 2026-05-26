import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import Spinner from '../components/Spinner'

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
          <Link to="/" className="ek-back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver al inicio
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

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --eco-green: #2d6a4f; --eco-mid: #40916c; --eco-light: #74c69d;
    --eco-pale: #d8f3dc;  --eco-dark: #1b4332; --eco-cream: #fafaf8;
    --eco-ink:  #1a2e22;  --eco-muted: #6b7c72; --radius: 14px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--eco-cream); }

  .ek-wrap { display: flex; min-height: 100vh; }

  /* LEFT */
  .ek-left {
    flex: 1; display: flex; flex-direction: column; justify-content: center;
    padding: 48px 56px; max-width: 540px;
    animation: fadeSlideIn 0.6s ease both;
  }
  @keyframes fadeSlideIn { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }

  .ek-brand { display:flex; align-items:center; gap:10px; margin-bottom:36px; }
  .ek-brand-name { font-family:'DM Serif Display',serif; font-size:20px; color:var(--eco-dark); }

  .ek-heading { margin-bottom:28px; }
  .ek-heading h1 { font-family:'DM Serif Display',serif; font-size:clamp(28px,3.5vw,40px); color:var(--eco-ink); line-height:1.2; margin-bottom:6px; }
  .ek-heading p  { font-size:14px; color:var(--eco-muted); }

  .ek-form { display:flex; flex-direction:column; gap:15px; }
  .ek-row-fields { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

  .ek-field { display:flex; flex-direction:column; gap:5px; }
  .ek-field label { font-size:11.5px; font-weight:600; color:var(--eco-ink); text-transform:uppercase; letter-spacing:0.2px; }

  .ek-input-wrap { position:relative; display:flex; align-items:center; }
  .ek-icon { position:absolute; left:13px; color:var(--eco-light); display:flex; align-items:center; pointer-events:none; }
  .ek-input-wrap input {
    width:100%; padding:12px 38px 12px 38px;
    border:1.5px solid #d1e8da; border-radius:var(--radius);
    background:white; font-size:13.5px; font-family:'DM Sans',sans-serif;
    color:var(--eco-ink); outline:none; transition:border-color 0.2s, box-shadow 0.2s;
  }
  .ek-input-wrap input::placeholder { color:#b0c4b8; }
  .ek-input-wrap input:focus { border-color:var(--eco-mid); box-shadow:0 0 0 3px rgba(64,145,108,0.12); }
  .ek-input-wrap input:disabled { opacity:0.6; cursor:not-allowed; }

  .ek-eye { position:absolute; right:11px; background:none; border:none; cursor:pointer; color:var(--eco-muted); display:flex; align-items:center; padding:4px; border-radius:6px; transition:color 0.15s; }
  .ek-eye:hover { color:var(--eco-green); }
  .ek-match-icon { position:absolute; right:36px; display:flex; align-items:center; }

  .ek-strength { display:flex; align-items:center; gap:8px; margin-top:4px; }
  .ek-strength-bar { display:flex; gap:4px; flex:1; }
  .ek-strength-seg { height:3px; flex:1; border-radius:99px; transition:background 0.3s; }
  .ek-strength span { font-size:11px; font-weight:600; white-space:nowrap; }

  .ek-btn {
    margin-top:4px; padding:13px; background:var(--eco-green); color:white;
    border:none; border-radius:var(--radius); font-size:15px; font-weight:600;
    font-family:'DM Sans',sans-serif; cursor:pointer;
    transition:background 0.2s, transform 0.12s, box-shadow 0.2s;
    box-shadow:0 4px 18px rgba(45,106,79,0.28); display:flex;
    align-items:center; justify-content:center; gap:8px; min-height:48px;
  }
  .ek-btn:hover:not(:disabled) { background:var(--eco-mid); transform:translateY(-1px); box-shadow:0 6px 24px rgba(45,106,79,0.35); }
  .ek-btn:disabled { opacity:0.65; cursor:not-allowed; }

  .ek-signup { margin-top:22px; font-size:14px; color:var(--eco-muted); text-align:center; }
  .ek-signup a { color:var(--eco-green); font-weight:600; text-decoration:none; }
  .ek-signup a:hover { text-decoration:underline; }

  /* RIGHT */
  .ek-right {
    flex:1; background:linear-gradient(145deg,#1b4332 0%,#2d6a4f 50%,#40916c 100%);
    display:flex; align-items:center; justify-content:center; padding:60px;
    animation:fadeIn 0.8s ease both 0.2s;
  }
  @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }

  .ek-right-text { text-align:center; max-width:360px; }
  .ek-right-text h2 { font-family:'DM Serif Display',serif; font-size:clamp(22px,2.8vw,34px); color:white; line-height:1.3; margin-bottom:14px; }
  .ek-right-text p  { font-size:14px; color:rgba(255,255,255,0.65); line-height:1.7; margin-bottom:32px; }

  .ek-features { display:flex; flex-direction:column; gap:12px; text-align:left; }
  .ek-feature { display:flex; align-items:center; gap:10px; }
  .ek-feature span { font-size:13.5px; color:rgba(255,255,255,0.8); }

  /* Toast */
  .ek-toast { position:fixed; top:24px; left:50%; transform:translateX(-50%); padding:12px 24px; border-radius:10px; font-size:14px; font-family:'DM Sans',sans-serif; font-weight:500; z-index:9999; animation:toastIn 0.3s ease; box-shadow:0 4px 20px rgba(0,0,0,0.15); white-space:nowrap; }
  .ek-toast--error   { background:#dc2626; color:white; }
  .ek-toast--success { background:var(--eco-green); color:white; }
  @keyframes toastIn { from{opacity:0;transform:translate(-50%,-10px);} to{opacity:1;transform:translate(-50%,0);} }

  @media (max-width:768px) {
    .ek-right { display:none; }
    .ek-left  { max-width:100%; padding:36px 24px; }
    .ek-row-fields { grid-template-columns:1fr; }
  }
`
