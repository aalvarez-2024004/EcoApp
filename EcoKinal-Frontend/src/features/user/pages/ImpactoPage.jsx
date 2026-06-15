import { useEffect, useState } from 'react'
import { useImpactoStore } from '../store/useImpactoStore'
import { completarRetoPorAccion } from '../../../shared/Api/Gamificacion'
import { ImpactoPageCSS, G, fmt, TIPO_META } from '../../../Styles/constants/ImpactoPage.js'
import { StatCard } from '../../../ui/Impacto/StartCard.jsx'
import { TipoBar } from '../../../ui/Impacto/TipoBar.jsx'
import { HistorialRow } from '../../../ui/Impacto/HistorialRow.jsx'
import { EmptyState } from '../../../ui/Impacto/EmptyState.jsx'
import { LoadingSkeleton } from '../../../ui/Impacto/LoadingSkeleton.jsx'
import EcoBotFlotante from './EcoBotFlotante.jsx'

export function useCountUp(target, duration = 1400) {
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
  }, [])

  const goDetector = () => { window.location.href = '/dashboard/usuario/detector' }
  const hasData = personal && personal.totalClasificaciones > 0

  return (
    <>
      <style>{ImpactoPageCSS}</style>

      {/* Toast */}
      {retoToast && (
        <div className="imp-toast">
          <i className="ti ti-circle-check" style={{ fontSize: 16, flexShrink: 0 }} />
          {retoToast}
        </div>
      )}

      <div className="imp-root">

        {/* ── Header ── */}
        <div className="imp-header anim-1">
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

        {/* ── PERSONAL VIEW ── */}
        {activeView === 'personal' && (
          <>
            {isLoading ? (
              /* Loading: sidebar + main skeleton */
              <div className="imp-body">
                <div className="imp-sidebar">
                  <LoadingSkeleton />
                </div>
                <div className="imp-main">
                  <div style={{ height: 120, borderRadius: 20, background: 'linear-gradient(90deg,#eaf3e8 25%,#d4e9d2 50%,#eaf3e8 75%)', backgroundSize: '400px 100%', animation: 'shimmer 1.4s infinite linear' }} />
                  <div style={{ height: 300, borderRadius: 20, background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }} />
                </div>
              </div>
            ) : !hasData ? (
              <EmptyState onGoDetector={goDetector} />
            ) : (
              <div className="imp-body">

                {/* ── LEFT SIDEBAR: stat cards ── */}
                <div className="imp-sidebar">
                  <div className="anim-2">
                    <div className="imp-section-label" style={{ marginBottom: 14 }}>
                      <i className="ti ti-chart-bar" style={{ fontSize: 11 }} />
                      Totales acumulados
                    </div>
                  </div>
                  <div className="anim-3"><StatCard icon="♻️" label="Kg de residuos evitados"  value={personal.totales.kgEvitados}          unit="kg"      color="#2d5a27" delay={0}   /></div>
                  <div className="anim-3"><StatCard icon="⚡" label="Energía ahorrada"          value={personal.totales.energiaAhorradaKWh}  unit="kWh"     color="#d97706" delay={60}  /></div>
                  <div className="anim-4"><StatCard icon="🌫️" label="CO₂ no emitido"           value={personal.totales.co2NoEmitidoKg}      unit="kg CO₂"  color="#52b788" delay={120} /></div>
                  <div className="anim-4"><StatCard icon="🌳" label="Árboles equivalentes"      value={personal.totales.arbolesEquivalentes} unit="árboles" color="#74c69d" delay={180} /></div>
                </div>

                {/* ── RIGHT MAIN ── */}
                <div className="imp-main">

                  {/* Hero count banner */}
                  <div className="imp-hero-count anim-2">
                    <div className="imp-hero-num-block">
                      <span className="imp-hero-num">{personal.totalClasificaciones}</span>
                      <span className="imp-hero-num-label">total</span>
                    </div>
                    <div className="imp-hero-text-block">
                      <strong>clasificaciones realizadas</strong>
                      <span>
                        Gracias a ti, {fmt(personal.totales.co2NoEmitidoKg)} kg de CO₂ no llegaron a la atmósfera 🌍
                      </span>
                    </div>
                  </div>

                  {/* Clasificaciones por tipo */}
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
                        Últimas {personal.historial.length} clasificaciones
                      </div>
                      <div className="imp-card" style={{ padding: 0, overflow: 'hidden' }}>
                        {/* Table header */}
                        <div className="imp-hist-table-header">
                          <span style={{ flex: '0 0 36px' }} />
                          <span style={{ flex: 1 }}>Tipo</span>
                          <span className="imp-hist-col-fecha">Fecha</span>
                          <span className="imp-hist-col-nums">CO₂ evitado</span>
                          <span className="imp-hist-col-nums">Energía</span>
                        </div>
                        {/* Scrollable body */}
                        <div className="imp-hist-scroll">
                          {personal.historial.map((item, i) => (
                            <HistorialRow key={item.id} item={item} index={i} />
                          ))}
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── GLOBAL VIEW ── */}
        {activeView === 'global' && (
          <>
            {isLoading ? (
              <LoadingSkeleton />
            ) : global && (
              <div className="imp-body">
                {/* Sidebar global stats */}
                <div className="imp-sidebar">
                  <div className="anim-2">
                    <div className="imp-section-label" style={{ marginBottom: 14 }}>
                      <i className="ti ti-world" style={{ fontSize: 11 }} />
                      Impacto colectivo
                    </div>
                  </div>
                  <div className="anim-3"><StatCard icon="♻️" label="Kg de residuos evitados"  value={global.totales.kgEvitados}          unit="kg"      color="#2d5a27" delay={0}   /></div>
                  <div className="anim-3"><StatCard icon="⚡" label="Energía ahorrada"          value={global.totales.energiaAhorradaKWh}  unit="kWh"     color="#d97706" delay={60}  /></div>
                  <div className="anim-4"><StatCard icon="🌫️" label="CO₂ no emitido"           value={global.totales.co2NoEmitidoKg}      unit="kg CO₂"  color="#52b788" delay={120} /></div>
                  <div className="anim-4"><StatCard icon="🌳" label="Árboles equivalentes"      value={global.totales.arbolesEquivalentes} unit="árboles" color="#74c69d" delay={180} /></div>
                </div>

                <div className="imp-main">
                  {/* Global hero */}
                  <div className="imp-global-hero anim-2">
                    <div className="imp-globe-anim">🌎</div>
                    <div className="imp-global-hero-text">
                      <h2>La comunidad EcoKinal Guatemala</h2>
                      <p>{global.mensaje}</p>
                    </div>
                  </div>

                  {/* Meta strip */}
                  <div className="imp-global-meta anim-3">
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

                  {/* Por tipo global */}
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
              </div>
            )}
          </>
        )}
      </div>
      <EcoBotFlotante />
    </>
  )
}