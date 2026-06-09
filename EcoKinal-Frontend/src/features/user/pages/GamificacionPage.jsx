import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useGamificacionStore from '../store/useGamificacionStore'
import useAuthStore from '../../auth/store/useAuthStore'
import StatCard      from '../components/GamificacionComps/StatCard'
import BadgeItem     from '../components/GamificacionComps/BadgeItem'
import ChallengeCard from '../components/GamificacionComps/ChallengeCard'
import RankingRow    from '../components/GamificacionComps/RankingRow'
import {gamificacionCss, KEY_REDIRECT} from '../../../Styles/constants/GamificacionPage.js'
import EcoBotFlotante from './EcoBotFlotante.jsx'

export default function GamificacionPage() {
  const {
    profile, ranking, challenges,
    loadingProfile, loadingRanking, loadingChallenges,
    fetchProfile, fetchRanking, fetchChallenges,
    claimChallenge, completingChallenge,
  } = useGamificacionStore()

  const user     = useAuthStore(s => s.user)
  const navigate = useNavigate()
  const location = useLocation()
  const [toast, setToast] = useState(null)
  const [tab,   setTab]   = useState('retos')

  // Función de recarga completa
  const recargarTodo = useCallback(() => {
    fetchProfile()
    fetchRanking()
    fetchChallenges()
  }, [fetchProfile, fetchRanking, fetchChallenges])

  // Carga inicial (y cada vez que se navega a esta página)
  useEffect(() => {
    recargarTodo()
  }, [location.pathname]) // eslint-disable-line

  // Refrescar al recuperar foco de ventana (alt-tab, etc.)
  useEffect(() => {
    const onFocus   = () => recargarTodo()
    const onVisible = () => { if (document.visibilityState === 'visible') recargarTodo() }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [recargarTodo])

  const showToast = (ok, msg) => {
    setToast({ ok, msg })
    setTimeout(() => setToast(null), 3500)
  }

  // El usuario clickea "Reclamar" en una ChallengeCard
  const handleClaim = async (ch) => {
    const result = await claimChallenge(ch._id)
    if (result.ok) {
      showToast(true, result.message || `¡+${ch.pointsReward} eco-puntos reclamados! 🌿`)
    } else {
      showToast(false, result.message || 'Error al reclamar los puntos.')
    }
  }

  // El usuario clickea "Ir a…" en una ChallengeCard
  const handleOpen = (ch) => {
    const path = KEY_REDIRECT[ch.verificationKey] || '/dashboard/usuario/detector'
    navigate(path)
  }

  // La barra solo sube cuando los puntos ya fueron otorgados:
  // claimed:true para retos externos, o completed:true para detector/detector_3
  const completedClaimed = challenges.filter(c =>
    c.claimed || (['detector','detector_3'].includes(c.verificationKey) && c.completed)
  ).length
  const total         = challenges.length
  const currentUserId = user?.id || user?.uid || ''

  return (
    <>
    
    <div className="gam-page">
      <style>{gamificacionCss}</style>

      {/* ── Toast de notificación ── */}
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
          <StatCard icon="ti-coin"        value={profile?.points ?? 0}         label="Eco-puntos"  color="#3b6b35" />
          <StatCard icon="ti-recycle"     value={profile?.recyclingCount ?? 0} label="Reciclajes"  color="#21491e" />
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

      {/* ── Barra de progreso ── */}
      {!loadingChallenges && total > 0 && (
        <div className="gam-prog-wrap">
          <div className="gam-prog-label">
            <span>Retos completados hoy</span>
            <span className="gam-prog-count">{completedClaimed}/{total}</span>
          </div>
          <div className="gam-prog-track">
            <div
              className="gam-prog-fill"
              style={{ width: `${(completedClaimed / total) * 100}%` }}
            />
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
                <ChallengeCard
                  key={ch._id}
                  challenge={ch}
                  onOpen={handleOpen}
                  onClaim={handleClaim}
                  claiming={completingChallenge === ch._id}
                />
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

    </div>
      {/* ── EcoBot flotante ── */}
      <EcoBotFlotante />
    </>

  )
}