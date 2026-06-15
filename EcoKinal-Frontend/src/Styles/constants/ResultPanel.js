
// Los colores G vienen de ImpactoPage.js — impórtalos desde ahí en el componente.
export const emptyHeaderStyle = (border) => ({
  paddingBottom: 14, marginBottom: 16,
  borderBottom: `1px solid ${border}`,
  display: 'flex', alignItems: 'center', gap: 8,
})

export const emptyHeaderIconWrapStyle = {
  width: 28, height: 28, borderRadius: 8,
  background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center',
}

export const emptyHeaderLabelStyle = (green2) => ({
  fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
  color: green2, textTransform: 'uppercase', margin: 0,
})

export const emptyStepNumberStyle = (border) => ({
  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
  background: '#e8f5e9', border: `1px solid ${border}`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 1,
})

export const emptyStepConnectorStyle = (border) => ({
  position: 'absolute', left: 13, top: 28, bottom: 0,
  width: 1, background: `linear-gradient(to bottom, ${border}, transparent)`,
})

export const emptyStepBadgeStyle = (green3) => ({
  fontSize: 10, fontWeight: 700, color: green3,
})

export const emptyStepTitleStyle = (green1) => ({
  fontSize: 13, fontWeight: 700, color: green1, margin: 0,
})

export const emptyStepDescStyle = (textMuted) => ({
  fontSize: 12, color: textMuted, lineHeight: 1.55, margin: 0,
})

export const emptyFooterStyle = (border) => ({
  marginTop: 'auto', paddingTop: 14,
  borderTop: `1px solid ${border}`,
  display: 'flex', alignItems: 'center', gap: 7,
})

export const emptyFooterDotStyle = (green3) => ({
  width: 7, height: 7, borderRadius: '50%',
  background: green3, boxShadow: `0 0 5px ${green3}`,
  animation: 'pulse-dot 2s infinite',
})

export const emptyFooterTextStyle = (textMuted) => ({
  fontSize: 11, fontWeight: 600, color: textMuted, margin: 0,
})

export const loadingWrapStyle = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  justifyContent: 'center', gap: 20, minHeight: 380, width: '100%',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
}

export const loadingTitleStyle = (green1) => ({
  fontSize: 15, fontWeight: 700, color: green1, margin: 0,
})

export const loadingSubStyle = (textMuted) => ({
  fontSize: 12, color: textMuted, marginTop: 4, margin: 0,
})

export const loadingBarsWrapStyle = (border) => ({
  width: '100%', display: 'flex', flexDirection: 'column', gap: 12,
  background: '#f0f9f0', padding: '16px', borderRadius: 16,
  border: `1px solid ${border}`,
})

export const resultCardStyle = (border) => ({
  borderRadius: 18, overflow: 'hidden',
  border: `1px solid ${border}`,
  boxShadow: '0 4px 20px rgba(45,90,39,0.06)',
})

export const resultCardHeaderStyle = (hex) => ({
  padding: '16px 18px',
  background: `linear-gradient(135deg, ${hex}12, ${hex}28)`,
  borderBottom: `1px solid ${hex}30`,
})

export const resultCardHeaderBadgeStyle = (hex) => ({
  fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
  color: hex, textTransform: 'uppercase', margin: '0 0 10px 0',
})

export const resultCardDotStyle = (hex) => ({
  width: 8, height: 8, borderRadius: '50%',
  background: hex, boxShadow: `0 0 8px ${hex}`,
})

export const resultCardTipoStyle = (green1) => ({
  fontSize: 20, fontWeight: 800, color: green1,
  margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif",
})

export const resultCardDescStyle = (textMuted) => ({
  fontSize: 12, color: textMuted, lineHeight: 1.5, margin: 0,
})

export const labelsWrapStyle = (border) => ({
  padding: '14px 18px',
  borderBottom: `1px solid rgba(0,0,0,0.04)`,
  background: '#fff',
})

export const labelsSectionTitleStyle = (textSub) => ({
  fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
  color: textSub, textTransform: 'uppercase', margin: '0 0 8px 0',
})

export const labelChipStyle = (border, green2) => ({
  padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600,
  background: '#f0f9f0', color: green2,
  border: `1px solid ${border}`,
})


export const destinoSectionStyle = {
  padding: '14px 18px', background: '#fff',
}

export const destinoSectionTitleStyle = (textSub) => ({
  fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
  color: textSub, textTransform: 'uppercase', margin: '0 0 8px 0',
})

export const destinoRowStyle = (border) => ({
  display: 'flex', alignItems: 'center', gap: 10,
  padding: '10px 14px', borderRadius: 12,
  background: '#f7fdf7', border: `1px solid ${border}`,
})

export const destinoDotStyle = (hex) => ({
  width: 10, height: 10, borderRadius: '50%',
  flexShrink: 0, background: hex, boxShadow: `0 0 6px ${hex}`,
})

export const destinoNombreStyle = (green1) => ({
  fontSize: 13, fontWeight: 700, color: green1, margin: 0,
})

export const destinoSubStyle = (textMuted) => ({
  fontSize: 11, color: textMuted, margin: 0, marginTop: 1,
})

export const consejoWrapStyle = {
  display: 'flex', gap: 10, padding: '12px 14px',
  borderRadius: 14, background: 'rgba(239,159,39,0.06)',
  border: '1px solid rgba(239,159,39,0.22)',
}

export const consejoIconWrapStyle = {
  width: 28, height: 28, borderRadius: 8,
  background: 'rgba(239,159,39,0.12)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0, color: '#bc6c25',
}

export const consejoTextStyle = {
  fontSize: 12, color: '#7a4419', lineHeight: 1.6, margin: 0, fontWeight: 500,
}


export const resetBtnStyle = (border, green2) => ({
  width: '100%', padding: '13px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
  background: '#fff', color: green2,
  border: `1px solid ${border}`,
  borderRadius: 14, fontWeight: 600, fontSize: 13,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  cursor: 'pointer', transition: 'all 0.2s',
  marginTop: 'auto',
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
})

export const resetBtnHover = (border, green3) => ({
  enter: { background: '#f7fdf7', borderColor: green3,  transform: 'translateY(-1px)' },
  leave: { background: '#fff',    borderColor: border,  transform: 'translateY(0)' },
})
