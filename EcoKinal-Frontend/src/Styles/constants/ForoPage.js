export const TAGS = ['Logro', 'Pregunta', 'Consejo', 'Noticia']

export const TAG_STYLES = {
    Logro:    { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', dot: '#F59E0B' },
    Pregunta: { bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD', dot: '#38BDF8' },
    Consejo:  { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE', dot: '#A78BFA' },
    Noticia:  { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3', dot: '#FB7185' },
}

export const NAV_ITEMS = [
    { label: 'Detector de reciclaje', href: '/dashboard/usuario/detector', icon: 'ti ti-camera' },
    { label: 'Foro eco',              href: '/dashboard/usuario/foro',     icon: 'ti ti-messages' },
    { label: 'Gamificación',          href: '/dashboard/usuario/puntos',   icon: 'ti ti-trophy' },
    { label: 'Mi impacto',            href: '/dashboard/usuario/impacto',  icon: 'ti ti-chart-bar' },
    { label: 'Mapa reciclaje',        href: '/dashboard/usuario/mapa',     icon: 'ti ti-map-pin' },
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
  .skeleton {
    background: linear-gradient(90deg, #EEF3ED 25%, rgba(43, 95, 42, 0.15) 50%, #EEF3ED 75%);
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

  @media (max-width: 1024px) {
    .foro-grid {
      grid-template-columns: 160px minmax(0, 1fr) 160px !important;
      gap: 12px !important;
    }
    .foro-page-wrapper {
      padding: 1rem !important;
    }
  }

  @media (max-width: 768px) {
    .foro-grid {
      grid-template-columns: 1fr !important;
    }
    .foro-sidebar-left,
    .foro-sidebar-right {
      display: none !important;
    }
  }
`