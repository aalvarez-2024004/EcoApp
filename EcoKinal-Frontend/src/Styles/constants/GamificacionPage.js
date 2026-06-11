export const gamificacionCss = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  :root {
    --green-900: #1a3316;
    --green-800: #21491e;
    --green-700: #2a5c25;
    --green-600: #3b6b35;
    --green-300: #8fa88b;
    --green-light: #eaf3e8;
    --green-lighter: #f4faf3;
    --bone: #f8faf8;
    --white: #ffffff;
    --ink: #111827;
    --ink-2: #374151;
    --muted: #6b7280;
    --border: rgba(0,0,0,0.06);
    --radius: 20px;
    --shadow-sm: 0 2px 10px rgba(0,0,0,0.04);
    --shadow-md: 0 8px 24px rgba(33,73,30,0.10);
    --shadow-lg: 0 16px 40px rgba(33,73,30,0.14);
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  /* ── Animaciones de entrada (mismo patrón que DetectorReciclajePage) ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .gam-anim-1  { animation: fadeUp 0.4s 0.00s ease both; }
  .gam-anim-2  { animation: fadeUp 0.4s 0.07s ease both; }
  .gam-anim-3  { animation: fadeUp 0.4s 0.14s ease both; }
  .gam-anim-4  { animation: fadeUp 0.4s 0.21s ease both; }
  .gam-anim-5  { animation: fadeUp 0.4s 0.28s ease both; }
  /* Sidebar stat cards */
  .gam-anim-s1 { animation: fadeUp 0.4s 0.28s ease both; }
  .gam-anim-s2 { animation: fadeUp 0.4s 0.34s ease both; }
  .gam-anim-s3 { animation: fadeUp 0.4s 0.40s ease both; }
  .gam-anim-s4 { animation: fadeUp 0.4s 0.46s ease both; }
  /* Challenge cards: staggered */
  .gam-anim-c1 { animation: fadeUp 0.4s 0.30s ease both; }
  .gam-anim-c2 { animation: fadeUp 0.4s 0.37s ease both; }
  .gam-anim-c3 { animation: fadeUp 0.4s 0.44s ease both; }
  .gam-anim-c4 { animation: fadeUp 0.4s 0.51s ease both; }
  .gam-anim-c5 { animation: fadeUp 0.4s 0.58s ease both; }
  .gam-anim-c6 { animation: fadeUp 0.4s 0.65s ease both; }

  /* ── Page shell ── */
  .gam-page {
    width: 100%;
    padding: 28px 36px 48px;
    background: #ffffff;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--ink);
  }

  /* ── Toast ── */
  .gam-toast {
    position: fixed; top: 24px; right: 24px; z-index: 9999;
    padding: 14px 22px; border-radius: 14px; font-weight: 600; font-size: 14px;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,.15);
    animation: toastIn .3s cubic-bezier(0.16,1,0.3,1);
  }
  .gam-toast.ok  { background: #21491e; color: white; }
  .gam-toast.err { background: #c0392b; color: white; }
  @keyframes toastIn {
    from { transform: translateX(120%); opacity: 0; }
    to   { transform: translateX(0);   opacity: 1; }
  }

  /* ── Breadcrumb ── */
  .gam-breadcrumb {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--green-lighter);
    color: var(--green-700);
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid var(--green-light);
    margin-bottom: 20px;
  }
  .gam-breadcrumb i { font-size: 14px; }

  /* ── Hero text ── */
  .gam-hero-text {
    margin-bottom: 24px;
  }
  .gam-hero-text h1 {
    font-size: 38px;
    font-weight: 800;
    color: var(--ink);
    margin: 0 0 8px;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  .gam-hero-text p {
    font-size: 16px;
    color: var(--muted);
    margin: 0;
  }

  /* ── Badges ── */
  .gam-badges-wrap { margin-bottom: 20px; }
  .gam-section-label {
    font-size: 11px;
    letter-spacing: .12em;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--green-700);
  }
  .gam-badges-list {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .gam-badge-chip {
    border-radius: 999px;
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 700;
    color: var(--bc);
    background: var(--bb);
    border: 1px solid color-mix(in srgb, var(--bc) 20%, transparent);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: transform .2s;
  }
  .gam-badge-chip:hover { transform: scale(1.04); }

  /* ── Progress bar ── */
  .gam-prog-wrap {
    background: var(--bone);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px 20px;
    margin-bottom: 32px;
  }
  .gam-prog-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 14px;
    color: var(--ink);
  }
  .gam-prog-count { color: var(--green-600); font-weight: 700; }
  .gam-prog-track {
    height: 10px;
    background: #dde8db;
    border-radius: 999px;
    overflow: hidden;
  }
  .gam-prog-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--green-800), var(--green-600));
    border-radius: 999px;
    transition: width .5s cubic-bezier(.4,0,.2,1);
  }

  /* ── Body: 2-column layout ── */
  .gam-body {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 28px;
    align-items: stretch;
  }

  /* ── Sidebar: stat cards stacked filling full height ── */
  .gam-sidebar {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* ── Stat card: flex-grow so all 4 fill the sidebar height equally ── */
  /* Sidebar anim wrappers must also stretch */
  .gam-sidebar > div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .gam-stat-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    box-shadow: var(--shadow-sm);
    transition: transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s;
    flex: 1;
  }
  .gam-stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
  .gam-stat-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    background: color-mix(in srgb, var(--c) 12%, transparent);
    color: var(--c);
    margin-bottom: 4px;
  }
  .gam-stat-value {
    font-size: 30px;
    font-weight: 800;
    color: var(--ink);
    margin: 0;
    line-height: 1;
  }
  .gam-stat-label {
    color: var(--muted);
    font-size: 13px;
    font-weight: 500;
    margin: 0;
    text-align: center;
  }

  /* ── Main area ── */
  .gam-main { min-width: 0; display: flex; flex-direction: column; }

  /* ── Tabs ── */
  .gam-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 22px;
    background: var(--bone);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 5px;
    width: fit-content;
  }
  .gam-tab {
    border: none;
    background: transparent;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all .2s cubic-bezier(.16,1,.3,1);
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .gam-tab:hover { color: var(--ink); }
  .gam-tab.active {
    background: var(--green-800);
    color: white;
    box-shadow: 0 4px 12px rgba(33,73,30,.25);
  }

  /* ── Challenge grid ── */
  .gam-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 1fr;
    gap: 16px;
    flex: 1;
  }

  /* ── Challenge card ── */
  .gam-ch-card {
    background: white;
    border-radius: var(--radius);
    padding: 28px 26px;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border);
    transition: transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s, border-color .28s;
    display: flex;
    flex-direction: column;
  }
  .gam-ch-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-md);
    border-color: color-mix(in srgb, var(--brand) 25%, transparent);
  }
  .gam-ch-card.done {
    opacity: .72;
    background: var(--green-lighter);
  }
  .gam-ch-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .gam-ch-icon {
    width: 58px; height: 58px;
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    background: var(--brand-bg);
    color: var(--brand);
    font-size: 26px;
  }
  .gam-ch-pts {
    font-size: 14px; font-weight: 700;
    color: var(--brand);
    background: var(--brand-bg);
    padding: 7px 14px;
    border-radius: 999px;
  }
  .gam-ch-card h4 {
    font-size: 19px; font-weight: 700;
    color: var(--ink);
    margin: 0 0 12px;
    line-height: 1.3;
  }
  .gam-ch-card p {
    color: var(--muted);
    line-height: 1.75;
    flex-grow: 1;
    font-size: 15px;
    margin: 0;
  }
  .gam-ch-howto {
    margin-top: 16px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    background: var(--bone);
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 14px;
    color: var(--green-700);
    border: 1px solid var(--border);
    line-height: 1.6;
  }
  .gam-ch-howto i { margin-top: 2px; flex-shrink: 0; font-size: 16px; }
  .gam-ch-btn {
    margin-top: 20px;
    width: 100%;
    border: none;
    border-radius: 14px;
    padding: 18px 14px;
    background: var(--brand);
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: .2s ease;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-size: 15px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    letter-spacing: 0.01em;
  }
  .gam-ch-btn:hover:not(:disabled) { opacity: .88; transform: translateY(-1px); }
  .gam-ch-btn:disabled {
    background: #dde8db;
    color: var(--green-700);
    cursor: not-allowed;
    transform: none;
  }

  /* ── Ranking ── */
  .gam-rank-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: white;
    padding: 22px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }
  .gam-my-rank {
    display: flex; align-items: center; gap: 12px;
    background: var(--green-lighter);
    color: var(--green-800);
    padding: 12px 18px;
    border-radius: 12px;
    font-size: 14px;
    margin-bottom: 8px;
    border: 1px solid var(--green-light);
  }
  .gam-rank-header {
    display: grid;
    grid-template-columns: 60px 1fr 120px 100px;
    padding: 8px 18px;
    font-size: 11px; font-weight: 800;
    color: var(--muted);
    letter-spacing: .06em;
    text-transform: uppercase;
  }
  .gam-rank-row {
    background: var(--bone);
    border-radius: 14px;
    padding: 16px 18px;
    display: grid;
    grid-template-columns: 60px 1fr 120px 100px;
    align-items: center;
    transition: .2s cubic-bezier(.16,1,.3,1);
    border: 1px solid transparent;
  }
  .gam-rank-row:hover { transform: translateX(4px); background: var(--green-lighter); }
  .gam-rank-row.top { background: white; border-color: var(--border); box-shadow: var(--shadow-sm); }
  .gam-rank-row.me { background: var(--green-lighter); border: 2px solid var(--green-600); }
  .gam-rank-pos { font-size: 15px; font-weight: 800; color: var(--ink); }
  .gam-rank-info { display: flex; flex-direction: column; }
  .gam-rank-name { font-weight: 700; color: var(--ink); font-size: 14px; }
  .gam-rank-user { color: var(--muted); font-size: 12px; }
  .gam-rank-pts { font-weight: 800; color: var(--green-700); font-size: 14px; }
  .gam-rank-rc  { font-weight: 600; color: var(--ink); font-size: 14px; }
  .gam-rank-you {
    background: var(--green-600); color: white;
    padding: 3px 9px; border-radius: 999px;
    font-size: 11px; font-weight: 700;
    width: fit-content; margin-top: 3px;
  }

  /* ── Misc ── */
  .gam-empty { text-align: center; padding: 40px; color: var(--muted); font-size: 15px; }
  .gam-skel {
    border-radius: 16px;
    background: linear-gradient(90deg, #f4f7f4 25%, #e4ede2 50%, #f4f7f4 75%);
    background-size: 400% 100%;
    animation: shimmer 1.4s infinite;
  }
  @keyframes shimmer {
    from { background-position: 100% 0; }
    to   { background-position: -100% 0; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Responsive ── */
  @media (max-width: 1300px) {
    .gam-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 1100px) {
    .gam-body { grid-template-columns: 200px 1fr; }
    .gam-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 860px) {
    .gam-body { grid-template-columns: 1fr; }
    .gam-sidebar { flex-direction: row; flex-wrap: wrap; }
    .gam-sidebar .gam-stat-card { flex: 1 1 calc(50% - 7px); min-width: 120px; }
    .gam-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .gam-page { padding: 16px; }
    .gam-hero-text h1 { font-size: 28px; }
    .gam-sidebar .gam-stat-card { flex: 1 1 100%; }
    .gam-grid { grid-template-columns: 1fr; }
    .gam-rank-row, .gam-rank-header { grid-template-columns: 50px 1fr 90px; padding: 12px 14px; }
    .gam-rank-rc { display: none; }
    .gam-tabs { width: 100%; }
    .gam-tab { flex: 1; justify-content: center; }
  }
`

export const KEY_REDIRECT = {
  detector:      '/dashboard/usuario/detector',
  detector_3:    '/dashboard/usuario/detector',
  foro_publicar: '/dashboard/usuario/foro',
  foro_comentar: '/dashboard/usuario/foro',
  impacto:       '/dashboard/usuario/impacto',
  mapa:          '/dashboard/usuario/mapa',
}