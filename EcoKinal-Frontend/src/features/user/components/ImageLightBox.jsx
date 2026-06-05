import { useEffect } from 'react'

export default function ImageLightbox({ src, alt = 'Imagen', onClose }) {
    // Cerrar con Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        // Bloquear scroll del body mientras está abierto
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', handler)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        // Overlay — Fondo oscuro basado en el verde principal de EcoKinal (#2A5C2D / #1E3A1E)
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                background: 'rgba(18, 38, 20, 0.88)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px',
                animation: 'lbFadeIn 0.2s ease both',
            }}
        >
            <style>{`
                @keyframes lbFadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes lbZoomIn {
                    from { opacity: 0; transform: scale(0.92); }
                    to   { opacity: 1; transform: scale(1); }
                }
            `}</style>

            {/* Botón cerrar — Estilo minimalista traslúcido */}
            <button
                onClick={onClose}
                style={{
                    position: 'fixed', top: 20, right: 20,
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)', 
                    border: '0.5px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1001, transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label="Cerrar imagen"
            >
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Imagen — Borde sutil basado en el fondo claro/verde de la app y sombra profunda */}
            <img
                src={src}
                alt={alt}
                onClick={e => e.stopPropagation()}
                style={{
                    maxWidth: '100%',
                    maxHeight: '85vh',
                    borderRadius: 24,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    background: '#ffffff',
                    padding: '6px',
                    objectFit: 'contain',
                    animation: 'lbZoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
                }}
            />
        </div>
    )
}