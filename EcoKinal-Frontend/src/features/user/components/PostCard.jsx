import { useState } from 'react'
import { useForoStore } from '../store/useForoStore'
import Avatar from './Avatar'
import CommentSection from './CommentSection'

const TAG_STYLES = {
    Logro: { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', dot: '#F59E0B' },
    Pregunta: { bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD', dot: '#38BDF8' },
    Consejo: { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE', dot: '#A78BFA' },
    Noticia: { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3', dot: '#FB7185' },
}

const FALLBACK_TAG = { bg: '#F1F7E8', color: '#639922', border: '#C0DD97', dot: '#97C459' }

export default function PostCard({ post, currentUserId, currentUser, onToast }) {
    const { toggleLikePost, deletePost, updatePost } = useForoStore()
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(post.title || '')
    const [editContent, setEditContent] = useState(post.content || '')

    const hasLiked = Array.isArray(post.likes) && post.likes.includes(String(currentUserId || currentUser?.uid || ''))

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

    const handleLikeClick = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        await toggleLikePost(post._id)
    }

    const handleDelete = async () => {
        if (window.confirm('¿Seguro que deseas eliminar esta publicación?')) {
            const res = await deletePost(post._id)
            if (res?.success) {
                if (onToast) onToast('Publicación eliminada correctamente', 'success')
            } else {
                if (onToast) onToast(res?.message || 'Error al eliminar', 'error')
            }
        }
    }

    const handleUpdate = async () => {
        if (!editTitle.trim() || !editContent.trim()) {
            if (onToast) onToast('El título y contenido no pueden estar vacíos', 'error')
            return
        }

        const formData = new FormData()
        formData.append('title', editTitle)
        formData.append('content', editContent)

        const res = await updatePost(post._id, formData)
        if (res?.success) {
            setIsEditing(false)
            if (onToast) onToast('Publicación actualizada', 'success')
        } else {
            if (onToast) onToast(res?.message || 'Error al actualizar', 'error')
        }
    }

    const currentTag = TAG_STYLES[post.tag] || FALLBACK_TAG

    return (
        <div className="animate-fade-up" style={{ background: '#fff', borderRadius: 24, border: '0.5px solid #C0DD97', padding: '20px', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 4px 20px rgba(99,153,34,0.02)' }}>

            {/* Header del Post */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {/* Usamos displayName/displayPhoto que ya resuelven al usuario real */}
                    <Avatar name={displayName} image={displayPhoto} initials={displayInitials} size={42} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#173404' }}>{displayName}</span>
                        <span style={{ fontSize: 11, color: '#80A153' }}>
                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 12, background: currentTag.bg, color: currentTag.color, border: `0.5px solid ${currentTag.border}`, fontSize: 11, fontWeight: 700 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: currentTag.dot }} />
                        {post.tag || 'General'}
                    </div>
                </div>
            </div>

            {/* Contenido / Edición */}
            {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1px solid #C0DD97', outline: 'none', fontSize: 14, fontWeight: 700, color: '#173404' }} />
                    <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: '1px solid #C0DD97', outline: 'none', fontSize: 13, color: '#415A2B', minHeight: 80, resize: 'vertical' }} />
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button onClick={() => setIsEditing(false)} style={{ padding: '6px 14px', borderRadius: 10, border: '1px solid #C0DD97', background: 'transparent', color: '#639922', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
                        <button onClick={handleUpdate} style={{ padding: '6px 14px', borderRadius: 10, border: 'none', background: '#3B6D11', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Guardar</button>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#173404', lineHeight: 1.3 }}>{post.title}</h3>
                    <p style={{ margin: 0, fontSize: 13, color: '#415A2B', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{post.content}</p>
                </div>
            )}

            {post.photo && !isEditing && (
                <div style={{ width: '100%', borderRadius: 18, overflow: 'hidden', border: '0.5px solid #EAF3DE', maxHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F7E8' }}>
                    <img src={post.photo} alt="Publicación" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            )}

            {/* Footer de Interacciones */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '0.5px solid #F1F7E8', paddingTop: 12, marginTop: 4 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={handleLikeClick}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 14,
                            fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease',
                            background: hasLiked ? '#FFEBEF' : '#F1F7E8',
                            color: hasLiked ? '#E11D48' : '#639922',
                            border: `0.5px solid ${hasLiked ? '#FDA4AF' : '#C0DD97'}`
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill={hasLiked ? 'currentColor' : 'none'} style={{ width: 16, height: 16, transform: hasLiked ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s ease' }} stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <span>{Array.isArray(post.likes) ? post.likes.length : 0}</span>
                    </button>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 14,
                            fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                            background: isExpanded ? '#3B6D11' : '#fff',
                            color: isExpanded ? '#fff' : '#639922',
                            border: `0.5px solid ${isExpanded ? '#3B6D11' : '#C0DD97'}`
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                        <span>Comentarios</span>
                        <svg viewBox="0 0 24 24" fill="none" style={{ width: 12, height: 12, transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>

                {isOwner && !isEditing && (
                    <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', color: '#80A153' }} title="Editar">
                            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                        </button>
                        <button onClick={handleDelete} style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', color: '#E11D48' }} title="Eliminar">
                            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                        </button>
                    </div>
                )}
            </div>

            {isExpanded && (
                <div style={{ borderTop: '0.5px solid #F1F7E8', paddingTop: 16, marginTop: 4 }}>
                    <CommentSection postId={post._id} currentUserId={currentUserId || currentUser?.uid} currentUser={currentUser} onToast={onToast} />
                </div>
            )}
        </div>
    )
}