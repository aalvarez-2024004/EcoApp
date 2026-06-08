
export function EmptyState({ filter, isSearch, query }) {
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
