import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import Avatar from './Avatar'
import { completarRetoPorAccion } from '../../../shared/Gamificacion'

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
                // Si estamos respondiendo, enviamos el ID del comentario padre
                parentCommentId: replyingTo ? replyingTo.id : undefined 
            })
            setCommentText('')
            setReplyingTo(null) // Limpiamos el estado al enviar
            loadComments()
            onToast?.('Comentario publicado', 'success')
            // Completar reto de comentar en el foro automáticamente
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

    // ── Renderizar un comentario (raíz o reply) ───────────────────────────────
    // Añadimos rootId para que las respuestas a respuestas se mantengan en el mismo nivel visual
    const renderComment = (comment, isReply = false, rootId = null) => {
        const isCommentOwner = String(comment.autorId) === String(currentUserId)
        const author         = resolveAuthor(comment)
        const targetReplyId  = rootId || comment._id // Forzamos el ID padre para evitar nidos rotos

        return (
            <div key={comment._id} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                background: isReply ? '#EAF3DE' : '#F1F7E8',
                padding: '10px 14px', borderRadius: 16,
                marginLeft: isReply ? 28 : 0,
                borderLeft: isReply ? '2px solid #C0DD97' : 'none',
            }}>
                <Avatar name={author.name} image={author.photo} initials={author.initials} size={32} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#173404' }}>{author.name}</span>
                        <span style={{ fontSize: 10, color: '#80A153' }}>
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
                                style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid #C0DD97', fontSize: 12, outline: 'none' }}
                            />
                            <button onClick={() => handleUpdateComment(comment._id)} style={{ padding: '4px 10px', background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 8, fontSize: 11, cursor: 'pointer' }}>OK</button>
                            <button onClick={() => setEditingCommentId(null)} style={{ padding: '4px 10px', background: 'transparent', border: '1px solid #C0DD97', color: '#639922', borderRadius: 8, fontSize: 11, cursor: 'pointer' }}>X</button>
                        </div>
                    ) : (
                        <p style={{ margin: 0, fontSize: 12, color: '#415A2B', lineHeight: 1.4 }}>{comment.content}</p>
                    )}

                    {/* ── Acciones del comentario ── */}
                    {editingCommentId !== comment._id && (
                        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                            <button 
                                onClick={() => { 
                                    setReplyingTo({ id: targetReplyId, name: author.name }); 
                                    textRef.current?.focus(); 
                                }} 
                                style={{ background: 'none', border: 'none', fontSize: 11, color: '#639922', padding: 0, cursor: 'pointer', fontWeight: 600 }}
                            >
                                Responder
                            </button>
                            
                            {isCommentOwner && (
                                <>
                                    <button onClick={() => { setEditingCommentId(comment._id); setEditingCommentText(comment.content) }} style={{ background: 'none', border: 'none', fontSize: 11, color: '#80A153', padding: 0, cursor: 'pointer' }}>Editar</button>
                                    <button onClick={() => handleDeleteComment(comment._id)} style={{ background: 'none', border: 'none', fontSize: 11, color: '#E11D48', padding: 0, cursor: 'pointer' }}>Eliminar</button>
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
                            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: '#F1F7E8', borderRadius: 16 }}>
                                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#D6EABC', flexShrink: 0, animation: 'shimmer 1.4s infinite linear', backgroundImage: 'linear-gradient(90deg,#D6EABC 25%,#C0DD97 50%,#D6EABC 75%)', backgroundSize: '400px 100%' }} />
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 2 }}>
                                    <div style={{ height: 10, width: '35%', borderRadius: 5, background: '#D6EABC' }} />
                                    <div style={{ height: 9,  width: '80%', borderRadius: 5, background: '#D6EABC' }} />
                                </div>
                            </div>
                        ))}
                    </>
                ) : comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment._id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {/* Comentario raíz */}
                            {renderComment(comment, false, comment._id)}
                            {/* Respuestas anidadas */}
                            {comment.replies?.map(reply => renderComment(reply, true, comment._id))}
                        </div>
                    ))
                ) : (
                    <span style={{ fontSize: 12, color: '#80A153', textAlign: 'center', padding: '10px 0' }}>
                        No hay comentarios aún. ¡Sé el primero!
                    </span>
                )}
            </div>

            {/* ── Input nuevo comentario ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                
                {/* Indicador de que estás respondiendo */}
                {replyingTo && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 10px', background: '#EAF3DE', borderRadius: 8, border: '0.5px solid #C0DD97' }}>
                        <span style={{ fontSize: 11, color: '#3B6D11' }}>
                            Respondiendo a <strong>{replyingTo.name}</strong>
                        </span>
                        <button onClick={() => setReplyingTo(null)} style={{ background: 'transparent', border: 'none', color: '#639922', fontSize: 12, cursor: 'pointer', fontWeight: 'bold' }}>
                            ✕
                        </button>
                    </div>
                )}

                <div style={{
                    display: 'flex', gap: 10, alignItems: 'center',
                    background: '#fff', borderRadius: 16, border: '0.5px solid #C0DD97', padding: '6px 12px',
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
                            fontSize: 13, color: '#173404', resize: 'none', maxHeight: 96,
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
                            background: commentText.trim() ? '#3B6D11' : '#EAF3DE',
                            color:      commentText.trim() ? '#fff'    : '#97C459',
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