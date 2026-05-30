import { useEffect, useState } from 'react'
import { useUser } from '../store/useUserStore'
import { useForoStore } from '../store/useForoStore'
import PostCard from '../components/PostCard'

// Etiquetas exactas según el ENUM de tu archivo publi.model.js
const TAGS = ['Logro', 'Pregunta', 'Consejo', 'Noticia']

// Color por tag para los chips del filtro
const TAG_COLORS = {
    Logro:    { active: 'bg-amber-500 text-white border-amber-500 shadow-amber-500/20',    dot: 'bg-amber-400'   },
    Pregunta: { active: 'bg-sky-500 text-white border-sky-500 shadow-sky-500/20',          dot: 'bg-sky-400'     },
    Consejo:  { active: 'bg-violet-500 text-white border-violet-500 shadow-violet-500/20', dot: 'bg-violet-400'  },
    Noticia:  { active: 'bg-rose-500 text-white border-rose-500 shadow-rose-500/20',       dot: 'bg-rose-400'    },
}

export default function ForoPage() {
    const { id: currentUserId, name, username, image, initials } = useUser()
    const currentUser = { id: currentUserId, name, username, image, initials }

    const { posts, loading, filter, setFilter, fetchPosts, createPost } = useForoStore()

    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [selectedTag, setSelectedTag] = useState('')
    
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    
    const [toast, setToast] = useState({ show: false, text: '', type: 'success' })

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const showToast = (text, type = 'success') => {
        setToast({ show: true, text, type })
        setTimeout(() => setToast({ show: false, text: '', type: 'success' }), 4000)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleRemoveImage = () => {
        setImageFile(null)
        setImagePreview(null)
    }

    const handlePublish = async (e) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) {
            showToast('Por favor, llena el título y el contenido', 'error')
            return
        }

        const fd = new FormData()
        fd.append('title', title.trim())
        fd.append('content', content.trim())
        
        fd.append('tag', selectedTag || 'Todos')

        if (imageFile) {
            fd.append('photo', imageFile) 
        }

        const res = await createPost(fd)
        if (res.success) {
            setTitle('')
            setContent('')
            setSelectedTag('')
            setImageFile(null)
            setImagePreview(null)
            setIsComposeOpen(false)
            showToast('¡Publicación compartida con éxito!')
        } else {
            showToast(res.message, 'error')
        }
    }

    const filteredPosts = filter === 'Todos' 
        ? posts 
        : posts.filter(post => post.tag?.toLowerCase() === filter.toLowerCase())

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-7 animate-fadeIn">
            
            {/* Toast */}
            {toast.show && (
                <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl border text-xs font-bold flex items-center gap-2.5 transition-all
                    ${toast.type === 'error'
                        ? 'bg-red-50 text-red-600 border-red-200 shadow-red-100'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-100'
                    }`}
                >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm
                        ${toast.type === 'error' ? 'bg-red-100' : 'bg-emerald-100'}`}>
                        <i className={toast.type === 'error' ? "ti ti-x" : "ti ti-check"} />
                    </span>
                    {toast.text}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/25">
                        <i className="ti ti-messages text-white text-base" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                        Foro Comunitario <span className="text-emerald-500">EcoKinal</span>
                    </h1>
                </div>
                <p className="text-sm text-slate-400 pl-0.5 mt-0.5">
                    Comparte ideas, publica tus logros ambientales y resuelve tus dudas con otros usuarios.
                </p>
            </div>

            {/* Filtros */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
                <button 
                    onClick={() => setFilter('Todos')}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap shadow-sm
                        ${filter === 'Todos'
                            ? 'bg-slate-800 text-white border-slate-800 shadow-slate-800/15'
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                        }`}
                >
                    Todos <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-black
                        ${filter === 'Todos' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {posts.length}
                    </span>
                </button>

                {TAGS.map(t => {
                    const count = posts.filter(p => p.tag?.toLowerCase() === t.toLowerCase()).length
                    const colors = TAG_COLORS[t] || {}
                    return (
                        <button 
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap shadow-sm flex items-center gap-1.5
                                ${filter === t
                                    ? `${colors.active} shadow-md`
                                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                                }`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${filter === t ? 'bg-white/70' : colors.dot}`} />
                            {t}
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black
                                ${filter === t ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                {count}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Compose Box */}
            <div className={`bg-white border rounded-2xl transition-all duration-300
                ${isComposeOpen
                    ? 'border-emerald-200 shadow-lg ring-1 ring-emerald-500/10'
                    : 'border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'
                }`}>
                {!isComposeOpen ? (
                    <button 
                        onClick={() => setIsComposeOpen(true)}
                        className="w-full text-left px-5 py-4 flex items-center gap-3.5 group"
                    >
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-200 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 group-hover:shadow-md group-hover:shadow-emerald-500/25 transition-all duration-200">
                            <i className="ti ti-edit text-sm" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                                ¿Qué quieres aportar hoy, <span className="text-emerald-600">{name.split(' ')[0]}</span>?
                            </span>
                            <span className="text-xs text-slate-400">Comparte un logro, consejo, noticia o pregunta</span>
                        </div>
                        <div className="ml-auto w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-sm transition-all duration-200">
                            <i className="ti ti-plus text-sm" />
                        </div>
                    </button>
                ) : (
                    <form onSubmit={handlePublish} className="flex flex-col animate-slideDown">

                        {/* Form header banda verde */}
                        <div className="flex items-center justify-between px-5 py-3.5 bg-emerald-500 rounded-t-2xl">
                            <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                                    <i className="ti ti-pencil text-white text-xs" />
                                </div>
                                <span className="text-xs font-black text-white tracking-widest uppercase">Nueva Publicación</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => { setIsComposeOpen(false); setSelectedTag(''); setTitle(''); setContent(''); handleRemoveImage() }}
                                className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                            >
                                <i className="ti ti-x text-sm" />
                            </button>
                        </div>

                        {/* Fields */}
                        <div className="flex flex-col gap-4 p-5">

                            {/* Title */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Título</label>
                                <input 
                                    type="text"
                                    placeholder="Escribe un título claro y descriptivo..."
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className="w-full text-sm font-bold text-slate-800 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10 bg-slate-50/80 placeholder:font-normal placeholder:text-slate-400 transition-all"
                                />
                            </div>
                            
                            {/* Content */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contenido</label>
                                <textarea 
                                    placeholder="Describe tu consejo, noticia, idea o pregunta con detalle..."
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    rows={4}
                                    className="w-full text-sm text-slate-600 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10 bg-slate-50/80 placeholder:text-slate-400 resize-none transition-all leading-relaxed"
                                />
                            </div>

                            {/* Photo */}
                            <div className="flex flex-col gap-2.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Foto (opcional)</label>
                                <label className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-500 hover:border-emerald-400 hover:bg-emerald-50/60 hover:text-emerald-600 cursor-pointer text-xs font-semibold transition-all select-none group/photo">
                                    <div className="w-5 h-5 rounded-lg bg-slate-200 group-hover/photo:bg-emerald-100 flex items-center justify-center transition-colors">
                                        <i className="ti ti-camera text-xs" />
                                    </div>
                                    <span>{imageFile ? 'Cambiar foto' : 'Añadir foto'}</span>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                        className="hidden" 
                                    />
                                </label>

                                {imagePreview && (
                                    <div className="relative rounded-xl overflow-hidden border border-slate-200 max-h-52 bg-slate-900 flex items-center justify-center animate-fadeIn shadow-sm">
                                        <img src={imagePreview} alt="Vista previa" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
                                        <button 
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-2.5 right-2.5 w-7 h-7 bg-slate-900/70 backdrop-blur-sm text-white hover:bg-red-500 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center"
                                            title="Quitar foto"
                                        >
                                            <i className="ti ti-x text-xs" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoría</label>
                                <div className="flex gap-2 flex-wrap">
                                    {TAGS.map(t => {
                                        const colors = TAG_COLORS[t] || {}
                                        const isSelected = selectedTag === t
                                        return (
                                            <button 
                                                key={t}
                                                type="button"
                                                onClick={() => setSelectedTag(selectedTag === t ? '' : t)}
                                                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2
                                                    ${isSelected
                                                        ? `${colors.active} shadow-sm scale-[1.02]`
                                                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.01]'
                                                    }`}
                                            >
                                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isSelected ? 'bg-white/80' : colors.dot}`} />
                                                {t}
                                                {isSelected && <i className="ti ti-check text-xs ml-0.5" />}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>

                        {/* Footer actions */}
                        <div className="flex gap-2 justify-end px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 rounded-b-2xl">
                            <button 
                                type="button"
                                onClick={() => { setIsComposeOpen(false); setSelectedTag(''); setTitle(''); setContent(''); handleRemoveImage() }}
                                className="px-4 py-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-all"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                className="px-5 py-2 text-xs font-black text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 shadow-md shadow-emerald-500/25 active:scale-95 transition-all flex items-center gap-2"
                            >
                                <i className="ti ti-send text-sm" />
                                Publicar
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Posts list */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-slate-200 border-t-emerald-500 animate-spin" />
                    <p className="text-xs font-semibold tracking-wide">Sincronizando con la red EcoKinal…</p>
                </div>
            ) : filteredPosts.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {filteredPosts.map(post => (
                        <PostCard 
                            key={post._id}
                            post={post}
                            currentUserId={currentUserId}
                            currentUser={currentUser}
                            onToast={showToast}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-white border border-slate-100 rounded-2xl shadow-sm gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <i className="ti ti-leaf text-2xl text-slate-300" />
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-black text-slate-700 mb-1">
                            {filter === 'Todos' ? 'El foro está vacío' : `Sin publicaciones en "${filter}"`}
                        </h4>
                        <p className="text-xs text-slate-400 max-w-[220px] leading-relaxed">
                            ¡Sé el primero de la comunidad en escribir algo!
                        </p>
                    </div>
                    <button
                        onClick={() => setIsComposeOpen(true)}
                        className="px-4 py-2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-all"
                    >
                        Crear primera publicación
                    </button>
                </div>
            )}
        </div>
    )
}