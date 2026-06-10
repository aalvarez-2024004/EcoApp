import { useState, useEffect, useRef, useCallback } from 'react'
import { getComentarios, agregarComentario, actualizarComentario, eliminarComentario } from '../../../../shared/Api/ForoApi'
import { completarRetoPorAccion } from '../../../../shared/Api/Gamificacion'
import Avatar from '../Avatar'

// ── Toast de reto (inline, sobre la sección de comentarios) ─────────────────
function RetoToast({ msg, onDone }) {
    useEffect(() => {
        const t = setTimeout(onDone, 4000)
        return () => clearTimeout(t)
    }, [onDone])

    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 14px', borderRadius: 12,
            background: '#21491e', color: 'white',
            fontSize: 13, fontWeight: 600, lineHeight: 1.4,
            animation: 'retoToastIn .3s cubic-bezier(0.16,1,0.3,1)',
            marginBottom: 8,
        }}>
            <style>{`
                @keyframes retoToastIn {
                  from { transform: translateY(-8px); opacity: 0; }
                  to   { transform: translateY(0);    opacity: 1; }
                }
            `}</style>
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }} stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {msg}
        </div>
    )
}

export default function CommentSection({ postId, currentUserId, currentUser, onToast, onCommentCountChange }) {
    const [comments, setComments] = useState([])
    const [loadingComments, setLoadingComments] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editingCommentText, setEditingCommentText] = useState('')
    const [replyingTo, setReplyingTo] = useState(null)
    const [retoToast, setRetoToast] = useState(null)

    const textRef = useRef(null)

    const loadComments = useCallback(async () => {
        setLoadingComments(true)
        try {
            const list = await getComentarios(postId)
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
            await agregarComentario({
                content: commentText.trim(),
                publicationId: postId,
                parentCommentId: replyingTo ? replyingTo.id : undefined
            })
            setCommentText('')
            setReplyingTo(null)
            loadComments()
            onToast?.('Comentario publicado', 'success')

            const result = await completarRetoPorAccion('foro_comentar')
            if (result && !result.alreadyDone) {
                setRetoToast('💬 ¡Reto completado! Ve a Gamificación para reclamar tus puntos 🌿')
            }
        } catch (err) {
            onToast?.(err.response?.data?.message || 'Error al comentar', 'error')
        }
    }

    const handleUpdateComment = async (id) => {
        if (!editingCommentText.trim()) return
        try {
            await actualizarComentario(id, editingCommentText.trim())
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
            await eliminarComentario(id)
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
                name: currentUser?.name || comment._authorName || 'Usuario',
                photo: currentUser?.photo || currentUser?.profilePicture || currentUser?.image || comment._authorPhoto || null,
                initials: currentUser?.initials || (currentUser?.name?.[0]?.toUpperCase()) || 'U',
            }
        }
        return {
            name: comment._authorName || 'Usuario',
            photo: comment._authorPhoto || null,
            initials: comment._authorName?.[0]?.toUpperCase() || 'U',
        }
    }

    const currentAvatar = {
        name: currentUser?.name || 'Usuario',
        photo: currentUser?.photo || currentUser?.profilePicture || currentUser?.image || null,
        initials: currentUser?.initials || currentUser?.name?.[0]?.toUpperCase() || 'U',
    }

    const renderComment = (comment, isReply = false, rootId = null) => {
        const isCommentOwner = String(comment.autorId) === String(currentUserId)
        const author = resolveAuthor(comment)
        const targetReplyId = rootId || comment._id

        return (
            <div key={comment._id} style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                background: isReply ? '#EEF3ED' : '#f8faf7',
                padding: '10px 12px', borderRadius: 16,
                marginLeft: isReply ? 'clamp(12px, 4vw, 28px)' : 0,
                borderLeft: isReply ? '2px solid rgba(43, 95, 42, 0.15)' : 'none',
                minWidth: 0,
                boxSizing: 'border-box',
            }}>
                <div style={{ flexShrink: 0 }}>
                    <Avatar name={author.name} image={author.photo} initials={author.initials} size={32} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{author.name}</span>
                        <span style={{ fontSize: 10, color: '#4b5a8a', flexShrink: 0 }}>
                            {comment.createdAt
                                ? new Date(comment.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                                : ''}
                        </span>
                    </div>

                    {editingCommentId === comment._id ? (
                        <div style={{ display: 'flex', gap: 6, marginTop: 4, width: '100%', flexWrap: 'wrap' }}>
                            <input
                                value={editingCommentText}
                                onChange={e => setEditingCommentText(e.target.value)}
                                style={{ flex: 1, minWidth: 0, padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(43, 95, 42, 0.15)', fontSize: 12, outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                            />
                            <button onClick={() => handleUpdateComment(comment._id)} style={{ padding: '4px 10px', background: '#2B5F2A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 11, cursor: 'pointer', fontWeight: 600, flexShrink: 0 }}>OK</button>
                            <button onClick={() => setEditingCommentId(null)} style={{ padding: '4px 10px', background: 'transparent', border: '1px solid rgba(43, 95, 42, 0.15)', color: '#2B5F2A', borderRadius: 8, fontSize: 11, cursor: 'pointer', fontWeight: 600, flexShrink: 0 }}>X</button>
                        </div>
                    ) : (
                        <p style={{ margin: 0, fontSize: 12, color: '#4b5a8a', lineHeight: 1.4, wordBreak: 'break-word' }}>{comment.content}</p>
                    )}

                    {editingCommentId !== comment._id && (
                        <div style={{ display: 'flex', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
                            <button
                                onClick={() => {
                                    setReplyingTo({ id: targetReplyId, name: author.name })
                                    textRef.current?.focus()
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

            {retoToast && (
                <RetoToast msg={retoToast} onDone={() => setRetoToast(null)} />
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 400, overflowY: 'auto', paddingRight: 2 }}>
                {loadingComments ? (
                    <>
                        {[1, 2].map(i => (
                            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: '#f8faf7', borderRadius: 16 }}>
                                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EEF3ED', flexShrink: 0, animation: 'shimmer 1.4s infinite linear', backgroundImage: 'linear-gradient(90deg,#EEF3ED 25%,rgba(43, 95, 42, 0.15) 50%,#EEF3ED 75%)', backgroundSize: '400px 100%' }} />
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 2 }}>
                                    <div style={{ height: 10, width: '35%', borderRadius: 5, background: '#EEF3ED' }} />
                                    <div style={{ height: 9, width: '80%', borderRadius: 5, background: '#EEF3ED' }} />
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {replyingTo && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 10px', background: '#EEF3ED', borderRadius: 8, border: '0.5px solid rgba(43, 95, 42, 0.15)', gap: 8 }}>
                        <span style={{ fontSize: 11, color: '#2B5F2A', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            Respondiendo a <strong>{replyingTo.name}</strong>
                        </span>
                        <button onClick={() => setReplyingTo(null)} style={{ background: 'transparent', border: 'none', color: '#2B5F2A', fontSize: 12, cursor: 'pointer', fontWeight: 'bold', flexShrink: 0 }}>
                            ✕
                        </button>
                    </div>
                )}

                <div style={{
                    display: 'flex', gap: 8, alignItems: 'center',
                    background: '#fff', borderRadius: 16, border: '0.5px solid rgba(43, 95, 42, 0.15)', padding: '6px 10px',
                }}>
                    <div style={{ flexShrink: 0 }}>
                        <Avatar name={currentAvatar.name} image={currentAvatar.photo} initials={currentAvatar.initials} size={28} />
                    </div>
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
                            minWidth: 0,
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
                            color: commentText.trim() ? '#fff' : '#4b5a8a',
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