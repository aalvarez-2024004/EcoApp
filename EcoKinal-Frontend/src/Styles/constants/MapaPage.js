import {G} from './ImpactoPage.js'
export const mapaStyles = `
  @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  .mapa-page {
    background: ${G.pageBg};
    min-height: 100vh;
    padding: 60px 24px;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: relative;
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-dot {
    0%,100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .anim-1 { animation: fadeUp 0.45s ease both; }
  .anim-2 { animation: fadeUp 0.45s 0.08s ease both; }
  .anim-3 { animation: fadeUp 0.45s 0.16s ease both; }
  .anim-4 { animation: fadeUp 0.45s 0.24s ease both; }

  /* ── BgPattern ── */
  .mapa-bg-pattern {
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 0;
    opacity: 0.035;
  }

  /* ── Badge ── */
  .mapa-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; border-radius: 100px; width: fit-content;
    background: #e8f5e9; border: 1px solid rgba(82,183,136,0.35);
    color: ${G.green2}; font-size: 11px; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 10px;
  }

  /* ── Title ── */
  .mapa-title {
    font-size: 2.2rem; font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.1; margin: 0 0 8px;
    background: linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 60%, ${G.green3} 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .mapa-title-accent {
    background: linear-gradient(135deg, ${G.green3}, ${G.green4});
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .mapa-subtitle {
    font-size: 14px; color: ${G.textMuted};
    max-width: 520px; line-height: 1.6; margin: 0 0 24px; font-weight: 400;
  }

  /* ── Controls ── */
  .mapa-controls {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px;
  }

  .mapa-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 22px; border-radius: 14px; border: none;
    background: ${G.green2}; color: #fff;
    font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(45,90,39,0.2);
  }
  .mapa-btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(45,90,39,0.28);
  }
  .mapa-btn-primary:disabled {
    background: ${G.green5}; color: ${G.textMuted};
    cursor: not-allowed; box-shadow: none;
  }

  .mapa-select {
    padding: 12px 16px; border-radius: 14px;
    border: 1px solid ${G.border}; background: ${G.cardBg};
    font-size: 13px; color: ${G.green1}; font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 500; cursor: pointer; outline: none;
    transition: border-color 0.2s;
  }
  .mapa-select:focus { border-color: ${G.green3}; }

  .mapa-badge-total {
    padding: 8px 16px; border-radius: 100px;
    background: ${G.cardBg}; border: 1px solid ${G.border};
    font-size: 12px; font-weight: 600; color: ${G.green2};
    display: flex; align-items: center; gap: 6px;
  }
  .mapa-badge-total-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: ${G.green3}; box-shadow: 0 0 6px ${G.green3};
    animation: pulse-dot 2s ease-in-out infinite;
  }

  /* ── Map wrapper ── */
  .mapa-map-wrapper {
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 24px; overflow: hidden;
    box-shadow: 0 4px 32px rgba(45,90,39,0.07);
    margin-bottom: 24px; position: relative; z-index: 1;
  }

  #mapa-leaflet { height: 500px; width: 100%; }

  /* ── List header ── */
  .mapa-lista-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px; position: relative; z-index: 1;
  }
  .mapa-lista-title {
    display: flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    color: ${G.textSub}; text-transform: uppercase;
  }

  /* ── Grid ── */
  .mapa-lista {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    position: relative; z-index: 1;
  }

  /* ── Card ── */
  .mapa-card {
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 20px; padding: 18px 20px;
    cursor: pointer; transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
    display: flex; flex-direction: column; gap: 8px;
    box-shadow: 0 2px 12px rgba(45,90,39,0.05);
  }
  .mapa-card:hover {
    border-color: ${G.green3};
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(45,90,39,0.10);
  }

  .mapa-card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  .mapa-card-num-name { display: flex; gap: 10px; align-items: flex-start; }
  .mapa-card-num {
    width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
    background: #e8f5e9; border: 1px solid ${G.border};
    color: ${G.green2};
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; margin-top: 1px;
  }
  .mapa-card-name { font-size: 13.5px; font-weight: 700; color: ${G.green1}; line-height: 1.35; }
  .mapa-card-dist {
    font-size: 11px; font-weight: 700; color: ${G.green2};
    background: #e8f5e9; padding: 3px 10px; border-radius: 99px;
    white-space: nowrap; flex-shrink: 0; border: 1px solid ${G.border};
  }

  .mapa-card-address { font-size: 11.5px; color: ${G.textMuted}; line-height: 1.5; flex: 1; }

  .mapa-card-footer { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: auto; padding-top: 4px; }

  .mapa-chip {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 8px;
  }
  .mapa-chip-open    { background: #e8f5e9; color: ${G.green2}; border: 1px solid ${G.border}; }
  .mapa-chip-closed  { background: #fff5f5; color: #dc2626; border: 1px solid #ffcccc; }
  .mapa-chip-unknown { background: #f7fdf7; color: ${G.textMuted}; border: 1px solid ${G.border}; }
  .mapa-chip-rating  { background: rgba(217,119,6,0.08); color: #92400e; border: 1px solid rgba(217,119,6,0.2); }

  .mapa-link {
    margin-left: auto; font-size: 11px; font-weight: 600;
    color: ${G.green2}; text-decoration: none;
    display: inline-flex; align-items: center; gap: 3px;
    padding: 4px 10px; border-radius: 8px;
    background: #e8f5e9; border: 1px solid ${G.border};
    transition: background 0.15s, border-color 0.15s;
  }
  .mapa-link:hover { background: ${G.green5}; border-color: ${G.green3}; }

  /* ── Empty state ── */
  .mapa-empty {
    grid-column: 1 / -1;
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 60px 24px; gap: 14px;
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 24px; box-shadow: 0 2px 12px rgba(45,90,39,0.05);
  }
  .mapa-empty-icon {
    width: 72px; height: 72px; border-radius: 20px;
    background: #e8f5e9; border: 1px solid ${G.border};
    display: flex; align-items: center; justify-content: center; font-size: 30px;
    box-shadow: 0 8px 24px rgba(45,90,39,0.1);
  }
  .mapa-empty h3 { font-size: 16px; font-weight: 700; color: ${G.green1}; margin: 0; }
  .mapa-empty p  { font-size: 13px; color: ${G.textMuted}; line-height: 1.65; margin: 0; max-width: 360px; }

  /* ── Error ── */
  .mapa-error {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px; border-radius: 12px;
    font-size: 13px; font-weight: 600;
    background: #fff5f5; border: 1px solid #ffcccc; color: #dc2626;
    margin-bottom: 16px; position: relative; z-index: 1;
  }

  /* ── Skeleton ── */
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  .mapa-skeleton {
    background: linear-gradient(90deg, ${G.green5} 25%, ${G.border} 50%, ${G.green5} 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s ease-in-out infinite;
    border-radius: 20px; height: 130px;
    border: 1px solid ${G.border};
  }

  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .mapa-spinner { animation: spin 0.8s linear infinite; }

  /* ── Toast ── */
  .mapa-toast {
    position: fixed; top: 24px; right: 24px; z-index: 9999;
    padding: 12px 18px; border-radius: 14px; font-weight: 600; font-size: 13px;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 32px rgba(27,60,26,0.3);
    animation: toastIn .3s cubic-bezier(0.16,1,0.3,1);
    max-width: 400px; line-height: 1.4;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .mapa-toast.ok  { background: ${G.green1}; color: #fff; }
  .mapa-toast.err { background: #dc2626; color: #fff; }
  @keyframes toastIn {
    from { transform: translateX(120%); opacity: 0; }
    to   { transform: translateX(0);   opacity: 1; }
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) { .mapa-lista { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 700px) {
    .mapa-page { padding: 40px 16px; }
    .mapa-title { font-size: 1.8rem; }
    #mapa-leaflet { height: 320px; }
    .mapa-lista { grid-template-columns: 1fr; }
  }
`