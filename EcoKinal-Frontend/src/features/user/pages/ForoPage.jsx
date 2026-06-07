import { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../store/useUserStore'
import { useForoStore } from '../store/useForoStore'
import PostCard from '../components/ForoComps/PostCard'
import { completarRetoPorAccion } from '../../../shared/Api/Gamificacion'

const TAGS = ['Logro', 'Pregunta', 'Consejo', 'Noticia']

const TAG_STYLES = {
    Logro:    { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', dot: '#F59E0B' },
    Pregunta: { bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD', dot: '#38BDF8' },
    Consejo:  { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE', dot: '#A78BFA' },
    Noticia:  { bg: '#FFF1F2', color: '#BE123C', border: '#FECDD3', dot: '#FB7185' },
}

const NAV_ITEMS = [
    { label: 'Detector de reciclaje', href: '/dashboard/usuario/detector', icon: 'ti ti-camera' },
    { label: 'Foro eco',              href: '/dashboard/usuario/foro',     icon: 'ti ti-messages' },
    { label: 'Gamificación',          href: '/dashboard/usuario/puntos',   icon: 'ti ti-trophy' },
    { label: 'Mi impacto',            href: '/dashboard/usuario/impacto',  icon: 'ti ti-chart-bar' },
    { label: 'Mapa reciclaje',        href: '/dashboard/usuario/mapa',     icon: 'ti ti-map-pin' },
]

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div style={{
            background: '#fff', borderRadius: 24, border: '0.5px solid rgba(43, 95, 42, 0.15)',
            padding: '20px', display: 'flex', flexDirection: 'column', gap: 14,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="skeleton" style={{ height: 13, width: '40%', borderRadius: 6 }} />
                    <div className="skeleton" style={{ height: 10, width: '25%', borderRadius: 6 }} />
                </div>
                <div className="skeleton" style={{ height: 24, width: 70, borderRadius: 10 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <div className="skeleton" style={{ height: 15, width: '65%', borderRadius: 6 }} />
                <div className="skeleton" style={{ height: 12, width: '100%', borderRadius: 6 }} />
                <div className="skeleton" style={{ height: 12, width: '85%', borderRadius: 6 }} />
                <div className="skeleton" style={{ height: 12, width: '55%', borderRadius: 6 }} />
            </div>
            <div style={{ display: 'flex', gap: 8, borderTop: '0.5px solid rgba(43, 95, 42, 0.15)', paddingTop: 12 }}>
                <div className="skeleton" style={{ height: 34, width: 100, borderRadius: 14 }} />
                <div className="skeleton" style={{ height: 34, width: 130, borderRadius: 14 }} />
            </div>
        </div>
    )
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ filter, isSearch, query }) {
    return (
        <div className="animate-fade-up" style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#fff', borderRadius: 24, border: '0.5px solid rgba(43, 95, 42, 0.15)',
        }}>
            <svg viewBox="0 0 120 90" width="120" height="90" style={{ marginBottom: 20, opacity: 0.7 }}>
                <rect x="15" y="20" width="90" height="58" rx="10" fill="#EEF3ED" stroke="rgba(43, 95, 42, 0.15)" strokeWidth="1"/>
                <rect x="25" y="32" width="50" height="7" rx="3" fill="rgba(43, 95, 42, 0.15)"/>
                <rect x="25" y="44" width="70" height="5" rx="2" fill="rgba(43, 95, 42, 0.15)"/>
                <rect x="25" y="53" width="60" height="5" rx="2" fill="rgba(43, 95, 42, 0.15)"/>
                <rect x="25" y="62" width="40" height="5" rx="2" fill="rgba(43, 95, 42, 0.15)"/>
                <circle cx="90" cy="28" r="14" fill="#EEF3ED" stroke="rgba(43, 95, 42, 0.15)" strokeWidth="1"/>
                <path d="M85 28 L88 31 L95 24" stroke="#2B5F2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
                {isSearch
                    ? `Sin resultados para "${query}"`
                    : filter !== 'Todos'
                        ? `Sin publicaciones en "${filter}"`
                        : 'Aún no hay publicaciones'}
            </p>
            <p style={{ fontSize: 13, color: '#4b5a8a', margin: 0 }}>
                {isSearch
                    ? 'Intenta con otras palabras o un hashtag.'
                    : filter !== 'Todos'
                        ? 'Sé el primero en publicar en esta categoría.'
                        : 'Comparte algo con la comunidad usando el botón de arriba.'}
            </p>
        </div>
    )
}

// ─── Filter Button ─────────────────────────────────────────────────────────────
function FilterBtn({ active, onClick, children, count }) {
    return (
        <button onClick={onClick} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 22px', fontSize: 13, fontWeight: 700,
            borderRadius: 99, cursor: 'pointer', transition: 'all 0.2s', border: 'none',
            background: active ? '#2B5F2A' : 'transparent',
            color: active ? '#EEF3ED' : '#4b5a8a',
        }}>
            {children}
            <span style={{
                padding: '2px 8px', borderRadius: 10, fontSize: 10,
                background: active ? 'rgba(238, 243, 237, 0.3)' : '#EEF3ED',
                color: active ? '#EEF3ED' : '#4b5a8a',
            }}>
                {count}
            </span>
        </button>
    )
}

// ─── Left Sidebar ──────────────────────────────────────────────────────────────
function LeftSidebar({ currentUser, posts, navigate }) {
    const userId = String(currentUser?.id || currentUser?.uid || '')

    const myPosts = posts.filter(p => String(p.autorId) === userId)
    const myCounts = TAGS.reduce((acc, tag) => {
        acc[tag] = myPosts.filter(p => p.tag?.toLowerCase() === tag.toLowerCase()).length
        return acc
    }, {})

    const tagDots = {
        Logro: '#F59E0B', Pregunta: '#38BDF8', Consejo: '#A78BFA', Noticia: '#FB7185',
    }

    return (
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 220, flexShrink: 0 }}>

            {/* Perfil */}
            <div style={{
                background: '#fff', borderRadius: 20, border: '0.5px solid rgba(43,95,42,0.15)', padding: 16,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{
                        width: 42, height: 42, borderRadius: 12, flexShrink: 0, overflow: 'hidden',
                        background: '#2B5F2A', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        {currentUser?.photo || currentUser?.profilePicture
                            ? <img src={currentUser.photo || currentUser.profilePicture} alt="avatar"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <span style={{ color: '#EEF3ED', fontWeight: 700, fontSize: 16 }}>
                                {currentUser?.initials || currentUser?.name?.[0]?.toUpperCase() || 'U'}
                              </span>
                        }
                    </div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>
                            {currentUser?.name || 'Usuario'}
                        </div>
                        <div style={{ fontSize: 11, color: '#6b7280' }}>
                            @{currentUser?.username || 'usuario'}
                        </div>
                    </div>
                </div>

                <div style={{ fontSize: 10, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Mis publicaciones
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {TAGS.map(tag => (
                        <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px 0', fontSize: 12, color: '#374151' }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: tagDots[tag], flexShrink: 0 }} />
                            {tag}
                            <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: '#2B5F2A' }}>
                                {myCounts[tag]}
                            </span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 0 2px', fontSize: 12, color: '#374151', borderTop: '0.5px solid rgba(43,95,42,0.1)', marginTop: 4 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2B5F2A', flexShrink: 0 }} />
                        Total
                        <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: '#2B5F2A' }}>
                            {myPosts.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Accesos rápidos */}
            <div style={{
                background: '#fff', borderRadius: 20, border: '0.5px solid rgba(43,95,42,0.15)', padding: 14,
            }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Accesos rápidos
                </div>
                {NAV_ITEMS.map(item => {
                    const isCurrent = item.href === '/dashboard/usuario/foro'
                    return (
                        <button key={item.href} onClick={() => navigate(item.href)} style={{
                            display: 'flex', alignItems: 'center', gap: 9, width: '100%',
                            padding: '8px 10px', borderRadius: 10, border: 'none', cursor: 'pointer',
                            background: isCurrent ? 'rgba(43,95,42,0.1)' : 'transparent',
                            color: isCurrent ? '#2B5F2A' : '#374151',
                            fontSize: 12, fontWeight: isCurrent ? 700 : 500,
                            textAlign: 'left', transition: 'background 0.15s',
                        }}>
                            <i className={item.icon} style={{ fontSize: 15 }} />
                            {item.label}
                        </button>
                    )
                })}
            </div>
        </aside>
    )
}

// ─── Right Sidebar ─────────────────────────────────────────────────────────────
function RightSidebar({ posts }) {

    // Top colaboradores — calculado desde los posts en el front
    const collaborators = Object.values(
        posts.reduce((acc, post) => {
            const id = post.autorId
            if (!id) return acc
            if (!acc[id]) acc[id] = { name: post._authorName || 'Usuario', photo: post._authorPhoto || null, count: 0 }
            acc[id].count++
            return acc
        }, {})
    ).sort((a, b) => b.count - a.count).slice(0, 3)

    // Hashtags populares — calculado desde los posts en el front
    const hashtagCounts = {}
    posts.forEach(post => {
        post.hashtags?.forEach(tag => {
            hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1
        })
    })
    const topHashtags = Object.entries(hashtagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([tag]) => tag)

    // Comentarios totales estimados desde commentsCount
    const totalComments = posts.reduce((acc, p) => acc + (p.commentsCount || 0), 0)

    const medals = ['ti-medal', 'ti-award', 'ti-star']
    const medalColors = ['#F59E0B', '#9ca3af', '#cd7c2f']

    return (
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 220, flexShrink: 0 }}>

            {/* Estadísticas */}
            <div style={{
                background: '#fff', borderRadius: 20, border: '0.5px solid rgba(43,95,42,0.15)', padding: 16,
            }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    Actividad del foro
                </div>
                {[
                    { label: 'Publicaciones', value: posts.length, icon: 'ti-file-text' },
                    { label: 'Comentarios',   value: totalComments,  icon: 'ti-message' },
                    { label: 'Participantes', value: new Set(posts.map(p => p.autorId)).size, icon: 'ti-users' },
                ].map(({ label, value, icon }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid rgba(43,95,42,0.08)', fontSize: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7280' }}>
                            <i className={`ti ${icon}`} style={{ fontSize: 13 }} />
                            {label}
                        </div>
                        <span style={{ fontWeight: 700, color: '#2B5F2A' }}>{value}</span>
                    </div>
                ))}
            </div>

            {/* Top colaboradores */}
            {collaborators.length > 0 && (
                <div style={{
                    background: '#fff', borderRadius: 20, border: '0.5px solid rgba(43,95,42,0.15)', padding: 16,
                }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                        Top colaboradores
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {collaborators.map((user, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: idx === 0 ? 1 : idx === 1 ? 0.7 : 0.45 }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: 10, flexShrink: 0, overflow: 'hidden',
                                    background: 'rgba(43,95,42,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {user.photo
                                        ? <img src={user.photo} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        : <span style={{ fontSize: 12, fontWeight: 700, color: '#2B5F2A' }}>{user.name[0]?.toUpperCase()}</span>
                                    }
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{user.name}</div>
                                    <div style={{ fontSize: 10, color: '#9ca3af' }}>{user.count} publicacion{user.count !== 1 ? 'es' : ''}</div>
                                </div>
                                <i className={`ti ${medals[idx]}`} style={{ fontSize: 15, color: medalColors[idx], flexShrink: 0 }} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Hashtags populares */}
            {topHashtags.length > 0 && (
                <div style={{
                    background: '#fff', borderRadius: 20, border: '0.5px solid rgba(43,95,42,0.15)', padding: 16,
                }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                        Hashtags populares
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {topHashtags.map(tag => (
                            <span key={tag} style={{
                                padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                                background: '#EEF3ED', color: '#2B5F2A',
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
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
    const [title, setTitle]                 = useState('')
    const [content, setContent]             = useState('')
    const [selectedTag, setSelectedTag]     = useState('')
    const [imageFiles,    setImageFiles]    = useState([])
    const [imagePreviews, setImagePreviews] = useState([])
    const [toast, setToast]                 = useState({ show: false, text: '', type: 'success' })

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
        const nextFiles    = [...imageFiles,    ...selected].slice(0, 5)
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
        <div style={{ background: '#EEF3ED', minHeight: '100vh', padding: '2rem 2rem', boxSizing: 'border-box' }}>
            <style>{pageStyles}</style>

            {/* ── Toast ── */}
            {toast.show && (
                <div style={{
                    position: 'fixed', bottom: 24, right: 24, zIndex: 50,
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 18px', borderRadius: 14, fontSize: 13, fontWeight: 500,
                    background: toast.type === 'error' ? '#FCEBEB' : '#EEF3ED',
                    border: `0.5px solid ${toast.type === 'error' ? '#F09595' : 'rgba(43, 95, 42, 0.15)'}`,
                    color: toast.type === 'error' ? '#791F1F' : '#2B5F2A',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }} className="animate-fade-up">
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }} stroke="currentColor" strokeWidth="2">
                        {toast.type === 'error'
                            ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            : <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        }
                    </svg>
                    {toast.text}
                </div>
            )}

            {/* ── Layout 3 columnas ── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '220px minmax(0, 1fr) 220px',
                gap: '20px',
                maxWidth: 1200,
                margin: '0 auto',
                alignItems: 'start',
            }}>

                {/* Columna izquierda */}
                <LeftSidebar currentUser={currentUser} posts={posts} navigate={navigate} />

                {/* Columna central — feed */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Header */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '6px 14px', borderRadius: 99, width: 'fit-content',
                            background: 'rgba(219, 230, 221, 1)', border: '0.5px solid #2B5F2A',
                        }}>
                            <svg viewBox="0 0 24 24" fill="none" style={{ width: 13, height: 13 }} stroke="#2B5F2A" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#2B5F2A', textTransform: 'uppercase' }}>
                                V2.6 · ECOKINAL FORO
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                            <h1 className="outline-title" style={{ fontSize: 42, fontWeight: 800, color: '#2B5F2A', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
                                Foro
                            </h1>
                            <h1 className="filled-title" style={{ fontSize: 42, fontWeight: 800, color: '#2B5F2A', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
                                Comunitario
                            </h1>
                        </div>
                        <p style={{ fontSize: 14, color: '#4b5a8a', lineHeight: 1.75, margin: 0 }}>
                            Comparte ideas, publica tus logros ambientales y resuelve tus dudas con otros usuarios.
                        </p>
                    </div>

                    {/* Barra de búsqueda */}
                    <div style={{
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
                                fontSize: 14, color: '#111827', fontFamily: 'inherit',
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
                        <div style={{
                            display: 'flex', padding: 8, gap: 6,
                            borderRadius: 20, width: 'fit-content',
                            background: '#fff', border: '0.5px solid rgba(43, 95, 42, 0.15)',
                            overflowX: 'auto',
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
                    )}

                    {/* Etiqueta modo búsqueda */}
                    {isSearchMode && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
                        <div style={{
                            background: '#fff', border: '0.5px solid rgba(43, 95, 42, 0.15)', borderRadius: 18,
                            overflow: 'hidden', transition: 'all 0.3s ease',
                        }}>
                            {!isComposeOpen ? (
                                <button onClick={() => setIsComposeOpen(true)} style={{
                                    width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
                                    background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                                }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EEF3ED', border: '0.5px solid rgba(43, 95, 42, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }} stroke="#2B5F2A" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>
                                            ¿Qué quieres aportar hoy, <span style={{ color: '#2B5F2A' }}>{name ? name.split(' ')[0] : 'Usuario'}</span>?
                                        </span>
                                        <span style={{ fontSize: 13, color: '#4b5a8a' }}>Comparte un logro, consejo, noticia o pregunta</span>
                                    </div>
                                </button>
                            ) : (
                                <form onSubmit={handlePublish} className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ padding: '16px 24px', background: '#EEF3ED', borderBottom: '0.5px solid rgba(43, 95, 42, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: '#2B5F2A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                            Nueva Publicación
                                        </span>
                                        <button type="button" onClick={() => setIsComposeOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#4b5a8a' }}>
                                            <svg viewBox="0 0 24 24" fill="none" style={{ width: 20, height: 20 }} stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            <label style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Título</label>
                                            <input
                                                type="text" placeholder="Escribe un título descriptivo..." value={title} onChange={e => setTitle(e.target.value)}
                                                style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '0.5px solid rgba(43, 95, 42, 0.15)', background: '#EEF3ED', color: '#111827', fontSize: 14, outline: 'none' }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            <label style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contenido</label>
                                            <textarea
                                                placeholder="Describe tu consejo, idea o pregunta... Usa #hashtags para que te encuentren." value={content} onChange={e => setContent(e.target.value)} rows={4}
                                                style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '0.5px solid rgba(43, 95, 42, 0.15)', background: '#EEF3ED', color: '#111827', fontSize: 14, outline: 'none', resize: 'none' }}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
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
                                                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
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

                                    <div style={{ padding: '16px 24px', background: '#EEF3ED', borderTop: '0.5px solid rgba(43, 95, 42, 0.15)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
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
                            displayPosts.map(post => (
                                <PostCard
                                    key={post._id}
                                    post={post}
                                    currentUserId={currentUser.id}
                                    currentUser={currentUser}
                                    onToast={showToast}
                                />
                            ))
                        ) : (
                            <EmptyState filter={filter} isSearch={isSearchMode} query={searchQuery} />
                        )}
                    </div>
                </div>

                {/* Columna derecha */}
                <RightSidebar posts={posts} />

            </div>
        </div>
    )
}

const pageStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-fade-up { animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .skeleton {
    background: linear-gradient(90deg, #EEF3ED 25%, rgba(43, 95, 42, 0.15) 50%, #EEF3ED 75%);
    background-size: 600px 100%;
    animation: shimmer 1.6s infinite linear;
  }
  .outline-title {
    color: transparent !important;
    -webkit-text-stroke: 1.5px #2B5F2A;
  }
  .publish-btn {
    background: #2B5F2A !important;
    color: #EEF3ED !important;
    transition: background 0.2s;
  }
  .publish-btn:hover { background: #1e451d !important; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(43, 95, 42, 0.15); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(43, 95, 42, 0.3); }

  @media (max-width: 1024px) {
    .foro-grid { grid-template-columns: 1fr !important; }
    .foro-sidebar-left, .foro-sidebar-right { display: none !important; }
  }
`