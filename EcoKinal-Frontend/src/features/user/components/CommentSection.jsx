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
        <div className="border-t border-slate-100">
            
            {/* Comments list */}
            {loadingComments ? (
                <div className="px-5 py-5 flex items-center gap-2 text-slate-400">
                    <div className="w-4 h-4 rounded-full border-2 border-slate-200 border-t-slate-400 animate-spin" />
                    <p className="text-xs font-medium">Cargando comentarios…</p>
                </div>
            ) : comments.length > 0 ? (
                <div className="px-5 py-4 flex flex-col gap-3">
                    {comments.map(comment => {
                        const isMyComment = String(comment.autorId) === String(currentUserId)
                        return (
                            <div key={comment._id} className="flex gap-3 group/comment">
                                <Avatar 
                                    image={comment._authorImage || comment.authorImage} 
                                    initials={comment._authorInitials || 'U'} 
                                    size={30} 
                                />
                                <div className="flex-1 min-w-0">
                                    <div className={`px-3.5 py-2.5 rounded-2xl rounded-tl-sm transition-all
                                        ${isMyComment
                                            ? 'bg-emerald-50 border border-emerald-100'
                                            : 'bg-slate-50 border border-slate-100'
                                        }`}>
                                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                            <span className="text-xs font-bold text-slate-800">
                                                {comment._authorName || 'Usuario'}
                                            </span>
                                            {isMyComment && (
                                                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 tracking-wider uppercase">
                                                    Tú
                                                </span>
                                            )}
                                            {isMyComment && editingCommentId !== comment._id && (
                                                <div className="ml-auto flex gap-2 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => { setEditingCommentId(comment._id); setEditingCommentText(comment.content) }}
                                                        className="text-[11px] font-bold text-slate-400 hover:text-emerald-600 transition-colors"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => deleteComment(comment._id)}
                                                        className="text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {editingCommentId === comment._id ? (
                                            <div className="mt-1.5 flex flex-col gap-2">
                                                <textarea
                                                    autoFocus
                                                    value={editingCommentText}
                                                    onChange={e => setEditingCommentText(e.target.value)}
                                                    rows={2}
                                                    className="w-full border border-emerald-300 rounded-xl px-3 py-2 text-sm bg-white outline-none resize-none text-slate-700 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                                                />
                                                <div className="flex gap-2 justify-end">
                                                    <button
                                                        onClick={() => setEditingCommentId(null)}
                                                        className="px-3 py-1.5 text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        onClick={saveCommentEdit}
                                                        className="px-3.5 py-1.5 text-xs font-black text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 shadow-sm shadow-emerald-500/20 active:scale-95 transition-all"
                                                    >
                                                        Guardar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{comment.content}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="px-5 py-5 flex items-center gap-2.5 text-slate-400">
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                        <i className="ti ti-message-circle text-sm text-slate-400" />
                    </div>
                    <p className="text-xs font-medium">Aún no hay comentarios. ¡Sé el primero en aportar!</p>
                </div>
            )}

            {/* Input box */}
            <div className="px-5 py-3.5 border-t border-slate-100 bg-white flex gap-3 items-end">
                <Avatar image={currentUser?.image} initials={currentUser?.initials || 'U'} size={30} />
                <div className={`flex-1 flex gap-2 items-end border rounded-2xl px-3.5 py-2 transition-all duration-200
                    ${commentText.trim()
                        ? 'border-emerald-400 bg-emerald-50/30 shadow-sm shadow-emerald-500/5'
                        : 'border-slate-200 bg-slate-50/50'
                    }`}
                >
                    <textarea 
                        ref={textRef} 
                        rows={1} 
                        value={commentText} 
                        onChange={e => { setCommentText(e.target.value); autoResize(e) }} 
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmitComment() } }} 
                        placeholder="Escribe un comentario..." 
                        className="flex-1 border-none outline-none bg-transparent text-sm text-slate-700 resize-none max-h-24 py-0.5 placeholder:text-slate-400" 
                    />
                    <button 
                        onClick={handleSubmitComment} 
                        disabled={!commentText.trim()} 
                        className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all active:scale-95 flex-shrink-0
                            ${commentText.trim()
                                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm shadow-emerald-500/20'
                                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                            }`}
                    >
                        <i className="ti ti-send text-xs" />
                    </button>
                </div>
            </div>
        </div>
    )
}