// ChallengeCard — maneja 3 tipos de flujo:
//
// 1. RETOS AUTO-COMPLETOS (detector, detector_3):
//    El backend suma puntos automáticamente al clasificar.
//    Botón: "Ir al Detector" → navega → al volver, si completed=true → "Completado" (disabled)
//
// 2. RETOS MANUALES VERIFICABLES (foro_publicar, foro_comentar, impacto, mapa):
//    El usuario realiza la acción → completarRetoPorAccion() marca completed en backend.
//    Al volver a Gamificación, completed=true pero claimed=false → botón "Reclamar".
//    Al presionar Reclamar → claimChallenge() llama a /:id/complete → suma puntos → claimed=true.
//
// 3. COMPLETADO TOTALMENTE: completed=true AND (claimed=true OR es auto)
//    Botón: "Completado" (disabled, tarjeta con fondo verde claro)

const CAT = {
  reciclaje: { color: '#21491e', bg: 'rgba(33,73,30,0.08)'  },
  comunidad: { color: '#3b6b35', bg: 'rgba(59,107,53,0.08)' },
  educacion: { color: '#5b7c56', bg: 'rgba(91,124,86,0.08)' },
  impacto:   { color: '#1a3316', bg: 'rgba(26,51,22,0.08)'  },
}

// Retos que el backend completa automáticamente (sin paso de "Reclamar")
const AUTO_KEYS = ['detector', 'detector_3']

// Etiqueta del botón de redirección para cada key
const KEY_LABEL = {
  detector:      'Ir al Detector',
  detector_3:    'Ir al Detector',
  foro_publicar: 'Ir al Foro a publicar',
  foro_comentar: 'Ir al Foro a comentar',
  impacto:       'Ver Mi Impacto',
  mapa:          'Ir al Mapa',
}

export default function ChallengeCard({ challenge, onOpen, onClaim, claiming }) {
  const cat    = CAT[challenge.category] || CAT.reciclaje
  const isAuto = AUTO_KEYS.includes(challenge.verificationKey)

  // Reto ya finalizado por completo (no requiere más acción del usuario)
  const isDone = challenge.completed && (isAuto || challenge.claimed)

  // Reto completado en otra sección pero pendiente de reclamar en Gamificación
  const pendingClaim = challenge.completed && !isAuto && !challenge.claimed

  return (
    <div
      className={`gam-ch-card${isDone ? ' done' : ''}`}
      style={{ '--brand': cat.color, '--brand-bg': cat.bg }}
    >
      <div className="gam-ch-top">
        <div className="gam-ch-icon">
          <i className={`ti ${challenge.icon || 'ti-leaf'}`} />
        </div>
        <span className="gam-ch-pts">+{challenge.pointsReward} pts</span>
      </div>

      <h4>{challenge.title}</h4>
      <p>{challenge.description}</p>

      {/* Instrucciones: solo si aún no empezado */}
      {!challenge.completed && challenge.howTo && (
        <div className="gam-ch-howto">
          <i className="ti ti-info-circle" />
          <span>{challenge.howTo}</span>
        </div>
      )}

      {/* Aviso de "pendiente de reclamar" */}
      {pendingClaim && (
        <div className="gam-ch-howto" style={{ background: 'rgba(33,73,30,0.08)', borderLeft: '3px solid var(--brand)' }}>
          <i className="ti ti-check" />
          <span>¡Acción completada! Presiona <strong>Reclamar</strong> para obtener tus puntos.</span>
        </div>
      )}

      {/* ── Botón principal ── */}
      <button
        className="gam-ch-btn"
        disabled={isDone || claiming}
        onClick={() => {
          if (pendingClaim) {
            onClaim?.(challenge)
          } else if (!challenge.completed) {
            onOpen(challenge)
          }
        }}
      >
        {/* Estado 1: completado totalmente */}
        {isDone && (
          <><i className="ti ti-circle-check" /> Completado</>
        )}

        {/* Estado 2: pendiente de reclamar */}
        {pendingClaim && (
          claiming
            ? <><i className="ti ti-loader-2" style={{ animation: 'spin 1s linear infinite' }} /> Reclamando...</>
            : <><i className="ti ti-gift" /> Reclamar +{challenge.pointsReward} pts</>
        )}

        {/* Estado 3: aún no completado — redirige */}
        {!challenge.completed && (
          <><i className="ti ti-arrow-right" /> {KEY_LABEL[challenge.verificationKey] || 'Ir a completar'}</>
        )}
      </button>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .gam-ch-card.done { opacity: 0.72; background: #f4faf3; }
        .gam-ch-card.done .gam-ch-btn { background: #d6e4d3; color: #3b6b35; }
      `}</style>
    </div>
  )
}