export const CHIPS = [
  { icon: '♻️', label: '¿Botella de vidrio?' },
  { icon: '🥫', label: '¿Cómo reciclo una lata?' },
  { icon: '📱', label: '¿Celular viejo?' },
  { icon: '🌿', label: 'Upcycling con cartón' },
  { icon: '🍌', label: 'Residuos orgánicos' },
]

export const chipStyle = (border, green2) => ({
  display: 'flex', alignItems: 'center', gap: 5,
  padding: '6px 12px', borderRadius: 100,
  border: `1px solid ${border}`,
  background: 'white',
  fontSize: 12, color: green2, fontWeight: 600,
  cursor: 'pointer',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  transition: 'all 0.15s',
})

export const chipHover = (green5, green3, border) => ({
  enter: { background: green5, borderColor: green3 },
  leave: { background: 'white', borderColor: border },
})

export const inputWrapStyle = {
  borderTop: '1px solid #ddeedd',
  background: 'white',
  borderRadius: '0 0 24px 24px',
  padding: '14px 20px 18px',
  display: 'flex', flexDirection: 'column',
  gap: 10, flexShrink: 0,
}

export const getInputRowStyle = (inputValue, border, green3) => ({
  display: 'flex', gap: 8, alignItems: 'flex-end',
  background: '#f4f8f3',
  border: `1.5px solid ${inputValue.trim() ? green3 : border}`,
  borderRadius: 16,
  padding: '8px 8px 8px 14px',
  transition: 'border-color 0.2s',
})

export const textareaStyle = (green1) => ({
  flex: 1, border: 'none', outline: 'none', resize: 'none',
  fontSize: 13.5,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  background: 'transparent',
  color: green1, lineHeight: 1.5,
  padding: '3px 0',
})

export const getSendBtnStyle = (isActive, green2) => ({
  width: 36, height: 36, borderRadius: 11,
  background: isActive
    ? `linear-gradient(135deg, ${green2} 0%, #3d7a35 100%)`
    : '#d8eed8',
  border: 'none', flexShrink: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: isActive ? 'pointer' : 'not-allowed',
  transition: 'all 0.2s',
  boxShadow: isActive ? '0 2px 8px rgba(45,90,39,0.25)' : 'none',
})

export const getSendIconStyle = (isActive, textSub) => ({
  fontSize: 15, color: isActive ? 'white' : textSub,
})

export const disclaimerStyle = (textSub) => ({
  margin: 0, textAlign: 'center',
  fontSize: 10.5, color: textSub,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
})