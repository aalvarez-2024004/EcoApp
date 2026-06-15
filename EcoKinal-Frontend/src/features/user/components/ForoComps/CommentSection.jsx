import { useState, useEffect, useRef, useCallback } from 'react'
import { getComentarios, agregarComentario, actualizarComentario, eliminarComentario } from '../../../../shared/Api/ForoApi'
import { completarRetoPorAccion } from '../../../../shared/Api/Gamificacion'
import { RetoToast, CommentSkeletons, CommentBubble, ReplyChip, CommentInput, CurrentUserAvatar } from '../../../../icons/CommentIcons.jsx'

export default function CommentSection({ postId, currentUserId, currentUser, onToast, onCommentCountChange }) {
  const [comments, setComments]               = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [commentText, setCommentText]         = useState('')
  const [editingCommentId, setEditingCommentId]     = useState(null)
  const [editingCommentText, setEditingCommentText] = useState('')
  const [replyingTo, setReplyingTo]           = useState(null)
  const [retoToast, setRetoToast]             = useState(null)

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
        parentCommentId: replyingTo?.id,
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
    if (isOwner) return {
      name:     currentUser?.name || comment._authorName || 'Usuario',
      photo:    currentUser?.photo || currentUser?.profilePicture || currentUser?.image || comment._authorPhoto || null,
      initials: currentUser?.initials || currentUser?.name?.[0]?.toUpperCase() || 'U',
    }
    return {
      name:     comment._authorName || 'Usuario',
      photo:    comment._authorPhoto || null,
      initials: comment._authorName?.[0]?.toUpperCase() || 'U',
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {retoToast && <RetoToast msg={retoToast} onDone={() => setRetoToast(null)} />}

      {/* Lista de comentarios */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 400, overflowY: 'auto', paddingRight: 2 }}>
        {loadingComments ? (
          <CommentSkeletons />
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment._id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <CommentBubble
                comment={comment}
                isReply={false}
                author={resolveAuthor(comment)}
                isCommentOwner={String(comment.autorId) === String(currentUserId)}
                editingCommentId={editingCommentId}
                editingCommentText={editingCommentText}
                setEditingCommentText={setEditingCommentText}
                onEdit={c => { setEditingCommentId(c._id); setEditingCommentText(c.content) }}
                onCancelEdit={() => setEditingCommentId(null)}
                onUpdate={handleUpdateComment}
                onDelete={handleDeleteComment}
                onReply={() => { setReplyingTo({ id: comment._id, name: resolveAuthor(comment).name }); textRef.current?.focus() }}
              />
              {comment.replies?.map(reply => (
                <CommentBubble
                  key={reply._id}
                  comment={reply}
                  isReply={true}
                  author={resolveAuthor(reply)}
                  isCommentOwner={String(reply.autorId) === String(currentUserId)}
                  editingCommentId={editingCommentId}
                  editingCommentText={editingCommentText}
                  setEditingCommentText={setEditingCommentText}
                  onEdit={c => { setEditingCommentId(c._id); setEditingCommentText(c.content) }}
                  onCancelEdit={() => setEditingCommentId(null)}
                  onUpdate={handleUpdateComment}
                  onDelete={handleDeleteComment}
                  onReply={() => { setReplyingTo({ id: comment._id, name: resolveAuthor(reply).name }); textRef.current?.focus() }}
                />
              ))}
            </div>
          ))
        ) : (
          <span style={{ fontSize: 12, color: '#4b5a8a', textAlign: 'center', padding: '10px 0' }}>
            No hay comentarios aún. ¡Sé el primero!
          </span>
        )}
      </div>

      {/* Área de redacción */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {replyingTo && <ReplyChip name={replyingTo.name} onCancel={() => setReplyingTo(null)} />}

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#fff', borderRadius: 16, border: '0.5px solid rgba(43, 95, 42, 0.15)', padding: '6px 10px' }}>
          <CurrentUserAvatar currentUser={currentUser} />
          <CommentInput
            textRef={textRef}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmitComment() } }}
            onSubmit={handleSubmitComment}
            replyingTo={replyingTo}
          />
        </div>
      </div>

    </div>
  )
}