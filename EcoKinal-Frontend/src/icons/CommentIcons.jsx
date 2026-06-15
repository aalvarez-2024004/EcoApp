import { useEffect } from 'react'
import  Avatar  from '../features/user/components/Avatar.jsx'
import {C, S} from '../Styles/constants/Comment.js'
export function RetoToast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div style={S.retoToast}>
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

export function CommentSkeletons() {
  return (
    <>
      {[1, 2].map(i => (
        <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: C.bgComment, borderRadius: 16 }}>
          <div style={S.skeletonAvatar} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 2 }}>
            <div style={{ height: 10, width: '35%', borderRadius: 5, background: C.greenLight }} />
            <div style={{ height: 9,  width: '80%', borderRadius: 5, background: C.greenLight }} />
          </div>
        </div>
      ))}
    </>
  )
}

export function CommentBubble({
  comment, isReply, author, isCommentOwner,
  editingCommentId, editingCommentText, setEditingCommentText,
  onEdit, onCancelEdit, onUpdate, onDelete, onReply,
}) {
  const bubbleStyle = isReply
    ? { ...S.commentBubble, ...S.replyBubble }
    : S.commentBubble

  return (
    <div style={bubbleStyle}>
      <div style={{ flexShrink: 0 }}>
        <Avatar name={author.name} image={author.photo} initials={author.initials} size={32} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>

        {/* Cabecera: nombre + fecha */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.textDark, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {author.name}
          </span>
          <span style={{ fontSize: 10, color: C.textMuted, flexShrink: 0 }}>
            {comment.createdAt
              ? new Date(comment.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
              : ''}
          </span>
        </div>

        {/* Contenido o input de edición */}
        {editingCommentId === comment._id ? (
          <div style={{ display: 'flex', gap: 6, marginTop: 4, width: '100%', flexWrap: 'wrap' }}>
            <input
              value={editingCommentText}
              onChange={e => setEditingCommentText(e.target.value)}
              style={{ flex: 1, minWidth: 0, padding: '6px 10px', borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12, outline: 'none', background: '#fff', boxSizing: 'border-box' }}
            />
            <button onClick={() => onUpdate(comment._id)} style={{ padding: '4px 10px', background: C.green2, color: '#fff', border: 'none', borderRadius: 8, fontSize: 11, cursor: 'pointer', fontWeight: 600, flexShrink: 0 }}>OK</button>
            <button onClick={onCancelEdit} style={{ padding: '4px 10px', background: 'transparent', border: `1px solid ${C.border}`, color: C.green2, borderRadius: 8, fontSize: 11, cursor: 'pointer', fontWeight: 600, flexShrink: 0 }}>X</button>
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: 12, color: C.textMuted, lineHeight: 1.4, wordBreak: 'break-word' }}>
            {comment.content}
          </p>
        )}

        {/* Acciones */}
        {editingCommentId !== comment._id && (
          <div style={{ display: 'flex', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
            <button onClick={onReply} style={{ background: 'none', border: 'none', fontSize: 11, color: C.green2, padding: 0, cursor: 'pointer', fontWeight: 600 }}>
              Responder
            </button>
            {isCommentOwner && (
              <>
                <button onClick={() => onEdit(comment)} style={{ background: 'none', border: 'none', fontSize: 11, color: C.textMuted, padding: 0, cursor: 'pointer' }}>Editar</button>
                <button onClick={() => onDelete(comment._id)} style={{ background: 'none', border: 'none', fontSize: 11, color: C.textDanger, padding: 0, cursor: 'pointer' }}>Eliminar</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function ReplyChip({ name, onCancel }) {
  return (
    <div style={S.replyChip}>
      <span style={{ fontSize: 11, color: C.green2, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        Respondiendo a <strong>{name}</strong>
      </span>
      <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: C.green2, fontSize: 12, cursor: 'pointer', fontWeight: 'bold', flexShrink: 0 }}>
        ✕
      </button>
    </div>
  )
}

export function CommentInput({ textRef, value, onChange, onKeyDown, onSubmit, replyingTo }) {
  const active = value.trim().length > 0
  return (
    <div style={S.inputWrapper}>
      <textarea
        ref={textRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={replyingTo ? 'Escribe tu respuesta...' : 'Escribe un comentario...'}
        style={S.textarea}
      />
      <button
        onClick={onSubmit}
        disabled={!active}
        style={{
          ...S.sendBtn,
          cursor: active ? 'pointer' : 'not-allowed',
          background: active ? C.green2 : C.greenLight,
          color: active ? '#fff' : C.textMuted,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }} stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </div>
  )
}

export function CurrentUserAvatar({ currentUser }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <Avatar
        name={currentUser?.name || 'Usuario'}
        image={currentUser?.photo || currentUser?.profilePicture || currentUser?.image || null}
        initials={currentUser?.initials || currentUser?.name?.[0]?.toUpperCase() || 'U'}
        size={28}
      />
    </div>
  )
}