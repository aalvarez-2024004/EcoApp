export const detectorStyles = `
  @keyframes scan {
    0%   { top: -2px; opacity: 0; }
    10%  { opacity: 0.8; }
    90%  { opacity: 0.8; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-7px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-scan    { animation: scan 2.4s linear infinite; }
  .animate-float   { animation: float 3.2s ease-in-out infinite; }
  .animate-fade-up { animation: fadeUp 0.45s ease-out forwards; }
`

export const CONTENEDOR_COLORS = {
  Verde:    { light: 'bg-emerald-50',  text: 'text-emerald-400', border: 'border-emerald-700', dot: 'bg-emerald-400', hex: '#34d399', rgb: '52,211,153' },
  Azul:     { light: 'bg-blue-50',     text: 'text-blue-400',    border: 'border-blue-700',    dot: 'bg-blue-400',    hex: '#60a5fa', rgb: '96,165,250' },
  Amarillo: { light: 'bg-amber-50',    text: 'text-amber-400',   border: 'border-amber-700',   dot: 'bg-amber-400',   hex: '#fbbf24', rgb: '251,191,36' },
  Rojo:     { light: 'bg-red-50',      text: 'text-red-400',     border: 'border-red-700',     dot: 'bg-red-400',     hex: '#f87171', rgb: '248,113,113' },
  Gris:     { light: 'bg-slate-50',    text: 'text-slate-400',   border: 'border-slate-700',   dot: 'bg-slate-400',   hex: '#94a3b8', rgb: '148,163,184' },
}

export const CONSEJOS = {
  'Orgánico':          'Puedes compostarlo en casa para crear abono natural y reducir residuos.',
  'Inorgánico':        'Asegúrate de limpiar el envase antes de depositarlo en el contenedor.',
  'Residuo Peligroso': 'Nunca lo mezcles con basura común. Llévalo al punto de recolección especial.',
  'Reutilizable':      '¿Podrías darle una segunda vida antes de desecharlo? ¡Sé creativo!',
  'No reciclable':     'Intenta reducir el consumo de este tipo de materiales en el futuro.',
}

export const detectarColorSet = (contenedor = '') => {
  const c = contenedor.toUpperCase()
  if (c.includes('VERDE'))    return { set: CONTENEDOR_COLORS.Verde,    nombre: 'Verde' }
  if (c.includes('AZUL'))     return { set: CONTENEDOR_COLORS.Azul,     nombre: 'Azul' }
  if (c.includes('AMARILLO')) return { set: CONTENEDOR_COLORS.Amarillo, nombre: 'Amarillo' }
  if (c.includes('ROJO'))     return { set: CONTENEDOR_COLORS.Rojo,     nombre: 'Rojo' }
  return { set: CONTENEDOR_COLORS.Gris, nombre: 'Gris' }
}