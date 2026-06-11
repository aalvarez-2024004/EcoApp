export const TAGS = ['Logro', 'Pregunta', 'Consejo', 'Noticia']

export const TAG_STYLES = {
  Logro: { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', dot: '#F59E0B' },
  Pregunta: { bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD', dot: '#38BDF8' },
  Consejo: { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE', dot: '#A78BFA' },
  Noticia: { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3', dot: '#FB7185' },
}

export const NAV_ITEMS = [
  { label: 'Detector de reciclaje', href: '/dashboard/usuario/detector', icon: 'ti ti-camera' },
  { label: 'Foro eco', href: '/dashboard/usuario/foro', icon: 'ti ti-messages' },
  { label: 'Gamificación', href: '/dashboard/usuario/puntos', icon: 'ti ti-trophy' },
  { label: 'Mi impacto', href: '/dashboard/usuario/impacto', icon: 'ti ti-chart-bar' },
  { label: 'Mapa reciclaje', href: '/dashboard/usuario/mapa', icon: 'ti ti-map-pin' },
]

export const pageStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-fade-up { animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }

  /* ── Animaciones de entrada escalonadas ── */
  .foro-anim-1  { animation: fadeUp 0.4s 0.00s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .foro-anim-2  { animation: fadeUp 0.4s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .foro-anim-3  { animation: fadeUp 0.4s 0.16s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .foro-anim-4  { animation: fadeUp 0.4s 0.24s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .foro-anim-5  { animation: fadeUp 0.4s 0.32s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .foro-anim-6  { animation: fadeUp 0.4s 0.40s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .foro-post-anim { animation: fadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 600px 100%;
    animation: shimmer 1.6s infinite linear;
  }
  .outline-title {
    color: transparent !important;
    -webkit-text-stroke: 1.5px #2B5F2A;
  }
  .publish-btn {
    background: #2B5F2A !important;
    color: #EEF3ED !important;
    transition: background 0.2s;
  }
  .publish-btn:hover { background: #1e451d !important; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(43, 95, 42, 0.15); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(43, 95, 42, 0.3); }

  /* ── Filtros y Sidedars: Visibilidad por defecto (Escritorio) ── */
  .foro-filtros-desktop         { display: flex; }
  .foro-filtros-mobile          { display: none; }
  .foro-sidebar-desktop         { display: flex; flex-direction: column; gap: 8px; width: 100%; }
  .foro-sidebar-mobile-trigger  { display: none !important; } /* Oculto en desktop por defecto */

  /* ── Grid base ── */
  .foro-grid {
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    gap: 28px;
    align-items: start;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  .foro-sidebar-left::-webkit-scrollbar { display: none; }

  /* ── Tablet (1100px) ── */
  @media (max-width: 1100px) {
    .foro-grid {
      grid-template-columns: 240px minmax(0, 1fr) !important;
      gap: 20px !important;
    }
    .foro-page-wrapper {
      padding: 1.25rem !important;
    }
  }

  /* ── Mobile / Breakpoint Global (768px) ── */
  @media (max-width: 768px) {
    .foro-filtros-desktop         { display: none !important; }
    .foro-filtros-mobile          { display: block !important; }
    .foro-sidebar-desktop         { display: none !important; }
    .foro-sidebar-mobile-trigger  { display: block !important; } /* Se activa sólo aquí */

    .foro-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 14px !important;
    }
    .foro-sidebar-left {
      position: static !important;
      max-height: unset !important;
      overflow: visible !important;
      width: 100% !important;
    }
    .foro-page-wrapper {
      padding: 0.75rem !important;
      overflow-x: clip !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }
    .foro-grid > div {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }
    .foro-title-h1 { font-size: 28px !important; }
    .foro-compose-header { padding: 12px 16px !important; }
    .foro-compose-body { padding: 16px !important; gap: 14px !important; }
    .foro-compose-footer { padding: 12px 16px !important; }
    .foro-compose-bottom-row { flex-direction: column !important; gap: 16px !important; }
    .foro-compose-bottom-row > div { min-width: unset !important; width: 100% !important; }
    .foro-toast { left: 12px !important; right: 12px !important; bottom: 16px !important; width: auto !important; }
    .foro-compose-trigger { padding: 14px 16px !important; gap: 12px !important; }
  }

  /* ── Extra small (< 400px) ── */
  @media (max-width: 400px) {
    .foro-title-h1 { font-size: 22px !important; }
    .foro-page-wrapper { padding: 0.5rem !important; }
  }
`