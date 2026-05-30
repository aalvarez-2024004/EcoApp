import { useEffect, useState } from 'react'
import useGamificacionStore from "../store/useGamificacionStore";
const BADGE_CONFIG = {
  'Reciclador Básico':       { icon: 'ti-award',        color: '#cd7f32', bg: 'rgba(205,127,50,0.1)',  label: 'Bronce' },
  'Reciclador Intermedio':   { icon: 'ti-medal',         color: '#a8a9ad', bg: 'rgba(168,169,173,0.1)', label: 'Plata'  },
  'Experto':                 { icon: 'ti-trophy',        color: '#ffd700', bg: 'rgba(255,215,0,0.1)',   label: 'Oro'    },
}

const CATEGORY_COLOR = {
  reciclaje:  { color: '#0f6e56', bg: 'rgba(15,110,86,0.08)'  },
  comunidad:  { color: '#185fa5', bg: 'rgba(24,95,165,0.08)'  },
  educacion:  { color: '#534ab7', bg: 'rgba(83,74,183,0.08)'  },
  impacto:    { color: '#3b6d11', bg: 'rgba(59,109,17,0.08)'  },
}


function StatCard({ icon, value, label, color = '#0f6e56' }) {
  return (
    <div className="gam-stat-card" style={{ '--brand': color }}>
      <div className="gam-stat-icon"><i className={`ti ${icon}`} /></div>
      <p className="gam-stat-value">{value}</p>
      <p className="gam-stat-label">{label}</p>
    </div>
  )
}

function BadgeItem({ name }) {
  const cfg = BADGE_CONFIG[name] || { icon: 'ti-star', color: '#59B130', bg: 'rgba(89,177,48,0.1)', label: name }
  return (
    <div className="gam-badge-item" style={{ '--b-color': cfg.color, '--b-bg': cfg.bg }}>
      <i className={`ti ${cfg.icon}`} />
      <span>{name}</span>
    </div>
  )
}

function ChallengeCard({ challenge, onComplete, completing }) {
  const cat = CATEGORY_COLOR[challenge.category] || CATEGORY_COLOR.reciclaje
  return (
    <div
      className={`gam-challenge-card ${challenge.completed ? 'done' : ''}`}
      style={{ '--brand': cat.color, '--brand-bg': cat.bg }}
    >
      <div className="gam-challenge-top">
        <div className="gam-challenge-icon">
          <i className={`ti ${challenge.icon || 'ti-leaf'}`} />
        </div>
        <span className="gam-challenge-pts">+{challenge.pointsReward} pts</span>
      </div>
      <h4>{challenge.title}</h4>
      <p>{challenge.description}</p>
      <button
        className="gam-challenge-btn"
        disabled={challenge.completed || completing}
        onClick={() => !challenge.completed && onComplete(challenge._id)}
      >
        {challenge.completed ? (
          <><i className="ti ti-check" /> Completado</>
        ) : completing ? (
          <><i className="ti ti-loader-2" /> Reclamando…</>
        ) : (
          <><i className="ti ti-bolt" /> Reclamar</>
        )}
      </button>
    </div>
  )
}

function RankingRow({ entry, index }) {
  const medals = ['🥇', '🥈', '🥉']
  return (
    <div className={`gam-ranking-row ${index < 3 ? 'top' : ''}`}>
      <span className="gam-rank-pos">{medals[index] ?? index + 1}</span>
      <span className="gam-rank-user">{entry.userId?.slice(0, 12)}…</span>
      <span className="gam-rank-pts">{entry.points} pts</span>
      <span className="gam-rank-count">{entry.recyclingCount} ♻️</span>
    </div>
  )
}


export default function GamificacionPage() {
  const {
    profile, ranking, challenges,
    loadingProfile, loadingRanking, loadingChallenges,
    completingChallenge, error,
    fetchProfile, fetchRanking, fetchChallenges,
    completeChallenge, clearError
  } = useGamificacionStore()

  const [toast, setToast] = useState(null)
  const [tab, setTab] = useState('retos') 

  useEffect(() => {
    fetchProfile()
    fetchRanking()
    fetchChallenges()
  }, [])

  const handleComplete = async (id) => {
    const result = await completeChallenge(id)
    setToast({ ok: result.ok, msg: result.message })
    setTimeout(() => setToast(null), 3500)
  }

  const completedCount = challenges.filter(c => c.completed).length
  const totalChallenges = challenges.length

  return (
    <div className="gam-page">

      {toast && (
        <div className={`gam-toast ${toast.ok ? 'success' : 'error'}`}>
          <i className={`ti ${toast.ok ? 'ti-check-circle' : 'ti-alert-circle'}`} />
          {toast.msg}
        </div>
      )}

      <div className="gam-header">
        <div>
          <h2>🏆 Gamificación</h2>
          <p>Gana eco-puntos, desbloquea insignias y sube en el ranking.</p>
        </div>
      </div>

      {loadingProfile ? (
        <div className="gam-skeleton-row">
          {[1,2,3].map(i => <div key={i} className="gam-skeleton" style={{height: 100}} />)}
        </div>
      ) : (
        <div className="gam-stats-row">
          <StatCard icon="ti-coin"         value={profile?.points ?? 0}         label="Eco-puntos"    color="#854f0b" />
          <StatCard icon="ti-recycle"      value={profile?.recyclingCount ?? 0} label="Reciclajes"    color="#0f6e56" />
          <StatCard icon="ti-shield-star"  value={profile?.badges?.length ?? 0} label="Insignias"     color="#534ab7" />
        </div>
      )}

      {profile?.badges?.length > 0 && (
        <div className="gam-badges-section">
          <p className="gam-section-label">MIS INSIGNIAS</p>
          <div className="gam-badges-list">
            {profile.badges.map(b => <BadgeItem key={b} name={b} />)}
          </div>
        </div>
      )}

      {!loadingChallenges && totalChallenges > 0 && (
        <div className="gam-progress-bar-wrap">
          <div className="gam-progress-label">
            <span>Retos completados hoy</span>
            <span>{completedCount}/{totalChallenges}</span>
          </div>
          <div className="gam-progress-track">
            <div
              className="gam-progress-fill"
              style={{ width: `${(completedCount / totalChallenges) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="gam-tabs">
        <button
          className={`gam-tab ${tab === 'retos' ? 'active' : ''}`}
          onClick={() => setTab('retos')}
        >
          <i className="ti ti-bolt" /> Retos del día
        </button>
        <button
          className={`gam-tab ${tab === 'ranking' ? 'active' : ''}`}
          onClick={() => setTab('ranking')}
        >
          <i className="ti ti-trophy" /> Ranking global
        </button>
      </div>

      {tab === 'retos' && (
        <div className="gam-challenges-grid">
          {loadingChallenges ? (
            [1,2,3,4].map(i => <div key={i} className="gam-skeleton" style={{height: 180}} />)
          ) : challenges.length === 0 ? (
            <p className="gam-empty">No hay retos disponibles por ahora.</p>
          ) : (
            challenges.map(ch => (
              <ChallengeCard
                key={ch._id}
                challenge={ch}
                onComplete={handleComplete}
                completing={completingChallenge === ch._id}
              />
            ))
          )}
        </div>
      )}

      {tab === 'ranking' && (
        <div className="gam-ranking-list">
          <div className="gam-ranking-header">
            <span>Pos</span><span>Usuario</span><span>Puntos</span><span>Reciclajes</span>
          </div>
          {loadingRanking ? (
            [1,2,3,4,5].map(i => <div key={i} className="gam-skeleton" style={{height: 48, marginBottom: 8}} />)
          ) : ranking.length === 0 ? (
            <p className="gam-empty">Aún no hay datos en el ranking.</p>
          ) : (
            ranking.map((entry, i) => <RankingRow key={entry._id} entry={entry} index={i} />)
          )}
        </div>
      )}

      <style>{`
        .gam-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 0 60px;
          font-family: var(--font-main, 'Outfit', sans-serif);
          position: relative;
        }
        .gam-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          animation: fadeIn .3s ease;
        }
        .gam-toast.success { background: #0d2e1c; color: #7ae44c; border: 1px solid rgba(122,228,76,.2); }
        .gam-toast.error   { background: #2e0d0d; color: #ff7373; border: 1px solid rgba(255,115,115,.2); }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }

        .gam-header {
          margin-bottom: 32px;
        }
        .gam-header h2 {
          font-size: 28px;
          font-weight: 800;
          color: #0b130e;
          margin-bottom: 6px;
        }
        .gam-header p {
          color: #617364;
          font-size: 15px;
        }

        /* Stats */
        .gam-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        .gam-stat-card {
          background: #fff;
          border: 1px solid rgba(36,107,62,.07);
          border-radius: 22px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 20px rgba(13,46,28,.04);
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .gam-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(13,46,28,.08);
        }
        .gam-stat-icon {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: rgba(from var(--brand) r g b / .1);
          background-color: color-mix(in srgb, var(--brand) 12%, transparent);
          display: grid; place-items: center;
          font-size: 22px;
          color: var(--brand);
          margin-bottom: 4px;
        }
        .gam-stat-value {
          font-size: 32px;
          font-weight: 800;
          color: var(--brand);
          line-height: 1;
        }
        .gam-stat-label {
          font-size: 13px;
          color: #617364;
          font-weight: 500;
          text-align: center;
        }

        /* Badges */
        .gam-section-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .12em;
          color: #3d9850;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .gam-badges-section { margin-bottom: 28px; }
        .gam-badges-list { display: flex; flex-wrap: wrap; gap: 10px; }
        .gam-badge-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 100px;
          background-color: var(--b-bg);
          color: var(--b-color);
          font-size: 13px;
          font-weight: 600;
          border: 1px solid color-mix(in srgb, var(--b-color) 25%, transparent);
        }

        /* Progress bar */
        .gam-progress-bar-wrap { margin-bottom: 28px; }
        .gam-progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #617364;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .gam-progress-track {
          height: 8px;
          background: rgba(36,107,62,.1);
          border-radius: 100px;
          overflow: hidden;
        }
        .gam-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #59B130, #7ae44c);
          border-radius: 100px;
          transition: width .6s ease;
        }

        /* Tabs */
        .gam-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 28px;
          border-bottom: 2px solid rgba(36,107,62,.08);
          padding-bottom: 0;
        }
        .gam-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -2px;
          font-size: 14px;
          font-weight: 600;
          color: #617364;
          cursor: pointer;
          border-radius: 0;
          transition: all .2s;
        }
        .gam-tab.active {
          color: #0f6e56;
          border-bottom-color: #59B130;
        }
        .gam-tab:hover { color: #0f6e56; }

        /* Challenge cards */
        .gam-challenges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .gam-challenge-card {
          background: #fff;
          border: 1px solid rgba(36,107,62,.07);
          border-radius: 22px;
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 4px 16px rgba(13,46,28,.04);
          transition: transform .3s ease, border-color .3s ease;
        }
        .gam-challenge-card:hover { transform: translateY(-4px); border-color: var(--brand); }
        .gam-challenge-card.done { opacity: .7; background: #f8fff8; }
        .gam-challenge-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .gam-challenge-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background-color: var(--brand-bg);
          color: var(--brand);
          display: grid; place-items: center;
          font-size: 20px;
        }
        .gam-challenge-pts {
          font-size: 12px;
          font-weight: 700;
          color: var(--brand);
          background: var(--brand-bg);
          padding: 4px 10px;
          border-radius: 8px;
        }
        .gam-challenge-card h4 {
          font-size: 15px;
          font-weight: 700;
          color: #0b130e;
          margin: 0;
        }
        .gam-challenge-card p {
          font-size: 13.5px;
          color: #617364;
          line-height: 1.55;
          margin: 0;
          flex: 1;
        }
        .gam-challenge-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 11px;
          border-radius: 12px;
          background: var(--brand);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          margin-top: 6px;
          transition: opacity .2s, transform .2s;
        }
        .gam-challenge-btn:hover:not(:disabled) { opacity: .88; transform: translateY(-1px); }
        .gam-challenge-btn:disabled {
          background: rgba(36,107,62,.1);
          color: #3d9850;
          cursor: not-allowed;
          transform: none;
        }

        /* Ranking */
        .gam-ranking-list { display: flex; flex-direction: column; gap: 8px; }
        .gam-ranking-header {
          display: grid;
          grid-template-columns: 50px 1fr 100px 100px;
          padding: 10px 20px;
          font-size: 11px;
          font-weight: 800;
          color: #617364;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .gam-ranking-row {
          display: grid;
          grid-template-columns: 50px 1fr 100px 100px;
          align-items: center;
          background: #fff;
          border: 1px solid rgba(36,107,62,.07);
          border-radius: 14px;
          padding: 14px 20px;
          font-size: 14px;
          font-weight: 500;
          transition: transform .2s;
        }
        .gam-ranking-row:hover { transform: translateX(4px); }
        .gam-ranking-row.top { font-weight: 700; background: #f6fdf6; border-color: rgba(59,177,48,.15); }
        .gam-rank-pos { font-size: 20px; }
        .gam-rank-user { color: #0b130e; font-family: monospace; }
        .gam-rank-pts  { color: #0f6e56; font-weight: 700; }
        .gam-rank-count { color: #617364; }

        /* Skeleton */
        .gam-skeleton-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-bottom: 32px; }
        .gam-skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
          background-size: 400% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 18px;
        }
        @keyframes shimmer {
          0%   { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .gam-empty { color: #617364; font-size: 15px; padding: 32px 0; text-align: center; grid-column: 1/-1; }

        @media (max-width: 768px) {
          .gam-stats-row { grid-template-columns: 1fr 1fr; }
          .gam-ranking-header,
          .gam-ranking-row { grid-template-columns: 40px 1fr 80px; }
          .gam-rank-count { display: none; }
        }
        @media (max-width: 480px) {
          .gam-stats-row { grid-template-columns: 1fr; }
          .gam-challenges-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
