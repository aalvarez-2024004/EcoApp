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
  reciclaje: { color: '#eb7207', bg: 'rgba(235,114,7,0.08)'  },
  comunidad: { color: '#185fa5', bg: 'rgba(24,95,165,0.08)'  },
  educacion: { color: '#534ab7', bg: 'rgba(83,74,183,0.08)'  },
  impacto:   { color: '#23376d', bg: 'rgba(35,55,109,0.08)'  },
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

function StatCard({ icon, value, label, color = '#eb7207' }) {
  return (
    <div className="gam-stat-card" style={{ '--c': color }}>
      <div className="gam-stat-icon"><i className={`ti ${icon}`} /></div>
      <p className="gam-stat-value">{value}</p>
      <p className="gam-stat-label">{label}</p>
    </div>
  )
}

function BadgeItem({ name }) {
  const cfg = BADGE_CONFIG[name] || { icon: 'ti-star', color: '#eb7207', bg: 'rgba(235,114,7,0.12)' }
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
          <StatCard icon="ti-recycle"     value={profile?.recyclingCount ?? 0} label="Reciclajes"  color="#eb7207" />
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
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        :root{
          --green-900:#1a2b57;
          --green-800:#1d3161;
          --green-700:#23376d;
          --green-600:#eb7207;
          --green-500:#fdb500;
          --green-300:#fdb500;

          --bone:#f5f7fc;
          --white:#ffffff;

          --ink:#111827;
          --ink-2:#1a2b57;

          --muted:#4b5a8a;

          --radius:24px;

          --shadow-sm:0 6px 18px rgba(35,55,109,.06);
          --shadow-md:0 12px 30px rgba(35,55,109,.10);
          --shadow-lg:0 20px 50px rgba(35,55,109,.14);

          font-family:'Outfit',sans-serif;
        }

        .gam-page{
          width:100%;
          max-width:1400px;
          margin:0 auto;
          padding:20px;
          background:var(--bone);
          min-height:100vh;
          font-family:'Outfit',sans-serif;
          box-sizing:border-box;
        }

        /* HEADER */

        .gam-header{
          position:relative;
          overflow:hidden;

          background:
            linear-gradient(
              135deg,
              var(--green-900) 0%,
              var(--green-800) 45%,
              var(--green-700) 100%
            );

          border-radius:32px;

          padding:50px;

          margin-bottom:35px;

          box-shadow:var(--shadow-lg);
        }

        .gam-header::before{
          content:'';
          position:absolute;
          width:500px;
          height:500px;

          background:
            radial-gradient(
              circle,
              rgba(253,181,0,.15),
              transparent 70%
            );

          top:-250px;
          right:-150px;
        }

        .gam-header h2{
          color:white;
          font-size:42px;
          font-weight:800;
          margin-bottom:10px;
        }

        .gam-header p{
          color:rgba(255,255,255,.8);
          font-size:17px;
        }

        /* STATS */

        .gam-stats-row{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:20px;
          margin-bottom:30px;
        }

        .gam-stat-card{
          background:white;
          border-radius:28px;
          padding:28px;

          display:flex;
          flex-direction:column;
          align-items:center;

          box-shadow:var(--shadow-sm);

          transition:.3s;
        }

        .gam-stat-card:hover{
          transform:translateY(-6px);
          box-shadow:var(--shadow-md);
        }

        .gam-stat-icon{
          width:60px;
          height:60px;
          border-radius:18px;

          display:flex;
          align-items:center;
          justify-content:center;

          font-size:24px;

          background:
            color-mix(in srgb,var(--c) 12%,transparent);

          color:var(--c);
        }

        .gam-stat-value{
          margin-top:14px;
          font-size:34px;
          font-weight:800;
          color:var(--ink);
        }

        .gam-stat-label{
          color:var(--muted);
          font-size:14px;
        }

        /* BADGES */

        .gam-badges-wrap{
          margin-bottom:25px;
        }

        .gam-section-label{
          font-size:12px;
          letter-spacing:.15em;
          font-weight:800;
          color:var(--green-700);
        }

        .gam-badges-list{
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          margin-top:12px;
        }

        .gam-badge-chip{
          border-radius:999px;
          padding:10px 16px;
          font-size:13px;
          font-weight:700;
        }

        /* PROGRESS */

        .gam-prog-wrap{
          background:white;
          border-radius:22px;
          padding:18px 22px;
          margin-bottom:30px;

          box-shadow:var(--shadow-sm);
        }

        .gam-prog-track{
          height:12px;
          background:#e8ecf5;
          border-radius:999px;
          overflow:hidden;
        }

        .gam-prog-fill{
          height:100%;

          background:
            linear-gradient(
              90deg,
              var(--green-600),
              var(--green-500)
            );

          border-radius:999px;
        }

        /* TABS */

        .gam-tabs{
          display:flex;
          gap:10px;
          margin-bottom:30px;
        }

        .gam-tab{
          border:none;
          background:white;

          padding:14px 24px;

          border-radius:16px;

          font-weight:600;

          cursor:pointer;

          transition:.3s;

          box-shadow:var(--shadow-sm);
        }

        .gam-tab:hover{
          transform:translateY(-2px);
        }

        .gam-tab.active{
          background:var(--green-600);
          color:white;
        }

        /* RETOS */

        .gam-grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fill,minmax(320px,1fr));

          gap:22px;
        }

        .gam-ch-card{
          background:white;

          border-radius:28px;

          padding:24px;

          box-shadow:var(--shadow-sm);

          transition:.3s;
        }

        .gam-ch-card:hover{
          transform:translateY(-8px);
          box-shadow:var(--shadow-md);
        }

        .gam-ch-top{
          display:flex;
          justify-content:space-between;
          margin-bottom:15px;
        }

        .gam-ch-icon{
          width:50px;
          height:50px;
          border-radius:15px;

          display:flex;
          align-items:center;
          justify-content:center;

          background:var(--brand-bg);
          color:var(--brand);

          font-size:20px;
        }

        .gam-ch-card h4{
          font-size:18px;
          font-weight:700;
          color:var(--ink);
          margin-bottom:10px;
        }

        .gam-ch-card p{
          color:var(--muted);
          line-height:1.7;
        }

        .gam-ch-btn{
          margin-top:18px;
          width:100%;

          border:none;

          border-radius:14px;

          padding:13px;

          background:var(--brand);

          color:white;

          font-weight:700;

          cursor:pointer;

          transition:.3s;
        }

        .gam-ch-btn:hover:not(:disabled){
          opacity:.9;
        }

        .gam-ch-btn:disabled{
          background:#d6dcef;
          color:var(--green-700);
        }

        /* RANKING */

        .gam-rank-list{
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .gam-rank-row{
          background:white;

          border-radius:18px;

          padding:18px 22px;

          display:grid;

          grid-template-columns:
          60px 1fr 120px 100px;

          align-items:center;

          box-shadow:var(--shadow-sm);

          transition:.3s;
        }

        .gam-rank-row:hover{
          transform:translateX(5px);
        }

        .gam-rank-row.me{
          background:#edf0fa;
          border:2px solid var(--green-700);
        }

        .gam-rank-name{
          font-weight:700;
        }

        .gam-rank-user{
          color:var(--muted);
          font-size:13px;
        }

        .gam-rank-pts{
          font-weight:800;
          color:var(--green-700);
        }

        .gam-rank-you{
          background:var(--green-600);
          color:white;

          padding:4px 10px;

          border-radius:999px;

          font-size:11px;
          font-weight:700;
        }

        /* SKELETON */

        .gam-skel{
          border-radius:20px;

          background:
            linear-gradient(
              90deg,
              #e8ecf5 25%,
              #d6dcef 50%,
              #e8ecf5 75%
            );

          background-size:400% 100%;

          animation:shimmer 1.4s infinite;
        }

        @keyframes shimmer{
          from{
            background-position:100% 0;
          }
          to{
            background-position:-100% 0;
          }
        }

        /* RESPONSIVE */

        @media(min-width:1600px){
          .gam-page{
            padding:30px 40px;
          }
        }

        @media(max-width:1200px){
          .gam-stats-row{
            grid-template-columns:repeat(2,1fr);
          }
          .gam-grid{
            grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
          }
        }

        @media(max-width:900px){
          .gam-page{
            padding:15px;
          }
          .gam-header{
            padding:35px;
          }
          .gam-stats-row{
            grid-template-columns:repeat(2,1fr);
            gap:15px;
          }
        }

        @media(max-width:640px){
          .gam-page{
            padding:10px;
          }
          .gam-header{
            padding:25px;
          }
          .gam-header h2{
            font-size:28px;
          }
          .gam-header p{
            font-size:15px;
          }
          .gam-stats-row{
            grid-template-columns:1fr;
            gap:12px;
          }
          .gam-grid{
            grid-template-columns:1fr;
          }
          .gam-rank-row{
            grid-template-columns:50px 1fr 90px;
            padding:12px 16px;
          }
          .gam-rank-rc,
          .gam-rank-you{
            display:none;
          }
          .gam-tabs{
            flex-direction:column;
          }
          .gam-tab{
            width:100%;
            justify-content:center;
          }
        }
        `}</style>
    </div>
  )
}
