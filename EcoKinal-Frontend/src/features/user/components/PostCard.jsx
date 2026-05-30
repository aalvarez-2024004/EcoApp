import { useState } from 'react'
import { useForoStore } from '../store/useForoStore'
import Avatar from './Avatar'
import CommentSection from './CommentSection'

// Mismos colores de etiquetas que definimos en ForoPage.jsx para consistencia
const TAG_STYLES = {
    Logro:    { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', dot: '#F59E0B' },
    Pregunta: { bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD', dot: '#38BDF8' },
    Consejo:  { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE', dot: '#A78BFA' },
    Noticia:  { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3', dot: '#FB7185' },
}

const FALLBACK_TAG = { bg: '#F1F7E8', color: '#639922', border: '#C0DD97', dot: '#97C459' }

export default function PostCard({ post, currentUserId, currentUser, onToast }) {
    const { toggleLikePost, deletePost, updatePost } = useForoStore()
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(post.title || '')
    const [editContent, setEditContent] = useState(post.content || '')

    const isMyPost = String(post.autorId) === String(currentUserId)
    const hasLiked = post.likes?.includes(currentUserId) || false

    const handleSavePost = async () => {
        if (!editTitle.trim() || !editContent.trim()) return
        const fd = new FormData()
        fd.append('title', editTitle.trim())
        fd.append('content', editContent.trim())
        
        const res = await updatePost(post._id, fd)
        if (res.success) {
            setIsEditing(false)
            if (onToast) onToast('Publicación actualizada correctamente')
        } else {
            if (onToast) onToast(res.message, 'error')
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de eliminar esta publicación del foro?')) return
        const res = await deletePost(post._id)
        if (res.success && onToast) onToast('Publicación eliminada')
    }

    const currentTagStyle = TAG_STYLES[post.tag] || FALLBACK_TAG

    return (
        <article style={{
            background: '#fff',
            borderRadius: 18,
            border: '0.5px solid #C0DD97',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            marginBottom: '1rem'
        }}>
            {/* Header */}
            <div style={{ padding: '20px 24px 12px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <Avatar 
                    image={post._authorImage || post.authorImage} 
                    initials={post._authorInitials || post.authorInitials || 'U'} 
                    size={42} 
                />
                
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 15, fontWeight: 800, color: '#173404', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {post._authorName || post.authorName || 'Usuario de EcoKinal'}
                        </span>
                        
                        {isMyPost && (
                            <span style={{
                                fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10,
                                background: '#F1F7E8', color: '#639922', border: '0.5px solid #C0DD97',
                                letterSpacing: '0.05em'
                            }}>
                                TÚ
                            </span>
                        )}
                        
                        {post.tag && (
                            <span style={{
                                fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 10,
                                background: currentTagStyle.bg, color: currentTagStyle.color, border: `0.5px solid ${currentTagStyle.border}`,
                                display: 'flex', alignItems: 'center', gap: 6
                            }}>
                                <span style={{ width: 5, height: 5, borderRadius: '50%', background: currentTagStyle.dot }} />
                                {post.tag}
                            </span>
                        )}
                    </div>
                    <span style={{ fontSize: 12, color: '#97C459', fontWeight: 500 }}>@comunidad_eco</span>
                </div>

                {/* Owner actions */}
                {isMyPost && !isEditing && (
                    <div style={{ display: 'flex', gap: 4 }}>
                        <button 
                            onClick={() => setIsEditing(true)} 
                            style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#639922', cursor: 'pointer', transition: 'all 0.2s' }}
                            title="Editar"
                        >
                            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                        </button>
                        <button 
                            onClick={handleDelete} 
                            style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#F09595', cursor: 'pointer', transition: 'all 0.2s' }}
                            title="Eliminar"
                        >
                            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Body */}
            <div style={{ padding: '0 24px 20px', flex: 1 }}>
                {isEditing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#FAFCF7', padding: 16, borderRadius: 14, border: '0.5px solid #C0DD97' }}>
                        <input 
                            value={editTitle} 
                            onChange={e => setEditTitle(e.target.value)} 
                            style={{ width: '100%', padding: '12px 14px', fontSize: 14, fontWeight: 700, border: '0.5px solid #C0DD97', borderRadius: 10, background: '#fff', color: '#173404', outline: 'none' }} 
                            placeholder="Título de la publicación"
                        />
                        <textarea 
                            value={editContent} 
                            onChange={e => setEditContent(e.target.value)} 
                            rows={3} 
                            style={{ width: '100%', padding: '12px 14px', fontSize: 14, border: '0.5px solid #C0DD97', borderRadius: 10, background: '#fff', color: '#27500A', resize: 'none', outline: 'none', lineHeight: 1.5 }} 
                            placeholder="Contenido..."
                        />
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button 
                                onClick={() => setIsEditing(false)} 
                                style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#639922', background: '#fff', border: '0.5px solid #C0DD97', borderRadius: 10, cursor: 'pointer' }}
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSavePost} 
                                style={{ padding: '8px 16px', fontSize: 12, fontWeight: 700, color: '#fff', background: '#3B6D11', border: 'none', borderRadius: 10, cursor: 'pointer' }}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#173404', margin: '0 0 8px 0', lineHeight: 1.3 }}>{post.title}</h3>
                        <p style={{ fontSize: 14, color: '#27500A', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>{post.content}</p>
                        {post.photo && (
                            <div style={{ marginTop: 16, borderRadius: 14, overflow: 'hidden', border: '0.5px solid #C0DD97', background: '#FAFCF7', maxHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={post.photo} alt="Publicación" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Actions bar */}
            <div style={{ padding: '14px 24px', background: '#FAFCF7', borderTop: '0.5px solid #C0DD97', display: 'flex', alignItems: 'center', gap: 12 }}>
                <button 
                    onClick={() => toggleLikePost(post._id)} 
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 12, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                        background: hasLiked ? '#C0DD97' : '#fff',
                        color: hasLiked ? '#173404' : '#639922',
                        border: `0.5px solid ${hasLiked ? '#97C459' : '#C0DD97'}`
                    }}
                >
                    <svg viewBox="0 0 24 24" fill={hasLiked ? 'currentColor' : 'none'} style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                    <span>{post.likes?.length || 0}</span>
                </button>
                
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 12, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                        background: isExpanded ? '#3B6D11' : '#fff',
                        color: isExpanded ? '#fff' : '#639922',
                        border: `0.5px solid ${isExpanded ? '#3B6D11' : '#C0DD97'}`
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" /></svg>
                    <span>Comentarios</span>
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 12, height: 12, marginLeft: 2 }} stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={isExpanded ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 8.25l-7.5 7.5-7.5-7.5"} />
                    </svg>
                </button>
            </div>

            {/* Comments panel */}
            {isExpanded && (
                <div style={{ background: '#FAFCF7', paddingBottom: 16 }}>
                    <CommentSection 
                        postId={post._id} 
                        currentUserId={currentUserId} 
                        currentUser={currentUser} 
                        onToast={onToast} 
                    />
                </div>
            )}
        </article>
    )
}