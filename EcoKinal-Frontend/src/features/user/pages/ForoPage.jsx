import { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../store/useUserStore'
import { useForoStore } from '../store/useForoStore'
import PostCard from '../components/ForoComps/PostCard'
import { completarRetoPorAccion } from '../../../shared/Api/Gamificacion'
import { SkeletonCard } from '../../../ui/Foro/SkeletonCard'
import { EmptyState } from '../../../ui/Foro/EmptyState'
import { FilterBtn } from '../../../ui/Foro/FilterBtn'
import { LeftSidebar } from '../../../ui/Foro/Sidebars'
import { TAGS, TAG_STYLES, pageStyles } from '../../../Styles/constants/ForoPage.js'
import EcoBotFlotante from './EcoBotFlotante.jsx'

export default function ForoPage() {
    const navigate = useNavigate()
    const { id: currentUserId, uid, name, username, image, photo, profilePicture, initials } = useUser()

    const currentUser = {
        id: currentUserId || uid,
        uid: uid || currentUserId,
        name, username,
        photo: photo || profilePicture || image,
        profilePicture: profilePicture || photo || image,
        initials,
    }

    const {
        posts, loading, filter, setFilter, fetchPosts, createPost,
        searchPosts, clearSearch, searchResults, searchLoading, searchQuery,
    } = useForoStore()

    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [selectedTag, setSelectedTag] = useState('')
    const [imageFiles, setImageFiles] = useState([])
    const [imagePreviews, setImagePreviews] = useState([])
    const [toast, setToast] = useState({ show: false, text: '', type: 'success' })

    const [inputSearch, setInputSearch] = useState('')
    const isSearchMode = searchQuery.trim().length > 0
    const searchTimeoutRef = useRef(null)

    const debounceSearch = useCallback((val) => {
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
        searchTimeoutRef.current = setTimeout(() => {
            if (val.trim()) searchPosts(val.trim())
            else clearSearch()
        }, 400)
    }, [searchPosts, clearSearch])

    useEffect(() => {
        return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current) }
    }, [])

    const handleSearchChange = (e) => {
        const val = e.target.value
        setInputSearch(val)
        debounceSearch(val)
    }

    const handleClearSearch = () => {
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
        setInputSearch('')
        clearSearch()
    }

    useEffect(() => { fetchPosts() }, [fetchPosts])

    const showToast = (text, type = 'success') => {
        setToast({ show: true, text, type })
        setTimeout(() => setToast({ show: false, text: '', type: 'success' }), 4000)
    }

    const handleImageChange = (e) => {
        const selected = Array.from(e.target.files)
        if (!selected.length) return
        const nextFiles = [...imageFiles, ...selected].slice(0, 5)
        const nextPreviews = [...imagePreviews, ...selected.map(f => URL.createObjectURL(f))].slice(0, 5)
        setImageFiles(nextFiles)
        setImagePreviews(nextPreviews)
        e.target.value = ''
    }

    const handleRemoveImage = (index) => {
        if (imagePreviews[index]) URL.revokeObjectURL(imagePreviews[index])
        setImageFiles(prev => prev.filter((_, i) => i !== index))
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
    }

    useEffect(() => {
        return () => { imagePreviews.forEach(src => URL.revokeObjectURL(src)) }
    }, [imagePreviews])

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
        imageFiles.forEach(file => fd.append('photos', file))

        const res = await createPost(fd)
        if (res.success) {
            imagePreviews.forEach(src => URL.revokeObjectURL(src))
            setTitle(''); setContent(''); setSelectedTag('')
            setImageFiles([]); setImagePreviews([])
            setIsComposeOpen(false)
            showToast('¡Publicación compartida con éxito!')
            completarRetoPorAccion('foro_publicar').then(result => {
                if (result && !result.alreadyDone) {
                    showToast('📢 ¡Reto completado! Ve a Gamificación para reclamar tus puntos 🌿')
                }
            })
        } else {
            showToast(res.message, 'error')
        }
    }

    const displayPosts = isSearchMode
        ? searchResults
        : filter === 'Todos'
            ? posts
            : posts.filter(post => post.tag?.toLowerCase() === filter.toLowerCase())

    const isLoading = isSearchMode ? searchLoading : loading

    return (
        <>
            <div
                className="foro-page-wrapper"
                style={{
                    background: '#ffffff',
                    minHeight: '100vh',
                    padding: '2rem',
                    boxSizing: 'border-box',
                    width: '100%',
                }}
            >
                <style>{pageStyles}</style>

                {/* ── Toast ── */}
                {toast.show && (
                    <div
                        className="foro-toast animate-fade-up"
                        style={{
                            position: 'fixed', bottom: 24, right: 24, zIndex: 50,
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '14px 18px', borderRadius: 14, fontSize: 13, fontWeight: 500,
                            background: toast.type === 'error' ? '#FCEBEB' : '#EEF3ED',
                            border: `0.5px solid ${toast.type === 'error' ? '#F09595' : 'rgba(43, 95, 42, 0.15)'}`,
                            color: toast.type === 'error' ? '#791F1F' : '#2B5F2A',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        }}>
                        <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }} stroke="currentColor" strokeWidth="2">
                            {toast.type === 'error'
                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                : <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            }
                        </svg>
                        {toast.text}
                    </div>
                )}

                {/* ── Layout 2 columnas ── */}
                <div className="foro-grid">
                    {/* Columna izquierda — sticky */}
                    <div className="foro-sidebar-left foro-anim-1" style={{
                        position: 'sticky',
                        top: '80px',
                        maxHeight: 'calc(100vh - 96px)',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        scrollbarWidth: 'none',
                    }}>
                        <LeftSidebar
                            currentUser={currentUser}
                            posts={posts}
                            navigate={navigate}
                            filter={filter}
                            setFilter={setFilter}
                        />
                    </div>

                    {/* Columna central — feed */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>

                        {/* Header estilo Detector */}
                        <div className="foro-anim-2" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                padding: '5px 14px', borderRadius: 100, width: 'fit-content',
                                background: '#f0f7f0', border: '1px solid rgba(82,183,136,0.3)',
                                color: '#2d5a27',
                            }}>
                                <i className="ti ti-messages" style={{ fontSize: 12 }} />
                                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#2d5a27', textTransform: 'uppercase' }}>
                                    V2.6 · ECOKINAL FORO
                                </span>
                            </div>
                            <h1
                                className="foro-title-h1"
                                style={{ fontSize: 40, fontWeight: 800, color: '#1b3c1a', lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}
                            >
                                Foro Comunitario
                            </h1>
                            <p style={{ fontSize: 14, color: '#6b8e66', lineHeight: 1.65, margin: 0 }}>
                                Comparte ideas, publica tus logros ambientales y resuelve tus dudas con otros usuarios.
                            </p>
                        </div>

                        {/* Barra de búsqueda */}
                        <div className="foro-anim-3" style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            background: '#fff', border: `0.5px solid ${isSearchMode ? '#2B5F2A' : 'rgba(43, 95, 42, 0.15)'}`,
                            borderRadius: 16, padding: '10px 16px', transition: 'border-color 0.2s',
                            boxShadow: isSearchMode ? '0 0 0 3px rgba(43, 95, 42, 0.15)' : 'none',
                        }}>
                            {searchLoading ? (
                                <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18, flexShrink: 0, color: '#2B5F2A', animation: 'spin 0.8s linear infinite' }} stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18, flexShrink: 0, color: '#2B5F2A' }} stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            )}
                            <input
                                type="text"
                                placeholder="Buscar por título, contenido o #hashtag..."
                                value={inputSearch}
                                onChange={handleSearchChange}
                                style={{
                                    flex: 1, border: 'none', outline: 'none', background: 'transparent',
                                    fontSize: 14, color: '#111827', fontFamily: 'inherit', minWidth: 0,
                                }}
                            />
                            {inputSearch && (
                                <button onClick={handleClearSearch} style={{
                                    background: '#EEF3ED', border: 'none', borderRadius: 8,
                                    padding: '4px 10px', fontSize: 12, color: '#2B5F2A', cursor: 'pointer', fontWeight: 600, flexShrink: 0,
                                }}>
                                    Limpiar
                                </button>
                            )}
                        </div>

                        {/* Filtros */}
                        {!isSearchMode && (
                            <div className="foro-anim-4">
                            <>
                                {/* EN ESCRITORIO: Barra de botones horizontales */}
                                <div className="foro-filtros foro-filtros-desktop" style={{
                                    padding: 8, gap: 6, borderRadius: 20,
                                    background: '#fff', border: '0.5px solid rgba(43, 95, 42, 0.15)',
                                    overflowX: 'auto', flexWrap: 'nowrap',
                                    WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
                                }}>
                                    <FilterBtn active={filter === 'Todos'} onClick={() => setFilter('Todos')} count={posts.length}>
                                        Todos
                                    </FilterBtn>
                                    {TAGS.map(t => (
                                        <FilterBtn key={t} active={filter === t} onClick={() => setFilter(t)}
                                            count={posts.filter(p => p.tag?.toLowerCase() === t.toLowerCase()).length}>
                                            {t}
                                        </FilterBtn>
                                    ))}
                                </div>

                                {/* Mobile: dropdown */}
                                <select
                                    className="foro-filter-select foro-filtros-mobile"
                                    value={filter}
                                    onChange={e => setFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: 14,
                                        border: '0.5px solid rgba(43, 95, 42, 0.15)',
                                        background: '#fff',
                                        color: '#111827',
                                        fontSize: 14,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        outline: 'none',
                                        appearance: 'none',
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.5 8.25l-7.5 7.5-7.5-7.5' stroke='%232B5F2A' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 16px center',
                                        backgroundSize: '16px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                                    }}
                                >
                                    <option value="Todos">Todos ({posts.length})</option>
                                    {TAGS.map(t => (
                                        <option key={t} value={t}>
                                            {t} ({posts.filter(p => p.tag?.toLowerCase() === t.toLowerCase()).length})
                                        </option>
                                    ))}
                                </select>
                            </>
                            </div>
                        )}

                        {/* Etiqueta modo búsqueda */}
                        {isSearchMode && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 13, color: '#4b5a8a' }}>
                                    {searchLoading ? 'Buscando...' : `${searchResults.length} resultado${searchResults.length !== 1 ? 's' : ''} para`}
                                </span>
                                {!searchLoading && (
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#2B5F2A', background: '#EEF3ED', borderRadius: 8, padding: '2px 10px' }}>
                                        "{searchQuery}"
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Compose Box */}
                        {!isSearchMode && (
                            <div className="foro-anim-5" style={{
                                background: '#fff', border: '0.5px solid rgba(43, 95, 42, 0.15)', borderRadius: 18,
                                overflow: 'hidden', transition: 'all 0.3s ease',
                            }}>
                                {!isComposeOpen ? (
                                    <button
                                        className="foro-compose-trigger"
                                        onClick={() => setIsComposeOpen(true)}
                                        style={{
                                            width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
                                            background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                                        }}
                                    >
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EEF3ED', border: '0.5px solid rgba(43, 95, 42, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }} stroke="#2B5F2A" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                                            <span style={{ fontSize: 15, fontWeight: 700, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                ¿Qué quieres aportar hoy, <span style={{ color: '#2B5F2A' }}>{name ? name.split(' ')[0] : 'Usuario'}</span>?
                                            </span>
                                            <span style={{ fontSize: 13, color: '#4b5a8a' }}>Comparte un logro, consejo, noticia o pregunta</span>
                                        </div>
                                    </button>
                                ) : (
                                    <form onSubmit={handlePublish} className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div
                                            className="foro-compose-header"
                                            style={{ padding: '16px 24px', background: '#EEF3ED', borderBottom: '0.5px solid rgba(43, 95, 42, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        >
                                            <span style={{ fontSize: 12, fontWeight: 700, color: '#2B5F2A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                                Nueva Publicación
                                            </span>
                                            <button type="button" onClick={() => setIsComposeOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#4b5a8a' }}>
                                                <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }} stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div
                                            className="foro-compose-body"
                                            style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                <label style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Título</label>
                                                <input
                                                    type="text" placeholder="Escribe un título descriptivo..." value={title} onChange={e => setTitle(e.target.value)}
                                                    style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '0.5px solid rgba(43, 95, 42, 0.15)', background: '#EEF3ED', color: '#111827', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                <label style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contenido</label>
                                                <textarea
                                                    placeholder="Describe tu consejo, idea o pregunta... Usa #hashtags para que te encuentren." value={content} onChange={e => setContent(e.target.value)} rows={4}
                                                    style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '0.5px solid rgba(43, 95, 42, 0.15)', background: '#EEF3ED', color: '#111827', fontSize: 14, outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                                                />
                                            </div>

                                            {/* Fila inferior: Categoría + Fotos */}
                                            <div
                                                className="foro-compose-bottom-row"
                                                style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}
                                            >
                                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
                                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categoría</label>
                                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                        {TAGS.map(t => {
                                                            const isSelected = selectedTag === t
                                                            const s = TAG_STYLES[t]
                                                            return (
                                                                <button key={t} type="button" onClick={() => setSelectedTag(selectedTag === t ? '' : t)}
                                                                    style={{
                                                                        padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 600,
                                                                        display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                                                                        border: `0.5px solid ${isSelected ? s.border : 'rgba(43, 95, 42, 0.15)'}`,
                                                                        background: isSelected ? s.bg : '#EEF3ED',
                                                                        color: isSelected ? s.color : '#4b5a8a',
                                                                    }}
                                                                >
                                                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
                                                                    {t}
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                        Fotos (Opcional · {imageFiles.length}/5)
                                                    </label>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                        {imagePreviews.map((src, i) => (
                                                            <div key={i} style={{ position: 'relative', width: 72, height: 72, borderRadius: 10, overflow: 'hidden', border: '0.5px solid rgba(43, 95, 42, 0.15)', flexShrink: 0 }}>
                                                                <img src={src} alt={`Foto ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                                                <button type="button" onClick={() => handleRemoveImage(i)} style={{ position: 'absolute', top: 4, right: 4, background: '#791F1F', color: '#fff', border: 'none', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                                                                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 10, height: 10 }} stroke="currentColor" strokeWidth="2.5">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        ))}
                                                        {imageFiles.length < 5 && (
                                                            <label style={{
                                                                width: 72, height: 72, borderRadius: 10,
                                                                border: '0.5px dashed #2B5F2A', background: '#EEF3ED',
                                                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                                                gap: 4, cursor: 'pointer', flexShrink: 0, color: '#4b5a8a',
                                                            }}>
                                                                <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }} stroke="currentColor" strokeWidth="2">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                </svg>
                                                                <span style={{ fontSize: 10, fontWeight: 600 }}>Agregar</span>
                                                                <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
                                                            </label>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="foro-compose-footer"
                                            style={{ padding: '16px 24px', background: '#EEF3ED', borderTop: '0.5px solid rgba(43, 95, 42, 0.15)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}
                                        >
                                            <button type="button" onClick={() => setIsComposeOpen(false)} style={{ padding: '10px 20px', borderRadius: 99, background: 'transparent', border: 'none', color: '#4b5a8a', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                                                Cancelar
                                            </button>
                                            <button type="submit" className="publish-btn" style={{ padding: '10px 24px', borderRadius: 99, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                                                Publicar
                                                <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* Lista de posts */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {isLoading ? (
                                <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
                            ) : displayPosts.length > 0 ? (
                                displayPosts.map((post, idx) => (
                                    <div
                                        key={post._id}
                                        className="foro-post-anim"
                                        style={{ animationDelay: `${Math.min(idx * 0.06, 0.36)}s` }}
                                    >
                                        <PostCard
                                            post={post}
                                            currentUserId={currentUser.id}
                                            currentUser={currentUser}
                                            onToast={showToast}
                                        />
                                    </div>
                                ))
                            ) : (
                                <EmptyState filter={filter} isSearch={isSearchMode} query={searchQuery} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* ── EcoBot flotante ── */}
            <EcoBotFlotante />
        </>
    )
}