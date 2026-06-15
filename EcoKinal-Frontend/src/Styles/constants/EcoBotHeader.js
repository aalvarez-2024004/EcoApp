export const headerWrapStyle = {
  display: 'flex', alignItems: 'center', gap: 14,
  padding: '18px 24px',
  borderBottom: '1px solid #ddeedd',
  background: 'white',
  borderRadius: '24px 24px 0 0',
  flexShrink: 0,
}

export const avatarBoxStyle = (green2) => ({
  width: 44, height: 44, borderRadius: 13,
  background: `linear-gradient(135deg, ${green2} 0%, #3d7a35 100%)`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 4px 14px rgba(45,90,39,0.30)',
})

export const avatarBadgeStyle = (green3) => ({
  position: 'absolute', bottom: -2, right: -2,
  width: 12, height: 12, borderRadius: '50%',
  background: green3,
  border: '2px solid white',
  boxShadow: '0 0 0 2px rgba(82,183,136,0.35)',
  animation: 'pulse-ring 2s ease-in-out infinite',
})

export const botNameStyle = (green1) => ({
  margin: 0, fontSize: '1.1rem', fontWeight: 800,
  color: green1, letterSpacing: '-0.02em', lineHeight: 1.2,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
})

export const botBadgeStyle = (green3) => ({
  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
  color: green3, textTransform: 'uppercase',
  background: 'rgba(82,183,136,0.12)',
  padding: '2px 7px', borderRadius: 20,
})

export const botSubtitleStyle = (textMuted) => ({
  margin: 0, fontSize: 12, color: textMuted,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
})

export const pillStyle = (textMuted) => ({
  display: 'flex', alignItems: 'center', gap: 5,
  padding: '5px 10px', borderRadius: 20,
  background: 'rgba(82,183,136,0.10)',
  fontSize: 11, color: textMuted, fontWeight: 600,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
})

export const clearBtnStyle = {
  display: 'flex', alignItems: 'center', gap: 5,
  padding: '5px 10px', borderRadius: 20,
  background: 'rgba(220,38,38,0.07)',
  border: '1px solid rgba(220,38,38,0.15)',
  fontSize: 11, color: '#dc2626', fontWeight: 600,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  cursor: 'pointer', transition: 'background 0.15s',
}

export const clearBtnHover = {
  enter: { background: 'rgba(220,38,38,0.13)' },
  leave: { background: 'rgba(220,38,38,0.07)' },
}