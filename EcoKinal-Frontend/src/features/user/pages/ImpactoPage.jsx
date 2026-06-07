// src/features/user/pages/ImpactoPage.jsx
import { useEffect, useState } from 'react'
import { useImpactoStore } from '../store/useImpactoStore'
import { completarRetoPorAccion } from '../../../shared/Gamificacion'

// ─── helpers ─────────────────────────────────────────────────────────────────
const fmt = (n = 0, decimals = 2) =>
    Number(n).toLocaleString('es-GT', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

const fmtDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('es-GT', { day: '2-digit', month: 'short', year: 'numeric' })
}

// ─── Color map for waste types ────────────────────────────────────────────────
const TIPO_META = {
    'Inorgánico':        { color: '#3B8BEB', bg: 'rgba(59,139,235,.12)', icon: '♻️', label: 'Inorgánico'       },
    'Orgánico':          { color: '#4CAF50', bg: 'rgba(76,175,80,.12)',  icon: '🌿', label: 'Orgánico'         },
    'Reutilizable':      { color: '#FF9800', bg: 'rgba(255,152,0,.12)', icon: '🔄', label: 'Reutilizable'      },
    'Residuo Peligroso': { color: '#F44336', bg: 'rgba(244,67,54,.12)', icon: '⚠️', label: 'Residuo Peligroso' },
    'No reciclable':     { color: '#9E9E9E', bg: 'rgba(158,158,158,.12)',icon: '🗑️', label: 'No reciclable'    },
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

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, unit, color, delay = 0, big = false }) {
    const animated = useCountUp(value, 1200)
    return (
        <div
        className="imp-stat-card"
        style={{
            '--card-color': color,
            animationDelay: `${delay}ms`,
        }}
        >
        <div className="imp-stat-icon">{icon}</div>
        <div className="imp-stat-content">
            <p className="imp-stat-label">{label}</p>
            <div className="imp-stat-value-row">
            <span className={`imp-stat-value ${big ? 'big' : ''}`}>
                {fmt(animated, value < 1 ? 4 : 2)}
            </span>
            <span className="imp-stat-unit">{unit}</span>
            </div>
        </div>
        </div>
    )
}

// ─── Type bar ────────────────────────────────────────────────────────────────
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
            <span>🔍</span> Ir al Detector de Reciclaje
        </button>
        </div>
    )
}

// ─── Skeleton loading ────────────────────────────────────────────────────────
function LoadingSkeleton() {
    return (
        <div className="imp-skeleton-grid">
        {[1,2,3,4].map(i => (
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
        <div className="imp-root">
        <style>{CSS}</style>
        <style>{`
            @keyframes impToastIn { from { transform:translateY(-8px); opacity:0; } to { transform:translateY(0); opacity:1; } }
            .imp-reto-toast { display:flex; align-items:center; gap:8px; padding:12px 16px; border-radius:14px; background:#21491e; color:white; font-size:13px; font-weight:600; line-height:1.4; margin-bottom:16px; animation:impToastIn .3s cubic-bezier(0.16,1,0.3,1); }
        `}</style>
        {retoToast && (
            <div className="imp-reto-toast">
                <i className="ti ti-circle-check" style={{ fontSize:16, flexShrink:0 }} />
                {retoToast}
            </div>
        )}

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="imp-header">
            <div className="imp-header-badge">
            <span>🌱</span>
            <span>EcoKinal · Impacto Ambiental</span>
            </div>
            <h1 className="imp-title">
            Tu huella <span className="imp-title-accent">positiva</span>
            </h1>
            <p className="imp-subtitle">
            Cada residuo que clasificas contribuye al planeta. Aquí puedes ver exactamente cuánto has ayudado.
            </p>

            {/* ── View toggle ── */}
            <div className="imp-toggle">
            <button
                className={`imp-toggle-btn ${activeView === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveView('personal')}
            >
                👤 Mi impacto
            </button>
            <button
                className={`imp-toggle-btn ${activeView === 'global' ? 'active' : ''}`}
                onClick={() => setActiveView('global')}
            >
                🌍 Comunidad
            </button>
            </div>
        </div>

        {/* ── Error ── */}
        {error && (
            <div className="imp-error">
            <span>⚠️</span> {error}
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

                {/* ── Totales ── */}
                <section className="imp-section">
                    <div className="imp-section-label">📊 TOTALES ACUMULADOS</div>
                    <div className="imp-stats-grid">
                    <StatCard
                        icon="♻️"
                        label="Kg de residuos evitados"
                        value={personal.totales.kgEvitados}
                        unit="kg"
                        color="#3B8BEB"
                        delay={0}
                        big
                    />
                    <StatCard
                        icon="⚡"
                        label="Energía ahorrada"
                        value={personal.totales.energiaAhorradaKWh}
                        unit="kWh"
                        color="#FF9800"
                        delay={80}
                        big
                    />
                    <StatCard
                        icon="🌫️"
                        label="CO₂ no emitido"
                        value={personal.totales.co2NoEmitidoKg}
                        unit="kg CO₂"
                        color="#4CAF50"
                        delay={160}
                        big
                    />
                    <StatCard
                        icon="🌳"
                        label="Árboles equivalentes"
                        value={personal.totales.arbolesEquivalentes}
                        unit="árboles"
                        color="#27966b"
                        delay={240}
                        big
                    />
                    </div>
                </section>

                {/* ── Clasificaciones hero ── */}
                <div className="imp-hero-count">
                    <div className="imp-hero-num">{personal.totalClasificaciones}</div>
                    <div className="imp-hero-text">
                    <strong>clasificaciones realizadas</strong>
                    <span>Gracias a ti, {fmt(personal.totales.co2NoEmitidoKg)} kg de CO₂ no llegaron a la atmósfera 🌍</span>
                    </div>
                </div>

                {/* ── Por tipo ── */}
                {Object.keys(personal.porTipo).length > 0 && (
                    <section className="imp-section">
                    <div className="imp-section-label">🗂 CLASIFICACIONES POR TIPO</div>
                    <div className="imp-tipos-card">
                        {Object.entries(personal.porTipo).map(([tipo, data]) => (
                        <TipoBar
                            key={tipo}
                            tipo={tipo}
                            data={data}
                            total={personal.totalClasificaciones}
                        />
                        ))}
                    </div>
                    </section>
                )}

                {/* ── Historial ── */}
                {personal.historial?.length > 0 && (
                    <section className="imp-section">
                    <div className="imp-section-label">🕒 ÚLTIMAS 10 CLASIFICACIONES</div>
                    <div className="imp-historial-card">
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
            <div className="imp-global-hero">
                <div className="imp-globe-anim">🌎</div>
                <div className="imp-global-hero-text">
                <h2>La comunidad EcoKinal Guatemala</h2>
                <p>{global.mensaje}</p>
                </div>
            </div>

            <div className="imp-global-meta">
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

            <section className="imp-section">
                <div className="imp-section-label">🌐 IMPACTO COLECTIVO</div>
                <div className="imp-stats-grid">
                <StatCard
                    icon="♻️"
                    label="Kg de residuos evitados"
                    value={global.totales.kgEvitados}
                    unit="kg"
                    color="#3B8BEB"
                    delay={0}
                />
                <StatCard
                    icon="⚡"
                    label="Energía ahorrada"
                    value={global.totales.energiaAhorradaKWh}
                    unit="kWh"
                    color="#FF9800"
                    delay={80}
                />
                <StatCard
                    icon="🌫️"
                    label="CO₂ no emitido"
                    value={global.totales.co2NoEmitidoKg}
                    unit="kg CO₂"
                    color="#4CAF50"
                    delay={160}
                />
                <StatCard
                    icon="🌳"
                    label="Árboles equivalentes"
                    value={global.totales.arbolesEquivalentes}
                    unit="árboles"
                    color="#27966b"
                    delay={240}
                />
                </div>
            </section>

            {global.porTipo && Object.keys(global.porTipo).length > 0 && (
                <section className="imp-section">
                <div className="imp-section-label">🗂 RESIDUOS MÁS CLASIFICADOS</div>
                <div className="imp-tipos-card">
                    {Object.entries(global.porTipo)
                    .sort(([,a],[,b]) => b - a)
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
                            <div
                                className="imp-tipo-fill"
                                style={{ '--bar-color': meta.color, '--bar-pct': `${pct}%` }}
                            />
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
    )
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@700&display=swap');

    .imp-root {
        background: #eef1f9;
        min-height: 100vh;
        padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 2rem);
        max-width: 1280px;
        margin: 0 auto;
        box-sizing: border-box;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* ── Header ── */
    .imp-header { margin-bottom: 2.5rem; }

    .imp-header-badge {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 5px 13px; border-radius: 99px;
        background: rgba(35,55,109,0.15); border: 0.5px solid #23376d;
        font-size: 10px; font-weight: 700; letter-spacing: .1em;
        color: #23376d; text-transform: uppercase; margin-bottom: 1rem;
    }

    .imp-title {
        font-size: clamp(36px, 5vw, 52px); font-weight: 800;
        color: #111827; line-height: 1.1; letter-spacing: -.02em;
        margin: 0 0 .75rem;
    }
    .imp-title-accent { color: #eb7207; }

    .imp-subtitle {
        font-size: 15px; color: #4b5a8a; max-width: 520px;
        line-height: 1.7; margin: 0 0 1.5rem;
    }

    /* ── Toggle ── */
    .imp-toggle {
        display: inline-flex; padding: 6px; gap: 4px;
        background: #fff; border-radius: 18px;
        border: 0.5px solid rgba(35,55,109,0.15);
    }
    .imp-toggle-btn {
        padding: 9px 22px; border-radius: 14px; border: none;
        background: transparent; cursor: pointer; font-size: 13px;
        font-weight: 600; color: #4b5a8a; transition: all .2s;
        font-family: inherit;
    }
    .imp-toggle-btn.active {
        background: #23376d; color: #fff;
        box-shadow: 0 2px 10px rgba(35,55,109,.3);
    }

    /* ── Error ── */
    .imp-error {
        display: flex; align-items: center; gap: 10px;
        padding: 13px 17px; border-radius: 14px; font-size: 13px;
        background: #FCEBEB; border: 0.5px solid #F09595; color: #791F1F;
        margin-bottom: 2rem;
    }

    /* ── Skeleton ── */
    @keyframes shimmer {
        0%   { background-position: -400px 0; }
        100% { background-position:  400px 0; }
    }
    .imp-skeleton-grid {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
        margin-bottom: 2rem;
    }
    .imp-skel-card {
        background: #fff; border-radius: 20px; padding: 22px;
        display: flex; gap: 14px;
    }
    .imp-skel-icon {
        width: 44px; height: 44px; border-radius: 14px; flex-shrink: 0;
        background: linear-gradient(90deg,#e8ecf5 25%,#d6dcef 50%,#e8ecf5 75%);
        background-size: 400px 100%;
        animation: shimmer 1.4s infinite linear;
    }
    .imp-skel-lines { flex: 1; display: flex; flex-direction: column; gap: 10px; justify-content: center; }
    .imp-skel-line {
        border-radius: 6px; height: 10px;
        background: linear-gradient(90deg,#e8ecf5 25%,#d6dcef 50%,#e8ecf5 75%);
        background-size: 400px 100%;
        animation: shimmer 1.4s infinite linear;
    }
    .imp-skel-line.short { width: 60%; }
    .imp-skel-line.long  { width: 100%; height: 18px; }

    /* ── Section label ── */
    .imp-section { margin-bottom: 2rem; }
    .imp-section-label {
        font-size: 10px; font-weight: 700; letter-spacing: .12em;
        color: #fdb500; text-transform: uppercase; margin-bottom: 1rem;
    }

    /* ── Stat cards ── */
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    .imp-stats-grid {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
    }
    @media(max-width:900px) {
        .imp-stats-grid { grid-template-columns: repeat(2,1fr); }
        .imp-skeleton-grid { grid-template-columns: repeat(2,1fr); }
    }

    .imp-stat-card {
        background: #fff; border-radius: 20px;
        padding: 20px; display: flex; gap: 14px; align-items: flex-start;
        border: 0.5px solid rgba(35,55,109,0.15);
        box-shadow: 0 2px 12px rgba(35,55,109,.06);
        animation: fadeUp .5s ease both;
        transition: transform .2s, box-shadow .2s;
    }
    .imp-stat-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 28px rgba(35,55,109,.13);
    }

    .imp-stat-icon {
        font-size: 24px; width: 44px; height: 44px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 14px;
        background: color-mix(in srgb, var(--card-color) 12%, transparent);
        flex-shrink: 0;
    }

    .imp-stat-content { flex: 1; min-width: 0; }
    .imp-stat-label   { font-size: 11px; color: #4b5a8a; margin: 0 0 6px; font-weight: 600; }
    .imp-stat-value-row { display: flex; align-items: baseline; gap: 5px; }
    .imp-stat-value {
        font-family: 'Space Mono', monospace;
        font-size: 22px; font-weight: 700;
        color: var(--card-color);
        line-height: 1;
    }
    .imp-stat-value.big { font-size: 26px; }
    .imp-stat-unit { font-size: 11px; color: #fdb500; font-weight: 600; }

    /* ── Hero count ── */
    .imp-hero-count {
        display: flex; align-items: center; gap: 24px;
        background: linear-gradient(135deg, #1a2b57 0%, #23376d 100%);
        border-radius: 24px; padding: 28px 32px; margin-bottom: 2rem;
        box-shadow: 0 8px 32px rgba(35,55,109,.25);
    }
    .imp-hero-num {
        font-family: 'Space Mono', monospace;
        font-size: 64px; font-weight: 700; color: #fdb500;
        line-height: 1; flex-shrink: 0;
    }
    .imp-hero-text { display: flex; flex-direction: column; gap: 6px; }
    .imp-hero-text strong { font-size: 18px; color: #fff; font-weight: 700; }
    .imp-hero-text span   { font-size: 14px; color: rgba(255,255,255,.75); line-height: 1.6; }

    /* ── Tipos ── */
    .imp-tipos-card {
        background: #fff; border-radius: 20px; padding: 22px;
        border: 0.5px solid rgba(35,55,109,0.15);
        display: flex; flex-direction: column; gap: 20px;
    }

    .imp-tipo-row { display: flex; flex-direction: column; gap: 8px; }

    .imp-tipo-header {
        display: flex; align-items: center; gap: 10px;
    }
    .imp-tipo-icon {
        width: 30px; height: 30px; border-radius: 9px;
        display: flex; align-items: center; justify-content: center;
        font-size: 15px; flex-shrink: 0;
    }
    .imp-tipo-label { flex: 1; font-size: 13px; font-weight: 600; color: #23376d; }
    .imp-tipo-count { font-size: 11px; color: #4b5a8a; }
    .imp-tipo-pct   { font-family: 'Space Mono', monospace; font-size: 13px; font-weight: 700; }

    .imp-tipo-track {
        height: 7px; background: #e8ecf5; border-radius: 99px; overflow: hidden;
    }
    .imp-tipo-fill {
        height: 100%; border-radius: 99px;
        background: var(--bar-color);
        width: 0;
        animation: barGrow .9s cubic-bezier(.34,1.4,.64,1) forwards;
        animation-delay: .2s;
    }
    @keyframes barGrow {
        to { width: var(--bar-pct); }
    }

    .imp-tipo-stats {
        display: flex; gap: 16px;
        font-size: 11px; color: #4b5a8a;
    }

    /* ── Historial ── */
    .imp-historial-card {
        background: #fff; border-radius: 20px;
        border: 0.5px solid rgba(35,55,109,0.15);
        overflow: hidden;
    }
    .imp-hist-row {
        display: flex; align-items: center; gap: 14px;
        padding: 14px 22px;
        border-bottom: 0.5px solid #e8ecf5;
        animation: fadeUp .4s ease both;
        transition: background .15s;
    }
    .imp-hist-row:last-child { border-bottom: none; }
    .imp-hist-row:hover { background: #f0f3fb; }

    .imp-hist-icon {
        width: 34px; height: 34px; border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
        font-size: 16px; flex-shrink: 0;
    }
    .imp-hist-info  { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .imp-hist-tipo  { font-size: 13px; font-weight: 600; }
    .imp-hist-fecha { font-size: 11px; color: #7a8ab0; }
    .imp-hist-nums  { display: flex; gap: 14px; font-size: 11px; color: #4b5a8a; flex-shrink: 0; }

    /* ── Empty state ── */
    .imp-empty {
        display: flex; flex-direction: column; align-items: center;
        text-align: center; padding: 4rem 2rem; gap: 1.25rem;
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

    .imp-empty h3 { font-size: 22px; color: #111827; font-weight: 700; margin: 0; }
    .imp-empty p  { font-size: 14px; color: #4b5a8a; max-width: 380px; line-height: 1.7; margin: 0; }

    .imp-cta-btn {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 13px 26px; border-radius: 14px; border: none;
        background: #23376d; color: #fff; font-size: 14px; font-weight: 600;
        cursor: pointer; transition: all .2s; font-family: inherit;
        box-shadow: 0 4px 16px rgba(35,55,109,.3);
    }
    .imp-cta-btn:hover {
        background: #1a2b57;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(35,55,109,.4);
    }

    /* ── Global ── */
    .imp-global-hero {
        display: flex; align-items: center; gap: 24px;
        background: linear-gradient(135deg, #111d40 0%, #23376d 100%);
        border-radius: 24px; padding: 28px 32px; margin-bottom: 2rem;
        box-shadow: 0 8px 32px rgba(35,55,109,.3);
    }
    .imp-globe-anim {
        font-size: 52px; flex-shrink: 0;
        animation: floatPlanet 4s ease-in-out infinite;
    }
    .imp-global-hero-text h2 {
        font-size: 20px; color: #fff; margin: 0 0 8px; font-weight: 700;
    }
    .imp-global-hero-text p {
        font-size: 14px; color: rgba(255,255,255,.75); line-height: 1.65; margin: 0;
    }

    .imp-global-meta {
        display: flex; align-items: center; gap: 0;
        background: #fff; border-radius: 18px; border: 0.5px solid rgba(35,55,109,0.15);
        padding: 18px 28px; margin-bottom: 2rem;
        justify-content: center;
    }
    .imp-global-meta-item {
        flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
        font-size: 12px; color: #4b5a8a; font-weight: 500;
    }
    .imp-global-meta-num {
        font-family: 'Space Mono', monospace;
        font-size: 32px; font-weight: 700; color: #eb7207; line-height: 1;
    }
    .imp-global-meta-div {
        width: 1px; height: 50px; background: rgba(35,55,109,0.2); flex-shrink: 0; margin: 0 20px;
    }
`