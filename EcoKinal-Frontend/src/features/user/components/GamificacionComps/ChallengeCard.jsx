const CAT = {
  reciclaje: { color: '#21491e', bg: 'rgba(33,73,30,0.08)'  },
  comunidad: { color: '#3b6b35', bg: 'rgba(59,107,53,0.08)'  },
  educacion: { color: '#5b7c56', bg: 'rgba(91,124,86,0.08)'  },
  impacto:   { color: '#1a3316', bg: 'rgba(26,51,22,0.08)'  },
}

const KEY_LABEL = {
  detector:      'Ir al Detector',
  detector_3:    'Ir al Detector',
  foro_publicar: 'Ir al Foro a publicar',
  foro_comentar: 'Ir al Foro a comentar',
  impacto:       'Ver Mi Impacto',
  mapa:          'Ir al Mapa',
}

export default function ChallengeCard({ challenge, onOpen }) {
  const cat = CAT[challenge.category] || CAT.reciclaje
  return (
    <div
      className={`gam-ch-card ${challenge.completed ? 'done' : ''}`}
      style={{ '--brand': cat.color, '--brand-bg': cat.bg }}
    >
      <div className="gam-ch-top">
        <div className="gam-ch-icon"><i className={`ti ${challenge.icon || 'ti-leaf'}`} /></div>
        <span className="gam-ch-pts">+{challenge.pointsReward} pts</span>
      </div>
      <h4>{challenge.title}</h4>
      <p>{challenge.description}</p>
      {!challenge.completed && challenge.howTo && (
        <div className="gam-ch-howto">
          <i className="ti ti-info-circle" />
          <span>{challenge.howTo}</span>
        </div>
      )}
      <button
        className="gam-ch-btn"
        disabled={challenge.completed}
        onClick={() => !challenge.completed && onOpen(challenge)}
      >
        {challenge.completed
          ? <><i className="ti ti-circle-check" /> Completado</>
          : <><i className="ti ti-arrow-right" /> {KEY_LABEL[challenge.verificationKey] || 'Ir a completar'}</>
        }
      </button>
    </div>
  )
}