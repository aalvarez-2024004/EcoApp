export const detectorStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

  @keyframes scan {
    0%   { top: -2px; opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-8px) rotate(1deg); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(1.8); opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes spinLeaf {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes barFill {
    from { width: 0%; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .eco-font { font-family: 'Syne', sans-serif; }

  .animate-scan      { animation: scan 2.2s cubic-bezier(.4,0,.6,1) infinite; }
  .animate-float     { animation: float 3.5s ease-in-out infinite; }
  .animate-fade-up   { animation: fadeUp 0.5s cubic-bezier(.2,.8,.4,1) forwards; }
  .animate-spin-leaf { animation: spinLeaf 1.6s linear infinite; }

  .shimmer-bar {
    background: linear-gradient(90deg, rgba(35,55,109,0.15) 0%, rgba(235,114,7,0.3) 40%, rgba(35,55,109,0.15) 80%);
    background-size: 400px 100%;
    animation: shimmer 1.4s ease-in-out infinite;
  }

  .pulse-ring::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid currentColor;
    animation: pulseRing 1.4s ease-out infinite;
  }

  .bar-animated { animation: barFill 1s cubic-bezier(.2,.8,.4,1) forwards; }

  /* ── Componentes base ── */

  .eco-card {
    background: #fff;
    border: 0.5px solid rgba(35,55,109,0.15);
    border-radius: 20px;
  }

  .eco-btn-primary {
    background: #23376d;
    color: #fdb500;
    border: none;
    border-radius: 14px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.18s ease;
  }
  .eco-btn-primary:hover  { background: #eb7207; }
  .eco-btn-primary:active { transform: scale(0.98); }
  .eco-btn-primary:disabled { background: rgba(35,55,109,0.3); cursor: not-allowed; }

  .eco-btn-secondary {
    background: #eef1f9;
    color: #23376d;
    border: 0.5px solid rgba(35,55,109,0.15);
    border-radius: 14px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.18s ease;
  }
  .eco-btn-secondary:hover  { background: rgba(35,55,109,0.15); }
  .eco-btn-secondary:active { transform: scale(0.98); }

  .tab-active {
    background: #23376d;
    color: #fdb500;
    border-radius: 12px;
  }
  .tab-inactive {
    color: #4b5a8a;
    border-radius: 12px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .tab-inactive:hover { background: rgba(35,55,109,0.15); color: #23376d; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .detector-grid {
      grid-template-columns: 1fr !important;
    }
    .detector-right {
      position: static !important;
    }
  }
`

/* ── Colores por contenedor ── */
export const CONTENEDOR_COLORS = {
  Verde: {
    light:    'bg-[#EAF3DE]',
    text:     'text-[#27500A]',
    border:   'border-[#97C459]',
    dot:      'bg-[#639922]',
    hex:      '#639922',
    rgb:      '99,153,34',
    label:    'Verde',
    gradient: 'from-[#EAF3DE] to-[#C0DD97]',
  },
  Azul: {
    light:    'bg-[#E6F1FB]',
    text:     'text-[#0C447C]',
    border:   'border-[#85B7EB]',
    dot:      'bg-[#378ADD]',
    hex:      '#378ADD',
    rgb:      '55,138,221',
    label:    'Azul',
    gradient: 'from-[#E6F1FB] to-[#B5D4F4]',
  },
  Amarillo: {
    light:    'bg-[#FAEEDA]',
    text:     'text-[#633806]',
    border:   'border-[#EF9F27]',
    dot:      'bg-[#BA7517]',
    hex:      '#BA7517',
    rgb:      '186,117,23',
    label:    'Amarillo',
    gradient: 'from-[#FAEEDA] to-[#FAC775]',
  },
  Rojo: {
    light:    'bg-[#FCEBEB]',
    text:     'text-[#791F1F]',
    border:   'border-[#F09595]',
    dot:      'bg-[#E24B4A]',
    hex:      '#E24B4A',
    rgb:      '226,75,74',
    label:    'Rojo',
    gradient: 'from-[#FCEBEB] to-[#F7C1C1]',
  },
  Gris: {
    light:    'bg-[#F1EFE8]',
    text:     'text-[#444441]',
    border:   'border-[#B4B2A9]',
    dot:      'bg-[#888780]',
    hex:      '#888780',
    rgb:      '136,135,128',
    label:    'Gris',
    gradient: 'from-[#F1EFE8] to-[#D3D1C7]',
  },
}

export const CONSEJOS = {
  'Orgánico':          '¡Conviértelo en compost! El material orgánico puede transformarse en abono natural para plantas.',
  'Inorgánico':        'Limpia el envase antes de depositarlo. Un residuo limpio se recicla mejor y genera más valor.',
  'Residuo Peligroso': 'Nunca lo mezcles con basura común. Llévalo al punto de recolección especial más cercano.',
  'Reutilizable':      '¿Le puedes dar una segunda vida? Donar o reparar es siempre mejor que desechar.',
  'No reciclable':     'Intenta reducir el consumo de este tipo de materiales. Cada pequeña decisión cuenta.',
}

export const detectarColorSet = (contenedor = '') => {
  const c = contenedor.toUpperCase()
  if (c.includes('VERDE'))    return { set: CONTENEDOR_COLORS.Verde,    nombre: 'Verde' }
  if (c.includes('AZUL'))     return { set: CONTENEDOR_COLORS.Azul,     nombre: 'Azul' }
  if (c.includes('AMARILLO')) return { set: CONTENEDOR_COLORS.Amarillo, nombre: 'Amarillo' }
  if (c.includes('ROJO'))     return { set: CONTENEDOR_COLORS.Rojo,     nombre: 'Rojo' }
  return { set: CONTENEDOR_COLORS.Gris, nombre: 'Gris' }
}

export const LEYENDA = [
  { color: 'bg-[#639922]', label: 'Verde',    desc: 'Orgánico',      icon: '🌿' },
  { color: 'bg-[#378ADD]', label: 'Azul',     desc: 'Reciclaje',     icon: '♻️' },
  { color: 'bg-[#BA7517]', label: 'Amarillo', desc: 'Reutilizable',  icon: '🔄' },
  { color: 'bg-[#E24B4A]', label: 'Rojo',     desc: 'Peligroso',     icon: '⚠️' },
  { color: 'bg-[#888780]', label: 'Gris',     desc: 'No reciclable', icon: '🗑️' },
]