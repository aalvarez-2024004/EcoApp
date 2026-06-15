export const TAG_STYLES = {
    Logro: { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', dot: '#F59E0B' },
    Pregunta: { bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD', dot: '#38BDF8' },
    Consejo: { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE', dot: '#A78BFA' },
    Noticia: { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3', dot: '#FB7185' },
}
export const FALLBACK_TAG = { bg: '#eef1f9', color: '#23376d', border: 'rgba(35,55,109,0.15)', dot: '#eb7207' }

export const REACTIONS = [
    { key: 'like', emoji: '👍', label: 'Me gusta', activeColor: '#E11D48', activeBg: '#FFEBEF', activeBorder: '#FDA4AF' },
    { key: 'love', emoji: '❤️', label: 'Me encanta', activeColor: '#E11D48', activeBg: '#FFEBEF', activeBorder: '#FDA4AF' },
    { key: 'haha', emoji: '😂', label: 'Jaja', activeColor: '#D97706', activeBg: '#FFFBEB', activeBorder: '#FDE68A' },
    { key: 'wow', emoji: '😮', label: 'Asombro', activeColor: '#7C3AED', activeBg: '#F5F3FF', activeBorder: '#DDD6FE' },
    { key: 'sad', emoji: '😢', label: 'Tristeza', activeColor: '#0369A1', activeBg: '#F0F9FF', activeBorder: '#BAE6FD' },
]

export const totalReactions = (reactions = {}) =>
    Object.values(reactions).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0)

export const myReaction = (reactions = {}, userId) => {
    for (const r of REACTIONS) {
        if (Array.isArray(reactions[r.key]) && reactions[r.key].includes(userId)) return r.key
    }
    return null
}