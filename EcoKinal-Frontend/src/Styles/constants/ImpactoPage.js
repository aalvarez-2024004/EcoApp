export const G = {
  pageBg:    '#ffffff',
  cardBg:    '#ffffff',
  green1:    '#1b3c1a',
  green2:    '#2d5a27',
  green3:    '#52b788',
  green4:    '#74c69d',
  green5:    '#eaf3e8',
  border:    'rgba(0,0,0,0.06)',
  textMuted: '#6b7280',
  textSub:   '#9ca3af',
}

export const ImpactoPageCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes barGrow { to { width: var(--bar-pct); } }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatPlanet {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-8px); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }

  .anim-1 { animation: fadeUp 0.4s 0.00s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-2 { animation: fadeUp 0.4s 0.08s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-3 { animation: fadeUp 0.4s 0.16s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-4 { animation: fadeUp 0.4s 0.24s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-5 { animation: fadeUp 0.4s 0.32s cubic-bezier(0.16,1,0.3,1) both; }

  /* ── Root ── */
  .imp-root {
    width: 100%;
    min-height: 100vh;
    background: #ffffff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 28px 36px 48px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* ── Toast ── */
  .imp-toast {
    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
    z-index: 9999;
    display: flex; align-items: center; gap: 8px;
    padding: 12px 18px; border-radius: 14px;
    background: #1b3c1a; color: #fff;
    font-size: 13px; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif;
    box-shadow: 0 8px 32px rgba(27,60,26,0.3);
    animation: toastIn 0.3s cubic-bezier(0.16,1,0.3,1) both;
    white-space: nowrap;
  }

  /* ── Header block ── */
  .imp-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 28px;
    position: relative;
    z-index: 1;
  }

  .imp-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; border-radius: 100px; width: fit-content;
    background: #f0f7f0; border: 1px solid rgba(82,183,136,0.3);
    color: #2d5a27; font-size: 11px; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
  }

  .imp-title {
    margin: 0;
    font-size: 38px; font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.1;
    color: #111827;
  }
  .imp-title-accent { color: #2d5a27; }

  .imp-subtitle {
    margin: 0; font-size: 15px; color: #6b7280;
    max-width: 580px; line-height: 1.65; font-weight: 400;
  }

  /* ── Toggle tabs ── */
  .imp-toggle {
    display: inline-flex; padding: 5px; gap: 4px;
    background: #f4faf3; border-radius: 18px;
    border: 1px solid rgba(0,0,0,0.06);
    width: fit-content;
    margin-top: 4px;
  }
  .imp-toggle-btn {
    padding: 10px 22px; border-radius: 14px; border: none;
    background: transparent; cursor: pointer; font-size: 13px;
    font-weight: 600; color: #9ca3af; transition: all 0.2s;
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex; align-items: center; gap: 6px;
  }
  .imp-toggle-btn.active {
    background: #2d5a27; color: #fff;
    box-shadow: 0 2px 10px rgba(45,90,39,0.3);
  }

  /* ── Error ── */
  .imp-error {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px; border-radius: 12px; margin-bottom: 16px;
    font-size: 13px; font-weight: 600;
    background: #fff5f5; border: 1px solid #ffcccc; color: #dc2626;
  }

  /* ── 2-column body layout ── */
  .imp-body {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 24px;
    align-items: stretch;
  }

  /* ── Sidebar: stat cards ── */
  .imp-sidebar {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  /* Anim wrapper divs stretch to fill sidebar height */
  .imp-sidebar > div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  /* Label wrapper stays auto height */
  .imp-sidebar > div:first-child {
    flex: 0 0 auto;
  }

  /* ── Stat card (sidebar version) ── */
  .imp-stat-card {
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.06);
    border-radius: 20px;
    padding: 22px 20px;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0 2px 10px rgba(45,90,39,0.05);
    animation: fadeUp 0.5s ease both;
    transition: box-shadow 0.2s, transform 0.2s;
    flex: 1;
  }
  .imp-stat-card:hover {
    box-shadow: 0 6px 24px rgba(45,90,39,0.10);
    transform: translateY(-3px);
  }
  .imp-stat-icon {
    width: 52px; height: 52px; border-radius: 16px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 22px;
  }
  .imp-stat-content { flex: 1; min-width: 0; }
  .imp-stat-label { font-size: 12px; color: #6b7280; margin: 0 0 6px; font-weight: 600; }
  .imp-stat-value-row { display: flex; align-items: baseline; gap: 5px; }
  .imp-stat-value { font-size: 26px; font-weight: 800; line-height: 1; }
  .imp-stat-unit  { font-size: 11px; color: #9ca3af; font-weight: 600; }

  /* ── Main column ── */
  .imp-main {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 0;
  }

  /* ── Clasificaciones hero banner ── */
  .imp-hero-count {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0;
    background: linear-gradient(135deg, #1b3c1a 0%, #2d5a27 100%);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 28px rgba(27,60,26,0.18);
    position: relative;
  }
  .imp-hero-count::after {
    content: '';
    position: absolute; top: -60px; right: -60px;
    width: 220px; height: 220px; border-radius: 50%;
    background: rgba(255,255,255,0.04);
    pointer-events: none;
  }
  .imp-hero-num-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 28px 36px;
    border-right: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.12);
    gap: 2px;
  }
  .imp-hero-num {
    font-size: 72px; font-weight: 800; color: #74c69d;
    line-height: 1; letter-spacing: -0.04em;
    animation: countUp 0.6s 0.3s cubic-bezier(0.16,1,0.3,1) both;
  }
  .imp-hero-num-label {
    font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.5);
    text-transform: uppercase; letter-spacing: 0.08em;
  }
  .imp-hero-text-block {
    padding: 28px 32px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .imp-hero-text-block strong {
    font-size: 20px; color: #fff; font-weight: 700; display: block;
  }
  .imp-hero-text-block span {
    font-size: 14px; color: rgba(255,255,255,0.68); line-height: 1.6;
  }

  /* ── Section label ── */
  .imp-section { position: relative; z-index: 1; }
  .imp-section-label {
    display: flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 800; letter-spacing: 0.12em;
    color: #2d5a27; text-transform: uppercase; margin-bottom: 12px;
  }

  /* ── Generic card ── */
  .imp-card {
    background: #ffffff; border: 1px solid rgba(0,0,0,0.06);
    border-radius: 20px; padding: 20px;
    box-shadow: 0 2px 10px rgba(45,90,39,0.05);
    display: flex; flex-direction: column; gap: 20px;
  }

  /* ── Tipos ── */
  .imp-tipo-row { display: flex; flex-direction: column; gap: 8px; }
  .imp-tipo-header { display: flex; align-items: center; gap: 10px; }
  .imp-tipo-icon {
    width: 32px; height: 32px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .imp-tipo-label { flex: 1; font-size: 14px; font-weight: 600; color: #111827; }
  .imp-tipo-count { font-size: 12px; color: #6b7280; }
  .imp-tipo-pct   { font-size: 14px; font-weight: 700; }
  .imp-tipo-track {
    height: 7px; background: #eaf3e8; border-radius: 99px; overflow: hidden;
  }
  .imp-tipo-fill {
    height: 100%; border-radius: 99px;
    background: var(--bar-color);
    width: 0;
    animation: barGrow 0.9s cubic-bezier(.34,1.4,.64,1) forwards;
    animation-delay: 0.3s;
  }
  .imp-tipo-stats { display: flex; gap: 16px; font-size: 12px; color: #6b7280; }

  /* ── Historial table ── */
  .imp-hist-table-header {
    display: flex; align-items: center; gap: 14px;
    padding: 10px 20px;
    background: #f4faf3;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    font-size: 11px; font-weight: 800;
    color: #2d5a27; text-transform: uppercase; letter-spacing: 0.08em;
  }
  .imp-hist-scroll {
    max-height: 340px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(45,90,39,0.2) transparent;
  }
  .imp-hist-scroll::-webkit-scrollbar { width: 5px; }
  .imp-hist-scroll::-webkit-scrollbar-track { background: transparent; }
  .imp-hist-scroll::-webkit-scrollbar-thumb { background: rgba(45,90,39,0.2); border-radius: 99px; }
  .imp-hist-scroll::-webkit-scrollbar-thumb:hover { background: rgba(45,90,39,0.4); }

  .imp-hist-row {
    display: flex; align-items: center; gap: 14px;
    padding: 13px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    transition: background 0.15s;
  }
  .imp-hist-row:last-child { border-bottom: none; }
  .imp-hist-row:hover { background: #f8fdf8; }
  .imp-hist-icon {
    width: 36px; height: 36px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px; flex-shrink: 0;
  }
  .imp-hist-info  { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .imp-hist-tipo  { font-size: 14px; font-weight: 600; }
  .imp-hist-fecha { font-size: 12px; color: #9ca3af; }
  .imp-hist-col-fecha { flex: 0 0 110px; font-size: 12px; color: #6b7280; }
  .imp-hist-col-nums  { flex: 0 0 110px; font-size: 12px; color: #6b7280; }
  .imp-hist-nums  { display: contents; }
  .imp-hist-nums span { flex: 0 0 110px; font-size: 12px; color: #6b7280; }

  /* ── Skeleton ── */
  .imp-skeleton-grid {
    display: flex; flex-direction: column; gap: 14px;
  }
  .imp-skel-card {
    background: #fff; border: 1px solid rgba(0,0,0,0.06);
    border-radius: 20px; padding: 22px 20px; display: flex; gap: 16px;
  }
  .imp-skel-icon {
    width: 52px; height: 52px; border-radius: 16px; flex-shrink: 0;
    background: linear-gradient(90deg, #eaf3e8 25%, #d4e9d2 50%, #eaf3e8 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s infinite linear;
  }
  .imp-skel-lines { flex: 1; display: flex; flex-direction: column; gap: 10px; justify-content: center; }
  .imp-skel-line {
    border-radius: 6px; height: 10px;
    background: linear-gradient(90deg, #eaf3e8 25%, #d4e9d2 50%, #eaf3e8 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s infinite linear;
  }
  .imp-skel-line.short { width: 55%; }
  .imp-skel-line.long  { width: 100%; height: 22px; }

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
  .imp-empty-planet { font-size: 52px; animation: floatPlanet 3s ease-in-out infinite; }
  .imp-empty-moon   { position: absolute; font-size: 22px; animation: spinOrbit 4s linear infinite; }
  .imp-empty h3 { font-size: 22px; color: #1b3c1a; font-weight: 800; margin: 0; }
  .imp-empty p  { font-size: 14px; color: #6b7280; max-width: 380px; line-height: 1.7; margin: 0; }
  .imp-cta-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 26px; border-radius: 14px; border: none;
    background: #2d5a27; color: #fff; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
    box-shadow: 0 4px 16px rgba(45,90,39,0.2);
  }
  .imp-cta-btn:hover { background: #1b3c1a; transform: translateY(-2px); }

  /* ── Global view ── */
  .imp-global-hero {
    display: flex; align-items: center; gap: 24px;
    background: linear-gradient(135deg, #1b3c1a 0%, #2d5a27 100%);
    border-radius: 20px; padding: 28px 32px;
    box-shadow: 0 8px 28px rgba(27,60,26,0.18);
    position: relative; overflow: hidden;
  }
  .imp-globe-anim { font-size: 52px; flex-shrink: 0; animation: floatPlanet 4s ease-in-out infinite; }
  .imp-global-hero-text h2 { font-size: 20px; color: #fff; margin: 0 0 8px; font-weight: 700; }
  .imp-global-hero-text p  { font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.65; margin: 0; }
  .imp-global-meta {
    display: flex; align-items: center;
    background: #fff; border-radius: 18px; border: 1px solid rgba(0,0,0,0.06);
    padding: 18px 28px; justify-content: center;
    box-shadow: 0 2px 10px rgba(45,90,39,0.05);
  }
  .imp-global-meta-item {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
    font-size: 12px; color: #6b7280; font-weight: 500;
  }
  .imp-global-meta-num { font-size: 32px; font-weight: 800; color: #2d5a27; line-height: 1; }
  .imp-global-meta-div { width: 1px; height: 50px; background: rgba(0,0,0,0.06); flex-shrink: 0; margin: 0 20px; }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .imp-body { grid-template-columns: 230px 1fr; }
  }
  @media (max-width: 860px) {
    .imp-body { grid-template-columns: 1fr; }
    .imp-sidebar { flex-direction: row; flex-wrap: wrap; }
    .imp-sidebar > div { flex: 1 1 calc(50% - 7px); }
    .imp-hero-num { font-size: 52px; }
  }
  @media (max-width: 640px) {
    .imp-root { padding: 16px; }
    .imp-title { font-size: 28px; }
    .imp-sidebar > div { flex: 1 1 100%; }
    .imp-hero-count { grid-template-columns: 1fr; }
    .imp-hero-num-block { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .imp-hist-nums { display: none; }
  }
`

export const fmt = (n = 0, decimals = 2) =>
  Number(n).toLocaleString('es-GT', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

export const fmtDate = (iso) => {
  const d = new Date(iso)
  return d.toLocaleDateString('es-GT', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const TIPO_META = {
  'Inorgánico':        { color: '#2563eb', bg: 'rgba(37,99,235,.1)',   icon: '♻️', label: 'Inorgánico'        },
  'Orgánico':          { color: '#2d5a27', bg: '#e8f5e9',              icon: '🌿', label: 'Orgánico'          },
  'Reutilizable':      { color: '#d97706', bg: 'rgba(217,119,6,.1)',   icon: '🔄', label: 'Reutilizable'      },
  'Residuo Peligroso': { color: '#dc2626', bg: 'rgba(220,38,38,.1)',   icon: '⚠️', label: 'Residuo Peligroso' },
  'No reciclable':     { color: '#6b7280', bg: 'rgba(107,114,128,.1)', icon: '🗑️', label: 'No reciclable'     },
}