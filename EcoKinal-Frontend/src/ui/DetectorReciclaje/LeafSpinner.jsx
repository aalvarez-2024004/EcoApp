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