import { useState, useRef, useEffect, useCallback } from 'react'
import { useUser } from '../store/useUserStore'
import axios from 'axios'

/* ─────────────────────────────────────────────────────────────────────
   API  —  El Foro backend corre en :3006
   ───────────────────────────────────────────────────────────────────── */
const FORO_BASE = import.meta.env.VITE_FORO_URL || 'http://localhost:3006/ForoEcoKinal/v1'

const ForoApi = axios.create({ baseURL: FORO_BASE })

ForoApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        console.warn('[ForoApi] ⚠️ No hay token en localStorage. ¿Estás logueado?')
    }
    if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json'
    }
    // Debug: muestra en consola cada petición con su URL y si tiene token
    console.debug(`[ForoApi] ${config.method?.toUpperCase()} ${FORO_BASE}${config.url}`, token ? '✅ token presente' : '❌ sin token')
    return config
})

ForoApi.interceptors.response.use(
    (res) => res,
    (error) => {
        const status  = error.response?.status
        const message = error.response?.data?.message || error.message
        console.error(`[ForoApi] Error ${status}:`, message, error.response?.data)
        // Si el token expiró, redirigir al login
        if (status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

/* ─────────────────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────────────────── */
const formatTime = (date) => {
    const diff = Date.now() - new Date(date).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Ahora mismo'
    if (mins < 60) return `hace ${mins} min`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `hace ${hrs} h`
    return new Date(date).toLocaleDateString('es-GT', { day: 'numeric', month: 'short' })
}

const getInitials = (name = '') =>
    name.split(' ').slice(0, 2).map(w => w[0]?.toUpperCase()).join('')

const TAG_OPTIONS = [
    { label: 'Logro',       color: '#0F6E56', bg: '#E1F5EE' },
    { label: 'Punto Verde', color: '#185FA5', bg: '#E6F1FB' },
    { label: 'Pregunta',    color: '#854F0B', bg: '#FAEEDA' },
    { label: 'Consejo',     color: '#3B6D11', bg: '#EAF3DE' },
    { label: 'Noticia',     color: '#534AB7', bg: '#EEEDFE' },
]

/* ─────────────────────────────────────────────────────────────────────
   Design tokens
   ───────────────────────────────────────────────────────────────────── */
const T = {
    ink:        '#112117',
    muted:      '#708171',
    mutedLight: '#a0b0a0',
    green:      '#1D9E75',
    greenDark:  '#0F6E56',
    bone:       '#f6f8f3',
    white:      '#ffffff',
    border:     'rgba(89,177,48,.15)',
    borderHover:'rgba(89,177,48,.28)',
    shadow:     '0 2px 10px rgba(15,110,86,.07)',
    shadowHover:'0 6px 24px rgba(15,110,86,.13)',
    radius: { sm: 8, md: 12, lg: 16, pill: 999 },
    font: "'Outfit', sans-serif",
}
const btnPrimary = {
    background: `linear-gradient(135deg,#1D9E75,#0F6E56)`,
    color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px',
    fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: T.font,
    display: 'flex', alignItems: 'center', gap: 6,
    boxShadow: '0 3px 10px rgba(15,110,86,.22)',
}
const btnGhost = {
    background: '#eef3ee', color: '#708171',
    border: '1px solid rgba(89,177,48,.18)', borderRadius: 8,
    padding: '8px 16px', fontSize: 13, fontWeight: 500,
    cursor: 'pointer', fontFamily: T.font,
}

/* ─────────────────────────────────────────────────────────────────────
   Toast de notificación
   ───────────────────────────────────────────────────────────────────── */
function Toast({ msg, type }) {
    if (!msg) return null
    return (
        <div style={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
            background: type === 'error' ? '#DC2626' : T.greenDark,
            color: '#fff', padding: '12px 20px', borderRadius: 10,
            fontSize: 13, fontWeight: 600, fontFamily: T.font,
            boxShadow: '0 8px 24px rgba(0,0,0,.18)',
            display: 'flex', alignItems: 'center', gap: 8,
            animation: 'fadeInUp .25s ease',
        }}>
            <i className={`ti ${type === 'error' ? 'ti-alert-circle' : 'ti-circle-check'}`} style={{ fontSize: 16 }} />
            {msg}
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────────────
   Vista previa de imagen
   ───────────────────────────────────────────────────────────────────── */
function ImagePicker({ file, onChange, onRemove }) {
    const inputRef = useRef()
    const preview = file ? URL.createObjectURL(file) : null

    return (
        <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: T.muted, marginBottom: 8, letterSpacing: '.07em', textTransform: 'uppercase' }}>
                Imagen (opcional)
            </p>
            {preview ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                        src={preview}
                        alt="preview"
                        style={{ maxHeight: 200, maxWidth: '100%', borderRadius: T.radius.md, objectFit: 'cover', border: `1px solid ${T.border}` }}
                    />
                    <button
                        onClick={onRemove}
                        style={{
                            position: 'absolute', top: 6, right: 6,
                            background: 'rgba(220,38,38,.9)', color: '#fff',
                            border: 'none', borderRadius: '50%', width: 26, height: 26,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', fontSize: 13,
                        }}
                    >
                        <i className="ti ti-x" />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    style={{
                        border: `2px dashed ${T.border}`, borderRadius: T.radius.md,
                        padding: '20px 24px', textAlign: 'center', cursor: 'pointer',
                        background: T.bone, transition: 'border-color .15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = T.green}
                    onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
                >
                    <i className="ti ti-photo-plus" style={{ fontSize: 28, color: T.muted, display: 'block', marginBottom: 6 }} />
                    <p style={{ fontSize: 12, color: T.muted }}>Haz clic para subir una imagen</p>
                    <p style={{ fontSize: 11, color: T.mutedLight, marginTop: 2 }}>JPG, PNG, WEBP — máximo 10 MB</p>
                </div>
            )}
            <input
                ref={inputRef}
                type="file"
                accept="image/jpg,image/jpeg,image/png,image/webp,image/avif"
                style={{ display: 'none' }}
                onChange={e => { if (e.target.files[0]) onChange(e.target.files[0]) }}
            />
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────────────
   Botón acción comentario
   ───────────────────────────────────────────────────────────────────── */
function CommentActionBtn({ onClick, icon, label, color, bg, border, hoverBg, hoverColor, hoverBorder }) {
    const [hov, setHov] = useState(false)
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: hov ? hoverBg : bg,
                border: `1px solid ${hov ? hoverBorder : border}`,
                borderRadius: T.radius.sm, padding: '4px 10px',
                fontSize: 11, fontWeight: 600,
                color: hov ? hoverColor : color,
                cursor: 'pointer', fontFamily: T.font,
                transition: 'all .15s', whiteSpace: 'nowrap',
            }}
        >
            <i className={`ti ${icon}`} style={{ fontSize: 12 }} />
            {label}
        </button>
    )
}

/* ─────────────────────────────────────────────────────────────────────
   PostCard
   ───────────────────────────────────────────────────────────────────── */
function PostCard({ post, currentUserId, currentUser, onRefresh, onToast }) {
    const [expanded, setExpanded]         = useState(false)
    const [comments, setComments]         = useState([])
    const [loadingComments, setLoadingComments] = useState(false)
    const [commentText, setCommentText]   = useState('')
    const [submittingComment, setSubmittingComment] = useState(false)

    const [editingCommentId, setEditingCommentId]     = useState(null)
    const [editingCommentText, setEditingCommentText] = useState('')

    const [editingPost, setEditingPost]       = useState(false)
    const [editTitle, setEditTitle]           = useState(post.title || '')
    const [editContent, setEditContent]       = useState(post.content || '')
    const [editPhoto, setEditPhoto]           = useState(null)
    const [savingPost, setSavingPost]         = useState(false)

    const [liked, setLiked]           = useState(false)
    const [localLikes, setLocalLikes] = useState(0)
    const [hovered, setHovered]       = useState(false)
    const textRef = useRef(null)

    const isMyPost = String(post.autorId) === String(currentUserId)

    /* Cargar comentarios al expandir */
    const loadComments = useCallback(async () => {
        if (!expanded) return
        setLoadingComments(true)
        try {
            const { data } = await ForoApi.get(`/comments/get/${post._id}`)
            setComments(Array.isArray(data) ? data : [])
        } catch {
            setComments([])
        } finally {
            setLoadingComments(false)
        }
    }, [expanded, post._id])

    useEffect(() => { loadComments() }, [loadComments])

    /* ── Likes (solo frontend) */
    const handleLike = () => {
        setLiked(l => !l)
        setLocalLikes(l => liked ? l - 1 : l + 1)
    }

    /* ── Editar publicación */
    const savePostEdit = async () => {
        if (!editTitle.trim() || !editContent.trim()) {
            onToast('El título y el contenido son obligatorios', 'error'); return
        }
        setSavingPost(true)
        try {
            const fd = new FormData()
            fd.append('title', editTitle.trim())
            fd.append('content', editContent.trim())
            if (editPhoto) fd.append('photo', editPhoto)
            await ForoApi.put(`/posts/update/${post._id}`, fd)
            onToast('Publicación actualizada')
            setEditingPost(false)
            onRefresh()
        } catch (e) {
            onToast(e?.response?.data?.message || 'Error al actualizar', 'error')
        } finally {
            setSavingPost(false)
        }
    }

    /* ── Eliminar publicación */
    const deletePost = async () => {
        if (!window.confirm('¿Eliminar esta publicación?')) return
        try {
            await ForoApi.delete(`/posts/delete/${post._id}`)
            onToast('Publicación eliminada')
            onRefresh()
        } catch (e) {
            onToast(e?.response?.data?.message || 'Error al eliminar', 'error')
        }
    }

    /* ── Agregar comentario */
    const handleSubmitComment = async () => {
        if (!commentText.trim()) return
        setSubmittingComment(true)
        try {
            await ForoApi.post('/comments/add', { content: commentText.trim(), publicationId: post._id })
            setCommentText('')
            if (textRef.current) textRef.current.style.height = 'auto'
            loadComments()
        } catch (e) {
            onToast(e?.response?.data?.message || 'Error al comentar', 'error')
        } finally {
            setSubmittingComment(false)
        }
    }

    /* ── Editar comentario */
    const saveCommentEdit = async () => {
        if (!editingCommentText.trim()) return
        try {
            await ForoApi.put(`/comments/update/${editingCommentId}`, { content: editingCommentText.trim() })
            setEditingCommentId(null)
            setEditingCommentText('')
            loadComments()
        } catch (e) {
            onToast(e?.response?.data?.message || 'Error al editar comentario', 'error')
        }
    }

    /* ── Eliminar comentario */
    const deleteComment = async (commentId) => {
        try {
            await ForoApi.delete(`/comments/delete/${commentId}`)
            loadComments()
        } catch (e) {
            onToast(e?.response?.data?.message || 'Error al eliminar comentario', 'error')
        }
    }

    const autoResize = (e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }
    const tagDef = TAG_OPTIONS.find(t => t.label === post._tag)

    return (
        <article
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: T.white, borderRadius: T.radius.lg,
                border: `1px solid ${hovered ? T.borderHover : T.border}`,
                boxShadow: hovered ? T.shadowHover : T.shadow,
                overflow: 'hidden', transition: 'border-color .2s, box-shadow .2s',
                fontFamily: T.font,
            }}
        >
            {/* ── Cabecera ── */}
            <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                    width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                    background: isMyPost
                        ? `linear-gradient(135deg,${T.green},${T.greenDark})`
                        : 'linear-gradient(135deg,#a0b8a0,#6e8e6e)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: T.white, fontWeight: 700, fontSize: 15,
                    boxShadow: '0 2px 8px rgba(0,0,0,.10)',
                }}>
                    {getInitials(post._authorName || 'U')}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{post._authorName || 'Usuario'}</span>
                        {isMyPost && (
                            <span style={{
                                fontSize: 10, fontWeight: 700, padding: '2px 8px',
                                borderRadius: T.radius.pill, background: '#D1FAE5', color: T.greenDark,
                                border: '1px solid #A7F3D0',
                            }}>Tú</span>
                        )}
                        {post._tag && tagDef && (
                            <span style={{
                                fontSize: 11, fontWeight: 600, padding: '2px 10px',
                                borderRadius: T.radius.pill, background: tagDef.bg, color: tagDef.color,
                                border: `1px solid ${tagDef.color}30`,
                            }}>{post._tag}</span>
                        )}
                    </div>
                    <p style={{ fontSize: 11, color: T.mutedLight, marginTop: 3 }}>{formatTime(post.createdAt)}</p>
                </div>
                {isMyPost && !editingPost && (
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <button
                            onClick={() => { setEditingPost(true); setEditTitle(post.title); setEditContent(post.content); setEditPhoto(null) }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: '#E8F5F0', border: '1px solid #A7DEC8',
                                borderRadius: T.radius.sm, padding: '6px 14px',
                                fontSize: 13, fontWeight: 600, color: T.greenDark,
                                cursor: 'pointer', fontFamily: T.font, transition: 'all .15s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = T.green; e.currentTarget.style.color = '#fff' }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#E8F5F0'; e.currentTarget.style.color = T.greenDark }}
                        >
                            <i className="ti ti-pencil" style={{ fontSize: 14 }} />Editar
                        </button>
                        <button
                            onClick={deletePost}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: '#FEE2E2', border: '1px solid #FECACA',
                                borderRadius: T.radius.sm, padding: '6px 14px',
                                fontSize: 13, fontWeight: 600, color: '#DC2626',
                                cursor: 'pointer', fontFamily: T.font, transition: 'all .15s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#DC2626'; e.currentTarget.style.color = '#fff' }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.color = '#DC2626' }}
                        >
                            <i className="ti ti-trash" style={{ fontSize: 14 }} />Eliminar
                        </button>
                    </div>
                )}
            </div>

            {/* ── Contenido ── */}
            <div style={{ padding: '0 20px 16px' }}>
                {editingPost ? (
                    <div style={{ background: T.bone, border: `1.5px solid ${T.green}`, borderRadius: T.radius.md, padding: 16 }}>
                        {/* Título editable */}
                        <label style={{ fontSize: 11, fontWeight: 600, color: T.muted, letterSpacing: '.07em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                            Título <span style={{ color: '#DC2626' }}>*</span>
                        </label>
                        <input
                            autoFocus
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            placeholder="Título de la publicación…"
                            style={{
                                width: '100%', border: `1px solid ${T.border}`, borderRadius: T.radius.sm,
                                padding: '8px 12px', fontSize: 14, fontFamily: T.font,
                                outline: 'none', background: T.white, color: T.ink,
                                marginBottom: 12, boxSizing: 'border-box',
                            }}
                            onFocus={e => e.target.style.borderColor = T.green}
                            onBlur={e => e.target.style.borderColor = T.border}
                        />
                        {/* Contenido editable */}
                        <label style={{ fontSize: 11, fontWeight: 600, color: T.muted, letterSpacing: '.07em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                            Contenido <span style={{ color: '#DC2626' }}>*</span>
                        </label>
                        <textarea
                            value={editContent}
                            onChange={e => setEditContent(e.target.value)}
                            rows={3}
                            style={{
                                width: '100%', border: `1px solid ${T.border}`, borderRadius: T.radius.sm,
                                padding: '8px 12px', fontSize: 14, resize: 'vertical',
                                fontFamily: T.font, outline: 'none', background: T.white,
                                lineHeight: 1.65, minHeight: 80, color: T.ink, marginBottom: 12,
                                boxSizing: 'border-box',
                            }}
                            onFocus={e => e.target.style.borderColor = T.green}
                            onBlur={e => e.target.style.borderColor = T.border}
                        />
                        {/* Imagen editable */}
                        <ImagePicker file={editPhoto} onChange={setEditPhoto} onRemove={() => setEditPhoto(null)} />
                        {post.photo && !editPhoto && (
                            <p style={{ fontSize: 11, color: T.muted, marginTop: -8, marginBottom: 12 }}>
                                <i className="ti ti-photo" style={{ marginRight: 4 }} />
                                Ya tiene una imagen. Selecciona otra para reemplazarla.
                            </p>
                        )}
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setEditingPost(false)} style={btnGhost}>Cancelar</button>
                            <button onClick={savePostEdit} disabled={savingPost} style={{ ...btnPrimary, opacity: savingPost ? .7 : 1 }}>
                                <i className="ti ti-check" style={{ fontSize: 14 }} />{savingPost ? 'Guardando…' : 'Guardar'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Título */}
                        {post.title && (
                            <p style={{ fontSize: 15, fontWeight: 700, color: T.ink, marginBottom: 6 }}>{post.title}</p>
                        )}
                        {/* Texto */}
                        <p style={{ fontSize: 14, lineHeight: 1.7, color: T.ink }}>{post.content}</p>
                        {/* Foto */}
                        {post.photo && (
                            <img
                                src={post.photo}
                                alt="publicación"
                                style={{
                                    display: 'block', marginTop: 12, maxWidth: '100%',
                                    borderRadius: T.radius.md, objectFit: 'cover',
                                    maxHeight: 340, border: `1px solid ${T.border}`,
                                }}
                            />
                        )}
                    </>
                )}
            </div>

            {/* ── Barra de acciones ── */}
            <div style={{
                padding: '10px 20px', borderTop: `1px solid ${T.border}`,
                display: 'flex', alignItems: 'center', gap: 6, background: '#fafcfa',
            }}>
                <button onClick={handleLike} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: liked ? '#E1F5EE' : T.white,
                    border: `1px solid ${liked ? '#A7DEC8' : T.border}`,
                    borderRadius: T.radius.sm, padding: '6px 14px',
                    cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    color: liked ? T.greenDark : T.muted,
                    transition: 'all .15s', fontFamily: T.font,
                }}>
                    <i className={`ti ${liked ? 'ti-heart-filled' : 'ti-heart'}`} style={{ fontSize: 16 }} />
                    {localLikes}
                </button>
                <button
                    onClick={() => setExpanded(!expanded)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: expanded ? '#E6F1FB' : T.white,
                        border: `1px solid ${expanded ? '#93C5FD' : T.border}`,
                        borderRadius: T.radius.sm, padding: '6px 14px',
                        cursor: 'pointer', fontSize: 13, fontWeight: 600,
                        color: expanded ? '#185FA5' : T.muted,
                        transition: 'all .15s', fontFamily: T.font,
                    }}
                >
                    <i className="ti ti-message-circle" style={{ fontSize: 16 }} />
                    Comentarios
                </button>
            </div>

            {/* ── Sección comentarios ── */}
            {expanded && (
                <div style={{ borderTop: `1px solid ${T.border}`, background: T.bone }}>
                    {loadingComments ? (
                        <p style={{ padding: '16px 20px', fontSize: 13, color: T.muted, fontFamily: T.font }}>Cargando comentarios…</p>
                    ) : comments.length > 0 ? (
                        <div style={{ padding: '14px 20px 6px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {comments.map(comment => {
                                const isMyComment = String(comment.autorId) === String(currentUserId)
                                return (
                                    <div key={comment._id} style={{
                                        display: 'flex', gap: 10, padding: '12px 14px',
                                        background: T.white, borderRadius: T.radius.md,
                                        border: `1px solid ${T.border}`, boxShadow: T.shadow,
                                    }}>
                                        <div style={{
                                            width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                                            background: isMyComment
                                                ? `linear-gradient(135deg,${T.green},${T.greenDark})`
                                                : 'linear-gradient(135deg,#a0b8a0,#6e8e6e)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: T.white, fontWeight: 700, fontSize: 12,
                                        }}>
                                            {getInitials(currentUser?.name || 'U')}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}>
                                                {isMyComment && (
                                                    <span style={{
                                                        fontSize: 10, fontWeight: 700, padding: '1px 7px',
                                                        borderRadius: T.radius.pill, background: '#D1FAE5', color: T.greenDark,
                                                        border: '1px solid #A7F3D0',
                                                    }}>Tú</span>
                                                )}
                                                <span style={{ fontSize: 11, color: T.mutedLight, marginLeft: 'auto' }}>{formatTime(comment.createdAt)}</span>
                                                {isMyComment && editingCommentId !== comment._id && (
                                                    <div style={{ display: 'flex', gap: 6 }}>
                                                        <CommentActionBtn
                                                            onClick={() => { setEditingCommentId(comment._id); setEditingCommentText(comment.content) }}
                                                            icon="ti-pencil" label="Editar"
                                                            color={T.greenDark} bg="#E8F5F0" border="#A7DEC8"
                                                            hoverBg={T.green} hoverColor={T.white} hoverBorder={T.green}
                                                        />
                                                        <CommentActionBtn
                                                            onClick={() => deleteComment(comment._id)}
                                                            icon="ti-trash" label="Eliminar"
                                                            color="#DC2626" bg="#FEE2E2" border="#FECACA"
                                                            hoverBg="#DC2626" hoverColor={T.white} hoverBorder="#DC2626"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            {editingCommentId === comment._id ? (
                                                <div style={{ background: T.bone, border: `1.5px solid ${T.green}`, borderRadius: T.radius.sm, padding: 10 }}>
                                                    <textarea
                                                        autoFocus
                                                        value={editingCommentText}
                                                        onChange={e => setEditingCommentText(e.target.value)}
                                                        rows={2}
                                                        style={{
                                                            width: '100%', border: 'none', borderRadius: 6,
                                                            padding: '6px 8px', fontSize: 13, resize: 'none',
                                                            fontFamily: T.font, outline: 'none',
                                                            background: T.white, lineHeight: 1.5, color: T.ink,
                                                        }}
                                                    />
                                                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                                                        <button onClick={() => setEditingCommentId(null)} style={{ ...btnGhost, padding: '5px 12px', fontSize: 12 }}>Cancelar</button>
                                                        <button onClick={saveCommentEdit} style={{ ...btnPrimary, padding: '5px 14px', fontSize: 12, boxShadow: 'none' }}>
                                                            <i className="ti ti-check" style={{ fontSize: 13 }} />Guardar
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p style={{ fontSize: 13, color: T.ink, lineHeight: 1.6 }}>{comment.content}</p>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p style={{ padding: '14px 20px 8px', fontSize: 13, color: T.muted, fontFamily: T.font }}>
                            Aún no hay comentarios. ¡Sé el primero!
                        </p>
                    )}

                    {/* Input nuevo comentario */}
                    <div style={{ padding: '12px 20px 16px', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                            background: `linear-gradient(135deg,${T.green},${T.greenDark})`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: T.white, fontWeight: 700, fontSize: 12,
                        }}>
                            {currentUser?.initials}
                        </div>
                        <div style={{
                            flex: 1, display: 'flex', gap: 8, alignItems: 'flex-end',
                            background: T.white,
                            border: `1.5px solid ${commentText.trim() ? T.green : T.border}`,
                            borderRadius: T.radius.md, padding: '6px 6px 6px 12px',
                            transition: 'border-color .15s, box-shadow .15s',
                            boxShadow: commentText.trim() ? `0 0 0 3px rgba(29,158,117,.10)` : 'none',
                        }}>
                            <textarea
                                ref={textRef}
                                rows={1}
                                value={commentText}
                                onChange={e => { setCommentText(e.target.value); autoResize(e) }}
                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmitComment() } }}
                                placeholder="Escribe un comentario… (Enter para enviar)"
                                style={{
                                    flex: 1, border: 'none', outline: 'none', background: 'transparent',
                                    fontSize: 13, fontFamily: T.font, lineHeight: 1.5,
                                    resize: 'none', overflow: 'hidden', color: T.ink,
                                    paddingTop: 5, paddingBottom: 5,
                                }}
                            />
                            <button
                                onClick={handleSubmitComment}
                                disabled={!commentText.trim() || submittingComment}
                                style={{
                                    background: commentText.trim() ? `linear-gradient(135deg,${T.green},${T.greenDark})` : '#D1D5DB',
                                    color: T.white, border: 'none', borderRadius: 8,
                                    width: 34, height: 34, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    cursor: commentText.trim() ? 'pointer' : 'not-allowed',
                                    flexShrink: 0, transition: 'background .15s', alignSelf: 'flex-end',
                                }}
                                onMouseEnter={e => { if (commentText.trim()) e.currentTarget.style.transform = 'scale(1.08)' }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                            >
                                <i className="ti ti-send" style={{ fontSize: 15 }} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </article>
    )
}

/* ─────────────────────────────────────────────────────────────────────
   ForoPage — página principal
   ───────────────────────────────────────────────────────────────────── */
export default function ForoPage() {
    const { id: currentUserId, name, username, initials } = useUser()
    const currentUser = { id: currentUserId, name, username, initials }

    const [posts, setPosts]               = useState([])
    const [loading, setLoading]           = useState(true)
    const [filter, setFilter]             = useState('Todos')

    /* Composer */
    const [showCompose, setShowCompose]   = useState(false)
    const [newTitle, setNewTitle]         = useState('')
    const [newContent, setNewContent]     = useState('')
    const [newPhoto, setNewPhoto]         = useState(null)
    const [selectedTag, setSelectedTag]   = useState(null)
    const [publishing, setPublishing]     = useState(false)

    /* Toast */
    const [toast, setToast] = useState({ msg: '', type: 'ok' })
    const showToast = (msg, type = 'ok') => {
        setToast({ msg, type })
        setTimeout(() => setToast({ msg: '', type: 'ok' }), 3000)
    }

    /* ── Cargar publicaciones del backend ── */
    const fetchPosts = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await ForoApi.get('/posts/listar')
            setPosts(data.data || [])
        } catch (e) {
            const msg = e?.response?.data?.message || 'No se pudieron cargar las publicaciones'
            showToast(`Error ${e?.response?.status || ''}: ${msg}`, 'error')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchPosts() }, [fetchPosts])

    /* ── Publicar ── */
    const handlePublish = async () => {
        if (!newTitle.trim() || !newContent.trim()) {
            showToast('El título y el contenido son obligatorios', 'error'); return
        }
        setPublishing(true)
        try {
            const fd = new FormData()
            fd.append('title', newTitle.trim())
            fd.append('content', newContent.trim())
            if (newPhoto) fd.append('photo', newPhoto)
            // Guardamos la etiqueta como campo adicional si el backend lo soporta en el futuro
            // fd.append('tag', selectedTag || '')
            await ForoApi.post('/posts/create', fd)
            showToast('¡Publicación creada!')
            setNewTitle(''); setNewContent(''); setNewPhoto(null); setSelectedTag(null)
            setShowCompose(false)
            fetchPosts()
        } catch (e) {
            showToast(e?.response?.data?.message || 'Error al publicar', 'error')
        } finally {
            setPublishing(false)
        }
    }

    const allTags  = ['Todos', ...TAG_OPTIONS.map(t => t.label)]
    const filtered = filter === 'Todos' ? posts : posts.filter(p => p._tag === filter)

    return (
        <>
            <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <Toast msg={toast.msg} type={toast.type} />

            <div style={{ padding: '28px 32px', maxWidth: 780, margin: '0 auto', fontFamily: T.font }}>

                {/* ── Header ── */}
                <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: T.radius.md,
                            background: `linear-gradient(135deg,${T.green},${T.greenDark})`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(15,110,86,.25)',
                        }}>
                            <i className="ti ti-messages" style={{ color: T.white, fontSize: 20 }} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: 20, fontWeight: 700, color: T.ink, lineHeight: 1 }}>Foro Eco</h1>
                            <p style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>Comparte ideas y aprende con la comunidad</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        {[{ label: 'Publicaciones', value: posts.length }].map(s => (
                            <div key={s.label} style={{
                                background: T.white, border: `1px solid ${T.border}`,
                                borderRadius: T.radius.md, padding: '10px 18px',
                                textAlign: 'center', boxShadow: T.shadow, minWidth: 80,
                            }}>
                                <p style={{ fontSize: 20, fontWeight: 700, color: T.greenDark }}>{s.value}</p>
                                <p style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Composer ── */}
                <div style={{
                    background: T.white, borderRadius: T.radius.lg,
                    border: `1px solid ${showCompose ? T.green : T.border}`,
                    padding: '16px 20px', marginBottom: 20,
                    boxShadow: showCompose ? `0 6px 24px rgba(15,110,86,.12), 0 0 0 3px rgba(29,158,117,.07)` : T.shadow,
                    transition: 'border-color .2s, box-shadow .2s',
                }}>
                    {!showCompose ? (
                        <div onClick={() => setShowCompose(true)} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'text' }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                                background: `linear-gradient(135deg,${T.green},${T.greenDark})`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: T.white, fontWeight: 700, fontSize: 15,
                            }}>{initials}</div>
                            <div style={{
                                flex: 1, background: T.bone, borderRadius: T.radius.md,
                                padding: '11px 16px', border: `1px solid ${T.border}`,
                                color: T.muted, fontSize: 14,
                            }}>
                                ¿Qué quieres compartir con la comunidad eco?
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                                    background: `linear-gradient(135deg,${T.green},${T.greenDark})`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: T.white, fontWeight: 700, fontSize: 15,
                                }}>{initials}</div>
                                <div>
                                    <p style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{name}</p>
                                    <p style={{ fontSize: 12, color: T.muted }}>@{username}</p>
                                </div>
                            </div>

                            {/* TÍTULO — requerido por el backend */}
                            <label style={{ fontSize: 11, fontWeight: 600, color: T.muted, letterSpacing: '.07em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                                Título <span style={{ color: '#DC2626' }}>*</span>
                            </label>
                            <input
                                autoFocus
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                                placeholder="Dale un título claro a tu publicación…"
                                maxLength={120}
                                style={{
                                    width: '100%', border: `1.5px solid ${T.border}`,
                                    borderRadius: T.radius.md, padding: '10px 14px',
                                    fontSize: 14, fontFamily: T.font, outline: 'none',
                                    background: T.bone, color: T.ink, marginBottom: 12,
                                    transition: 'border-color .15s, box-shadow .15s', boxSizing: 'border-box',
                                }}
                                onFocus={e => { e.target.style.borderColor = T.green; e.target.style.boxShadow = `0 0 0 3px rgba(29,158,117,.10)` }}
                                onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = 'none' }}
                            />

                            {/* CONTENIDO — requerido por el backend */}
                            <label style={{ fontSize: 11, fontWeight: 600, color: T.muted, letterSpacing: '.07em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                                Contenido <span style={{ color: '#DC2626' }}>*</span>
                            </label>
                            <textarea
                                rows={4}
                                value={newContent}
                                onChange={e => setNewContent(e.target.value)}
                                placeholder="Comparte tu experiencia, un consejo, un logro o una pregunta sobre reciclaje…"
                                style={{
                                    width: '100%', border: `1.5px solid ${T.border}`,
                                    borderRadius: T.radius.md, padding: '12px 14px',
                                    fontSize: 14, resize: 'vertical', fontFamily: T.font,
                                    outline: 'none', background: T.bone, lineHeight: 1.65,
                                    marginBottom: 14, minHeight: 100, color: T.ink,
                                    transition: 'border-color .15s, box-shadow .15s', boxSizing: 'border-box',
                                }}
                                onFocus={e => { e.target.style.borderColor = T.green; e.target.style.boxShadow = `0 0 0 3px rgba(29,158,117,.10)` }}
                                onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = 'none' }}
                            />

                            {/* IMAGEN — opcional, soportada por el backend */}
                            <ImagePicker file={newPhoto} onChange={setNewPhoto} onRemove={() => setNewPhoto(null)} />

                            {/* ETIQUETA — solo frontend por ahora */}
                            <div style={{ marginBottom: 16 }}>
                                <p style={{ fontSize: 11, fontWeight: 600, color: T.muted, marginBottom: 8, letterSpacing: '.07em', textTransform: 'uppercase' }}>
                                    Etiqueta (opcional)
                                </p>
                                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                                    {TAG_OPTIONS.map(tag => {
                                        const isSel = selectedTag === tag.label
                                        return (
                                            <button key={tag.label}
                                                onClick={() => setSelectedTag(isSel ? null : tag.label)}
                                                style={{
                                                    padding: '6px 14px', borderRadius: T.radius.pill,
                                                    fontSize: 12, fontWeight: 600,
                                                    border: `1.5px solid ${isSel ? tag.color : 'transparent'}`,
                                                    background: isSel ? tag.bg : '#eef3ee',
                                                    color: isSel ? tag.color : T.muted,
                                                    cursor: 'pointer', transition: 'all .15s', fontFamily: T.font,
                                                    boxShadow: isSel ? `0 2px 8px ${tag.color}30` : 'none',
                                                }}
                                            >{tag.label}</button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                <button onClick={() => { setShowCompose(false); setNewTitle(''); setNewContent(''); setNewPhoto(null); setSelectedTag(null) }} style={btnGhost}>
                                    Cancelar
                                </button>
                                <button
                                    onClick={handlePublish}
                                    disabled={!newTitle.trim() || !newContent.trim() || publishing}
                                    style={{
                                        ...btnPrimary,
                                        background: (newTitle.trim() && newContent.trim() && !publishing)
                                            ? `linear-gradient(135deg,${T.green},${T.greenDark})` : '#9CA3AF',
                                        cursor: (newTitle.trim() && newContent.trim()) ? 'pointer' : 'not-allowed',
                                        opacity: publishing ? .7 : 1,
                                        padding: '8px 22px',
                                    }}
                                >
                                    <i className="ti ti-send" style={{ fontSize: 14 }} />
                                    {publishing ? 'Publicando…' : 'Publicar'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Filtros (solo front) ── */}
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 20 }}>
                    {allTags.map(tag => {
                        const tagDef  = TAG_OPTIONS.find(t => t.label === tag)
                        const isActive = filter === tag
                        return (
                            <button key={tag} onClick={() => setFilter(tag)} style={{
                                padding: '6px 16px', borderRadius: T.radius.pill, fontSize: 12, fontWeight: 600,
                                border: `1.5px solid ${isActive ? (tag === 'Todos' ? T.greenDark : tagDef?.color) : T.border}`,
                                background: isActive ? (tag === 'Todos' ? T.greenDark : tagDef?.bg) : T.white,
                                color: isActive ? (tag === 'Todos' ? T.white : tagDef?.color) : T.muted,
                                cursor: 'pointer', transition: 'all .15s', fontFamily: T.font,
                                boxShadow: isActive
                                    ? `0 3px 10px ${tag === 'Todos' ? 'rgba(15,110,86,.25)' : tagDef?.color + '35'}`
                                    : T.shadow,
                            }}>{tag}</button>
                        )
                    })}
                </div>

                {/* ── Feed ── */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: T.muted, fontFamily: T.font }}>
                        <i className="ti ti-loader-2" style={{ fontSize: 32, display: 'block', marginBottom: 10, animation: 'spin 1s linear infinite' }} />
                        Cargando publicaciones…
                        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{
                        background: T.white, borderRadius: T.radius.lg,
                        border: `1px solid ${T.border}`, padding: '64px 24px',
                        textAlign: 'center', boxShadow: T.shadow,
                    }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: '50%',
                            background: '#E8F5F0', border: '2px solid #A7DEC8',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px',
                        }}>
                            <i className="ti ti-plant-2" style={{ fontSize: 30, color: T.green }} />
                        </div>
                        <p style={{ fontSize: 15, fontWeight: 600, color: T.ink, marginBottom: 6 }}>
                            {filter === 'Todos' ? 'El foro está vacío por ahora' : `No hay publicaciones en "${filter}"`}
                        </p>
                        <p style={{ fontSize: 13, color: T.muted }}>¡Sé el primero en compartir algo con la comunidad eco!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {filtered.map(post => (
                            <PostCard
                                key={post._id}
                                post={post}
                                currentUserId={currentUserId}
                                currentUser={currentUser}
                                onRefresh={fetchPosts}
                                onToast={showToast}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}