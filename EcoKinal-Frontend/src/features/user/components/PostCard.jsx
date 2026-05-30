import { useState } from 'react'
import { useForoStore } from '../store/useForoStore'
import Avatar from './Avatar'
import CommentSection from './CommentSection'

const TAG_STYLES = {
    Logro:    'bg-amber-50 text-amber-600 border-amber-200',
    Pregunta: 'bg-sky-50 text-sky-600 border-sky-200',
    Consejo:  'bg-violet-50 text-violet-600 border-violet-200',
    Noticia:  'bg-rose-50 text-rose-600 border-rose-200',
}

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

    const tagStyle = TAG_STYLES[post.tag] || 'bg-slate-50 text-slate-500 border-slate-200'

    return (
        <article className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300/60 transition-all duration-300 overflow-hidden flex flex-col group">
            
            {/* Header */}
            <div className="px-5 pt-4 pb-3 flex gap-3 items-center">
                <Avatar 
                    image={post._authorImage || post.authorImage} 
                    initials={post._authorInitials || post.authorInitials || 'U'} 
                    size={40} 
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-800 truncate">
                            {post._authorName || post.authorName || 'Usuario de EcoKinal'}
                        </span>
                        {isMyPost && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 tracking-wide">
                                TÚ
                            </span>
                        )}
                        {post.tag && (
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${tagStyle}`}>
                                {post.tag}
                            </span>
                        )}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">@comunidad_eco</span>
                </div>

                {/* Owner actions */}
                {isMyPost && !isEditing && (
                    <div className="ml-auto flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={() => setIsEditing(true)} 
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                            title="Editar"
                        >
                            <i className="ti ti-pencil text-sm" />
                        </button>
                        <button 
                            onClick={handleDelete} 
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                            title="Eliminar"
                        >
                            <i className="ti ti-trash text-sm" />
                        </button>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="px-5 pb-4 flex-1">
                {isEditing ? (
                    <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <input 
                            value={editTitle} 
                            onChange={e => setEditTitle(e.target.value)} 
                            className="w-full px-3.5 py-2.5 text-sm font-bold border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10 bg-white transition-all" 
                            placeholder="Título de la publicación"
                        />
                        <textarea 
                            value={editContent} 
                            onChange={e => setEditContent(e.target.value)} 
                            rows={3} 
                            className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10 bg-white resize-none transition-all leading-relaxed" 
                            placeholder="Contenido..."
                        />
                        <div className="flex gap-2 justify-end">
                            <button 
                                onClick={() => setIsEditing(false)} 
                                className="px-3.5 py-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSavePost} 
                                className="px-4 py-2 text-xs font-black text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 shadow-sm shadow-emerald-500/20 active:scale-95 transition-all"
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="text-[15px] font-black text-slate-900 mb-1.5 leading-snug">{post.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{post.content}</p>
                        {post.photo && (
                            <div className="mt-4 rounded-xl overflow-hidden border border-slate-100 max-h-72 bg-slate-900 flex items-center justify-center">
                                <img src={post.photo} alt="Publicación" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Actions bar */}
            <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
                <button 
                    onClick={() => toggleLikePost(post._id)} 
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95
                        ${hasLiked
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/20'
                            : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50'
                        }`}
                >
                    <i className={`text-base ${hasLiked ? 'ti ti-heart-filled' : 'ti ti-heart'}`} />
                    <span>{post.likes?.length || 0}</span>
                </button>
                
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all
                        ${isExpanded
                            ? 'bg-slate-800 text-white border-slate-800'
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                        }`}
                >
                    <i className="ti ti-message-circle text-base" />
                    <span>Comentarios</span>
                    {isExpanded
                        ? <i className="ti ti-chevron-up text-xs ml-0.5" />
                        : <i className="ti ti-chevron-down text-xs ml-0.5" />
                    }
                </button>
            </div>

            {/* Comments panel */}
            {isExpanded && (
                <CommentSection 
                    postId={post._id} 
                    currentUserId={currentUserId} 
                    currentUser={currentUser} 
                    onToast={onToast} 
                />
            )}
        </article>
    )
}