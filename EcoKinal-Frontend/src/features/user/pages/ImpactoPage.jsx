import { useEffect, useState } from 'react'
import { useImpactoStore } from '../store/useImpactoStore'
import { completarRetoPorAccion } from '../../../shared/Api/Gamificacion'
import {HeaderIllustration}from '../../../icons/ImpactoIcons.jsx'
import{BgPattern} from '../../../icons/DetectorIcons.jsx'
import {ImpactoPageCss, G,fmt, TIPO_META} from '../../../Styles/constants/ImpactoPage.js'
import { StatCard } from '../../../ui/Impacto/StartCard.jsx'
import { TipoBar } from '../../../ui/Impacto/TipoBar.jsx'
import { HistorialRow } from '../../../ui/Impacto/HistorialRow.jsx'
import { EmptyState } from '../../../ui/Impacto/EmptyState.jsx'
import { LoadingSkeleton } from '../../../ui/Impacto/LoadingSkeleton.jsx'

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
      {/* Google Font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />

      <style>{ImpactoPageCss}</style>

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

