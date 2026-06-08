export const detectorCss = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  /* ══ VARIABLES ══ */
  :root {
    --page-bg:    #f4f8f3;
    --card-bg:    #ffffff;
    --green-1:    #1b3c1a;
    --green-2:    #2d5a27;
    --green-3:    #52b788;
    --green-4:    #74c69d;
    --green-5:    #d8eed8;
    --border:     #ddeedd;
    --text-muted: #6b8e66;
    --text-sub:   #9db89a;
  }

  /* ══ PÁGINA ══ */
  .detector-page {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    background: var(--page-bg);
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative;
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 60px 24px;
  }

  /* ══ ANIMACIONES ══ */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim-1 { animation: fadeUp 0.45s ease both; }
  .anim-2 { animation: fadeUp 0.45s 0.08s ease both; }
  .anim-3 { animation: fadeUp 0.45s 0.16s ease both; }
  .anim-4 { animation: fadeUp 0.45s 0.24s ease both; }

  /* ══ HEADER ══ */
  .detector-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    gap: 16px;
  }
  .detector-header-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .detector-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: 100px;
    width: fit-content;
    background: #e8f5e9;
    border: 1px solid rgba(82,183,136,0.35);
    color: var(--green-2);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .detector-badge i { font-size: 12px; }
  .detector-title {
    margin: 0;
    font-size: 2.2rem;
    font-weight: 800;
    font-family: 'Plus Jakarta Sans', sans-serif;
    letter-spacing: -0.03em;
    line-height: 1.1;
    background: linear-gradient(135deg, var(--green-1) 0%, var(--green-2) 60%, var(--green-3) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .detector-subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--text-muted);
    max-width: 520px;
    line-height: 1.6;
    font-weight: 400;
  }

  /* ══ STATS STRIP ══ */
  .stats-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    position: relative;
    z-index: 1;
  }
  .stat-card {
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-shadow: 0 2px 12px rgba(45,90,39,0.05);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .stat-card:hover {
    box-shadow: 0 6px 20px rgba(45,90,39,0.1);
    transform: translateY(-1px);
  }
  .stat-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: #e8f5e9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
  }
  .stat-icon i { font-size: 14px; color: var(--green-2); }
  .stat-val {
    font-size: 26px;
    font-weight: 800;
    color: var(--green-2);
    line-height: 1;
  }
  .stat-lbl {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
  }

  /* ══ MAIN CARD ══ */
  .main-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: 0 4px 32px rgba(45,90,39,0.07);
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  /* ══ TABS BAR ══ */
  .tabs-bar {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
    background: #fafcfa;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .tabs-bar::-webkit-scrollbar { display: none; }
  .tabs-spacer { flex: 1; min-width: 12px; }
  .module-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .module-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--green-3);
    box-shadow: 0 0 6px var(--green-3);
    animation: pulse-dot 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }

  /* ══ TAB BUTTON ══ */
  .tab-btn {
    padding: 12px 22px;
    font-size: 13px;
    font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    border: none;
    border-bottom: 2.5px solid transparent;
    cursor: pointer;
    background: transparent;
    color: var(--text-sub);
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.2s, border-color 0.2s;
    border-radius: 0;
    white-space: nowrap;
  }
  .tab-btn i { font-size: 15px; }
  .tab-btn.active {
    border-bottom-color: var(--green-2);
    color: var(--green-2);
  }

  /* ══ CONTENT GRID ══ */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 360px;
    align-items: start;
  }
  .left-col {
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .right-col {
    padding: 28px;
    border-left: 1px solid var(--border);
    background: #fafcfa;
    min-height: 480px;
    display: flex;
    flex-direction: column;
  }

  /* ══ ERROR BANNER ══ */
  .error-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    background: #fff5f5;
    border: 1px solid #ffcccc;
    color: #dc2626;
  }
  .error-banner i { font-size: 16px; }

  /* ══ LEGEND FOOTER ══ */
  .legend-footer {
    border-top: 1px solid var(--border);
    padding: 16px 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    background: #fafcfa;
  }
  .legend-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-sub);
    margin-right: 6px;
  }
  .bin-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 100px;
    background: #ffffff;
    border: 1px solid var(--border);
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    transition: box-shadow 0.2s;
  }
  .bin-chip:hover { box-shadow: 0 3px 10px rgba(0,0,0,0.08); }
  .bin-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .bin-name { font-size: 12px; font-weight: 600; color: var(--green-1); }
  .bin-type { font-size: 11px; color: var(--text-muted); }

  /* ══ TOAST ══ */
  .detector-toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    padding: 14px 20px;
    border-radius: 14px;
    font-size: 13px;
    font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    max-width: 360px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    animation: fadeUp 0.3s ease both;
  }
  .detector-toast.ok {
    background: #f0fdf4;
    border: 1px solid #86efac;
    color: #166534;
  }
  .detector-toast.err {
    background: #fff5f5;
    border: 1px solid #ffcccc;
    color: #dc2626;
  }

  /* ══ BG PATTERN SVG ══ */
  .bg-pattern {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.035;
  }

  /* ══ HEADER ILLUSTRATION ══ */
  .header-illustration {
    width: 200px;
    height: 120px;
    opacity: 0.12;
    flex-shrink: 0;
  }

  /* ── Tablet grande (≤ 1024px) ── */
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
    .right-col {
      border-left: none;
      border-top: 1px solid var(--border);
      min-height: auto;
    }
    .stats-strip {
      grid-template-columns: repeat(3, 1fr);
    }
    .header-illustration {
      width: 140px;
      height: 84px;
    }
  }

  /* ── Tablet (≤ 768px) ── */
  @media (max-width: 768px) {
    .detector-page {
      padding: 40px 16px;
      gap: 20px;
    }
    .detector-title { font-size: 1.7rem; }
    .detector-header { flex-direction: column; }
    .header-illustration { display: none; }
    .stats-strip { grid-template-columns: repeat(2, 1fr); }
    .left-col, .right-col { padding: 20px; }
    .legend-footer { padding: 12px 16px; gap: 6px; }
    .detector-toast {
      bottom: 16px;
      right: 16px;
      left: 16px;
      max-width: 100%;
    }
  }

  /* ── Móvil (≤ 600px) ── */
  @media (max-width: 600px) {
    .detector-page { padding: 24px 12px; gap: 16px; }
    .detector-title { font-size: 1.45rem; }
    .detector-subtitle { font-size: 13px; }
    .stats-strip { grid-template-columns: 1fr; }
    .stat-card { padding: 14px 16px; }
    .stat-val { font-size: 22px; }
    .left-col, .right-col { padding: 16px; }
    .tabs-bar { padding: 0 12px; }
    .tab-btn { padding: 10px 14px; font-size: 12px; }
    .legend-footer { flex-direction: column; align-items: flex-start; }
    .bin-chip { font-size: 11px; }
  }

  /* ── Móvil pequeño (≤ 380px) ── */
  @media (max-width: 380px) {
    .detector-page { padding: 16px 8px; }
    .detector-title { font-size: 1.25rem; }
    .module-indicator { display: none; }
  }
`;

export const BIN_COLORS = {
  Verde:    '#2d8a3e',
  Azul:     '#2563eb',
  Amarillo: '#d97706',
  Rojo:     '#dc2626',
  Gris:     '#6b7280',
}