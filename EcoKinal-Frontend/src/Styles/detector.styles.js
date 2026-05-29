// ─── Animaciones globales y utilidades CSS ────────────────────────────────────
export const detectorStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%      { transform: translateY(-6px); }
  }
  
  @keyframes scanLine {
    0%   { top: -10%; opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 110%; opacity: 0; }
  }

  @keyframes pulseGlow {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.7; transform: scale(1.1); }
  }

  .animate-fade-up  { animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .animate-float    { animation: float 3.5s ease-in-out infinite; }
  .scan-line        { animation: scanLine 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
  .animate-pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }

  /* Scrollbar minimalista para que combine con el diseño limpio */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
`;

// ─── Mapa de colores por contenedor ──────────────────────────────────────────
// Se expandieron las Regex para atrapar más sinónimos o salidas comunes de la IA

const COLOR_MAP = [
  {
    match:  /verde|org[aá]nic|comida|fruta|verdura/i,
    nombre: 'Verde',
    hex:    '#10b981', // emerald-500
    set: {
      light:  'bg-emerald-50/80 backdrop-blur-sm',
      border: 'border-emerald-200/80 shadow-sm',
      text:   'text-emerald-700',
      dot:    'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse-glow',
    },
  },
  {
    match:  /azul|reciclaje|papel|cart[oó]n|pl[aá]stico|vidrio/i,
    nombre: 'Reciclaje',
    hex:    '#3b82f6', // blue-500
    set: {
      light:  'bg-blue-50/80 backdrop-blur-sm',
      border: 'border-blue-200/80 shadow-sm',
      text:   'text-blue-700',
      dot:    'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse-glow',
    },
  },
  {
    match:  /amarill|guardar|reutiliz|ropa|juguete|madera/i,
    nombre: 'Reutilizable',
    hex:    '#f59e0b', // amber-500
    set: {
      light:  'bg-amber-50/80 backdrop-blur-sm',
      border: 'border-amber-200/80 shadow-sm',
      text:   'text-amber-700',
      dot:    'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse-glow',
    },
  },
  {
    match:  /rojo|peligros|bater[ií]a|electr[oó]nic|qu[ií]mic|medicina/i,
    nombre: 'Rojo',
    hex:    '#ef4444', // red-500
    set: {
      light:  'bg-red-50/80 backdrop-blur-sm',
      border: 'border-red-200/80 shadow-sm',
      text:   'text-red-700',
      dot:    'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse-glow',
    },
  },
  {
    match:  /gris|basura|com[uú]n|mezclado/i,
    nombre: 'Gris',
    hex:    '#64748b', // slate-500
    set: {
      light:  'bg-slate-50/80 backdrop-blur-sm',
      border: 'border-slate-200/80 shadow-sm',
      text:   'text-slate-700',
      dot:    'bg-slate-500 shadow-[0_0_8px_rgba(100,116,139,0.5)]',
    },
  },
];

const FALLBACK = {
  nombre: 'Desconocido',
  hex:    '#94a3b8', // slate-400
  set: {
    light:  'bg-slate-50',
    border: 'border-slate-200',
    text:   'text-slate-600',
    dot:    'bg-slate-400',
  },
};

export const detectarColorSet = (contenedor = '') => {
  const found = COLOR_MAP.find(c => c.match.test(contenedor));
  return found ?? FALLBACK;
};

// ─── Leyenda de contenedores ──────────────────────────────────────────────────
export const LEYENDA = [
  { color: 'bg-emerald-500', label: 'Verde',    desc: 'Orgánico' },
  { color: 'bg-blue-500',    label: 'Azul',     desc: 'Reciclaje' },
  { color: 'bg-amber-400',   label: 'Amarillo', desc: 'Reutilizable' },
  { color: 'bg-red-500',     label: 'Rojo',     desc: 'Peligroso' },
];

// ─── Consejos por tipo de residuo ─────────────────────────────────────────────
export const CONSEJOS = {
  'Orgánico':          'Considera hacer compost en casa — reduce el volumen de basura hasta un 30%.',
  'Inorgánico':        'Limpia y seca el envase antes de reciclarlo. Los residuos de comida contaminan el lote completo.',
  'Residuo Peligroso': 'Nunca lo mezcles con basura común. Busca el punto de recolección especial más cercano.',
  'Reutilizable':      'Antes de tirarlo, piensa si alguien más puede usarlo. Dona o intercambia.',
  'No reciclable':     'Algunos municipios tienen programas de reciclaje especial. Consulta con tu municipalidad.',
  'Plástico':          'Aplasta las botellas de plástico y ciérralas con su tapa para que ocupen menos espacio.',
  'Cartón':            'Desarma y aplasta las cajas por completo. Si el cartón tiene grasa (como cajas de pizza), va al orgánico.',
};