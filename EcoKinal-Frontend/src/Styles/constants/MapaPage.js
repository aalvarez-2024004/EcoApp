import {G} from './ImpactoPage.js'
export const mapaStyles = `
  @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  .mapa-page {
    background: ${G.pageBg};
    min-height: 100vh;
    padding: 40px 32px 40px 32px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: relative;
    width: 100%;
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
    font-size: 2rem; font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.1; margin: 0 0 8px;
    color: ${G.green1};
  }
  .mapa-title-accent {
    color: ${G.green3};
  }

  .mapa-subtitle {
    font-size: 13.5px; color: ${G.textMuted};
    max-width: 480px; line-height: 1.6; margin: 0; font-weight: 400;
  }

  /* ── Controls ── */
  .mapa-controls {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;
  }

  .mapa-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 20px; border-radius: 14px; border: none;
    background: ${G.green2}; color: #fff;
    font-size: 13.5px; font-weight: 600; cursor: pointer;
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
    padding: 11px 16px; border-radius: 14px;
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

  /* ── Two-column layout: map left + list right ── */
  .mapa-body {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 20px;
    align-items: start;
    position: relative;
    z-index: 1;
  }

  /* ── Left column (map) ── */
  .mapa-left {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
  }

  /* ── Map wrapper ── */
  .mapa-map-wrapper {
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 20px; overflow: hidden;
    box-shadow: 0 4px 24px rgba(45,90,39,0.07);
    position: relative;
  }

  #mapa-leaflet { height: calc(100vh - 240px); min-height: 440px; width: 100%; }

  /* ── Right column (scrollable list) ── */
  .mapa-right {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
  }

  /* ── List header ── */
  .mapa-lista-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 10px; position: relative; z-index: 1;
  }
  .mapa-lista-title {
    display: flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    color: ${G.textSub}; text-transform: uppercase;
  }

  /* ── Scrollable list container ── */
  .mapa-lista {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: calc(100vh - 240px);
    min-height: 440px;
    overflow-y: auto;
    padding-right: 4px;
    scrollbar-width: thin;
    scrollbar-color: ${G.green3} transparent;
  }
  .mapa-lista::-webkit-scrollbar { width: 5px; }
  .mapa-lista::-webkit-scrollbar-track { background: transparent; }
  .mapa-lista::-webkit-scrollbar-thumb {
    background: ${G.green4};
    border-radius: 99px;
  }

  /* ── Card ── */
  .mapa-card {
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 16px;
    overflow: hidden;
    padding: 0;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    box-shadow: 0 2px 10px rgba(45,90,39,0.04);
  }
  .mapa-card:hover {
    border-color: ${G.green3};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(45,90,39,0.10);
  }

  /* Cover image — full-width top of card */
  .mapa-card-cover {
    width: 100%; height: 160px;
    overflow: hidden; flex-shrink: 0;
    background: ${G.green5};
  }
  .mapa-card-cover img {
    width: 100%; height: 100%; object-fit: cover;
    object-position: center; display: block;
    transition: transform 0.35s ease;
  }
  .mapa-card:hover .mapa-card-cover img { transform: scale(1.04); }

  /* NOT FOUND placeholder */
  .mapa-card-cover-placeholder {
    width: 100%; height: 160px;
    flex-shrink: 0;
    background: linear-gradient(135deg, ${G.green5} 0%, #d4edda 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 6px;
  }
  .mapa-card-cover-placeholder-icon {
    width: 44px; height: 44px;
    background: rgba(82,183,136,0.15);
    border-radius: 12px; border: 1px solid rgba(82,183,136,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }
  .mapa-card-cover-placeholder-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    color: ${G.green3}; text-transform: uppercase; opacity: 0.8;
  }

  /* Inner content padding */
  .mapa-card-header {
    display: flex; align-items: center; gap: 8px;
    padding: 12px 12px 0;
  }

  /* Small avatar */
  .mapa-card-avatar {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    background: #e8f5e9; border: 2px solid ${G.border};
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    color: ${G.green2}; font-size: 11px; font-weight: 800;
  }
  .mapa-card-avatar img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }

  .mapa-card-name {
    flex: 1;
    font-size: 12.5px; font-weight: 700; color: ${G.green1}; line-height: 1.35;
    margin: 0;
  }
  .mapa-card-dist {
    font-size: 10.5px; font-weight: 700; color: ${G.green2};
    background: #e8f5e9; padding: 3px 8px; border-radius: 99px;
    white-space: nowrap; flex-shrink: 0; border: 1px solid ${G.border};
  }

  .mapa-card-address {
    font-size: 11px; color: ${G.textMuted}; line-height: 1.5;
    padding: 5px 12px 0;
    margin: 0; flex: 1;
  }

  .mapa-card-footer {
    display: flex; align-items: center; gap: 5px; flex-wrap: wrap;
    padding: 8px 12px 12px;
    margin-top: auto;
  }

  .mapa-chip {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 10.5px; font-weight: 600; padding: 3px 8px; border-radius: 7px;
  }
  .mapa-chip-open    { background: #e8f5e9; color: ${G.green2}; border: 1px solid ${G.border}; }
  .mapa-chip-closed  { background: #fff5f5; color: #dc2626; border: 1px solid #ffcccc; }
  .mapa-chip-unknown { background: #f7fdf7; color: ${G.textMuted}; border: 1px solid ${G.border}; }
  .mapa-chip-rating  { background: rgba(217,119,6,0.08); color: #92400e; border: 1px solid rgba(217,119,6,0.2); }

  .mapa-link {
    margin-left: auto; font-size: 10.5px; font-weight: 600;
    color: ${G.green2}; text-decoration: none;
    display: inline-flex; align-items: center; gap: 3px;
    padding: 3px 8px; border-radius: 7px;
    background: #e8f5e9; border: 1px solid ${G.border};
    transition: background 0.15s, border-color 0.15s;
  }
  .mapa-link:hover { background: ${G.green5}; border-color: ${G.green3}; }

  /* ── Empty state ── */
  .mapa-empty {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 48px 24px; gap: 14px;
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 18px; box-shadow: 0 2px 12px rgba(45,90,39,0.05);
    height: 100%;
  }
  .mapa-empty-icon {
    width: 64px; height: 64px; border-radius: 18px;
    background: #e8f5e9; border: 1px solid ${G.border};
    display: flex; align-items: center; justify-content: center; font-size: 28px;
    box-shadow: 0 8px 24px rgba(45,90,39,0.1);
  }
  .mapa-empty h3 { font-size: 15px; font-weight: 700; color: ${G.green1}; margin: 0; }
  .mapa-empty p  { font-size: 12.5px; color: ${G.textMuted}; line-height: 1.65; margin: 0; max-width: 280px; }

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
    border-radius: 16px; height: 200px;
    border: 1px solid ${G.border};
    flex-shrink: 0;
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
  @media (max-width: 1024px) {
    .mapa-body { grid-template-columns: 1fr; }
    .mapa-lista {
      height: auto;
      max-height: 480px;
    }
    #mapa-leaflet { height: 420px; }
  }
  @media (max-width: 700px) {
    .mapa-page { padding: 24px 16px; }
    .mapa-title { font-size: 1.6rem; }
    #mapa-leaflet { height: 320px; }
    .mapa-lista { max-height: 400px; }
  }
`
