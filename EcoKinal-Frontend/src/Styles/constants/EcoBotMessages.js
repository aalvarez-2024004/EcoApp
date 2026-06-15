export const styles = {
  // Fuente principal
  fontFamily: "'Plus Jakarta Sans', sans-serif",

  // Burbuja del bot
  botBubble: {
    background: '#f0f8f0',
    border: `1px solid #ddeedd`,
    borderRadius: '4px 18px 18px 18px',
    padding: '11px 15px',
    maxWidth: '78%',
    fontSize: 13.5,
    color: '#1b3c1a',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

  // Burbuja del usuario
  userBubble: {
    background: '#2d5a27',
    borderRadius: '18px 4px 18px 18px',
    padding: '11px 15px',
    maxWidth: '78%',
    fontSize: 13.5,
    color: 'white',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
  },

  // Avatar del bot (shared entre BotBubble y TypingIndicator)
  botAvatar: {
    width: 30, height: 30,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2d5a27 0%, #3d7a35 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(45,90,39,0.20)',
  },

  // Avatar del usuario
  userAvatar: {
    width: 30, height: 30,
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: 2,
    overflow: 'hidden',
    border: '1.5px solid #ddeedd',
  },

  // Banner de error
  errorBanner: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 14px', borderRadius: 12,
    background: '#fff5f5', border: '1px solid #ffdddd',
    color: '#dc2626', fontSize: 12.5, fontWeight: 600,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

  suggestionCard: {
    background: '#f7fdf7',
    border: '1px solid #ddeedd',
    borderRadius: 16,
    padding: '14px 16px',
    display: 'flex', flexDirection: 'column',
    gap: 6,
    cursor: 'default',
  },
}