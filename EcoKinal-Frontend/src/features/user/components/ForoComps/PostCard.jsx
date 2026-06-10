import { useState } from 'react'
import { useForoStore } from '../../store/useForoStore'
import Avatar from '../Avatar'
import CommentSection from './CommentSection'
import ImageLightbox from './ImageLightbox'

const TAG_STYLES = {
    Logro: { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', dot: '#F59E0B' },
    Pregunta: { bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD', dot: '#38BDF8' },
    Consejo: { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE', dot: '#A78BFA' },
    Noticia: { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3', dot: '#FB7185' },
}
const FALLBACK_TAG = { bg: '#eef1f9', color: '#23376d', border: 'rgba(35,55,109,0.15)', dot: '#eb7207' }

const REACTIONS = [
    { key: 'like', emoji: '👍', label: 'Me gusta', activeColor: '#E11D48', activeBg: '#FFEBEF', activeBorder: '#FDA4AF' },
    { key: 'love', emoji: '❤️', label: 'Me encanta', activeColor: '#E11D48', activeBg: '#FFEBEF', activeBorder: '#FDA4AF' },
    { key: 'haha', emoji: '😂', label: 'Jaja', activeColor: '#D97706', activeBg: '#FFFBEB', activeBorder: '#FDE68A' },
    { key: 'wow', emoji: '😮', label: 'Asombro', activeColor: '#7C3AED', activeBg: '#F5F3FF', activeBorder: '#DDD6FE' },
    { key: 'sad', emoji: '😢', label: 'Tristeza', activeColor: '#0369A1', activeBg: '#F0F9FF', activeBorder: '#BAE6FD' },
]

const totalReactions = (reactions = {}) =>
    Object.values(reactions).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0)

const myReaction = (reactions = {}, userId) => {
    for (const r of REACTIONS) {
        if (Array.isArray(reactions[r.key]) && reactions[r.key].includes(userId)) return r.key
    }
    return null
}

export default function PostCard({ post, currentUserId, currentUser, onToast }) {
    const { reactToPost, deletePost, updatePost } = useForoStore()

    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(post.title || '')
    const [editContent, setEditContent] = useState(post.content || '')

    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

    const postImages = post.photos?.length > 0
        ? post.photos
        : post.photo
            ? [post.photo]
            : []

    const [commentCount, setCommentCount] = useState(post.commentsCount ?? null)
    const [showReactionPicker, setShowReactionPicker] = useState(false)
    const [pickerTimeout, setPickerTimeout] = useState(null)

    const userId = String(currentUserId || currentUser?.uid || '')

    const [optimisticReactions, setOptimisticReactions] = useState(() => {
        const r = {}
        REACTIONS.forEach(({ key }) => {
            r[key] = Array.isArray(post.reactions?.[key]) ? [...post.reactions[key]] : []
        })
        return r
    })

    const currentMyReaction = myReaction(optimisticReactions, userId)
    const reactionsTotal = totalReactions(optimisticReactions)

    const handleReact = async (reactionKey) => {
        setShowReactionPicker(false)

        const isSame = currentMyReaction === reactionKey
        const newKey = isSame ? 'none' : reactionKey

        setOptimisticReactions(prev => {
            const next = {}
            REACTIONS.forEach(({ key }) => {
                next[key] = (prev[key] || []).filter(id => id !== userId)
            })
            if (newKey !== 'none') {
                next[newKey] = [...next[newKey], userId]
            }
            return next
        })

        try {
            await reactToPost(post._id, newKey)
        } catch {
            setOptimisticReactions(prev => {
                const next = {}
                REACTIONS.forEach(({ key }) => {
                    next[key] = (prev[key] || []).filter(id => id !== userId)
                })
                if (currentMyReaction) {
                    next[currentMyReaction] = [...next[currentMyReaction], userId]
                }
                return next
            })
            onToast?.('Error al registrar la reacción', 'error')
        }
    }

    const activeReactionMeta = REACTIONS.find(r => r.key === currentMyReaction)

    const isOwner = String(post.autorId) === String(currentUserId || currentUser?.uid)
    const displayName = isOwner
        ? (currentUser?.name || post._authorName || 'Usuario')
        : (post._authorName || 'Usuario')
    const displayPhoto = isOwner
        ? (currentUser?.photo || currentUser?.profilePicture || currentUser?.image || post._authorPhoto || null)
        : (post._authorPhoto || null)
    const displayInitials = isOwner
        ? (currentUser?.initials || displayName?.[0]?.toUpperCase() || 'U')
        : (post._authorName?.[0]?.toUpperCase() || 'U')

    const handleDelete = async () => {
        if (window.confirm('¿Seguro que deseas eliminar esta publicación?')) {
            const res = await deletePost(post._id)
            if (res?.success) {
                onToast?.('Publicación eliminada correctamente', 'success')
            } else {
                onToast?.(res?.message || 'Error al eliminar', 'error')
            }
        }
    }

    const handleUpdate = async () => {
        if (!editTitle.trim() || !editContent.trim()) {
            onToast?.('El título y contenido no pueden estar vacíos', 'error')
            return
        }
        const formData = new FormData()
        formData.append('title', editTitle)
        formData.append('content', editContent)
        const res = await updatePost(post._id, formData)
        if (res?.success) {
            setIsEditing(false)
            onToast?.('Publicación actualizada', 'success')
        } else {
            onToast?.(res?.message || 'Error al actualizar', 'error')
        }
    }

    const currentTag = TAG_STYLES[post.tag] || FALLBACK_TAG

    return (
        <>
            {lightboxOpen && postImages.length > 0 && (
                <ImageLightbox
                    src={postImages[lightboxImageIndex]}
                    alt={post.title}
                    onClose={() => setLightboxOpen(false)}
                />
            )}

            <div className="animate-fade-up" style={{
                background: '#fff', borderRadius: 24, border: '0.5px solid rgba(35,55,109,0.15)',
                padding: '20px', display: 'flex', flexDirection: 'column', gap: 14,
                boxShadow: '0 4px 20px rgba(35,55,109,0.02)',
                /* Evita que el card se desborde en móvil */
                minWidth: 0, boxSizing: 'border-box',
            }}>

                {/* ── Header ── */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
                        <div style={{ flexShrink: 0 }}>
                            <Avatar name={displayName} image={displayPhoto} initials={displayInitials} size={42} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName}</span>
                            <span style={{ fontSize: 11, color: '#4b5a8a' }}>
                                {post.createdAt
                                    ? new Date(post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                                    : ''}
                            </span>
                        </div>
                    </div>

                    {/* Tag — se encoge si no hay espacio */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 12, background: currentTag.bg, color: currentTag.color, border: `0.5px solid ${currentTag.border}`, fontSize: 11, fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: currentTag.dot, flexShrink: 0 }} />
                        {post.tag || 'General'}
                    </div>
                </div>

                {/* ── Contenido / Edición ── */}
                {isEditing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <input
                            value={editTitle} onChange={e => setEditTitle(e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(35,55,109,0.15)', outline: 'none', fontSize: 14, fontWeight: 700, color: '#111827', boxSizing: 'border-box' }}
                        />
                        <textarea
                            value={editContent} onChange={e => setEditContent(e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(35,55,109,0.15)', outline: 'none', fontSize: 13, color: '#4b5a8a', minHeight: 80, resize: 'vertical', boxSizing: 'border-box' }}
                        />
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setIsEditing(false)} style={{ padding: '6px 14px', borderRadius: 10, border: '1px solid rgba(35,55,109,0.15)', background: 'transparent', color: '#23376d', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
                            <button onClick={handleUpdate} style={{ padding: '6px 14px', borderRadius: 10, border: 'none', background: '#23376d', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Guardar</button>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#111827', lineHeight: 1.3, wordBreak: 'break-word' }}>{post.title}</h3>
                        <p style={{ margin: 0, fontSize: 13, color: '#4b5a8a', lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{post.content}</p>
                        {post.hashtags?.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                                {post.hashtags.map(tag => (
                                    <span key={tag} style={{ fontSize: 11, fontWeight: 600, color: '#23376d', background: '#eef1f9', borderRadius: 8, padding: '2px 8px' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── Grid Estático de Imágenes ── */}
                {postImages.length > 0 && !isEditing && (
                    <div style={{
                        display: 'grid',
                        gap: 6,
                        gridTemplateColumns: postImages.length === 1 ? '1fr' : 'repeat(2, 1fr)',
                        width: '100%',
                        borderRadius: 18,
                        overflow: 'hidden',
                    }}>
                        {postImages.slice(0, 4).map((img, index) => {
                            const isThreeImagesFirst = postImages.length === 3 && index === 0
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setLightboxImageIndex(index)
                                        setLightboxOpen(true)
                                    }}
                                    style={{
                                        position: 'relative',
                                        gridColumn: isThreeImagesFirst ? 'span 2' : 'span 1',
                                        /*
                                         * Aspect ratio fijo: no usamos window.innerWidth para evitar
                                         * problemas de hidratación / re-render. El CSS media query
                                         * en el <style> se encarga del breakpoint.
                                         * 1 imagen  → 16/9  (buena proporción en cualquier ancho)
                                         * primera de 3 → 16/7 (más panorámica pero sin exagerar)
                                         * resto → 1/1 (cuadrado, seguro en móvil)
                                         */
                                        aspectRatio: postImages.length === 1
                                            ? '16/9'
                                            : isThreeImagesFirst
                                                ? '16/7'
                                                : '1/1',
                                        cursor: 'zoom-in',
                                        overflow: 'hidden',
                                        borderRadius: 14,
                                        border: '0.5px solid rgba(35,55,109,0.12)',
                                        background: '#f3f4f6',
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`Imagen ${index + 1}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />

                                    {/* Indicador de más imágenes si exceden de 4 */}
                                    {index === 3 && postImages.length > 4 && (
                                        <div style={{
                                            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', fontSize: 18, fontWeight: 700,
                                        }}>
                                            +{postImages.length - 4}
                                        </div>
                                    )}

                                    {/* Etiqueta Ampliar discreta */}
                                    <div style={{
                                        position: 'absolute', bottom: 8, right: 8,
                                        background: 'rgba(0,0,0,0.5)', borderRadius: 6,
                                        padding: '3px 6px', display: 'flex', alignItems: 'center', gap: 4,
                                        color: '#fff', fontSize: 10, pointerEvents: 'none',
                                    }}>
                                        <svg viewBox="0 0 24 24" fill="none" style={{ width: 10, height: 10 }} stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                                        </svg>
                                        Ampliar
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* ── Resumen de reacciones ── */}
                {reactionsTotal > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 4 }}>
                        <div style={{ display: 'flex', gap: 2 }}>
                            {REACTIONS.filter(r => optimisticReactions[r.key]?.length > 0).map(r => (
                                <span key={r.key} style={{ fontSize: 14 }}>{r.emoji}</span>
                            ))}
                        </div>
                        <span style={{ fontSize: 12, color: '#80A153' }}>{reactionsTotal}</span>
                    </div>
                )}

                {/* ── Footer ── */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '0.5px solid #F1F7E8',
                    paddingTop: 12,
                    marginTop: 4,
                    gap: 8,
                    flexWrap: 'wrap', /* en pantallas muy pequeñas los botones bajan */
                }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>

                        {/* ── Botón de reacción con picker ── */}
                        <div
                            style={{ position: 'relative' }}
                            onMouseEnter={() => {
                                clearTimeout(pickerTimeout)
                                setShowReactionPicker(true)
                            }}
                            onMouseLeave={() => {
                                setPickerTimeout(setTimeout(() => setShowReactionPicker(false), 300))
                            }}
                        >
                            {/* Picker flotante */}
                            {showReactionPicker && (
                                <div className="animate-fade-up" style={{
                                    position: 'absolute', bottom: 'calc(100% + 8px)', left: 0,
                                    display: 'flex', gap: 4, padding: '8px 10px',
                                    background: '#fff', borderRadius: 16, border: '0.5px solid rgba(35,55,109,0.15)',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)', zIndex: 10,
                                    whiteSpace: 'nowrap',
                                }}>
                                    {REACTIONS.map(r => (
                                        <button
                                            key={r.key}
                                            onClick={() => handleReact(r.key)}
                                            title={r.label}
                                            style={{
                                                background: currentMyReaction === r.key ? r.activeBg : 'transparent',
                                                border: `0.5px solid ${currentMyReaction === r.key ? r.activeBorder : 'transparent'}`,
                                                borderRadius: 10, padding: '4px 8px', cursor: 'pointer',
                                                fontSize: 20, lineHeight: 1,
                                                transition: 'transform 0.15s',
                                                transform: 'scale(1)',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.3)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            {r.emoji}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Botón principal de reacción */}
                            <button
                                onClick={() => handleReact(currentMyReaction || 'like')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '8px 12px', borderRadius: 14,
                                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                    background: activeReactionMeta ? activeReactionMeta.activeBg : '#eef1f9',
                                    color: activeReactionMeta ? activeReactionMeta.activeColor : '#23376d',
                                    border: `0.5px solid ${activeReactionMeta ? activeReactionMeta.activeBorder : 'rgba(35,55,109,0.15)'}`,
                                    whiteSpace: 'nowrap',
                                }}
                                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.94)'}
                                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {activeReactionMeta
                                    ? <span style={{ fontSize: 15 }}>{activeReactionMeta.emoji}</span>
                                    : (
                                        <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    )
                                }
                                <span>{activeReactionMeta ? activeReactionMeta.label : 'Reaccionar'}</span>
                            </button>
                        </div>

                        {/* ── Botón comentarios ── */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 14,
                                fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                                background: isExpanded ? '#3B6D11' : '#fff',
                                color: isExpanded ? '#fff' : '#639922',
                                border: `0.5px solid ${isExpanded ? '#3B6D11' : '#C0DD97'}`,
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                            </svg>
                            {commentCount !== null
                                ? <span>{commentCount} {commentCount === 1 ? 'comentario' : 'comentarios'}</span>
                                : <span>Comentarios</span>
                            }
                            <svg viewBox="0 0 24 24" fill="none"
                                style={{ width: 12, height: 12, transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                                stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>

                    {isOwner && !isEditing && (
                        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                            <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', color: '#80A153' }} title="Editar">
                                <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                            <button onClick={handleDelete} style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', color: '#E11D48' }} title="Eliminar">
                                <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Sección de comentarios ── */}
                {isExpanded && (
                    <div style={{ borderTop: '0.5px solid #F1F7E8', paddingTop: 16, marginTop: 4 }}>
                        <CommentSection
                            postId={post._id}
                            currentUserId={currentUserId || currentUser?.uid}
                            currentUser={currentUser}
                            onToast={onToast}
                            onCommentCountChange={setCommentCount}
                        />
                    </div>
                )}
            </div>
        </>
    )
}