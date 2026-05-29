// Bin icon — contenedor de basura con color dinámico
export const BinIcon = ({ color = '#16a34a' }) => (
  <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
    <rect x="8" y="14" width="32" height="28" rx="4" fill={color} opacity="0.15" stroke={color} strokeWidth="2" />
    <rect x="4" y="10" width="40" height="6" rx="3" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
    <path d="M18 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M20 22v12M24 22v12M28 22v12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 24 Q24 20 32 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
)

// Overlay de escaneo sobre la imagen previa
export const ScanOverlay = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-400 opacity-70 animate-scan" />
    <div className="absolute top-1/4 left-4 right-4 h-px bg-emerald-300 opacity-20" />
    <div className="absolute top-2/4 left-4 right-4 h-px bg-emerald-300 opacity-20" />
    <div className="absolute top-3/4 left-4 right-4 h-px bg-emerald-300 opacity-20" />
    <div className="absolute top-0 bottom-0 left-1/4 w-px bg-emerald-300 opacity-20" />
    <div className="absolute top-0 bottom-0 left-2/4 w-px bg-emerald-300 opacity-20" />
    <div className="absolute top-0 bottom-0 left-3/4 w-px bg-emerald-300 opacity-20" />
    <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-emerald-400" style={{ borderRadius: '4px 0 0 0' }} />
    <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-emerald-400" style={{ borderRadius: '0 4px 0 0' }} />
    <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-emerald-400" style={{ borderRadius: '0 0 0 4px' }} />
    <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-emerald-400" style={{ borderRadius: '0 0 4px 0' }} />
  </div>
)

// Barra de confianza usada en el estado de carga
export const ConfidenceBar = ({ label, value }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs text-slate-500">
      <span>{label}</span>
      <span className="font-medium text-slate-600">{value}%</span>
    </div>
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-emerald-400 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
)