import{TAGS, NAV_ITEMS } from '../../Styles/constants/ForoPage.js'

export function LeftSidebar({ currentUser, posts, navigate }) {
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
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>

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


export function RightSidebar({ posts }) {

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
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>

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