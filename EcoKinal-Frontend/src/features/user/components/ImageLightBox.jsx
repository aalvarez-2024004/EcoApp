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
        // Overlay — clic fuera cierra
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                background: 'rgba(10, 24, 5, 0.85)',
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

            {/* Botón cerrar */}
            <button
                onClick={onClose}
                style={{
                    position: 'fixed', top: 20, right: 20,
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', border: '0.5px solid rgba(255,255,255,0.2)',
                    color: '#fff', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1001, transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                aria-label="Cerrar imagen"
            >
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Imagen — stopPropagation para no cerrar al clicar la imagen */}
            <img
                src={src}
                alt={alt}
                onClick={e => e.stopPropagation()}
                style={{
                    maxWidth: '100%',
                    maxHeight: '90vh',
                    borderRadius: 16,
                    border: '0.5px solid rgba(192, 221, 151, 0.3)',
                    objectFit: 'contain',
                    animation: 'lbZoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                }}
            />
        </div>
    )
}