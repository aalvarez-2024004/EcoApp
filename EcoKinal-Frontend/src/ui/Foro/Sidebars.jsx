import { useState } from 'react'
import { TAGS, NAV_ITEMS } from '../../Styles/constants/ForoPage.js'

// ─── Bottom Sheet Modal (solo mobile) ────────────────────────────────────────
function SidebarBottomSheet({ isOpen, onClose, children }) {
    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 998,
                    background: 'rgba(0,0,0,0.35)',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transition: 'opacity 0.25s ease',
                    backdropFilter: 'blur(2px)',
                }}
            />

            {/* Sheet */}
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
                background: '#fff',
                borderRadius: '20px 20px 0 0',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
                maxHeight: '82vh',
                overflowY: 'auto',
                transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
                paddingBottom: 'env(safe-area-inset-bottom, 16px)',
            }}>
                {/* Handle */}
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '12px 16px 4px',
                    position: 'sticky', top: 0, background: '#fff', zIndex: 1,
                    borderBottom: '0.5px solid rgba(43,95,42,0.1)',
                }}>
                    <div style={{ width: 36, height: 4, borderRadius: 99, background: 'rgba(43,95,42,0.2)', marginBottom: 10 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#1b3c1a' }}>Mi perfil del foro</span>
                        <button
                            onClick={onClose}
                            style={{
                                background: '#EEF3ED', border: 'none', borderRadius: 99,
                                width: 30, height: 30, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', cursor: 'pointer', color: '#2B5F2A',
                            }}
                        >
                            <i className="ti ti-x" style={{ fontSize: 14 }} />
                        </button>
                    </div>
                </div>

                {/* Contenido del sidebar */}
                <div style={{ padding: '12px 16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {children}
                </div>
            </div>
        </>
    )
}

// ─── Contenido interno del sidebar (reutilizado en desktop y sheet) ───────────
function SidebarContent({ currentUser, posts, navigate, filter, setFilter, onNavClick }) {
    const userId = String(currentUser?.id || currentUser?.uid || '')

    const myPosts = posts.filter(p => String(p.autorId) === userId)
    const myCounts = TAGS.reduce((acc, tag) => {
        acc[tag] = myPosts.filter(p => p.tag?.toLowerCase() === tag.toLowerCase()).length
        return acc
    }, {})

    const tagDots = {
        Logro: '#F59E0B', Pregunta: '#38BDF8', Consejo: '#A78BFA', Noticia: '#FB7185',
    }

    const collaborators = Object.values(
        posts.reduce((acc, post) => {
            const id = post.autorId
            if (!id) return acc
            if (!acc[id]) acc[id] = { name: post._authorName || 'Usuario', photo: post._authorPhoto || null, count: 0 }
            acc[id].count++
            return acc
        }, {})
    ).sort((a, b) => b.count - a.count).slice(0, 3)

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

    const totalComments = posts.reduce((acc, p) => acc + (p.commentsCount || 0), 0)
    const medals = ['ti-medal', 'ti-award', 'ti-star']
    const medalColors = ['#F59E0B', '#9ca3af', '#cd7c2f']

    return (
        <>
            {/* Perfil */}
            <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid rgba(43,95,42,0.15)', padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0, overflow: 'hidden',
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
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>
                            {currentUser?.name || 'Usuario'}
                        </div>
                        <div style={{ fontSize: 13, color: '#6b7280' }}>
                            @{currentUser?.username || 'usuario'}
                        </div>
                    </div>
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Mis publicaciones
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {TAGS.map(tag => (
                        <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0', fontSize: 13, color: '#374151' }}>
                            <div style={{ width: 7, height: 7, borderRadius: '50%', background: tagDots[tag], flexShrink: 0 }} />
                            {tag}
                            <span style={{ marginLeft: 'auto', fontSize: 14, fontWeight: 700, color: '#2B5F2A' }}>{myCounts[tag]}</span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0 2px', fontSize: 14, color: '#374151', borderTop: '0.5px solid rgba(43,95,42,0.1)', marginTop: 4 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2B5F2A', flexShrink: 0 }} />
                        Total
                        <span style={{ marginLeft: 'auto', fontSize: 14, fontWeight: 700, color: '#2B5F2A' }}>{myPosts.length}</span>
                    </div>
                </div>
            </div>

            {/* Accesos rápidos */}
            <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid rgba(43,95,42,0.15)', padding: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Accesos rápidos
                </div>
                {NAV_ITEMS.map(item => {
                    const isCurrent = item.href === '/dashboard/usuario/foro'
                    return (
                        <button key={item.href} onClick={() => { navigate(item.href); onNavClick?.() }} style={{
                            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                            padding: '7px 10px', borderRadius: 10, border: 'none', cursor: 'pointer',
                            background: isCurrent ? 'rgba(43,95,42,0.1)' : 'transparent',
                            color: isCurrent ? '#2B5F2A' : '#374151',
                            fontSize: 13, fontWeight: isCurrent ? 700 : 500,
                            textAlign: 'left', transition: 'background 0.15s',
                        }}>
                            <i className={item.icon} style={{ fontSize: 15 }} />
                            {item.label}
                        </button>
                    )
                })}
            </div>

            {/* Actividad */}
            <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid rgba(43,95,42,0.15)', padding: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Actividad del foro
                </div>
                {[
                    { label: 'Publicaciones', value: posts.length, icon: 'ti-file-text' },
                    { label: 'Comentarios', value: totalComments, icon: 'ti-message' },
                    { label: 'Participantes', value: new Set(posts.map(p => p.autorId)).size, icon: 'ti-users' },
                ].map(({ label, value, icon }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: '0.5px solid rgba(43,95,42,0.08)', fontSize: 13 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280' }}>
                            <i className={`ti ${icon}`} style={{ fontSize: 15 }} />
                            {label}
                        </div>
                        <span style={{ fontWeight: 700, color: '#2B5F2A' }}>{value}</span>
                    </div>
                ))}
            </div>

            {/* Top colaboradores */}
            {collaborators.length > 0 && (
                <div style={{ background: '#fff', borderRadius: 16, border: '0.5px solid rgba(43,95,42,0.15)', padding: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                        Top colaboradores
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {collaborators.map((user, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: idx === 0 ? 1 : idx === 1 ? 0.7 : 0.45 }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: 9, flexShrink: 0, overflow: 'hidden',
                                    background: 'rgba(43,95,42,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {user.photo
                                        ? <img src={user.photo} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        : <span style={{ fontSize: 12, fontWeight: 700, color: '#2B5F2A' }}>{user.name[0]?.toUpperCase()}</span>
                                    }
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{user.name}</div>
                                    <div style={{ fontSize: 11, color: '#9ca3af' }}>{user.count} publicacion{user.count !== 1 ? 'es' : ''}</div>
                                </div>
                                <i className={`ti ${medals[idx]}`} style={{ fontSize: 15, color: medalColors[idx], flexShrink: 0 }} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Hashtags */}
            {topHashtags.length > 0 && (
                <div style={{ background: '#fff', borderRadius: 20, border: '0.5px solid rgba(43,95,42,0.15)', padding: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                        Hashtags populares
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {topHashtags.map(tag => (
                            <span key={tag} style={{ padding: '5px 12px', borderRadius: 99, fontSize: 13, fontWeight: 600, background: '#EEF3ED', color: '#2B5F2A' }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

// ─── Export principal ─────────────────────────────────────────────────────────
export function LeftSidebar({ currentUser, posts, navigate, filter, setFilter }) {
    const [sheetOpen, setSheetOpen] = useState(false)

    const sharedProps = { currentUser, posts, navigate, filter, setFilter }

    return (
        <>
            {/* ── DESKTOP: sidebar normal ── */}
            <aside className="foro-sidebar-desktop" style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                <SidebarContent {...sharedProps} />
            </aside>

            {/* ── MOBILE: botón flotante + bottom sheet ── */}
            <div className="foro-sidebar-mobile-trigger">
                <button
                    onClick={() => setSheetOpen(true)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '9px 16px', borderRadius: 99,
                        background: '#fff', border: '0.5px solid rgba(43,95,42,0.2)',
                        color: '#2B5F2A', fontSize: 13, fontWeight: 700,
                        cursor: 'pointer', boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
                        width: '100%', justifyContent: 'center',
                    }}
                >
                    <div style={{
                        width: 26, height: 26, borderRadius: 8, overflow: 'hidden',
                        background: '#EEF3ED', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        {currentUser?.photo || currentUser?.profilePicture
                            ? <img src={currentUser.photo || currentUser.profilePicture} alt=""
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <span style={{ fontSize: 11, fontWeight: 700, color: '#2B5F2A' }}>
                                {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                              </span>
                        }
                    </div>
                    {currentUser?.name?.split(' ')[0] || 'Mi perfil'}
                    <i className="ti ti-chevron-up" style={{ fontSize: 13, marginLeft: 'auto' }} />
                </button>
            </div>

            <SidebarBottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
                <SidebarContent {...sharedProps} onNavClick={() => setSheetOpen(false)} />
            </SidebarBottomSheet>
        </>
    )
}

export function RightSidebar() {
    return null
}