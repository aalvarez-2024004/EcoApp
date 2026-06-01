import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGamificacionStore from '../store/useGamificacionStore'
import useAuthStore from '../../auth/store/useAuthStore'

const BADGE_CONFIG = {
  'Reciclador Básico':     { icon: 'ti-award',       color: '#cd7f32', bg: 'rgba(205,127,50,0.12)'  },
  'Reciclador Intermedio': { icon: 'ti-medal',        color: '#a8a9ad', bg: 'rgba(168,169,173,0.12)' },
  'Experto':               { icon: 'ti-trophy',       color: '#e2b007', bg: 'rgba(226,176,7,0.12)'   },
}
const CAT = {
  reciclaje: { color: '#0f6e56', bg: 'rgba(15,110,86,0.08)'  },
  comunidad: { color: '#185fa5', bg: 'rgba(24,95,165,0.08)'  },
  educacion: { color: '#534ab7', bg: 'rgba(83,74,183,0.08)'  },
  impacto:   { color: '#3b6d11', bg: 'rgba(59,109,17,0.08)'  },
}

// Cada reto redirige al usuario a la sección donde debe hacer la acción
const KEY_REDIRECT = {
  detector:      '/dashboard/usuario/detector',
  detector_3:    '/dashboard/usuario/detector',
  foro_publicar: '/dashboard/usuario/foro',
  foro_comentar: '/dashboard/usuario/foro',
  impacto:       '/dashboard/usuario/impacto',
  mapa:          '/dashboard/usuario/mapa',
}

const KEY_LABEL = {
  detector:      'Ir al Detector',
  detector_3:    'Ir al Detector',
  foro_publicar: 'Ir al Foro a publicar',
  foro_comentar: 'Ir al Foro a comentar',
  impacto:       'Ver Mi Impacto',
  mapa:          'Ir al Mapa',
}

function StatCard({ icon, value, label, color = '#0f6e56' }) {
  return (
    <div className="gam-stat-card" style={{ '--c': color }}>
      <div className="gam-stat-icon"><i className={`ti ${icon}`} /></div>
      <p className="gam-stat-value">{value}</p>
      <p className="gam-stat-label">{label}</p>
    </div>
  )
}

function BadgeItem({ name }) {
  const cfg = BADGE_CONFIG[name] || { icon: 'ti-star', color: '#59B130', bg: 'rgba(89,177,48,0.12)' }
  return (
    <span className="gam-badge-chip" style={{ '--bc': cfg.color, '--bb': cfg.bg }}>
      <i className={`ti ${cfg.icon}`} /> {name}
    </span>
  )
}


function ChallengeCard({ challenge, onOpen }) {
  const cat  = CAT[challenge.category] || CAT.reciclaje
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

function RankingRow({ entry, index, currentUserId }) {
  const medals  = ['🥇', '🥈', '🥉']
  const isMe    = entry.userId === currentUserId
  const display = entry.username ? `@${entry.username}` : (entry.name || `Usuario ${index + 1}`)
  return (
    <div className={`gam-rank-row ${index < 3 ? 'top' : ''} ${isMe ? 'me' : ''}`}>
      <span className="gam-rank-pos">{medals[index] ?? index + 1}</span>
      <div className="gam-rank-info">
        <span className="gam-rank-name">{entry.name || 'Usuario'}</span>
        <span className="gam-rank-user">{display}</span>
      </div>
      <span className="gam-rank-pts">{entry.points} pts</span>
      <span className="gam-rank-rc">{entry.recyclingCount} ♻️</span>
      {isMe && <span className="gam-rank-you">Tú</span>}
    </div>
  )
}

export default function GamificacionPage() {
  const {
    profile, ranking, challenges,
    loadingProfile, loadingRanking, loadingChallenges,
    fetchProfile, fetchRanking, fetchChallenges,
  } = useGamificacionStore()

  const user = useAuthStore(s => s.user)

  const [toast,    setToast]   = useState(null)
  const [tab,      setTab]     = useState('retos')

  useEffect(() => {
    fetchProfile()
    fetchRanking()
    fetchChallenges()
  }, [])

  // Refrescar retos y perfil cuando el usuario vuelve a la pestaña

  useEffect(() => {
    const onFocus = () => {
      fetchChallenges()
      fetchProfile()
      fetchRanking()
    }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [])

  const navigate = useNavigate()

  const openModal  = (ch) => {
    // Todos los retos redirigen al usuario a la sección correspondiente
    const path = KEY_REDIRECT[ch.verificationKey] || '/dashboard/usuario/detector'
    navigate(path)
  }

  const completedCount = challenges.filter(c => c.completed).length
  const total          = challenges.length
  const currentUserId  = user?.id || user?.uid || ''

  return (
    <div className="gam-page">

      {toast && (
        <div className={`gam-toast ${toast.ok ? 'ok' : 'err'}`}>
          <i className={`ti ${toast.ok ? 'ti-circle-check' : 'ti-alert-circle'}`} />
          {toast.msg}
        </div>
      )}

      <div className="gam-header">
        <h2>🏆 Gamificación</h2>
        <p>Gana eco-puntos, desbloquea insignias y sube en el ranking.</p>
      </div>

      {loadingProfile ? (
        <div className="gam-skel-row">{[1,2,3,4].map(i => <div key={i} className="gam-skel" style={{height:100}} />)}</div>
      ) : (
        <div className="gam-stats-row">
          <StatCard icon="ti-coin"        value={profile?.points ?? 0}         label="Eco-puntos"  color="#9a5f0a" />
          <StatCard icon="ti-recycle"     value={profile?.recyclingCount ?? 0} label="Reciclajes"  color="#0f6e56" />
          <StatCard icon="ti-shield-star" value={profile?.badges?.length ?? 0} label="Insignias"   color="#534ab7" />
          <StatCard
            icon="ti-podium"
            value={profile?.rankPosition ? `#${profile.rankPosition}` : '—'}
            label={profile?.totalUsers ? `de ${profile.totalUsers} usuarios` : 'Tu posición'}
            color="#185fa5"
          />
        </div>
      )}

      {(profile?.badges?.length ?? 0) > 0 && (
        <div className="gam-badges-wrap">
          <span className="gam-section-label">MIS INSIGNIAS</span>
          <div className="gam-badges-list">
            {profile.badges.map(b => <BadgeItem key={b} name={b} />)}
          </div>
        </div>
      )}

      {!loadingChallenges && total > 0 && (
        <div className="gam-prog-wrap">
          <div className="gam-prog-label">
            <span>Retos completados hoy</span>
            <span className="gam-prog-count">{completedCount}/{total}</span>
          </div>
          <div className="gam-prog-track">
            <div className="gam-prog-fill" style={{ width: `${(completedCount / total) * 100}%` }} />
          </div>
        </div>
      )}

      <div className="gam-tabs">
        <button className={`gam-tab ${tab === 'retos' ? 'active' : ''}`} onClick={() => setTab('retos')}>
          <i className="ti ti-bolt" /> Retos del día
        </button>
        <button className={`gam-tab ${tab === 'ranking' ? 'active' : ''}`} onClick={() => setTab('ranking')}>
          <i className="ti ti-trophy" /> Ranking global
        </button>
      </div>

      {tab === 'retos' && (
        <div className="gam-grid">
          {loadingChallenges
            ? [1,2,3,4,5,6].map(i => <div key={i} className="gam-skel" style={{height:200}} />)
            : challenges.length === 0
            ? <p className="gam-empty">No hay retos disponibles.</p>
            : challenges.map(ch => (
                <ChallengeCard key={ch._id} challenge={ch} onOpen={openModal} />
              ))
          }
        </div>
      )}

      {tab === 'ranking' && (
        <div className="gam-rank-list">
          {profile?.rankPosition && (
            <div className="gam-my-rank">
              <i className="ti ti-podium" />
              <span>Tu posición actual: <strong>#{profile.rankPosition}</strong> de {profile.totalUsers} usuarios</span>
            </div>
          )}
          <div className="gam-rank-header">
            <span>Pos</span><span>Usuario</span><span>Puntos</span><span>Recicl.</span>
          </div>
          {loadingRanking
            ? [1,2,3,4,5].map(i => <div key={i} className="gam-skel" style={{height:56, marginBottom:8}} />)
            : ranking.length === 0
            ? <p className="gam-empty">Aún no hay usuarios en el ranking.</p>
            : ranking.map((entry, i) => (
                <RankingRow key={entry._id || entry.userId} entry={entry} index={i} currentUserId={currentUserId} />
              ))
          }
        </div>
      )}

      <style>{`
        .gam-page{max-width:1100px;margin:0 auto;padding:0 0 60px;font-family:var(--font-main,'Outfit',sans-serif);position:relative}

        /* Toast */
        .gam-toast{position:fixed;top:24px;right:24px;z-index:10000;display:flex;align-items:center;gap:10px;padding:14px 22px;border-radius:16px;font-size:14px;font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,.18);animation:fadeIn .3s ease}
        .gam-toast.ok{background:#0d2e1c;color:#7ae44c;border:1px solid rgba(122,228,76,.2)}
        .gam-toast.err{background:#2e0d0d;color:#ff7373;border:1px solid rgba(255,115,115,.2)}
        @keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}

        /* Modal */
        .gam-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);z-index:9000;display:grid;place-items:center;padding:20px}
        .gam-modal{background:#fff;border-radius:24px;padding:32px;max-width:480px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.2);position:relative}
        .gam-modal-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
        .gam-modal-icon{width:52px;height:52px;border-radius:14px;background:var(--brand-bg);color:var(--brand);display:grid;place-items:center;font-size:22px}
        .gam-modal-close{background:none;border:none;cursor:pointer;font-size:20px;color:#617364;padding:4px;border-radius:8px;line-height:1}
        .gam-modal-close:hover{background:rgba(0,0,0,.06)}
        .gam-modal h3{font-size:18px;font-weight:800;color:#0b130e;margin:0 0 8px}
        .gam-modal-pts{display:inline-block;background:var(--brand-bg);color:var(--brand);font-size:13px;font-weight:700;padding:4px 12px;border-radius:8px;margin-bottom:20px}
        .gam-modal-howto{background:#f4faf4;border-radius:14px;padding:16px 18px;margin-bottom:20px}
        .gam-modal-howto-label{font-size:12px;font-weight:700;color:#3d9850;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;display:flex;align-items:center;gap:6px}
        .gam-modal-howto p{font-size:14px;color:#3a4e3c;line-height:1.6;margin:0}
        .gam-modal-auto{display:flex;gap:12px;align-items:flex-start;background:#eaf4ff;border-radius:14px;padding:16px 18px;color:#185fa5;font-size:14px;line-height:1.5}
        .gam-modal-auto i{font-size:20px;flex-shrink:0;margin-top:1px}
        .gam-modal-confirm-text{font-size:14px;color:#617364;margin-bottom:20px;line-height:1.5}
        .gam-modal-actions{display:flex;gap:10px}
        .gam-modal-btn-cancel{flex:1;padding:12px;border:1.5px solid rgba(36,107,62,.15);background:#fff;border-radius:12px;font-size:14px;font-weight:600;color:#617364;cursor:pointer;transition:all .2s}
        .gam-modal-btn-cancel:hover{background:#f4f4f4}
        .gam-modal-btn-confirm{flex:2;padding:12px;background:#0f6e56;border:none;border-radius:12px;font-size:14px;font-weight:700;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s}
        .gam-modal-btn-confirm:hover:not(:disabled){background:#0a5040}
        .gam-modal-btn-confirm:disabled{opacity:.6;cursor:not-allowed}
        .spin{animation:spin .8s linear infinite}
        @keyframes spin{to{transform:rotate(360deg)}}

        /* Header */
        .gam-header{margin-bottom:32px}
        .gam-header h2{font-size:28px;font-weight:800;color:#0b130e;margin:0 0 6px}
        .gam-header p{color:#617364;font-size:15px;margin:0}

        /* Stats */
        .gam-stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
        .gam-stat-card{background:#fff;border:1px solid rgba(36,107,62,.07);border-radius:20px;padding:24px 20px;display:flex;flex-direction:column;align-items:center;gap:8px;box-shadow:0 4px 16px rgba(13,46,28,.04);transition:transform .3s,box-shadow .3s}
        .gam-stat-card:hover{transform:translateY(-4px);box-shadow:0 12px 28px rgba(13,46,28,.08)}
        .gam-stat-icon{width:48px;height:48px;border-radius:12px;background:color-mix(in srgb,var(--c) 12%,transparent);color:var(--c);display:grid;place-items:center;font-size:20px;margin-bottom:2px}
        .gam-stat-value{font-size:28px;font-weight:800;color:var(--c);line-height:1}
        .gam-stat-label{font-size:12px;color:#617364;font-weight:500;text-align:center}

        /* Badges */
        .gam-section-label{font-size:11px;font-weight:800;letter-spacing:.12em;color:#3d9850;text-transform:uppercase}
        .gam-badges-wrap{margin-bottom:24px;display:flex;flex-direction:column;gap:10px}
        .gam-badges-list{display:flex;flex-wrap:wrap;gap:8px}
        .gam-badge-chip{display:inline-flex;align-items:center;gap:7px;padding:7px 14px;border-radius:100px;background:var(--bb);color:var(--bc);font-size:13px;font-weight:600;border:1px solid color-mix(in srgb,var(--bc) 22%,transparent)}

        /* Progress */
        .gam-prog-wrap{margin-bottom:28px}
        .gam-prog-label{display:flex;justify-content:space-between;font-size:13px;color:#617364;font-weight:500;margin-bottom:8px}
        .gam-prog-count{font-weight:700;color:#0f6e56}
        .gam-prog-track{height:9px;background:rgba(36,107,62,.1);border-radius:100px;overflow:hidden}
        .gam-prog-fill{height:100%;background:linear-gradient(90deg,#59B130,#7ae44c);border-radius:100px;transition:width .7s ease}

        /* Tabs */
        .gam-tabs{display:flex;gap:4px;margin-bottom:24px;border-bottom:2px solid rgba(36,107,62,.08)}
        .gam-tab{display:flex;align-items:center;gap:7px;padding:12px 22px;background:transparent;border:none;border-bottom:2px solid transparent;margin-bottom:-2px;font-size:14px;font-weight:600;color:#617364;cursor:pointer;transition:all .2s}
        .gam-tab.active{color:#0f6e56;border-bottom-color:#59B130}
        .gam-tab:hover{color:#0f6e56}

        /* Challenge grid */
        .gam-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(275px,1fr));gap:18px}
        .gam-ch-card{background:#fff;border:1px solid rgba(36,107,62,.07);border-radius:20px;padding:24px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 14px rgba(13,46,28,.04);transition:transform .25s,border-color .25s;cursor:pointer}
        .gam-ch-card:hover:not(.done){transform:translateY(-4px);border-color:var(--brand)}
        .gam-ch-card.done{opacity:.65;background:#f8fff8;cursor:default}
        .gam-ch-top{display:flex;justify-content:space-between;align-items:center}
        .gam-ch-icon{width:42px;height:42px;border-radius:11px;background:var(--brand-bg);color:var(--brand);display:grid;place-items:center;font-size:19px}
        .gam-ch-pts{font-size:12px;font-weight:700;color:var(--brand);background:var(--brand-bg);padding:4px 10px;border-radius:8px}
        .gam-ch-auto-tag{font-size:11px;font-weight:600;color:#185fa5;background:rgba(24,95,165,.08);padding:3px 8px;border-radius:6px;display:flex;align-items:center;gap:4px}
        .gam-ch-card h4{font-size:14.5px;font-weight:700;color:#0b130e;margin:0}
        .gam-ch-card p{font-size:13px;color:#617364;line-height:1.55;margin:0;flex:1}
        .gam-ch-howto{display:flex;gap:8px;align-items:flex-start;background:rgba(0,0,0,.03);border-radius:10px;padding:10px 12px;font-size:12px;color:#617364;line-height:1.5;border:1px solid rgba(0,0,0,.06)}
        .gam-ch-howto i{flex-shrink:0;margin-top:1px;color:var(--brand)}
        .gam-ch-btn{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:11px;border-radius:11px;background:var(--brand);color:#fff;font-size:13px;font-weight:700;border:none;cursor:pointer;margin-top:4px;transition:opacity .2s,transform .2s}
        .gam-ch-btn:hover:not(:disabled){opacity:.85;transform:translateY(-1px)}
        .gam-ch-btn:disabled{background:rgba(36,107,62,.1);color:#3d9850;cursor:not-allowed;transform:none}

        /* Ranking */
        .gam-rank-list{display:flex;flex-direction:column;gap:8px}
        .gam-my-rank{display:flex;align-items:center;gap:10px;background:#eaf6f0;border:1px solid rgba(15,110,86,.15);border-radius:14px;padding:14px 18px;font-size:14px;color:#0f6e56;margin-bottom:4px}
        .gam-my-rank i{font-size:18px}
        .gam-rank-header{display:grid;grid-template-columns:50px 1fr 90px 80px;padding:8px 18px;font-size:11px;font-weight:800;color:#617364;letter-spacing:.08em;text-transform:uppercase}
        .gam-rank-row{display:grid;grid-template-columns:50px 1fr 90px 80px;align-items:center;background:#fff;border:1px solid rgba(36,107,62,.07);border-radius:14px;padding:14px 18px;font-size:14px;transition:transform .2s;position:relative}
        .gam-rank-row:hover{transform:translateX(4px)}
        .gam-rank-row.top{font-weight:600;background:#f6fdf6;border-color:rgba(59,177,48,.15)}
        .gam-rank-row.me{border-color:#0f6e56;background:#eaf6f0}
        .gam-rank-pos{font-size:20px}
        .gam-rank-info{display:flex;flex-direction:column;gap:2px;min-width:0}
        .gam-rank-name{font-weight:700;color:#0b130e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .gam-rank-user{font-size:12px;color:#617364}
        .gam-rank-pts{color:#0f6e56;font-weight:700}
        .gam-rank-rc{color:#617364}
        .gam-rank-you{position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:11px;font-weight:700;background:#0f6e56;color:#fff;padding:3px 9px;border-radius:6px}

        /* Skeleton */
        .gam-skel-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
        .gam-skel{background:linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%);background-size:400% 100%;animation:shimmer 1.4s infinite;border-radius:16px}
        @keyframes shimmer{0%{background-position:100% 50%}100%{background-position:0% 50%}}
        .gam-empty{color:#617364;font-size:15px;padding:40px 0;text-align:center;grid-column:1/-1}

        @media(max-width:900px){
          .gam-stats-row{grid-template-columns:repeat(2,1fr)}
          .gam-skel-row{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:600px){
          .gam-stats-row{grid-template-columns:1fr 1fr}
          .gam-grid{grid-template-columns:1fr}
          .gam-rank-header,.gam-rank-row{grid-template-columns:44px 1fr 80px}
          .gam-rank-rc{display:none}
          .gam-rank-you{display:none}
        }
      `}</style>
    </div>
  )
}
