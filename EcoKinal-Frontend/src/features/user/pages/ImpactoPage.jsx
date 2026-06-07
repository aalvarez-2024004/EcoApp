// src/features/user/pages/ImpactoPage.jsx
import { useEffect, useState } from 'react'
import { useImpactoStore } from '../store/useImpactoStore'
import { completarRetoPorAccion } from '../../../shared/Gamificacion'

// ─── Paleta & tokens (DetectorReciclaje) ──────────────────────────────────────
const G = {
  pageBg:    '#f4f8f3',
  cardBg:    '#ffffff',
  green1:    '#1b3c1a',
  green2:    '#2d5a27',
  green3:    '#52b788',
  green4:    '#74c69d',
  green5:    '#d8eed8',
  border:    '#ddeedd',
  textMuted: '#6b8e66',
  textSub:   '#9db89a',
}

// ─── helpers ─────────────────────────────────────────────────────────────────
const fmt = (n = 0, decimals = 2) =>
  Number(n).toLocaleString('es-GT', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

const fmtDate = (iso) => {
  const d = new Date(iso)
  return d.toLocaleDateString('es-GT', { day: '2-digit', month: 'short', year: 'numeric' })
}

// ─── Color map for waste types ────────────────────────────────────────────────
const TIPO_META = {
  'Inorgánico':        { color: '#2563eb', bg: 'rgba(37,99,235,.1)',   icon: '♻️', label: 'Inorgánico'        },
  'Orgánico':          { color: G.green2,  bg: '#e8f5e9',              icon: '🌿', label: 'Orgánico'          },
  'Reutilizable':      { color: '#d97706', bg: 'rgba(217,119,6,.1)',   icon: '🔄', label: 'Reutilizable'      },
  'Residuo Peligroso': { color: '#dc2626', bg: 'rgba(220,38,38,.1)',   icon: '⚠️', label: 'Residuo Peligroso' },
  'No reciclable':     { color: '#6b7280', bg: 'rgba(107,114,128,.1)', icon: '🗑️', label: 'No reciclable'     },
}

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!target) return
    let start = null
    const num = parseFloat(target) || 0
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * num)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return value
}

// ─── Background pattern (DetectorReciclaje style) ────────────────────────────
function BgPattern() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
        opacity: 0.035,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="imp-leaf-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.5" fill={G.green2} />
          <circle cx="0"  cy="0"  r="1"   fill={G.green2} />
          <circle cx="60" cy="0"  r="1"   fill={G.green2} />
          <circle cx="0"  cy="60" r="1"   fill={G.green2} />
          <circle cx="60" cy="60" r="1"   fill={G.green2} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#imp-leaf-grid)" />
    </svg>
  )
}

// ─── Header illustration ──────────────────────────────────────────────────────
function HeaderIllustration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      style={{ width: 200, height: 120, opacity: 0.12, flexShrink: 0 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="90" rx="80" ry="20" fill={G.green3} />
      <path d="M100 80 Q80 40 60 20 Q100 30 100 80Z" fill={G.green2} />
      <path d="M100 80 Q120 40 140 20 Q100 30 100 80Z" fill={G.green3} />
      <path d="M100 80 Q70 55 50 60 Q80 45 100 80Z" fill={G.green4} />
      <path d="M100 80 Q130 55 150 60 Q120 45 100 80Z" fill={G.green4} />
      <circle cx="100" cy="78" r="5" fill={G.green1} />
    </svg>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, unit, color, delay = 0 }) {
  const animated = useCountUp(value, 1200)
  return (
    <div
      className="imp-stat-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="imp-stat-icon" style={{ background: `${color}18` }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <div className="imp-stat-content">
        <p className="imp-stat-label">{label}</p>
        <div className="imp-stat-value-row">
          <span className="imp-stat-value" style={{ color }}>
            {fmt(animated, value < 1 ? 4 : 2)}
          </span>
          <span className="imp-stat-unit">{unit}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Type bar ─────────────────────────────────────────────────────────────────
function TipoBar({ tipo, data, total }) {
  const meta = TIPO_META[tipo] || { color: '#888', bg: 'rgba(128,128,128,.1)', icon: '📦', label: tipo }
  const pct = total > 0 ? Math.round((data.cantidad / total) * 100) : 0
  return (
    <div className="imp-tipo-row">
      <div className="imp-tipo-header">
        <span className="imp-tipo-icon" style={{ background: meta.bg }}>{meta.icon}</span>
        <span className="imp-tipo-label">{meta.label}</span>
        <span className="imp-tipo-count">{data.cantidad} scan{data.cantidad !== 1 ? 's' : ''}</span>
        <span className="imp-tipo-pct" style={{ color: meta.color }}>{pct}%</span>
      </div>
      <div className="imp-tipo-track">
        <div
          className="imp-tipo-fill"
          style={{ '--bar-color': meta.color, '--bar-pct': `${pct}%` }}
        />
      </div>
      <div className="imp-tipo-stats">
        <span>🌱 {fmt(data.co2NoEmitidoKg)} kg CO₂</span>
        <span>⚡ {fmt(data.energiaAhorradaKWh)} kWh</span>
        <span>🌳 {fmt(data.arbolesEquivalentes, 4)} árboles</span>
      </div>
    </div>
  )
}

// ─── History row ──────────────────────────────────────────────────────────────
function HistorialRow({ item, index }) {
  const meta = TIPO_META[item.tipo] || { color: '#888', bg: 'rgba(128,128,128,.1)', icon: '📦', label: item.tipo }
  return (
    <div className="imp-hist-row" style={{ animationDelay: `${index * 60}ms` }}>
      <span className="imp-hist-icon" style={{ background: meta.bg, color: meta.color }}>{meta.icon}</span>
      <div className="imp-hist-info">
        <span className="imp-hist-tipo" style={{ color: meta.color }}>{item.tipo}</span>
        <span className="imp-hist-fecha">{fmtDate(item.fecha)}</span>
      </div>
      <div className="imp-hist-nums">
        <span>🌱 {fmt(item.co2NoEmitidoKg)} kg CO₂</span>
        <span>⚡ {fmt(item.energiaAhorradaKWh)} kWh</span>
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ onGoDetector }) {
  return (
    <div className="imp-empty">
      <div className="imp-empty-visual">
        <div className="imp-empty-orbit">
          <span className="imp-empty-planet">🌍</span>
          <span className="imp-empty-moon">♻️</span>
        </div>
      </div>
      <h3>¡Aún no tienes registros!</h3>
      <p>Cada vez que uses el Detector de Reciclaje, tu impacto ambiental quedará registrado aquí automáticamente.</p>
      <button className="imp-cta-btn" onClick={onGoDetector}>
        <i className="ti ti-scan" style={{ fontSize: 16 }} /> Ir al Detector de Reciclaje
      </button>
    </div>
  )
}

// ─── Skeleton loading ────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="imp-skeleton-grid">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="imp-skel-card">
          <div className="imp-skel-icon" />
          <div className="imp-skel-lines">
            <div className="imp-skel-line short" />
            <div className="imp-skel-line long" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ImpactoPage() {
  const { personal, global, isLoading, error, activeView, setActiveView, fetchAll } = useImpactoStore()
  const [retoToast, setRetoToast] = useState(null)

  useEffect(() => {
    fetchAll()
    completarRetoPorAccion('impacto').then(result => {
      if (result && !result.alreadyDone) {
        setRetoToast('📊 ¡Reto completado! Ve a Gamificación para reclamar tus puntos 🌿')
        setTimeout(() => setRetoToast(null), 4000)
      }
    })
  }, []) // eslint-disable-line

  const goDetector = () => { window.location.href = '/dashboard/usuario/detector' }
  const hasData = personal && personal.totalClasificaciones > 0

  return (
    <>
      {/* Google Font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />

      <style>{CSS}</style>

      {/* Toast */}
      {retoToast && (
        <div className="imp-toast">
          <i className="ti ti-circle-check" style={{ fontSize: 16, flexShrink: 0 }} />
          {retoToast}
        </div>
      )}

      <div className="imp-root">
        <BgPattern />

        {/* ── Header ── */}
        <div className="imp-header anim-1">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Badge */}
              <div className="imp-badge">
                <i className="ti ti-leaf" style={{ fontSize: 12 }} />
                EcoKinal · Impacto Ambiental
              </div>

              <h1 className="imp-title">
                Tu huella <span className="imp-title-accent">positiva</span>
              </h1>

              <p className="imp-subtitle">
                Cada residuo que clasificas contribuye al planeta. Aquí puedes ver exactamente cuánto has ayudado.
              </p>
            </div>

            <HeaderIllustration />
          </div>

          {/* Toggle */}
          <div className="imp-toggle">
            <button
              className={`imp-toggle-btn ${activeView === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveView('personal')}
            >
              <i className="ti ti-user" style={{ fontSize: 13 }} /> Mi impacto
            </button>
            <button
              className={`imp-toggle-btn ${activeView === 'global' ? 'active' : ''}`}
              onClick={() => setActiveView('global')}
            >
              <i className="ti ti-world" style={{ fontSize: 13 }} /> Comunidad
            </button>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="imp-error anim-2">
            <i className="ti ti-alert-circle" style={{ fontSize: 16 }} /> {error}
          </div>
        )}

        {/* ── Loading ── */}
        {isLoading && <LoadingSkeleton />}

        {/* ── PERSONAL VIEW ── */}
        {!isLoading && activeView === 'personal' && (
          <>
            {!hasData ? (
              <EmptyState onGoDetector={goDetector} />
            ) : (
              <div className="imp-personal-content">

                {/* Stats grid */}
                <section className="imp-section anim-2">
                  <div className="imp-section-label">
                    <i className="ti ti-chart-bar" style={{ fontSize: 11 }} />
                    Totales acumulados
                  </div>
                  <div className="imp-stats-grid">
                    <StatCard icon="♻️" label="Kg de residuos evitados"   value={personal.totales.kgEvitados}           unit="kg"      color={G.green2}   delay={0}   />
                    <StatCard icon="⚡" label="Energía ahorrada"          value={personal.totales.energiaAhorradaKWh}   unit="kWh"     color="#d97706"    delay={80}  />
                    <StatCard icon="🌫️" label="CO₂ no emitido"           value={personal.totales.co2NoEmitidoKg}       unit="kg CO₂"  color={G.green3}   delay={160} />
                    <StatCard icon="🌳" label="Árboles equivalentes"      value={personal.totales.arbolesEquivalentes}  unit="árboles" color={G.green4}   delay={240} />
                  </div>
                </section>

                {/* Hero count */}
                <div className="imp-hero-count anim-3">
                  <div className="imp-hero-num">{personal.totalClasificaciones}</div>
                  <div className="imp-hero-text">
                    <strong>clasificaciones realizadas</strong>
                    <span>Gracias a ti, {fmt(personal.totales.co2NoEmitidoKg)} kg de CO₂ no llegaron a la atmósfera 🌍</span>
                  </div>
                </div>

                {/* Por tipo */}
                {Object.keys(personal.porTipo).length > 0 && (
                  <section className="imp-section anim-3">
                    <div className="imp-section-label">
                      <i className="ti ti-category" style={{ fontSize: 11 }} />
                      Clasificaciones por tipo
                    </div>
                    <div className="imp-card">
                      {Object.entries(personal.porTipo).map(([tipo, data]) => (
                        <TipoBar key={tipo} tipo={tipo} data={data} total={personal.totalClasificaciones} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Historial */}
                {personal.historial?.length > 0 && (
                  <section className="imp-section anim-4">
                    <div className="imp-section-label">
                      <i className="ti ti-clock" style={{ fontSize: 11 }} />
                      Últimas 10 clasificaciones
                    </div>
                    <div className="imp-card" style={{ padding: 0, overflow: 'hidden' }}>
                      {personal.historial.map((item, i) => (
                        <HistorialRow key={item.id} item={item} index={i} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </>
        )}

        {/* ── GLOBAL VIEW ── */}
        {!isLoading && activeView === 'global' && global && (
          <div className="imp-global-content">

            {/* Global hero */}
            <div className="imp-global-hero anim-2">
              <div className="imp-globe-anim">🌎</div>
              <div className="imp-global-hero-text">
                <h2>La comunidad EcoKinal Guatemala</h2>
                <p>{global.mensaje}</p>
              </div>
            </div>

            {/* Meta strip */}
            <div className="imp-global-meta anim-2">
              <div className="imp-global-meta-item">
                <span className="imp-global-meta-num">{global.totalUsuarios}</span>
                <span>usuarios activos</span>
              </div>
              <div className="imp-global-meta-div" />
              <div className="imp-global-meta-item">
                <span className="imp-global-meta-num">{global.totalClasificaciones}</span>
                <span>clasificaciones totales</span>
              </div>
            </div>

            <section className="imp-section anim-3">
              <div className="imp-section-label">
                <i className="ti ti-world" style={{ fontSize: 11 }} />
                Impacto colectivo
              </div>
              <div className="imp-stats-grid">
                <StatCard icon="♻️" label="Kg de residuos evitados"  value={global.totales.kgEvitados}          unit="kg"      color={G.green2}  delay={0}   />
                <StatCard icon="⚡" label="Energía ahorrada"         value={global.totales.energiaAhorradaKWh}  unit="kWh"     color="#d97706"   delay={80}  />
                <StatCard icon="🌫️" label="CO₂ no emitido"          value={global.totales.co2NoEmitidoKg}      unit="kg CO₂"  color={G.green3}  delay={160} />
                <StatCard icon="🌳" label="Árboles equivalentes"     value={global.totales.arbolesEquivalentes} unit="árboles" color={G.green4}  delay={240} />
              </div>
            </section>

            {global.porTipo && Object.keys(global.porTipo).length > 0 && (
              <section className="imp-section anim-4">
                <div className="imp-section-label">
                  <i className="ti ti-chart-bar" style={{ fontSize: 11 }} />
                  Residuos más clasificados
                </div>
                <div className="imp-card">
                  {Object.entries(global.porTipo)
                    .sort(([, a], [, b]) => b - a)
                    .map(([tipo, cantidad]) => {
                      const meta = TIPO_META[tipo] || { color: '#888', bg: 'rgba(128,128,128,.1)', icon: '📦' }
                      const pct = global.totalClasificaciones > 0
                        ? Math.round((cantidad / global.totalClasificaciones) * 100) : 0
                      return (
                        <div key={tipo} className="imp-tipo-row">
                          <div className="imp-tipo-header">
                            <span className="imp-tipo-icon" style={{ background: meta.bg }}>{meta.icon}</span>
                            <span className="imp-tipo-label">{tipo}</span>
                            <span className="imp-tipo-count">{cantidad} scans</span>
                            <span className="imp-tipo-pct" style={{ color: meta.color }}>{pct}%</span>
                          </div>
                          <div className="imp-tipo-track">
                            <div className="imp-tipo-fill" style={{ '--bar-color': meta.color, '--bar-pct': `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </>
  )
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  * { box-sizing: border-box; }

  .imp-root {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    background: ${G.pageBg};
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative;
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 60px 24px;
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim-1 { animation: fadeUp 0.45s ease both; }
  .anim-2 { animation: fadeUp 0.45s 0.08s ease both; }
  .anim-3 { animation: fadeUp 0.45s 0.16s ease both; }
  .anim-4 { animation: fadeUp 0.45s 0.24s ease both; }

  @keyframes pulse-dot {
    0%,100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* ── Toast ── */
  @keyframes toastIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
  .imp-toast {
    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
    z-index: 9999;
    display: flex; align-items: center; gap: 8px;
    padding: 12px 18px; border-radius: 14px;
    background: ${G.green1}; color: #fff;
    font-size: 13px; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif;
    box-shadow: 0 8px 32px rgba(27,60,26,0.3);
    animation: toastIn 0.3s cubic-bezier(0.16,1,0.3,1) both;
    white-space: nowrap;
  }

  /* ── Header ── */
  .imp-header { display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 1; }

  .imp-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; border-radius: 100px; width: fit-content;
    background: #e8f5e9; border: 1px solid rgba(82,183,136,0.35);
    color: ${G.green2}; font-size: 11px; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
  }

  .imp-title {
    margin: 0; font-size: 2.2rem; font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.1;
    background: linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 60%, ${G.green3} 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .imp-title-accent {
    background: linear-gradient(135deg, ${G.green3}, ${G.green4});
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .imp-subtitle {
    margin: 0; font-size: 14px; color: ${G.textMuted};
    max-width: 520px; line-height: 1.6; font-weight: 400;
  }

  /* ── Toggle ── */
  .imp-toggle {
    display: inline-flex; padding: 5px; gap: 4px;
    background: ${G.cardBg}; border-radius: 18px;
    border: 1px solid ${G.border};
    box-shadow: 0 2px 8px rgba(45,90,39,0.06);
    width: fit-content;
  }
  .imp-toggle-btn {
    padding: 9px 20px; border-radius: 14px; border: none;
    background: transparent; cursor: pointer; font-size: 13px;
    font-weight: 600; color: ${G.textSub}; transition: all 0.2s;
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex; align-items: center; gap: 6px;
  }
  .imp-toggle-btn.active {
    background: ${G.green2}; color: #fff;
    box-shadow: 0 2px 10px rgba(45,90,39,0.3);
  }

  /* ── Error ── */
  .imp-error {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px; border-radius: 12px;
    font-size: 13px; font-weight: 600;
    background: #fff5f5; border: 1px solid #ffcccc; color: #dc2626;
    position: relative; z-index: 1;
  }

  /* ── Section label ── */
  .imp-section { position: relative; z-index: 1; }
  .imp-section-label {
    display: flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    color: ${G.textSub}; text-transform: uppercase; margin-bottom: 12px;
  }

  /* ── Generic card ── */
  .imp-card {
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 20px; padding: 20px;
    box-shadow: 0 4px 24px rgba(45,90,39,0.06);
    display: flex; flex-direction: column; gap: 20px;
  }

  /* ── Stat grid ── */
  .imp-stats-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
  }

  .imp-stat-card {
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 18px; padding: 18px 20px;
    display: flex; gap: 14px; align-items: flex-start;
    box-shadow: 0 2px 12px rgba(45,90,39,0.05);
    animation: fadeUp 0.5s ease both;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .imp-stat-card:hover {
    box-shadow: 0 6px 20px rgba(45,90,39,0.1);
    transform: translateY(-2px);
  }

  .imp-stat-icon {
    width: 44px; height: 44px; border-radius: 14px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 20px;
  }
  .imp-stat-content { flex: 1; min-width: 0; }
  .imp-stat-label { font-size: 11px; color: ${G.textMuted}; margin: 0 0 6px; font-weight: 600; }
  .imp-stat-value-row { display: flex; align-items: baseline; gap: 5px; }
  .imp-stat-value {
    font-size: 22px; font-weight: 800; line-height: 1;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .imp-stat-unit { font-size: 11px; color: ${G.textSub}; font-weight: 600; }

  /* ── Hero count ── */
  .imp-hero-count {
    display: flex; align-items: center; gap: 24px;
    background: linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 100%);
    border-radius: 24px; padding: 28px 32px;
    box-shadow: 0 8px 32px rgba(27,60,26,0.22);
    position: relative; z-index: 1; overflow: hidden;
  }
  .imp-hero-count::before {
    content: '';
    position: absolute; top: -40px; right: -40px;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(255,255,255,0.04);
    pointer-events: none;
  }
  .imp-hero-num {
    font-size: 64px; font-weight: 800; color: ${G.green4};
    line-height: 1; flex-shrink: 0; letter-spacing: -0.04em;
  }
  .imp-hero-text { display: flex; flex-direction: column; gap: 6px; }
  .imp-hero-text strong { font-size: 18px; color: #fff; font-weight: 700; }
  .imp-hero-text span   { font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.6; }

  /* ── Tipos ── */
  .imp-tipo-row { display: flex; flex-direction: column; gap: 8px; }
  .imp-tipo-header { display: flex; align-items: center; gap: 10px; }
  .imp-tipo-icon {
    width: 30px; height: 30px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; flex-shrink: 0;
  }
  .imp-tipo-label { flex: 1; font-size: 13px; font-weight: 600; color: ${G.green1}; }
  .imp-tipo-count { font-size: 11px; color: ${G.textMuted}; }
  .imp-tipo-pct   { font-size: 13px; font-weight: 700; }

  .imp-tipo-track {
    height: 6px; background: ${G.green5}; border-radius: 99px; overflow: hidden;
  }
  .imp-tipo-fill {
    height: 100%; border-radius: 99px;
    background: var(--bar-color);
    width: 0;
    animation: barGrow 0.9s cubic-bezier(.34,1.4,.64,1) forwards;
    animation-delay: 0.2s;
  }
  @keyframes barGrow { to { width: var(--bar-pct); } }

  .imp-tipo-stats {
    display: flex; gap: 16px; font-size: 11px; color: ${G.textMuted};
  }

  /* ── Historial ── */
  .imp-hist-row {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 20px;
    border-bottom: 1px solid ${G.border};
    animation: fadeUp 0.4s ease both;
    transition: background 0.15s;
  }
  .imp-hist-row:last-child { border-bottom: none; }
  .imp-hist-row:hover { background: #f7fdf7; }

  .imp-hist-icon {
    width: 34px; height: 34px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .imp-hist-info  { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .imp-hist-tipo  { font-size: 13px; font-weight: 600; }
  .imp-hist-fecha { font-size: 11px; color: ${G.textSub}; }
  .imp-hist-nums  { display: flex; gap: 14px; font-size: 11px; color: ${G.textMuted}; flex-shrink: 0; }

  /* ── Skeleton ── */
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  .imp-skeleton-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
    position: relative; z-index: 1;
  }
  .imp-skel-card {
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 18px; padding: 20px; display: flex; gap: 14px;
  }
  .imp-skel-icon {
    width: 44px; height: 44px; border-radius: 14px; flex-shrink: 0;
    background: linear-gradient(90deg, ${G.green5} 25%, ${G.border} 50%, ${G.green5} 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s infinite linear;
  }
  .imp-skel-lines { flex: 1; display: flex; flex-direction: column; gap: 10px; justify-content: center; }
  .imp-skel-line {
    border-radius: 6px; height: 10px;
    background: linear-gradient(90deg, ${G.green5} 25%, ${G.border} 50%, ${G.green5} 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s infinite linear;
  }
  .imp-skel-line.short { width: 60%; }
  .imp-skel-line.long  { width: 100%; height: 18px; }

  /* ── Empty state ── */
  .imp-empty {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 4rem 2rem; gap: 1.25rem;
    position: relative; z-index: 1;
  }
  .imp-empty-visual {
    width: 120px; height: 120px; display: flex;
    align-items: center; justify-content: center; position: relative;
  }
  @keyframes spinOrbit {
    from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
  }
  @keyframes floatPlanet {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-8px); }
  }
  .imp-empty-planet { font-size: 52px; animation: floatPlanet 3s ease-in-out infinite; }
  .imp-empty-moon {
    position: absolute; font-size: 22px;
    animation: spinOrbit 4s linear infinite;
  }

  .imp-empty h3 { font-size: 22px; color: ${G.green1}; font-weight: 800; margin: 0; }
  .imp-empty p  { font-size: 14px; color: ${G.textMuted}; max-width: 380px; line-height: 1.7; margin: 0; }

  .imp-cta-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 26px; border-radius: 14px; border: none;
    background: ${G.green2}; color: #fff; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
    box-shadow: 0 4px 16px rgba(45,90,39,0.2);
  }
  .imp-cta-btn:hover {
    background: ${G.green1};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(45,90,39,0.28);
  }

  /* ── Global view ── */
  .imp-global-hero {
    display: flex; align-items: center; gap: 24px;
    background: linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 100%);
    border-radius: 24px; padding: 28px 32px; margin-bottom: 2rem;
    box-shadow: 0 8px 32px rgba(27,60,26,0.22);
    position: relative; z-index: 1; overflow: hidden;
  }
  .imp-globe-anim {
    font-size: 52px; flex-shrink: 0;
    animation: floatPlanet 4s ease-in-out infinite;
  }
  .imp-global-hero-text h2 { font-size: 20px; color: #fff; margin: 0 0 8px; font-weight: 700; }
  .imp-global-hero-text p  { font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.65; margin: 0; }

  .imp-global-meta {
    display: flex; align-items: center;
    background: ${G.cardBg}; border-radius: 20px; border: 1px solid ${G.border};
    padding: 18px 28px; margin-bottom: 2rem;
    justify-content: center; position: relative; z-index: 1;
    box-shadow: 0 2px 12px rgba(45,90,39,0.05);
  }
  .imp-global-meta-item {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
    font-size: 12px; color: ${G.textMuted}; font-weight: 500;
  }
  .imp-global-meta-num {
    font-size: 32px; font-weight: 800; color: ${G.green2}; line-height: 1;
  }
  .imp-global-meta-div {
    width: 1px; height: 50px; background: ${G.border}; flex-shrink: 0; margin: 0 20px;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .imp-stats-grid { grid-template-columns: repeat(2, 1fr); }
    .imp-skeleton-grid { grid-template-columns: repeat(2, 1fr); }
    .imp-hero-num { font-size: 44px; }
  }
  @media (max-width: 600px) {
    .imp-root { padding: 40px 16px; }
    .imp-stats-grid { grid-template-columns: 1fr; }
    .imp-hero-count { flex-direction: column; align-items: flex-start; gap: 12px; }
    .imp-hero-num { font-size: 52px; }
    .imp-hist-nums { display: none; }
  }
`