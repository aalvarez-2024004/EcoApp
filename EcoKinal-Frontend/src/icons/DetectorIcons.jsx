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