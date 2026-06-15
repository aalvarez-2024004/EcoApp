export function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute', top: 12, right: 12, zIndex: 20,
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,255,255,0.92)',
        border: '1px solid rgba(220,38,38,0.2)',
        color: '#dc2626', fontSize: 18, lineHeight: 1, cursor: 'pointer',
        backdropFilter: 'blur(4px)', transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.92)'; e.currentTarget.style.color = '#dc2626' }}
    >×</button>
  )
}

export function Viewfinder() {
  const c = (pos) => ({ position: 'absolute', width: 24, height: 24, ...pos })
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, padding: 20 }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ ...c({ top: 0, left: 0 }),    borderTop: `2.5px solid ${G.green3}`, borderLeft:  `2.5px solid ${G.green3}`, borderRadius: '8px 0 0 0' }} />
        <div style={{ ...c({ top: 0, right: 0 }),   borderTop: `2.5px solid ${G.green3}`, borderRight: `2.5px solid ${G.green3}`, borderRadius: '0 8px 0 0' }} />
        <div style={{ ...c({ bottom: 0, left: 0 }),  borderBottom: `2.5px solid ${G.green3}`, borderLeft:  `2.5px solid ${G.green3}`, borderRadius: '0 0 0 8px' }} />
        <div style={{ ...c({ bottom: 0, right: 0 }), borderBottom: `2.5px solid ${G.green3}`, borderRight: `2.5px solid ${G.green3}`, borderRadius: '0 0 8px 0' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 14, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          <div style={{ position: 'absolute', width: 1, height: 14, background: 'rgba(255,255,255,0.3)' }} />
        </div>
      </div>
    </div>
  )
}

/* Idle placeholder */
export function CameraIdle() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', padding: '0 24px', zIndex: 10 }}>
      <div style={{
        width: 72, height: 72, borderRadius: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f0f9f0', border: `1px solid ${G.border}`,
        boxShadow: `0 8px 24px rgba(45,90,39,0.1)`,
      }}>
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 30, height: 30 }} stroke={G.green2} strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
        </svg>
      </div>
      <div>
        <p style={{ fontSize: 15, fontWeight: 700, color: G.green1, margin: 0 }}>Inicializar capturador óptico</p>
        <p style={{ fontSize: 13, color: G.textMuted, marginTop: 4, margin: 0 }}>Apunta directamente al residuo</p>
      </div>
    </div>
  )
}