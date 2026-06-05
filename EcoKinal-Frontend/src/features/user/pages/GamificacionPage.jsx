import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGamificacionStore from '../store/useGamificacionStore'
import useAuthStore from '../../auth/store/useAuthStore'

import StatCard from '../components/StatCard'
import BadgeItem from '../components/BadgeItem'
import ChallengeCard from '../components/ChallengeCard'
import RankingRow from '../components/RankingRow'

const KEY_REDIRECT = {
  detector:      '/dashboard/usuario/detector',
  detector_3:    '/dashboard/usuario/detector',
  foro_publicar: '/dashboard/usuario/foro',
  foro_comentar: '/dashboard/usuario/foro',
  impacto:       '/dashboard/usuario/impacto',
  mapa:          '/dashboard/usuario/mapa',
}

export default function GamificacionPage() {
  const {
    profile, ranking, challenges,
    loadingProfile, loadingRanking, loadingChallenges,
    fetchProfile, fetchRanking, fetchChallenges,
  } = useGamificacionStore()

  const user = useAuthStore(s => s.user)
  const [toast, setToast] = useState(null)
  const [tab, setTab] = useState('retos')
  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile()
    fetchRanking()
    fetchChallenges()
  }, [])

  useEffect(() => {
    const onFocus = () => {
      fetchChallenges()
      fetchProfile()
      fetchRanking()
    }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [])

  const openModal = (ch) => {
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
          <StatCard icon="ti-coin"         value={profile?.points ?? 0}         label="Eco-puntos"  color="#3b6b35" />
          <StatCard icon="ti-recycle"      value={profile?.recyclingCount ?? 0} label="Reciclajes"  color="#21491e" />
          <StatCard icon="ti-shield-star" value={profile?.badges?.length ?? 0} label="Insignias"   color="#5b7c56" />
          <StatCard
            icon="ti-podium"
            value={profile?.rankPosition ? `#${profile.rankPosition}` : '—'}
            label={profile?.totalUsers ? `de ${profile.totalUsers} usuarios` : 'Tu posición'}
            color="#1a3316"
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
          --green-900:#1a3316;
          --green-800:#21491e;
          --green-700:#2a5c25;
          --green-600:#21491e;
          --green-500:#3b6b35;
          --green-300:#8fa88b;
          --bone:#f1f6f0;
          --white:#ffffff;
          --ink:#1a3316;
          --ink-2:#21491e;
          --muted:#556b52;
          --radius:24px;
          --shadow-sm:0 6px 18px rgba(33,73,30,.04);
          --shadow-md:0 12px 30px rgba(33,73,30,.08);
          --shadow-lg:0 20px 50px rgba(33,73,30,.12);
          font-family:'Outfit',sans-serif;
        }

        .gam-page{
          width:100%;
          max-width:1400px;
          margin:0 auto;
          padding:20px;
          background:var(--bone);
          min-height:100vh;
          box-sizing:border-box;
        }

        .gam-header{
          position:relative;
          overflow:hidden;
          background: linear-gradient(135deg, var(--green-900) 0%, var(--green-800) 45%, var(--green-700) 100%);
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
          background: radial-gradient(circle, rgba(214,228,211,.15), transparent 70%);
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

        .gam-stats-row{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:20px;
          margin-bottom:30px;
        }

        .gam-skel-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .gam-stat-card{
          background:white;
          border-radius:28px;
          padding:28px;
          display:flex;
          flex-direction:column;
          align-items:center;
          box-shadow:var(--shadow-sm);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
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
          background: color-mix(in srgb,var(--c) 12%,transparent);
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
          color: var(--bc);
          background: var(--bb);
          border: 1px solid color-mix(in srgb, var(--bc) 25%, transparent);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: transform 0.2s ease;
        }

        .gam-badge-chip:hover {
          transform: scale(1.05);
        }

        .gam-prog-wrap{
          background:white;
          border-radius:22px;
          padding:18px 22px;
          margin-bottom:30px;
          box-shadow:var(--shadow-sm);
        }

        .gam-prog-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 14px;
          color: var(--ink);
        }

        .gam-prog-count {
          color: var(--green-600);
          font-weight: 700;
        }

        .gam-prog-track{
          height:12px;
          background:#e4ede2;
          border-radius:999px;
          overflow:hidden;
        }

        .gam-prog-fill{
          height:100%;
          background: linear-gradient(90deg, var(--green-600), var(--green-500));
          border-radius:999px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

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
          transition: .3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow:var(--shadow-sm);
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .gam-tab:hover{
          transform:translateY(-2px);
          color: var(--ink);
        }

        .gam-tab.active{
          background:var(--green-600);
          color:white;
          box-shadow: 0 8px 20px rgba(33, 73, 30, 0.25);
        }

        .gam-grid{
          display:grid;
          grid-template-columns: repeat(auto-fill,minmax(320px,1fr));
          gap:22px;
        }

        .gam-ch-card{
          background:white;
          border-radius:28px;
          padding:24px;
          box-shadow:var(--shadow-sm);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
          border: 1px solid transparent;
        }

        .gam-ch-card:hover{
          transform:translateY(-8px);
          box-shadow:var(--shadow-md);
          border-color: color-mix(in srgb, var(--brand) 20%, transparent);
        }

        .gam-ch-top{
          display:flex;
          justify-content:space-between;
          align-items: center;
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

        .gam-ch-pts {
          font-size: 13px;
          font-weight: 700;
          color: var(--brand);
          background: var(--brand-bg);
          padding: 6px 12px;
          border-radius: 999px;
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
          flex-grow: 1;
          font-size: 14px;
        }

        .gam-ch-howto {
          margin-top: 12px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: var(--bone);
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 12px;
          color: var(--green-700);
        }

        .gam-ch-howto i {
          margin-top: 2px;
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
          transition:.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .gam-ch-btn:hover:not(:disabled){
          opacity:.9;
          transform: scale(1.01);
        }

        .gam-ch-btn:disabled{
          background:#d6e4d3;
          color:var(--green-700);
          cursor: not-allowed;
        }

        .gam-rank-list{
          display:flex;
          flex-direction:column;
          gap:10px;
          background: white;
          padding: 24px;
          border-radius: 28px;
          box-shadow: var(--shadow-sm);
        }

        .gam-my-rank {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(33, 73, 30, 0.06);
          color: #21491e;
          padding: 14px 20px;
          border-radius: 16px;
          font-size: 15px;
          margin-bottom: 10px;
          border: 1px dashed rgba(33, 73, 30, 0.2);
        }

        .gam-rank-header {
          display: grid;
          grid-template-columns: 60px 1fr 120px 100px;
          padding: 10px 22px;
          font-size: 12px;
          font-weight: 800;
          color: var(--muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .gam-rank-row{
          background:var(--bone);
          border-radius:18px;
          padding:18px 22px;
          display:grid;
          grid-template-columns: 60px 1fr 120px 100px;
          align-items:center;
          transition:.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gam-rank-row:hover{
          transform:translateX(5px);
          background: #e4ede2;
        }

        .gam-rank-row.top {
          background: white;
          border: 1px solid rgba(33,73,30,0.06);
          box-shadow: var(--shadow-sm);
        }

        .gam-rank-row.me{
          background:#e4ede2;
          border:2px solid var(--green-700);
        }

        .gam-rank-pos {
          font-size: 16px;
          font-weight: 800;
          color: var(--ink);
        }

        .gam-rank-info {
          display: flex;
          flex-direction: column;
        }

        .gam-rank-name{
          font-weight:700;
          color: var(--ink);
        }

        .gam-rank-user{
          color:var(--muted);
          font-size:13px;
        }

        .gam-rank-pts{
          font-weight:800;
          color:var(--green-700);
        }

        .gam-rank-rc {
          font-weight: 600;
          color: var(--ink);
        }

        .gam-rank-you{
          background:var(--green-600);
          color:white;
          padding:4px 10px;
          border-radius:999px;
          font-size:11px;
          font-weight:700;
          width: fit-content;
          margin-top: 2px;
        }

        .gam-empty {
          text-align: center;
          padding: 40px;
          color: var(--muted);
          font-size: 15px;
        }

        .gam-skel{
          border-radius:20px;
          background: linear-gradient(90deg, #f1f6f0 25%, #d6e4d3 50%, #f1f6f0 75%);
          background-size:400% 100%;
          animation:shimmer 1.4s infinite;
        }

        @keyframes shimmer{
          from{ background-position:100% 0; }
          to{ background-position:-100% 0; }
        }

        @media(max-width:1200px){
          .gam-stats-row, .gam-skel-row{ grid-template-columns:repeat(2,1fr); }
          .gam-grid{ grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); }
        }

        @media(max-width:900px){
          .gam-page{ padding:15px; }
          .gam-header{ padding:35px; }
          .gam-stats-row, .gam-skel-row{ grid-template-columns:repeat(2,1fr); gap:15px; }
        }

        @media(max-width:640px){
          .gam-page{ padding:10px; }
          .gam-header{ padding:25px; }
          .gam-header h2{ font-size:28px; }
          .gam-header p{ font-size:15px; }
          .gam-stats-row, .gam-skel-row{ grid-template-columns:1fr; gap:12px; }
          .gam-grid{ grid-template-columns:1fr; }
          .gam-rank-row, .gam-rank-header{ grid-template-columns:50px 1fr 90px; padding:12px 16px; }
          .gam-rank-rc, .gam-rank-you{ display:none; }
          .gam-tabs{ flex-direction:column; }
          .gam-tab{ width:100%; justify-content:center; }
        }
      `}</style>
    </div>
  )
}