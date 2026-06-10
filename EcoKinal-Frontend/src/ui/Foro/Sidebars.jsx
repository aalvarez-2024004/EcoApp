import { TAGS, NAV_ITEMS } from '../../Styles/constants/ForoPage.js'

export function LeftSidebar({ currentUser, posts, navigate, filter, setFilter }) {
    const userId = String(currentUser?.id || currentUser?.uid || '')

    const myPosts = posts.filter(p => String(p.autorId) === userId)
    const myCounts = TAGS.reduce((acc, tag) => {
        acc[tag] = myPosts.filter(p => p.tag?.toLowerCase() === tag.toLowerCase()).length
        return acc
    }, {})

    const tagDots = {
        Logro: '#F59E0B', Pregunta: '#38BDF8', Consejo: '#A78BFA', Noticia: '#FB7185',
    }

    // Top colaboradores
    const collaborators = Object.values(
        posts.reduce((acc, post) => {
            const id = post.autorId
            if (!id) return acc
            if (!acc[id]) acc[id] = { name: post._authorName || 'Usuario', photo: post._authorPhoto || null, count: 0 }
            acc[id].count++
            return acc
        }, {})
    ).sort((a, b) => b.count - a.count).slice(0, 3)

    // Hashtags populares
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

    // Hack de anulación global: altera el comportamiento del padre (ForoPage) desde este hijo
    const responsiveStyles = `
        /* EN COMPUTADORA (Pantallas grandes) */
        @media (min-width: 1025px) {
            div[style*="overflowX: auto"], 
            div[style*="overflow-x: auto"] {
                display: flex !important;
            }
            .mobile-select-container {
                display: none !important;
            }
        }

        /* EN RESPONSIVO Y TELÉFONOS (Tope más pequeño de pantalla) */
        @media (max-width: 1024px) {
            /* 1. SE DIRIGE AL CONTENEDOR ANCESTRO DE FOROPAGE Y LE ANULA LOS MÁRGENES INTERNOS */
            div:has(> #left-sidebar-container),
            .foro-sidebar-left,
            [class*="sidebar-left"] {
                width: 100% !important;
                max-width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
            }

            /* 2. Forzar a nuestro contenedor a estirarse de extremo a extremo sin heredar paddings */
            #left-sidebar-container { 
                display: flex !important;
                width: 100% !important;
                max-width: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            }

            /* Ocultar la barra horizontal de botones vieja */
            div[style*="overflowX: auto"], 
            div[style*="overflow-x: auto"] {
                display: none !important;
            }

            /* 3. El contenedor del select ahora sí se expandirá pegado a los bordes físicos del teléfono */
            .mobile-select-container {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                background: #fff !important;
                padding: 12px 16px !important;
                box-sizing: border-box !important;
                border-bottom: 1px solid rgba(43, 95, 42, 0.12) !important;
                margin-top: -16px !important; /* Compensa el espacio superior del layout gris */
                margin-bottom: 12px !important;
            }
        }
    `

    return (
        <aside id="left-sidebar-container" style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <style>{responsiveStyles}</style>

            {/* ── SELECTOR DESPLEGABLE MOBILE: Ocupando toda la línea de extremo a extremo ── */}
            <div className="mobile-select-container">
                <select
                    value={filter || 'Todos'}
                    onChange={e => setFilter && setFilter(e.target.value)}
                    style={{
                        width: '100%', 
                        padding: '12px 16px', 
                        borderRadius: 12,
                        border: '0.5px solid rgba(43, 95, 42, 0.18)',
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
                        boxShadow: '0 1px 2px rgba(0,0,0,0.01)'
                    }}
                >
                    <option value="Todos">Todos ({posts.length})</option>
                    {TAGS.map(t => (
                        <option key={t} value={t}>
                            {t} ({posts.filter(p => p.tag?.toLowerCase() === t.toLowerCase()).length})
                        </option>
                    ))}
                </select>
            </div>

            {/* Cuadro de Perfil */}
            <div style={{ background: '#fff', borderRadius: 20, border: '0.5px solid rgba(43,95,42,0.15)', padding: 16 }}>
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

            {/* Cuadro de Accesos rápidos */}
            <div style={{ background: '#fff', borderRadius: 20, border: '0.5px solid rgba(43,95,42,0.15)', padding: 14 }}>
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

            {/* Cuadro de Actividad del foro */}
            <div style={{ background: '#fff', borderRadius: 20, border: '0.5px solid rgba(43,95,42,0.15)', padding: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    Actividad del foro
                </div>
                {[
                    { label: 'Publicaciones', value: posts.length, icon: 'ti-file-text' },
                    { label: 'Comentarios', value: totalComments, icon: 'ti-message' },
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

            {/* Cuadro de Top colaboradores */}
            {collaborators.length > 0 && (
                <div style={{ background: '#fff', borderRadius: 20, border: '0.5px solid rgba(43,95,42,0.15)', padding: 16 }}>
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

            {/* Cuadro de Hashtags populares */}
            {topHashtags.length > 0 && (
                <div style={{ background: '#fff', borderRadius: 20, border: '0.5px solid rgba(43,95,42,0.15)', padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#2B5F2A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                        Hashtags populares
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {topHashtags.map(tag => (
                            <span key={tag} style={{ padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600, background: '#EEF3ED', color: '#2B5F2A' }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    )
}

export function RightSidebar() {
    return null
}