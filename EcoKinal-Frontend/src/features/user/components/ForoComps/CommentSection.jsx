import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios' 
import { completarRetoPorAccion } from '../../../../shared/Gamificacion'
import Avatar from '../Avatar'

const FORO_BASE = import.meta.env.VITE_FORO_URL || 'http://localhost:3006/ForoEcoKinal/v1'
const ForoApi = axios.create({ baseURL: FORO_BASE })

ForoApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function CommentSection({ postId, currentUserId, currentUser, onToast, onCommentCountChange }) {
    const [comments,        setComments]        = useState([])
    const [loadingComments, setLoadingComments] = useState(false)
    const [commentText,     setCommentText]     = useState('')
    
    // ── Estados para Edición y Respuestas ─────────────────────────────────────
    const [editingCommentId,   setEditingCommentId]   = useState(null)
    const [editingCommentText, setEditingCommentText] = useState('')
    const [replyingTo,         setReplyingTo]         = useState(null) // { id, name }
    
    const textRef = useRef(null)

    const loadComments = useCallback(async () => {
        setLoadingComments(true)
        try {
            const { data } = await ForoApi.get(`/comments/get/${postId}`)
            const list = data.comments || (Array.isArray(data) ? data : [])
            setComments(list)
            const total = list.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)
            onCommentCountChange?.(total)
        } catch {
            setComments([])
            onCommentCountChange?.(0)
        } finally {
            setLoadingComments(false)
        }
    }, [postId, onCommentCountChange])

    useEffect(() => { loadComments() }, [loadComments])

    const handleSubmitComment = async () => {
        if (!commentText.trim()) return
        try {
            await ForoApi.post('/comments/add', {
                content: commentText.trim(),
                publicationId: postId,
                parentCommentId: replyingTo ? replyingTo.id : undefined 
            })
            setCommentText('')
            setReplyingTo(null)
            loadComments()
            onToast?.('Comentario publicado', 'success')
            completarRetoPorAccion('foro_comentar')
        } catch (err) {
            onToast?.(err.response?.data?.message || 'Error al comentar', 'error')
        }
    }

    const handleUpdateComment = async (id) => {
        if (!editingCommentText.trim()) return
        try {
            await ForoApi.put(`/comments/update/${id}`, { content: editingCommentText.trim() })
            setEditingCommentId(null)
            loadComments()
            onToast?.('Comentario actualizado', 'success')
        } catch (err) {
            onToast?.(err.response?.data?.message || 'Error al actualizar', 'error')
        }
    }

    const handleDeleteComment = async (id) => {
        if (!window.confirm('¿Deseas eliminar este comentario?')) return
        try {
            await ForoApi.delete(`/comments/delete/${id}`)
            loadComments()
            onToast?.('Comentario eliminado', 'success')
        } catch (err) {
            onToast?.(err.response?.data?.message || 'Error al eliminar', 'error')
        }
    }

    const resolveAuthor = (comment) => {
        const isOwner = String(comment.autorId) === String(currentUserId)
        if (isOwner) {
            return {
                name:     currentUser?.name     || comment._authorName  || 'Usuario',
                photo:    currentUser?.photo    || currentUser?.profilePicture || currentUser?.image || comment._authorPhoto || null,
                initials: currentUser?.initials || (currentUser?.name?.[0]?.toUpperCase()) || 'U',
            }
        }
        return {
            name:     comment._authorName || 'Usuario',
            photo:    comment._authorPhoto || null,
            initials: comment._authorName?.[0]?.toUpperCase() || 'U',
        }
    }

    const currentAvatar = {
        name:     currentUser?.name     || 'Usuario',
        photo:    currentUser?.photo    || currentUser?.profilePicture || currentUser?.image || null,
        initials: currentUser?.initials || currentUser?.name?.[0]?.toUpperCase() || 'U',
    }

    const renderComment = (comment, isReply = false, rootId = null) => {
        const isCommentOwner = String(comment.autorId) === String(currentUserId)
        const author         = resolveAuthor(comment)
        const targetReplyId  = rootId || comment._id

        return (
            <div key={comment._id} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                background: isReply ? '#EEF3ED' : '#f8faf7', // Fondos menta suaves adaptados a la paleta
                padding: '10px 14px', borderRadius: 16,
                marginLeft: isReply ? 28 : 0,
                borderLeft: isReply ? '2px solid rgba(43, 95, 42, 0.15)' : 'none', // Borde verde sutil
            }}>
                <Avatar name={author.name} image={author.photo} initials={author.initials} size={32} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{author.name}</span>
                        <span style={{ fontSize: 10, color: '#4b5a8a' }}>
                            {comment.createdAt
                                ? new Date(comment.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                                : ''}
                        </span>
                    </div>

                    {editingCommentId === comment._id ? (
                        <div style={{ display: 'flex', gap: 6, marginTop: 4, width: '100%' }}>
                            <input
                                value={editingCommentText}
                                onChange={e => setEditingCommentText(e.target.value)}
                                style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(43, 95, 42, 0.15)', fontSize: 12, outline: 'none', background: '#fff' }}
                            />
                            <button onClick={() => handleUpdateComment(comment._id)} style={{ padding: '4px 10px', background: '#2B5F2A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>OK</button>
                            <button onClick={() => setEditingCommentId(null)} style={{ padding: '4px 10px', background: 'transparent', border: '1px solid rgba(43, 95, 42, 0.15)', color: '#2B5F2A', borderRadius: 8, fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>X</button>
                        </div>
                    ) : (
                        <p style={{ margin: 0, fontSize: 12, color: '#4b5a8a', lineHeight: 1.4 }}>{comment.content}</p>
                    )}

                    {editingCommentId !== comment._id && (
                        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                            <button 
                                onClick={() => { 
                                    setReplyingTo({ id: targetReplyId, name: author.name }); 
                                    textRef.current?.focus(); 
                                }} 
                                style={{ background: 'none', border: 'none', fontSize: 11, color: '#2B5F2A', padding: 0, cursor: 'pointer', fontWeight: 600 }}
                            >
                                Responder
                            </button>
                            
                            {isCommentOwner && (
                                <>
                                    <button onClick={() => { setEditingCommentId(comment._id); setEditingCommentText(comment.content) }} style={{ background: 'none', border: 'none', fontSize: 11, color: '#4b5a8a', padding: 0, cursor: 'pointer' }}>Editar</button>
                                    <button onClick={() => handleDeleteComment(comment._id)} style={{ background: 'none', border: 'none', fontSize: 11, color: '#791F1F', padding: 0, cursor: 'pointer' }}>Eliminar</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* ── Lista de comentarios ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 400, overflowY: 'auto', paddingRight: 4 }}>
                {loadingComments ? (
                    <>
                        {[1, 2].map(i => (
                            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: '#f8faf7', borderRadius: 16 }}>
                                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EEF3ED', flexShrink: 0, animation: 'shimmer 1.4s infinite linear', backgroundImage: 'linear-gradient(90deg,#EEF3ED 25%,rgba(43, 95, 42, 0.15) 50%,#EEF3ED 75%)', backgroundSize: '400px 100%' }} />
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 2 }}>
                                    <div style={{ height: 10, width: '35%', borderRadius: 5, background: '#EEF3ED' }} />
                                    <div style={{ height: 9,  width: '80%', borderRadius: 5, background: '#EEF3ED' }} />
                                </div>
                            </div>
                        ))}
                    </>
                ) : comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment._id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {renderComment(comment, false, comment._id)}
                            {comment.replies?.map(reply => renderComment(reply, true, comment._id))}
                        </div>
                    ))
                ) : (
                    <span style={{ fontSize: 12, color: '#4b5a8a', textAlign: 'center', padding: '10px 0' }}>
                        No hay comentarios aún. ¡Sé el primero!
                    </span>
                )}
            </div>

            {/* ── Input nuevo comentario ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                
                {replyingTo && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 10px', background: '#EEF3ED', borderRadius: 8, border: '0.5px solid rgba(43, 95, 42, 0.15)' }}>
                        <span style={{ fontSize: 11, color: '#2B5F2A', fontWeight: 500 }}>
                            Respondiendo a <strong>{replyingTo.name}</strong>
                        </span>
                        <button onClick={() => setReplyingTo(null)} style={{ background: 'transparent', border: 'none', color: '#2B5F2A', fontSize: 12, cursor: 'pointer', fontWeight: 'bold' }}>
                            ✕
                        </button>
                    </div>
                )}

                <div style={{
                    display: 'flex', gap: 10, alignItems: 'center',
                    background: '#fff', borderRadius: 16, border: '0.5px solid rgba(43, 95, 42, 0.15)', padding: '6px 12px',
                }}>
                    <Avatar name={currentAvatar.name} image={currentAvatar.photo} initials={currentAvatar.initials} size={28} />
                    <textarea
                        ref={textRef}
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmitComment() } }}
                        placeholder={replyingTo ? "Escribe tu respuesta..." : "Escribe un comentario..."}
                        style={{
                            flex: 1, border: 'none', outline: 'none', background: 'transparent',
                            fontSize: 13, color: '#111827', resize: 'none', maxHeight: 96,
                            padding: '4px 0', fontFamily: 'inherit',
                        }}
                    />
                    <button
                        onClick={handleSubmitComment}
                        disabled={!commentText.trim()}
                        style={{
                            width: 28, height: 28, borderRadius: 10,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            border: 'none', cursor: commentText.trim() ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s',
                            background: commentText.trim() ? '#2B5F2A' : '#EEF3ED',
                            color:      commentText.trim() ? '#fff'    : '#4b5a8a',
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }} stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}