import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import Avatar from './Avatar'

const FORO_BASE = import.meta.env.VITE_FORO_URL || 'http://localhost:3006/ForoEcoKinal/v1'
const ForoApi = axios.create({ baseURL: FORO_BASE })

ForoApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function CommentSection({ postId, currentUserId, currentUser, onToast }) {
    const [comments, setComments] = useState([])
    const [loadingComments, setLoadingComments] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editingCommentText, setEditingCommentText] = useState('')
    const textRef = useRef(null)

    const loadComments = useCallback(async () => {
        setLoadingComments(true)
        try {
            const { data } = await ForoApi.get(`/comments/get/${postId}`)
            setComments(Array.isArray(data) ? data : [])
        } catch {
            setComments([])
        } finally {
            setLoadingComments(false)
        }
    }, [postId])

    useEffect(() => { loadComments() }, [loadComments])

    const handleSubmitComment = async () => {
        if (!commentText.trim()) return
        try {
            await ForoApi.post('/comments/add', {
                content: commentText.trim(),
                publicationId: postId
            })
            setCommentText('')
            loadComments()
            if (onToast) onToast('Comentario publicado', 'success')
        } catch (err) {
            if (onToast) onToast(err.response?.data?.message || 'Error al comentar', 'error')
        }
    }

    const handleUpdateComment = async (id) => {
        if (!editingCommentText.trim()) return
        try {
            await ForoApi.put(`/comments/update/${id}`, { content: editingCommentText.trim() })
            setEditingCommentId(null)
            loadComments()
            if (onToast) onToast('Comentario actualizado', 'success')
        } catch (err) {
            if (onToast) onToast(err.response?.data?.message || 'Error al actualizar', 'error')
        }
    }

    const handleDeleteComment = async (id) => {
        if (!window.confirm('¿Deseas eliminar este comentario?')) return
        try {
            await ForoApi.delete(`/comments/delete/${id}`)
            loadComments()
            if (onToast) onToast('Comentario eliminado', 'success')
        } catch (err) {
            if (onToast) onToast(err.response?.data?.message || 'Error al eliminar', 'error')
        }
    }

    const resolveAuthor = (comment) => {
        const isOwner = String(comment.autorId) === String(currentUserId)
        if (isOwner) {
            return {
                name: currentUser?.name || comment._authorName || 'Usuario',
                photo: currentUser?.photo || currentUser?.profilePicture || currentUser?.image || comment._authorPhoto || null,
                initials: currentUser?.initials || (currentUser?.name?.[0]?.toUpperCase()) || 'U'
            }
        }
        return {
            name: comment._authorName || 'Usuario',
            photo: comment._authorPhoto || null,
            initials: comment._authorName?.[0]?.toUpperCase() || 'U'
        }
    }

    const currentAvatar = {
        name: currentUser?.name || 'Usuario',
        photo: currentUser?.photo || currentUser?.profilePicture || currentUser?.image || null,
        initials: currentUser?.initials || currentUser?.name?.[0]?.toUpperCase() || 'U'
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Lista de Comentarios */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 320, overflowY: 'auto', paddingRight: 4 }}>
                {loadingComments ? (
                    <span style={{ fontSize: 12, color: '#80A153', textAlign: 'center' }}>Cargando comentarios...</span>
                ) : comments.length > 0 ? (
                    comments.map(comment => {
                        const isCommentOwner = String(comment.autorId) === String(currentUserId)
                        const author = resolveAuthor(comment)
                        return (
                            <div key={comment._id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#F1F7E8', padding: '10px 14px', borderRadius: 16 }}>
                                <Avatar name={author.name} image={author.photo} initials={author.initials} size={32} />
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: '#173404' }}>{author.name}</span>
                                        <span style={{ fontSize: 10, color: '#80A153' }}>
                                            {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''}
                                        </span>
                                    </div>

                                    {editingCommentId === comment._id ? (
                                        <div style={{ display: 'flex', gap: 6, marginTop: 4, width: '100%' }}>
                                            <input value={editingCommentText} onChange={(e) => setEditingCommentText(e.target.value)} style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid #C0DD97', fontSize: 12 }} />
                                            <button onClick={() => handleUpdateComment(comment._id)} style={{ padding: '4px 10px', background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 8, fontSize: 11, cursor: 'pointer' }}>OK</button>
                                            <button onClick={() => setEditingCommentId(null)} style={{ padding: '4px 10px', background: 'transparent', border: '1px solid #C0DD97', color: '#639922', borderRadius: 8, fontSize: 11, cursor: 'pointer' }}>X</button>
                                        </div>
                                    ) : (
                                        <p style={{ margin: 0, fontSize: 12, color: '#415A2B', lineHeight: 1.4 }}>{comment.content}</p>
                                    )}

                                    {isCommentOwner && editingCommentId !== comment._id && (
                                        <div style={{ display: 'flex', gap: 10, marginTop: 2 }}>
                                            <button onClick={() => { setEditingCommentId(comment._id); setEditingCommentText(comment.content) }} style={{ background: 'none', border: 'none', fontSize: 11, color: '#80A153', padding: 0, cursor: 'pointer' }}>Editar</button>
                                            <button onClick={() => handleDeleteComment(comment._id)} style={{ background: 'none', border: 'none', fontSize: 11, color: '#E11D48', padding: 0, cursor: 'pointer' }}>Eliminar</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <span style={{ fontSize: 12, color: '#80A153', textAlign: 'center', padding: '10px 0' }}>No hay comentarios aún. ¡Sé el primero!</span>
                )}
            </div>

            {/* Caja de escritura — avatar del usuario actual */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#fff', borderRadius: 16, border: '0.5px solid #C0DD97', padding: '6px 12px' }}>
                <Avatar name={currentAvatar.name} image={currentAvatar.photo} initials={currentAvatar.initials} size={28} />
                <textarea
                    ref={textRef}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmitComment() } }}
                    placeholder="Escribe un comentario..."
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: '#173404', resize: 'none', maxHeight: 96, padding: '4px 0', fontFamily: 'inherit' }}
                />
                <button
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim()}
                    style={{ width: 28, height: 28, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: 'none', cursor: commentText.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.2s', background: commentText.trim() ? '#3B6D11' : '#EAF3DE', color: commentText.trim() ? '#fff' : '#97C459' }}
                >
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12zm0 0h7.5" /></svg>
                </button>
            </div>
        </div>
    )
}