export const getDropZoneStyle = (preview) => ({
  position: 'relative', overflow: 'hidden',
  width: '100%', maxWidth: 560,
  aspectRatio: '4 / 3',
  alignSelf: 'center',
  borderRadius: 20,
  display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center',
  transition: 'all 0.25s ease',
  ...(preview
    ? { background: '#0a1409', border: '1px solid rgba(255,255,255,0.08)' }
    : { border: '2px dashed rgba(82,183,136,0.4)', background: '#f7fdf7', cursor: 'pointer' }
  ),
})

export const dropZoneHover = {
  enter: { borderColor: '#2d5a27', background: '#f0f9f0', boxShadow: '0 0 0 4px rgba(82,183,136,0.1)' },
  leave: { borderColor: 'rgba(82,183,136,0.4)', background: '#f7fdf7', boxShadow: 'none' },
}

export const previewBgImgStyle = {
  position: 'absolute', inset: 0,
  width: '100%', height: '100%',
  objectFit: 'cover',
  filter: 'blur(20px) brightness(0.35) saturate(0.7)',
  transform: 'scale(1.1)',
}

export const previewFgImgStyle = {
  position: 'relative', zIndex: 2,
  maxWidth: '85%', maxHeight: '85%',
  objectFit: 'contain',
  borderRadius: 14,
  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
}

export const loadedBadgeStyle = {
  position: 'absolute', bottom: 14, left: 14, zIndex: 10,
  display: 'flex', alignItems: 'center', gap: 7,
  padding: '6px 14px', borderRadius: 100,
  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
  border: '1px solid rgba(82,183,136,0.25)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
}

export const loadedBadgeDotStyle = (green3) => ({
  width: 7, height: 7, borderRadius: '50%',
  background: green3, boxShadow: `0 0 6px ${green3}`,
})

export const loadedBadgeTextStyle = (green1) => ({
  fontSize: 12, fontWeight: 600, color: green1,
})

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

export const emptyContentWrapStyle = {
  display: 'flex', flexDirection: 'column',
  alignItems: 'center', gap: 14,
  padding: '0 24px', textAlign: 'center',
}

export const emptyTitleStyle = (green1) => ({
  fontSize: 15, fontWeight: 700, color: green1, margin: 0,
})

export const emptySubStyle = (textMuted) => ({
  fontSize: 13, color: textMuted, margin: '4px 0 0 0',
})

export const emptyFormatsBadgeStyle = (green2) => ({
  padding: '4px 14px', borderRadius: 100, fontSize: 11,
  fontWeight: 600, color: green2,
  background: 'rgba(45,90,39,0.07)',
  border: '1px solid rgba(45,90,39,0.15)',
})

export const tipCardStyle = (border) => ({
  display: 'flex', gap: 10, alignItems: 'flex-start',
  padding: '12px 16px', borderRadius: 14,
  background: '#f0f9f0', border: `1px solid ${border}`,
})

export const tipIconWrapStyle = {
  width: 28, height: 28, borderRadius: 8,
  background: '#e8f5e9', display: 'flex',
  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
}

export const tipTitleStyle = (green1) => ({
  fontSize: 12, fontWeight: 600, color: green1, margin: 0,
})

export const tipBodyStyle = (textMuted) => ({
  fontSize: 12, color: textMuted, margin: '2px 0 0 0', lineHeight: 1.5,
})

export const selectBtnStyle = (green2) => ({
  width: '100%', padding: '13px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  background: green2, color: '#fff', border: 'none',
  borderRadius: 14, fontWeight: 600, fontSize: 14,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  cursor: 'pointer',
  boxShadow: '0 4px 16px rgba(45,90,39,0.2)',
  transition: 'transform 0.2s, box-shadow 0.2s',
})

export const selectBtnHover = {
  enter: { transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(45,90,39,0.28)' },
  leave: { transform: 'translateY(0)',    boxShadow: '0 4px 16px rgba(45,90,39,0.2)' },
}


export const changeBtnStyle = (border, green2) => ({
  padding: '12px 20px', display: 'flex', alignItems: 'center',
  justifyContent: 'center', gap: 7, flex: '1 1 auto',
  background: '#fff', color: green2,
  border: `1px solid ${border}`,
  borderRadius: 14, fontWeight: 600, fontSize: 13,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  cursor: 'pointer', transition: 'all 0.2s',
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
})

export const changeBtnHover = (border, green3) => ({
  enter: { background: '#f7fdf7', borderColor: green3 },
  leave: { background: '#fff',    borderColor: border },
})