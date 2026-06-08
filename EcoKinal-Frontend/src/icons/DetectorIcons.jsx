// Bote de basura con color dinámico — diseño orgánico
export const BinIcon = ({ color = '#23376d', size = 72 }) => (
  <svg viewBox="0 0 72 80" fill="none" style={{ width: size, height: size }}>
    {/* Sombra base */}
    <ellipse cx="36" cy="76" rx="18" ry="3" fill={color} opacity="0.12" />

    {/* Cuerpo del bote */}
    <path
      d="M14 22 L17 68 Q17 72 21 72 L51 72 Q55 72 55 68 L58 22 Z"
      fill={color} opacity="0.15"
      stroke={color} strokeWidth="1.5"
    />

    {/* Frente con brillo */}
    <path
      d="M16 22 L19 66 Q19 70 23 70 L49 70 Q53 70 53 66 L56 22 Z"
      fill="white" opacity="0.5"
    />

    {/* Líneas de reciclaje en el bote */}
    <path
      d="M28 35 Q36 32 44 35"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"
    />
    <path
      d="M27 44 Q36 41 45 44"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"
    />
    <path
      d="M27 53 Q36 50 45 53"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"
    />

    {/* Símbolo reciclaje */}
    <path
      d="M33 47 L36 44 L39 47 M36 44 L36 52"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"
    />

    {/* Tapa */}
    <rect x="10" y="16" width="52" height="8" rx="4" fill={color} opacity="0.9" />
    <rect x="10" y="16" width="52" height="8" rx="4" fill="white" opacity="0.2" />

    {/* Asa */}
    <path
      d="M28 16 L28 10 Q28 7 31 7 L41 7 Q44 7 44 10 L44 16"
      stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"
    />

    {/* Destello superior */}
    <rect x="14" y="18" width="12" height="3" rx="1.5" fill="white" opacity="0.4" />
  </svg>
)

// Overlay de escaneo eco — línea verde con cuadrícula suave
export const ScanOverlay = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
    {/* Línea de escaneo */}
    <div className="absolute left-0 right-0 h-0.5 animate-scan"
         style={{ background: 'linear-gradient(90deg, transparent, #23376d, #eb7207, #23376d, transparent)' }} />

    {/* Cuadrícula sutil */}
    {[25, 50, 75].map(p => (
      <div key={p} className="absolute left-4 right-4 h-px" style={{ top: `${p}%`, background: '#23376d', opacity: 0.12 }} />
    ))}
    {[25, 50, 75].map(p => (
      <div key={p} className="absolute top-4 bottom-4 w-px" style={{ left: `${p}%`, background: '#23376d', opacity: 0.12 }} />
    ))}

    {/* Esquinas del visor */}
    {[
      { top: 12, left: 12,  borderTop: '2px solid #23376d', borderLeft: '2px solid #23376d',  borderRadius: '6px 0 0 0' },
      { top: 12, right: 12, borderTop: '2px solid #23376d', borderRight: '2px solid #23376d', borderRadius: '0 6px 0 0' },
      { bottom: 12, left: 12,  borderBottom: '2px solid #23376d', borderLeft: '2px solid #23376d',  borderRadius: '0 0 0 6px' },
      { bottom: 12, right: 12, borderBottom: '2px solid #23376d', borderRight: '2px solid #23376d', borderRadius: '0 0 6px 0' },
    ].map((style, i) => (
      <div key={i} className="absolute w-7 h-7" style={style} />
    ))}
  </div>
)

// Barra de progreso animada para el estado de carga
export const ConfidenceBar = ({ label, value, color = '#23376d' }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between" style={{ fontSize: 12 }}>
      <span style={{ color: '#23376d' }}>{label}</span>
      <span style={{ color: '#eb7207', fontWeight: 600 }}>{value}%</span>
    </div>
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#eef1f9' }}>
      <div
        className="h-full rounded-full bar-animated"
        style={{ width: `${value}%`, background: color, transition: 'width 1s ease' }}
      />
    </div>
  </div>
)

// Hoja giratoria para el loading
export const LeafSpinner = () => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full border-2 border-dashed animate-spin-leaf"
         style={{ borderColor: '#23376d', animationDuration: '3s' }} />
    <div className="absolute inset-2 rounded-full" style={{ background: '#eef1f9' }} />
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 relative z-10" style={{ color: '#23376d' }}>
      <path
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10C12 12 12 2 12 2z"
        fill="#23376d" opacity="0.15"
      />
      <path
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2c0 5.523 0 10 10 10-5.523 0-10 4.477-10 10z"
        fill="#eb7207" opacity="0.8"
      />
      <path d="M12 2v10M12 12l-4-4" stroke="#fdb500" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
)

/* ── Botón de tab ── */
export const TabBtn = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`tab-btn ${active ? 'active' : ''}`}
    >
      {children}
    </button>
  )
}

/* ── Decoración SVG de fondo ── */
export const BgPattern = () => {
  return (
    <svg
      aria-hidden="true"
      className="bg-pattern"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="leaf-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.5" fill="#2d5a27" />
          <circle cx="0"  cy="0"  r="1"   fill="#2d5a27" />
          <circle cx="60" cy="0"  r="1"   fill="#2d5a27" />
          <circle cx="0"  cy="60" r="1"   fill="#2d5a27" />
          <circle cx="60" cy="60" r="1"   fill="#2d5a27" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#leaf-grid)" />
    </svg>
  )
}

/* ── Ilustración decorativa header ── */
export const HeaderIllustration = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      className="header-illustration"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="90" rx="80" ry="20" fill="#52b788" />
      <path d="M100 80 Q80 40 60 20 Q100 30 100 80Z"   fill="#2d5a27" />
      <path d="M100 80 Q120 40 140 20 Q100 30 100 80Z" fill="#52b788" />
      <path d="M100 80 Q70 55 50 60 Q80 45 100 80Z"    fill="#74c69d" />
      <path d="M100 80 Q130 55 150 60 Q120 45 100 80Z" fill="#74c69d" />
      <circle cx="100" cy="78" r="5" fill="#1b3c1a" />
    </svg>
  )
}