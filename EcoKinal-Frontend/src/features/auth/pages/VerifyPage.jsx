import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import Spinner from '../components/Spinner'
import { css } from '../../../Styles/constants/VerifyPage.js'
import { ArrowLeftIcon, LeafIcon, MailIcon, CheckIcon, XIcon } from '../../../icons/IconsAuth.jsx'

export default function VerifyPage() {
  const navigate = useNavigate()
  const { token } = useParams()
  const { verifyEmail } = useAuthStore()

  const [status, setStatus] = useState('verifying')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3800)
  }

  useEffect(() => {
    if (!token) {
      setStatus('error')
      return
    }

    const run = async () => {
      const result = await verifyEmail(token)
      if (result.success) {
        setStatus('success')
      } else {
        setStatus('error')
        showToast(Array.isArray(result.message) ? result.message[0] : result.message)
      }
    }

    run()
  }, [token])

  return (
    <>
      <style>{css}</style>

      {toast && (
        <div className={`ek-toast ek-toast--${toast.type}`}>{toast.msg}</div>
      )}

      <div className="ek-wrap">

        {/* ── LEFT ── */}
        <div className="ek-left">

          <Link to="/" style={{ textDecoration: 'none', marginBottom: 28, display: 'block', width: 'fit-content' }}>
            <button type="button" className="ek-back-btn">
              <div className="ek-back-slider">
                <ArrowLeftIcon size={25} />
              </div>
              <span className="ek-back-text">Inicio</span>
            </button>
          </Link>

          <div className="ek-brand">
            <LeafIcon size={40} />
          </div>

          <div className="ek-heading">
            {status === 'verifying' && (
              <>
                <h1>Verificando<br />tu cuenta</h1>
                <p>Espera un momento, estamos confirmando tu correo...</p>
              </>
            )}
            {status === 'success' && (
              <>
                <h1>¡Cuenta<br />verificada!</h1>
                <p>Tu correo fue confirmado correctamente. Ya puedes iniciar sesión.</p>
              </>
            )}
            {status === 'error' && (
              <>
                <h1>Enlace<br />inválido</h1>
                <p>El enlace expiró o ya fue usado. Solicita uno nuevo desde el login.</p>
              </>
            )}
          </div>

          {/* Estado visual */}
          <div className="ek-verify-state">
            {status === 'verifying' && (
              <div className="ek-state-card ek-state-card--loading">
                <Spinner size="md" color="#2d6a4f" />
                <p>Validando tu enlace de verificación...</p>
              </div>
            )}
            {status === 'success' && (
              <div className="ek-state-card ek-state-card--success">
                <div className="ek-state-icon ek-state-icon--success">
                  <CheckIcon size={32} />
                </div>
                <p>¡Todo listo! Tu cuenta está activa.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="ek-state-card ek-state-card--error">
                <div className="ek-state-icon ek-state-icon--error">
                  <XIcon size={32} />
                </div>
                <p>No pudimos verificar tu cuenta con este enlace.</p>
              </div>
            )}
          </div>

          {/* Acciones */}
          <div className="ek-verify-actions">
            {status === 'success' && (
              <button type="button" className="ek-btn" onClick={() => navigate('/login')}>
                Iniciar sesión
              </button>
            )}
            {status === 'error' && (
              <>
                <button type="button" className="ek-btn" onClick={() => navigate('/login')}>
                  Ir al login
                </button>
                <p className="ek-signup" style={{ marginTop: 14 }}>
                  ¿No recibiste el correo?{' '}
                  <Link to="/resend-verification">Reenviar verificación</Link>
                </p>
              </>
            )}
            {status === 'verifying' && (
              <p className="ek-signup">
                ¿Tienes cuenta?{' '}
                <Link to="/login">Inicia sesión</Link>
              </p>
            )}
          </div>

        </div>

        {/* ── RIGHT ── */}
        <div className="ek-right">
          <LeafIcon style={{ position: 'absolute', top: 30, right: 40, width: 120, height: 120, color: '#b7e4c7' }} />
          <LeafIcon style={{ position: 'absolute', bottom: 60, left: 30, width: 90, height: 90, color: '#95d5b2', transform: 'rotate(200deg)' }} />

          <div className="ek-right-text">
            <div className="ek-right-icon">
              <LeafIcon size={64} />
            </div>
            <h2>Verifica tu<br />identidad</h2>
            <p>Revisamos el enlace que llegó a tu correo para confirmar que eres tú. Solo tarda unos segundos.</p>

            <div className="ek-features">
              {[
                'El enlace es de un solo uso',
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