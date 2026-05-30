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
            await ForoApi.post('/comments/add', { content: commentText.trim(), publicationId: postId })
            setCommentText('')
            if (textRef.current) textRef.current.style.height = 'auto'
            loadComments()
        } catch (e) {
            if (onToast) onToast(e.response?.data?.message || 'Error al comentar', 'error')
        }
    }

    const saveCommentEdit = async () => {
        if (!editingCommentText.trim()) return
        try {
            await ForoApi.put(`/comments/update/${editingCommentId}`, { content: editingCommentText.trim() })
            setEditingCommentId(null)
            loadComments()
        } catch (e) {
            if (onToast) onToast(e.response?.data?.message || 'Error al editar comentario', 'error')
        }
    }

    const deleteComment = async (commentId) => {
        if (!window.confirm('¿Eliminar este comentario?')) return
        try {
            await ForoApi.delete(`/comments/delete/${commentId}`)
            loadComments()
        } catch (e) {
            if (onToast) onToast(e.response?.data?.message || 'Error al eliminar comentario', 'error')
        }
    }

    const autoResize = (e) => {
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
    }

    return (
        <div style={{ borderTop: '0.5px solid #C0DD97' }}>
            <style>{`
                .comment-action { opacity: 0; transition: opacity 0.2s; }
                .comment-row:hover .comment-action { opacity: 1; }
                .comment-btn:hover { color: #3B6D11 !important; }
                .comment-del-btn:hover { color: #791F1F !important; }
                
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .spin-loader { animation: spin 1s linear infinite; }
            `}</style>

            {/* Comments list */}
            {loadingComments ? (
                <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 10, color: '#639922' }}>
                    <div className="spin-loader" style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #C0DD97', borderTopColor: '#3B6D11' }} />
                    <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>Cargando comentarios…</p>
                </div>
            ) : comments.length > 0 ? (
                <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {comments.map(comment => {
                        const isMyComment = String(comment.autorId) === String(currentUserId)
                        return (
                            <div key={comment._id} className="comment-row" style={{ display: 'flex', gap: 12 }}>
                                <Avatar 
                                    image={comment._authorImage || comment.authorImage} 
                                    initials={comment._authorInitials || 'U'} 
                                    size={32} 
                                />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        padding: '10px 14px',
                                        borderRadius: '4px 14px 14px 14px',
                                        transition: 'all 0.2s',
                                        background: isMyComment ? '#F1F7E8' : '#fff',
                                        border: `0.5px solid ${isMyComment ? '#C0DD97' : '#EAF3DE'}`,
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: 13, fontWeight: 800, color: '#173404' }}>
                                                {comment._authorName || 'Usuario'}
                                            </span>
                                            
                                            {isMyComment && (
                                                <span style={{
                                                    fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 10,
                                                    background: '#EAF3DE', color: '#3B6D11', border: '0.5px solid #C0DD97',
                                                    letterSpacing: '0.05em', textTransform: 'uppercase'
                                                }}>
                                                    Tú
                                                </span>
                                            )}
                                            
                                            {isMyComment && editingCommentId !== comment._id && (
                                                <div className="comment-action" style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                                                    <button
                                                        onClick={() => { setEditingCommentId(comment._id); setEditingCommentText(comment.content) }}
                                                        className="comment-btn"
                                                        style={{ background: 'transparent', border: 'none', fontSize: 11, fontWeight: 700, color: '#97C459', cursor: 'pointer', padding: 0 }}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => deleteComment(comment._id)}
                                                        className="comment-del-btn"
                                                        style={{ background: 'transparent', border: 'none', fontSize: 11, fontWeight: 700, color: '#F09595', cursor: 'pointer', padding: 0 }}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {editingCommentId === comment._id ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                                                <textarea
                                                    autoFocus
                                                    value={editingCommentText}
                                                    onChange={e => setEditingCommentText(e.target.value)}
                                                    rows={2}
                                                    style={{ width: '100%', padding: '8px 12px', fontSize: 13, border: '0.5px solid #C0DD97', borderRadius: 10, background: '#fff', color: '#27500A', resize: 'none', outline: 'none' }}
                                                />
                                                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                                    <button
                                                        onClick={() => setEditingCommentId(null)}
                                                        style={{ padding: '6px 12px', fontSize: 11, fontWeight: 600, color: '#639922', background: '#fff', border: '0.5px solid #C0DD97', borderRadius: 8, cursor: 'pointer' }}
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        onClick={saveCommentEdit}
                                                        style={{ padding: '6px 12px', fontSize: 11, fontWeight: 700, color: '#fff', background: '#3B6D11', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                                                    >
                                                        Guardar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p style={{ fontSize: 13, color: '#27500A', margin: 0, whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                                                {comment.content}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 12, color: '#639922' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F1F7E8', border: '0.5px solid #C0DD97', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" /></svg>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>Aún no hay comentarios. ¡Sé el primero en aportar!</p>
                </div>
            )}

            {/* Input box */}
            <div style={{ padding: '14px 24px', borderTop: '0.5px solid #C0DD97', background: '#fff', display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                <Avatar image={currentUser?.image} initials={currentUser?.initials || 'U'} size={32} />
                <div style={{
                    flex: 1, display: 'flex', gap: 8, alignItems: 'flex-end',
                    padding: '8px 12px', borderRadius: 16, transition: 'all 0.2s',
                    background: commentText.trim() ? '#F1F7E8' : '#FAFCF7',
                    border: `0.5px solid ${commentText.trim() ? '#97C459' : '#C0DD97'}`
                }}>
                    <textarea 
                        ref={textRef} 
                        rows={1} 
                        value={commentText} 
                        onChange={e => { setCommentText(e.target.value); autoResize(e) }} 
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmitComment() } }} 
                        placeholder="Escribe un comentario..." 
                        style={{
                            flex: 1, border: 'none', outline: 'none', background: 'transparent',
                            fontSize: 13, color: '#173404', resize: 'none', maxHeight: 96, padding: '4px 0',
                            fontFamily: 'inherit'
                        }} 
                    />
                    <button 
                        onClick={handleSubmitComment} 
                        disabled={!commentText.trim()} 
                        style={{
                            width: 28, height: 28, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            border: 'none', cursor: commentText.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                            background: commentText.trim() ? '#3B6D11' : '#EAF3DE',
                            color: commentText.trim() ? '#fff' : '#97C459'
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}