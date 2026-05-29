export const RecycleIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
)

export const BinIcon = ({ color = '#16a34a' }) => (
  <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
    <rect x="8" y="14" width="32" height="28" rx="4" fill={color} opacity="0.15" stroke={color} strokeWidth="2" />
    <rect x="4" y="10" width="40" height="6" rx="3" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
    <path d="M18 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M20 22v12M24 22v12M28 22v12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 24 Q24 20 32 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
)

export const UploadIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
)

export const CameraIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
  </svg>
)

export const SpinnerIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

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