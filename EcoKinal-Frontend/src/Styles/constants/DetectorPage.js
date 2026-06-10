export const detectorCss = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  :root {
    --green-1:    #1b3c1a;
    --green-2:    #2d5a27;
    --green-3:    #52b788;
    --border:     #e8efe8;
    --text-muted: #6b8e66;
    --text-sub:   #9db89a;
  }

  /* ── Fondo global blanco ── */
  body { background-color: #ffffff !important; }

  /* ── Página: escapa el padding del DashboardLayout ── */
  .detector-page {
    width: calc(100% + 40px);
    margin-left: -20px;
    margin-right: -20px;
    margin-top: -68px;
    background: #ffffff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 124px 52px 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative;
  }

  /* ── Animaciones ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim-1 { animation: fadeUp 0.4s ease both; }
  .anim-2 { animation: fadeUp 0.4s 0.08s ease both; }
  .anim-3 { animation: fadeUp 0.4s 0.16s ease both; }

  /* ════════════════════════════════════════
     FILA SUPERIOR: header (izq) + stats (der)
  ════════════════════════════════════════ */
  .top-row {
    display: grid;
    grid-template-columns: 1fr 460px;
    gap: 48px;
    align-items: center;
  }

  /* Header */
  .detector-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .detector-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: 100px;
    width: fit-content;
    background: #f0f7f0;
    border: 1px solid rgba(82,183,136,0.3);
    color: var(--green-2);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .detector-badge i { font-size: 12px; }
  .detector-title {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--green-1);
  }
  .detector-subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.65;
  }

  /* Stats */
  .stats-strip {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .stat-card {
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .stat-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: #eaf4ea;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
  }
  .stat-icon i { font-size: 14px; color: var(--green-2); }
  .stat-val {
    font-size: 30px;
    font-weight: 800;
    color: var(--green-1);
    line-height: 1;
  }
  .stat-lbl {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
    margin-top: 2px;
  }

  /* ════════════════════════════════════════
     FILA INFERIOR: main-card (izq) + protocolo (der)
  ════════════════════════════════════════ */
  .bottom-row {
    display: grid;
    grid-template-columns: 1fr 460px;
    gap: 48px;
    align-items: stretch;
  }

  /* Main card */
  .main-card {
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Tabs */
  .tabs-bar {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border);
    padding: 0 20px;
    background: #ffffff;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .tabs-bar::-webkit-scrollbar { display: none; }
  .tabs-spacer { flex: 1; }
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
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.45; }
  }
  .tab-btn {
    padding: 13px 20px;
    font-size: 13px;
    font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    border: none;
    border-bottom: 2px solid transparent;
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
    border-bottom-color: var(--green-1);
    color: var(--green-1);
  }

  /* Upload area — crece para llenar la card */
  .upload-area {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
  }

  /* Panel derecho: protocolo / resultado */
  .right-panel {
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 28px;
    display: flex;
    flex-direction: column;
  }

  /* Error */
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

  /* ── Legend: separado, centrado ── */
  .legend-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    padding: 8px 0 4px;
  }
  .legend-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-sub);
  }
  .bin-chip {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .bin-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .bin-name { font-size: 12px; font-weight: 600; color: var(--green-1); }
  .bin-type { font-size: 12px; color: var(--text-muted); }

  /* ── Toast ── */
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
  .detector-toast.ok { background: #f0fdf4; border: 1px solid #86efac; color: #166534; }
  .detector-toast.err { background: #fff5f5; border: 1px solid #ffcccc; color: #dc2626; }

  /* ── BG pattern ── */
  .bg-pattern {
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 0; opacity: 0.02;
  }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .top-row, .bottom-row { grid-template-columns: 1fr; gap: 24px; }
    .stats-strip { grid-template-columns: 1fr 1fr; }
    .detector-page { padding: 100px 32px 40px; }
  }
  @media (max-width: 768px) {
    .detector-page {
      width: 100%;
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
      padding: 24px 20px 32px;
    }
    .detector-title { font-size: 1.9rem; }
    .upload-area { padding: 16px; }
    .detector-toast { bottom: 16px; right: 16px; left: 16px; max-width: 100%; }
  }
  @media (max-width: 600px) {
    .detector-page { padding: 20px 14px 24px; }
    .detector-title { font-size: 1.5rem; }
    .stats-strip { grid-template-columns: 1fr 1fr; gap: 10px; }
    .stat-card { padding: 14px 16px; }
    .stat-val { font-size: 24px; }
    .tab-btn { padding: 10px 14px; font-size: 12px; }
    .right-panel { padding: 18px; }
  }
  @media (max-width: 380px) {
    .detector-title { font-size: 1.3rem; }
    .module-indicator { display: none; }
    .stats-strip { grid-template-columns: 1fr; }
  }
`;

export const BIN_COLORS = {
  Verde:    '#2d8a3e',
  Azul:     '#2563eb',
  Amarillo: '#d97706',
  Rojo:     '#dc2626',
  Gris:     '#6b7280',
}