
export const C = {
  green1:      '#21491e',
  green2:      '#2B5F2A',
  greenLight:  '#EEF3ED',
  bgComment:   '#f8faf7',
  border:      'rgba(43, 95, 42, 0.15)',
  textDark:    '#111827',
  textMuted:   '#4b5a8a',
  textDanger:  '#791F1F',
}

export const S = {
  // Burbuja de comentario raíz
  commentBubble: {
    display: 'flex', gap: 8, alignItems: 'flex-start',
    background: '#f8faf7',
    padding: '10px 12px', borderRadius: 16,
    minWidth: 0, boxSizing: 'border-box',
  },

  // Burbuja de reply (override sobre commentBubble)
  replyBubble: {
    background: '#EEF3ED',
    borderLeft: `2px solid rgba(43, 95, 42, 0.15)`,
    marginLeft: 'clamp(12px, 4vw, 28px)',
  },

  // Input area (textarea + avatar + send)
  inputWrapper: {
    display: 'flex', gap: 8, alignItems: 'center',
    background: '#fff', borderRadius: 16,
    border: `0.5px solid rgba(43, 95, 42, 0.15)`,
    padding: '6px 10px',
  },

  textarea: {
    flex: 1, border: 'none', outline: 'none', background: 'transparent',
    fontSize: 13, color: '#111827', resize: 'none', maxHeight: 96,
    padding: '4px 0', fontFamily: 'inherit', minWidth: 0,
  },

  // Botón enviar (activo / inactivo se aplican en el componente)
  sendBtn: {
    width: 28, height: 28, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, border: 'none', transition: 'all 0.2s',
  },

  // Chip "respondiendo a"
  replyChip: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '4px 10px', background: '#EEF3ED', borderRadius: 8,
    border: `0.5px solid rgba(43, 95, 42, 0.15)`, gap: 8,
  },

  // Toast de reto
  retoToast: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 14px', borderRadius: 12,
    background: '#21491e', color: 'white',
    fontSize: 13, fontWeight: 600, lineHeight: 1.4,
    animation: 'retoToastIn .3s cubic-bezier(0.16,1,0.3,1)',
    marginBottom: 8,
  },

  // Skeleton de comentario
  skeletonAvatar: {
    width: 32, height: 32, borderRadius: 10,
    background: '#EEF3ED', flexShrink: 0,
    animation: 'shimmer 1.4s infinite linear',
    backgroundImage: 'linear-gradient(90deg,#EEF3ED 25%,rgba(43,95,42,0.15) 50%,#EEF3ED 75%)',
    backgroundSize: '400px 100%',
  },
}