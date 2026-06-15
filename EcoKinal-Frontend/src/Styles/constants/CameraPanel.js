export const G = {
  green1:    '#1b3c1a',
  green2:    '#2d5a27',
  green3:    '#52b788',
  green4:    '#74c69d',
  border:    '#ddeedd',
  textMuted: '#6b8e66',
}

export const getVisorStyle = (camIdle) => ({
  position: 'relative', overflow: 'hidden',
  width: '100%', maxWidth: 560,
  aspectRatio: '4 / 3',
  alignSelf: 'center',
  borderRadius: 20,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'all 0.3s ease',
  ...(camIdle
    ? { background: '#f7fdf7', border: '2px dashed rgba(82,183,136,0.4)' }
    : { background: '#0a1409', border: '1px solid rgba(255,255,255,0.08)' }
  ),
})


export const getVideoStyle = (camLive) => ({
  position: 'absolute', inset: 0,
  width: '100%', height: '100%', objectFit: 'cover',
  opacity: camLive ? 1 : 0,
  pointerEvents: camLive ? 'auto' : 'none',
  transition: 'opacity 0.3s ease',
})


export const capturedBgImgStyle = {
  position: 'absolute', inset: 0,
  width: '100%', height: '100%', objectFit: 'cover',
  filter: 'blur(20px) brightness(0.35) saturate(0.7)',
  transform: 'scale(1.1)',
}

export const capturedFgImgStyle = {
  position: 'relative', zIndex: 2,
  maxWidth: '85%', maxHeight: '85%',
  objectFit: 'contain', borderRadius: 14,
  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
}


export const toggleCameraBtn = {
  position: 'absolute', bottom: 14, right: 14, zIndex: 20,
  width: 52, height: 52, borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(255,255,255,0.95)',
  border: `2px solid #52b788`,
  cursor: 'pointer', backdropFilter: 'blur(4px)',
  boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
  transition: 'transform 0.2s',
}


export const fixedBadgeStyle = {
  position: 'absolute', bottom: 14, left: 14, zIndex: 10,
  display: 'flex', alignItems: 'center', gap: 7,
  padding: '6px 14px', borderRadius: 100,
  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
  border: '1px solid rgba(82,183,136,0.25)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
}

export const fixedBadgeDotStyle = {
  width: 7, height: 7, borderRadius: '50%',
  background: '#52b788', boxShadow: '0 0 6px #52b788',
}

export const fixedBadgeTextStyle = {
  fontSize: 12, fontWeight: 600, color: '#1b3c1a',
}


export const analyzingOverlayStyle = {
  position: 'absolute', top: '50%', left: '50%', zIndex: 20,
  transform: 'translate(-50%,-50%)',
  display: 'flex', alignItems: 'center', gap: 8,
  padding: '12px 20px', borderRadius: 14,
  background: 'rgba(13,31,13,0.88)',
  border: '1px solid rgba(82,183,136,0.2)',
  backdropFilter: 'blur(8px)',
}

export const analyzingTextStyle = {
  fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.02em',
}


export const closeBtnStyle = {
  position: 'absolute', top: 12, right: 12, zIndex: 20,
  width: 32, height: 32, borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(255,255,255,0.92)',
  border: '1px solid rgba(220,38,38,0.2)',
  color: '#dc2626', fontSize: 18, lineHeight: 1, cursor: 'pointer',
  backdropFilter: 'blur(4px)', transition: 'all 0.2s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
}

export const closeBtnHover = {
  enter: { background: '#dc2626', color: '#fff' },
  leave: { background: 'rgba(255,255,255,0.92)', color: '#dc2626' },
}


export const tipCardStyle = {
  display: 'flex', gap: 10, alignItems: 'flex-start',
  padding: '12px 16px', borderRadius: 14,
  background: '#f0f9f0', border: '1px solid #ddeedd',
}

export const tipIconWrapStyle = {
  width: 28, height: 28, borderRadius: 8,
  background: '#e8f5e9', display: 'flex',
  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
}

export const tipTitleStyle = { fontSize: 12, fontWeight: 600, color: '#1b3c1a', margin: 0 }
export const tipBodyStyle  = { fontSize: 12, color: '#6b8e66', margin: '2px 0 0 0', lineHeight: 1.5 }


export const activarBtnStyle = {
  width: '100%', padding: '13px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  background: '#2d5a27', color: '#fff', border: 'none',
  borderRadius: 14, fontWeight: 600, fontSize: 14,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  cursor: 'pointer',
  boxShadow: '0 4px 16px rgba(45,90,39,0.2)',
  transition: 'transform 0.2s, box-shadow 0.2s',
}

export const activarBtnHover = {
  enter: { transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(45,90,39,0.28)' },
  leave: { transform: 'translateY(0)',    boxShadow: '0 4px 16px rgba(45,90,39,0.2)' },
}


export const cancelarBtnStyle = {
  padding: '12px 20px', display: 'flex', alignItems: 'center',
  justifyContent: 'center', gap: 7,
  background: '#fff', color: '#2d5a27',
  border: '1px solid #ddeedd',
  borderRadius: 14, fontWeight: 600, fontSize: 13,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  cursor: 'pointer', transition: 'all 0.2s',
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
}

export const cancelarBtnHover = {
  enter: { background: '#f7fdf7', borderColor: '#52b788' },
  leave: { background: '#fff',    borderColor: '#ddeedd' },
}


export const capturarBtnStyle = {
  flex: 1, padding: '12px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  background: '#52b788', color: '#fff', border: 'none',
  borderRadius: 14, fontWeight: 600, fontSize: 14,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  cursor: 'pointer',
  boxShadow: '0 4px 16px rgba(82,183,136,0.3)',
  transition: 'transform 0.2s, box-shadow 0.2s',
}

export const capturarBtnHover = {
  enter: { transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(82,183,136,0.4)' },
  leave: { transform: 'translateY(0)',    boxShadow: '0 4px 16px rgba(82,183,136,0.3)' },
}


export const reintentarBtnStyle = {
  padding: '12px 20px', display: 'flex', alignItems: 'center',
  justifyContent: 'center', gap: 7, flex: '1 1 auto',
  background: '#fff', color: '#2d5a27',
  border: '1px solid #ddeedd',
  borderRadius: 14, fontWeight: 600, fontSize: 13,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  cursor: 'pointer', transition: 'all 0.2s',
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
}

export const reintentarBtnHover = {
  enter: { background: '#f7fdf7', borderColor: '#52b788' },
  leave: { background: '#fff',    borderColor: '#ddeedd' },
}


export const viewfinderCornerBase = {
  position: 'absolute', width: 24, height: 24,
}

export const viewfinderCorners = {
  topLeft:     { top: 0,    left: 0,  borderTop:    `2.5px solid #52b788`, borderLeft:  `2.5px solid #52b788`, borderRadius: '8px 0 0 0' },
  topRight:    { top: 0,    right: 0, borderTop:    `2.5px solid #52b788`, borderRight: `2.5px solid #52b788`, borderRadius: '0 8px 0 0' },
  bottomLeft:  { bottom: 0, left: 0,  borderBottom: `2.5px solid #52b788`, borderLeft:  `2.5px solid #52b788`, borderRadius: '0 0 0 8px' },
  bottomRight: { bottom: 0, right: 0, borderBottom: `2.5px solid #52b788`, borderRight: `2.5px solid #52b788`, borderRadius: '0 0 8px 0' },
}


export const idleIconWrapStyle = {
  width: 72, height: 72, borderRadius: 20,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: '#f0f9f0', border: '1px solid #ddeedd',
  boxShadow: '0 8px 24px rgba(45,90,39,0.1)',
}

export const idleTitleStyle = { fontSize: 15, fontWeight: 700, color: '#1b3c1a', margin: 0 }
export const idleSubStyle   = { fontSize: 13, color: '#6b8e66', marginTop: 4, margin: 0 }