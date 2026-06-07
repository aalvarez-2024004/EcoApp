import { useEffect, useRef, useState } from 'react'
import useMapaStore from '../store/useMapaStore'
import { completarRetoPorAccion } from '../../../shared/Api/Gamificacion'

/* ── Paleta & tokens (DetectorReciclaje) ── */
const G = {
  pageBg:    '#f4f8f3',
  cardBg:    '#ffffff',
  green1:    '#1b3c1a',
  green2:    '#2d5a27',
  green3:    '#52b788',
  green4:    '#74c69d',
  green5:    '#d8eed8',
  border:    '#ddeedd',
  textMuted: '#6b8e66',
  textSub:   '#9db89a',
}

const mapaStyles = `
  @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  .mapa-page {
    background: ${G.pageBg};
    min-height: 100vh;
    padding: 60px 24px;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: relative;
  }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-dot {
    0%,100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .anim-1 { animation: fadeUp 0.45s ease both; }
  .anim-2 { animation: fadeUp 0.45s 0.08s ease both; }
  .anim-3 { animation: fadeUp 0.45s 0.16s ease both; }
  .anim-4 { animation: fadeUp 0.45s 0.24s ease both; }

  /* ── BgPattern ── */
  .mapa-bg-pattern {
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 0;
    opacity: 0.035;
  }

  /* ── Badge ── */
  .mapa-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px; border-radius: 100px; width: fit-content;
    background: #e8f5e9; border: 1px solid rgba(82,183,136,0.35);
    color: ${G.green2}; font-size: 11px; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 10px;
  }

  /* ── Title ── */
  .mapa-title {
    font-size: 2.2rem; font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.1; margin: 0 0 8px;
    background: linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 60%, ${G.green3} 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .mapa-title-accent {
    background: linear-gradient(135deg, ${G.green3}, ${G.green4});
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .mapa-subtitle {
    font-size: 14px; color: ${G.textMuted};
    max-width: 520px; line-height: 1.6; margin: 0 0 24px; font-weight: 400;
  }

  /* ── Controls ── */
  .mapa-controls {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px;
  }

  .mapa-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 22px; border-radius: 14px; border: none;
    background: ${G.green2}; color: #fff;
    font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(45,90,39,0.2);
  }
  .mapa-btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(45,90,39,0.28);
  }
  .mapa-btn-primary:disabled {
    background: ${G.green5}; color: ${G.textMuted};
    cursor: not-allowed; box-shadow: none;
  }

  .mapa-select {
    padding: 12px 16px; border-radius: 14px;
    border: 1px solid ${G.border}; background: ${G.cardBg};
    font-size: 13px; color: ${G.green1}; font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 500; cursor: pointer; outline: none;
    transition: border-color 0.2s;
  }
  .mapa-select:focus { border-color: ${G.green3}; }

  .mapa-badge-total {
    padding: 8px 16px; border-radius: 100px;
    background: ${G.cardBg}; border: 1px solid ${G.border};
    font-size: 12px; font-weight: 600; color: ${G.green2};
    display: flex; align-items: center; gap: 6px;
  }
  .mapa-badge-total-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: ${G.green3}; box-shadow: 0 0 6px ${G.green3};
    animation: pulse-dot 2s ease-in-out infinite;
  }

  /* ── Map wrapper ── */
  .mapa-map-wrapper {
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 24px; overflow: hidden;
    box-shadow: 0 4px 32px rgba(45,90,39,0.07);
    margin-bottom: 24px; position: relative; z-index: 1;
  }

  #mapa-leaflet { height: 500px; width: 100%; }

  /* ── List header ── */
  .mapa-lista-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px; position: relative; z-index: 1;
  }
  .mapa-lista-title {
    display: flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    color: ${G.textSub}; text-transform: uppercase;
  }

  /* ── Grid ── */
  .mapa-lista {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    position: relative; z-index: 1;
  }

  /* ── Card ── */
  .mapa-card {
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 20px; padding: 18px 20px;
    cursor: pointer; transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
    display: flex; flex-direction: column; gap: 8px;
    box-shadow: 0 2px 12px rgba(45,90,39,0.05);
  }
  .mapa-card:hover {
    border-color: ${G.green3};
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(45,90,39,0.10);
  }

  .mapa-card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  .mapa-card-num-name { display: flex; gap: 10px; align-items: flex-start; }
  .mapa-card-num {
    width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
    background: #e8f5e9; border: 1px solid ${G.border};
    color: ${G.green2};
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; margin-top: 1px;
  }
  .mapa-card-name { font-size: 13.5px; font-weight: 700; color: ${G.green1}; line-height: 1.35; }
  .mapa-card-dist {
    font-size: 11px; font-weight: 700; color: ${G.green2};
    background: #e8f5e9; padding: 3px 10px; border-radius: 99px;
    white-space: nowrap; flex-shrink: 0; border: 1px solid ${G.border};
  }

  .mapa-card-address { font-size: 11.5px; color: ${G.textMuted}; line-height: 1.5; flex: 1; }

  .mapa-card-footer { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: auto; padding-top: 4px; }

  .mapa-chip {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 8px;
  }
  .mapa-chip-open    { background: #e8f5e9; color: ${G.green2}; border: 1px solid ${G.border}; }
  .mapa-chip-closed  { background: #fff5f5; color: #dc2626; border: 1px solid #ffcccc; }
  .mapa-chip-unknown { background: #f7fdf7; color: ${G.textMuted}; border: 1px solid ${G.border}; }
  .mapa-chip-rating  { background: rgba(217,119,6,0.08); color: #92400e; border: 1px solid rgba(217,119,6,0.2); }

  .mapa-link {
    margin-left: auto; font-size: 11px; font-weight: 600;
    color: ${G.green2}; text-decoration: none;
    display: inline-flex; align-items: center; gap: 3px;
    padding: 4px 10px; border-radius: 8px;
    background: #e8f5e9; border: 1px solid ${G.border};
    transition: background 0.15s, border-color 0.15s;
  }
  .mapa-link:hover { background: ${G.green5}; border-color: ${G.green3}; }

  /* ── Empty state ── */
  .mapa-empty {
    grid-column: 1 / -1;
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 60px 24px; gap: 14px;
    background: ${G.cardBg}; border: 1px solid ${G.border};
    border-radius: 24px; box-shadow: 0 2px 12px rgba(45,90,39,0.05);
  }
  .mapa-empty-icon {
    width: 72px; height: 72px; border-radius: 20px;
    background: #e8f5e9; border: 1px solid ${G.border};
    display: flex; align-items: center; justify-content: center; font-size: 30px;
    box-shadow: 0 8px 24px rgba(45,90,39,0.1);
  }
  .mapa-empty h3 { font-size: 16px; font-weight: 700; color: ${G.green1}; margin: 0; }
  .mapa-empty p  { font-size: 13px; color: ${G.textMuted}; line-height: 1.65; margin: 0; max-width: 360px; }

  /* ── Error ── */
  .mapa-error {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px; border-radius: 12px;
    font-size: 13px; font-weight: 600;
    background: #fff5f5; border: 1px solid #ffcccc; color: #dc2626;
    margin-bottom: 16px; position: relative; z-index: 1;
  }

  /* ── Skeleton ── */
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  .mapa-skeleton {
    background: linear-gradient(90deg, ${G.green5} 25%, ${G.border} 50%, ${G.green5} 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s ease-in-out infinite;
    border-radius: 20px; height: 130px;
    border: 1px solid ${G.border};
  }

  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .mapa-spinner { animation: spin 0.8s linear infinite; }

  /* ── Toast ── */
  .mapa-toast {
    position: fixed; top: 24px; right: 24px; z-index: 9999;
    padding: 12px 18px; border-radius: 14px; font-weight: 600; font-size: 13px;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 32px rgba(27,60,26,0.3);
    animation: toastIn .3s cubic-bezier(0.16,1,0.3,1);
    max-width: 400px; line-height: 1.4;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .mapa-toast.ok  { background: ${G.green1}; color: #fff; }
  .mapa-toast.err { background: #dc2626; color: #fff; }
  @keyframes toastIn {
    from { transform: translateX(120%); opacity: 0; }
    to   { transform: translateX(0);   opacity: 1; }
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) { .mapa-lista { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 700px) {
    .mapa-page { padding: 40px 16px; }
    .mapa-title { font-size: 1.8rem; }
    #mapa-leaflet { height: 320px; }
    .mapa-lista { grid-template-columns: 1fr; }
  }
`

function BgPattern() {
  return (
    <svg
      aria-hidden="true"
      className="mapa-bg-pattern"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="mapa-leaf-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.5" fill={G.green2} />
          <circle cx="0"  cy="0"  r="1"   fill={G.green2} />
          <circle cx="60" cy="0"  r="1"   fill={G.green2} />
          <circle cx="0"  cy="60" r="1"   fill={G.green2} />
          <circle cx="60" cy="60" r="1"   fill={G.green2} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mapa-leaf-grid)" />
    </svg>
  )
}

function HeaderIllustration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      style={{ width: 200, height: 120, opacity: 0.12, flexShrink: 0 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="90" rx="80" ry="20" fill={G.green3} />
      <path d="M100 80 Q80 40 60 20 Q100 30 100 80Z" fill={G.green2} />
      <path d="M100 80 Q120 40 140 20 Q100 30 100 80Z" fill={G.green3} />
      <path d="M100 80 Q70 55 50 60 Q80 45 100 80Z" fill={G.green4} />
      <path d="M100 80 Q130 55 150 60 Q120 45 100 80Z" fill={G.green4} />
      <circle cx="100" cy="78" r="5" fill={G.green1} />
    </svg>
  )
}

function OpenChip({ status }) {
  if (status === 'Abierto') return <span className="mapa-chip mapa-chip-open">● Abierto</span>
  if (status === 'Cerrado') return <span className="mapa-chip mapa-chip-closed">● Cerrado</span>
  return <span className="mapa-chip mapa-chip-unknown">Horario N/D</span>
}

export default function MapaPage() {
  const {
    centers, total, isLoading, error,
    userLat, userLon, radius,
    buscarCentros, setRadius
  } = useMapaStore()

  const mapRef     = useRef(null)
  const markersRef = useRef([])
  const [toast, setToast] = useState(null)

  const showToast = (ok, msg) => {
    setToast({ ok, msg })
    setTimeout(() => setToast(null), 4000)
  }

  const handleBuscar = async () => {
    const ok = await buscarCentros()
    if (ok) {
      const result = await completarRetoPorAccion('mapa')
      if (result && !result.alreadyDone) {
        showToast(true, '🗺️ ¡Reto completado! Ve a Gamificación para reclamar tus puntos 🌿')
      }
    }
  }

  useEffect(() => {
    const initMap = async () => {
      const L = (await import('https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js')).default || (await import('https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js'))
      if (mapRef.current) return
      mapRef.current = L.map('mapa-leaflet', { zoomControl: true }).setView([14.6349, -90.5069], 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(mapRef.current)
    }
    initMap()
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  useEffect(() => {
    const updateMarkers = async () => {
      if (!mapRef.current) return
      const L = (await import('https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js')).default || (await import('https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js'))

      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []
      if (!centers.length) return

      if (userLat && userLon) {
        const userIcon = L.divIcon({
          className: '',
          html: `<div style="width:18px;height:18px;border-radius:50%;background:${G.green2};border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
          iconSize: [18, 18], iconAnchor: [9, 9]
        })
        markersRef.current.push(
          L.marker([userLat, userLon], { icon: userIcon }).addTo(mapRef.current).bindPopup('<strong>Tu ubicación</strong>')
        )
      }

      const bounds = []
      centers.forEach((c, i) => {
        if (!c.lat || !c.lon) return
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:32px;height:32px;border-radius:50%;background:${G.green2};border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;color:${G.green4};font-size:13px;font-weight:800;font-family:'Plus Jakarta Sans',sans-serif;">${i + 1}</div>`,
          iconSize: [32, 32], iconAnchor: [16, 16]
        })
        const openBadge = c.open_status === 'Abierto'
          ? `<span style="color:${G.green2};font-weight:700">● Abierto</span>`
          : c.open_status === 'Cerrado'
          ? `<span style="color:#dc2626;font-weight:700">● Cerrado</span>`
          : `<span style="color:${G.textMuted}">Horario N/D</span>`
        const popupHtml = `
          <div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:200px">
            <p style="font-weight:700;font-size:14px;color:${G.green1};margin:0 0 4px">${c.name}</p>
            <p style="font-size:12px;color:${G.textMuted};margin:0 0 6px">${c.address}</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
              ${openBadge}
              <span style="font-size:12px;color:${G.green2};font-weight:600">${c.distance_km} km</span>
              ${c.rating ? `<span style="font-size:12px;color:${G.green2}">★ ${c.rating}</span>` : ''}
            </div>
            ${c.google_maps_url ? `<a href="${c.google_maps_url}" target="_blank" style="display:inline-block;margin-top:8px;font-size:12px;color:${G.green2};font-weight:600">Ver en Google Maps ↗</a>` : ''}
          </div>`
        markersRef.current.push(
          L.marker([c.lat, c.lon], { icon }).addTo(mapRef.current).bindPopup(popupHtml, { maxWidth: 260 })
        )
        bounds.push([c.lat, c.lon])
      })

      if (bounds.length) {
        if (userLat && userLon) bounds.push([userLat, userLon])
        mapRef.current.fitBounds(bounds, { padding: [40, 40] })
      }
    }
    updateMarkers()
  }, [centers, userLat, userLon])

  return (
    <div className="mapa-page">
      <style>{mapaStyles}</style>
      <BgPattern />

      {/* Toast */}
      {toast && (
        <div className={`mapa-toast ${toast.ok ? 'ok' : 'err'}`}>
          <i className={`ti ${toast.ok ? 'ti-circle-check' : 'ti-alert-circle'}`} />
          {toast.msg}
        </div>
      )}

      {/* ── Header ── */}
      <div className="anim-1" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1, marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div className="mapa-badge">
            <i className="ti ti-map-pin" style={{ fontSize: 12 }} />
            EcoKinal · Google Places API
          </div>
          <h1 className="mapa-title">
            Mapa de <span className="mapa-title-accent">reciclaje</span>
          </h1>
          <p className="mapa-subtitle">
            Encuentra los centros de reciclaje y recicladoras más cercanos a tu ubicación actual.
          </p>
        </div>
        <HeaderIllustration />
      </div>

      {/* Error */}
      {error && (
        <div className="mapa-error anim-2">
          <i className="ti ti-alert-circle" style={{ fontSize: 16 }} />
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="mapa-controls anim-2" style={{ position: 'relative', zIndex: 1 }}>
        <button className="mapa-btn-primary" onClick={handleBuscar} disabled={isLoading}>
          {isLoading ? (
            <svg className="mapa-spinner" viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          ) : (
            <i className="ti ti-map-pin" style={{ fontSize: 16 }} />
          )}
          {isLoading ? 'Buscando...' : 'Buscar centros cercanos'}
        </button>

        <select className="mapa-select" value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
          <option value={2000}>Radio: 2 km</option>
          <option value={5000}>Radio: 5 km</option>
          <option value={10000}>Radio: 10 km</option>
          <option value={20000}>Radio: 20 km</option>
        </select>

        {total > 0 && (
          <span className="mapa-badge-total">
            <span className="mapa-badge-total-dot" />
            {total} centro{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Map */}
      <div className="mapa-map-wrapper anim-3">
        <div id="mapa-leaflet" />
      </div>

      {/* List header */}
      {(centers.length > 0 || isLoading) && (
        <div className="mapa-lista-header">
          <span className="mapa-lista-title">
            <i className="ti ti-building" style={{ fontSize: 11 }} />
            Centros de reciclaje cercanos
          </span>
        </div>
      )}

      {/* Cards */}
      <div className="mapa-lista">
        {isLoading && [1, 2, 3, 4, 5, 6].map((n) => <div key={n} className="mapa-skeleton" />)}

        {!isLoading && !centers.length && !error && (
          <div className="mapa-empty">
            <div className="mapa-empty-icon">🗺️</div>
            <h3>Sin resultados aún</h3>
            <p>Presiona <strong>"Buscar centros cercanos"</strong> para encontrar recicladoras y puntos limpios cerca de ti.</p>
          </div>
        )}

        {!isLoading && centers.map((c, i) => (
          <div
            key={c.id || i}
            className="mapa-card"
            style={{ animationDelay: `${i * 40}ms`, animation: 'fadeUp 0.4s ease both' }}
            onClick={() => {
              if (mapRef.current && c.lat && c.lon) {
                mapRef.current.setView([c.lat, c.lon], 16)
                markersRef.current[i + 1]?.openPopup()
              }
            }}
          >
            <div className="mapa-card-header">
              <div className="mapa-card-num-name">
                <div className="mapa-card-num">{i + 1}</div>
                <p className="mapa-card-name">{c.name}</p>
              </div>
              {c.distance_km && <span className="mapa-card-dist">{c.distance_km} km</span>}
            </div>

            <p className="mapa-card-address">{c.address}</p>

            <div className="mapa-card-footer">
              <OpenChip status={c.open_status} />
              {c.rating && <span className="mapa-chip mapa-chip-rating">★ {c.rating}</span>}
              {c.google_maps_url && (
                <a
                  href={c.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mapa-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  Maps ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}