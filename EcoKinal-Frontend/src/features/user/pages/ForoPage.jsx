import { useEffect, useState } from 'react'
import { useUser } from '../store/useUserStore'
import { useForoStore } from '../store/useForoStore'
import PostCard from '../components/PostCard'

const TAGS = ['Logro', 'Pregunta', 'Consejo', 'Noticia']

const TAG_STYLES = {
    Logro: { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', dot: '#F59E0B' },
    Pregunta: { bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD', dot: '#38BDF8' },
    Consejo: { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE', dot: '#A78BFA' },
    Noticia: { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3', dot: '#FB7185' },
}

function FilterBtn({ active, onClick, children, count }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 22px', fontSize: 13, fontWeight: 700,
                borderRadius: 14, cursor: 'pointer',
                transition: 'all 0.2s', border: 'none',
                background: active ? '#C0DD97' : 'transparent',
                color: active ? '#27500A' : '#639922',
            }}
        >
            {children}
            <span style={{
                padding: '2px 8px', borderRadius: 10, fontSize: 10,
                background: active ? '#97C459' : '#F1F7E8',
                color: active ? '#173404' : '#639922'
            }}>
                {count}
            </span>
        </button>
    )
}

export default function ForoPage() {
    const { id: currentUserId, uid, name, username, image, photo, profilePicture, initials } = useUser()

    const currentUser = {
        id: currentUserId || uid,
        uid: uid || currentUserId,
        name,
        username,
        photo: photo || profilePicture || image,
        profilePicture: profilePicture || photo || image,
        initials
    }

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

        fd.append('authorNameForm', currentUser.name || '')
        fd.append('authorPhotoForm', currentUser.photo || currentUser.profilePicture || '')

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
        <div style={{ background: '#EAF3DE', minHeight: '100vh', height: '100%', padding: '2.5rem 3rem', boxSizing: 'border-box' }}>
            <style>{detectorStyles}</style>

            {/* Toast Notifications */}
            {toast.show && (
                <div style={{
                    position: 'fixed', bottom: 24, right: 24, zIndex: 50,
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 18px', borderRadius: 14, fontSize: 13, fontWeight: 500,
                    background: toast.type === 'error' ? '#FCEBEB' : '#F1F7E8',
                    border: `0.5px solid ${toast.type === 'error' ? '#F09595' : '#C0DD97'}`,
                    color: toast.type === 'error' ? '#791F1F' : '#27500A',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }} className="animate-fade-up">
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }} stroke="currentColor" strokeWidth="2">
                        {toast.type === 'error' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        )}
                    </svg>
                    {toast.text}
                </div>
            )}

            <div style={{ width: '100%', maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                {/* ── Header ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '6px 14px', borderRadius: 99, width: 'fit-content',
                            background: '#C0DD97', border: '0.5px solid #97C459',
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" style={{ width: 13, height: 13 }} stroke="#27500A" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.221-1.11-2.203-2.5-2.203-3.69 0-7.38 0-11.07 0C2.36 4.434 1.25 5.416 1.25 6.637v8.508c0 1.22 1.11 2.203 2.5 2.203h.75v3.136l3.328-3.136h3.172" />
                        </svg>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#27500A', textTransform: 'uppercase' }}>
                            EcoKinal · Comunidad
                        </span>
                    </div>

                    <h1 className="eco-font" style={{ fontSize: 48, fontWeight: 800, color: '#173404', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
                        Foro <span style={{ color: '#3B6D11' }}>Comunitario</span>
                    </h1>
                    <p style={{ fontSize: 15, color: '#639922', maxWidth: 500, lineHeight: 1.75, margin: 0 }}>
                        Comparte ideas, publica tus logros ambientales y resuelve tus dudas con otros usuarios.
                    </p>
                </div>

                {/* ── Filtros (Estilo Tabs) ── */}
                <div style={{
                    display: 'flex', padding: 8, gap: 6,
                    borderRadius: 20, width: 'fit-content',
                    background: '#fff', border: '0.5px solid #C0DD97',
                    overflowX: 'auto'
                }}>
                    <FilterBtn active={filter === 'Todos'} onClick={() => setFilter('Todos')} count={posts.length}>
                        Todos
                    </FilterBtn>

                    {TAGS.map(t => {
                        const count = posts.filter(p => p.tag?.toLowerCase() === t.toLowerCase()).length
                        return (
                            <FilterBtn key={t} active={filter === t} onClick={() => setFilter(t)} count={count}>
                                {t}
                            </FilterBtn>
                        )
                    })}
                </div>

                {/* ── Compose Box ── */}
                <div style={{
                    background: '#fff', border: '0.5px solid #C0DD97', borderRadius: 18,
                    overflow: 'hidden', transition: 'all 0.3s ease'
                }}>
                    {!isComposeOpen ? (
                        <button
                            onClick={() => setIsComposeOpen(true)}
                            style={{
                                width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
                                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left'
                            }}
                        >
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F1F7E8', border: '0.5px solid #C0DD97', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }} stroke="#639922" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <span style={{ fontSize: 15, fontWeight: 700, color: '#173404' }}>
                                    ¿Qué quieres aportar hoy, <span style={{ color: '#639922' }}>{name ? name.split(' ')[0] : 'Usuario'}</span>?
                                </span>
                                <span style={{ fontSize: 13, color: '#639922' }}>Comparte un logro, consejo, noticia o pregunta</span>
                            </div>
                        </button>
                    ) : (
                        <form onSubmit={handlePublish} className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column' }}>

                            {/* Header Form */}
                            <div style={{ padding: '16px 24px', background: '#F1F7E8', borderBottom: '0.5px solid #C0DD97', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#27500A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    Nueva Publicación
                                </span>
                                <button type="button" onClick={() => setIsComposeOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#639922' }}>
                                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            {/* Contenido Formulario */}
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#97C459', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Título</label>
                                    <input
                                        type="text" placeholder="Escribe un título descriptivo..." value={title} onChange={e => setTitle(e.target.value)}
                                        style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '0.5px solid #C0DD97', background: '#FAFCF7', color: '#173404', fontSize: 14, outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#97C459', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contenido</label>
                                    <textarea
                                        placeholder="Describe tu consejo, idea o pregunta con detalle..." value={content} onChange={e => setContent(e.target.value)} rows={4}
                                        style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '0.5px solid #C0DD97', background: '#FAFCF7', color: '#173404', fontSize: 14, outline: 'none', resize: 'none' }}
                                    />
                                </div>

                                {/* Tags y Foto en fila */}
                                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 250 }}>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#97C459', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categoría</label>
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                            {TAGS.map(t => {
                                                const isSelected = selectedTag === t;
                                                const style = TAG_STYLES[t];
                                                return (
                                                    <button
                                                        key={t} type="button" onClick={() => setSelectedTag(selectedTag === t ? '' : t)}
                                                        style={{
                                                            padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
                                                            cursor: 'pointer', border: `0.5px solid ${isSelected ? style.border : '#C0DD97'}`,
                                                            background: isSelected ? style.bg : '#FAFCF7',
                                                            color: isSelected ? style.color : '#639922',
                                                        }}
                                                    >
                                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: style.dot }} />
                                                        {t}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <label style={{ fontSize: 11, fontWeight: 700, color: '#97C459', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Foto (Opcional)</label>
                                        <label style={{
                                            padding: '8px 16px', borderRadius: 10, border: '0.5px dashed #97C459', background: '#FAFCF7',
                                            color: '#639922', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
                                        }}>
                                            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" /></svg>
                                            {imageFile ? 'Cambiar foto' : 'Subir foto'}
                                            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                        </label>

                                        {imagePreview && (
                                            <div style={{ position: 'relative', width: 80, height: 80, borderRadius: 10, overflow: 'hidden', border: '0.5px solid #C0DD97' }}>
                                                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                <button type="button" onClick={handleRemoveImage} style={{ position: 'absolute', top: 4, right: 4, background: '#791F1F', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 12, height: 12 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>

                            {/* Acciones */}
                            <div style={{ padding: '16px 24px', background: '#FAFCF7', borderTop: '0.5px solid #C0DD97', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                                <button type="button" onClick={() => setIsComposeOpen(false)} style={{ padding: '10px 20px', borderRadius: 99, background: 'transparent', border: 'none', color: '#639922', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                                    Cancelar
                                </button>
                                <button type="submit" style={{ padding: '10px 24px', borderRadius: 99, background: '#3B6D11', border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    Publicar
                                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* ── Posts List ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#639922', fontSize: 14 }}>Cargando publicaciones...</div>
                    ) : filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <PostCard
                                key={post._id}
                                post={post}
                                currentUserId={currentUser.id}
                                currentUser={currentUser}
                                onToast={showToast}
                            />
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#639922', fontSize: 14, background: '#fff', borderRadius: 18, border: '0.5px solid #C0DD97' }}>
                            No hay publicaciones en esta categoría.
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

// ─── Animaciones globales y utilidades CSS (Igual al Detector) ──────────
const detectorStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-up { animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #C0DD97; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: #97C459; }
`;