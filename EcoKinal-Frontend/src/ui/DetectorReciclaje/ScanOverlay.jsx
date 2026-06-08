export const ScanOverlay = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
    {/* Línea de escaneo */}
    <div className="absolute left-0 right-0 h-0.5 animate-scan"
         style={{ background: 'linear-gradient(90deg, transparent, #23376d, #eb7207, #23376d, transparent)' }} />

    {/* Cuadrícula sutil */}
    {[25, 50, 75].map(p => (
      <div key={p} className="absolute left-4 right-4 h-px" style={{ top: `${p}%`, background: '#23376d', opacity: 0.12 }} />
    ))}
    {[25, 50, 75].map(p => (
      <div key={p} className="absolute top-4 bottom-4 w-px" style={{ left: `${p}%`, background: '#23376d', opacity: 0.12 }} />
    ))}

    {/* Esquinas del visor */}
    {[
      { top: 12, left: 12,  borderTop: '2px solid #23376d', borderLeft: '2px solid #23376d',  borderRadius: '6px 0 0 0' },
      { top: 12, right: 12, borderTop: '2px solid #23376d', borderRight: '2px solid #23376d', borderRadius: '0 6px 0 0' },
      { bottom: 12, left: 12,  borderBottom: '2px solid #23376d', borderLeft: '2px solid #23376d',  borderRadius: '0 0 0 6px' },
      { bottom: 12, right: 12, borderBottom: '2px solid #23376d', borderRight: '2px solid #23376d', borderRadius: '0 0 6px 0' },
    ].map((style, i) => (
      <div key={i} className="absolute w-7 h-7" style={style} />
    ))}
  </div>
)