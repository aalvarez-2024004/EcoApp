import { useEffect, useRef, useState } from 'react'
import useMapaStore from '../store/useMapaStore'
import { completarRetoPorAccion } from '../../../shared/Gamificacion'

const mapaStyles = `
  @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');

  .mapa-page { background: #eef1f9; min-height: 100vh; padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 2rem); box-sizing: border-box; max-width: 1280px; margin: 0 auto; }

  .mapa-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; border-radius: 99px; width: fit-content;
    background: rgba(35,55,109,0.15); border: 0.5px solid #23376d;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    color: #23376d; text-transform: uppercase; margin-bottom: 1rem;
  }

  .mapa-title {
    font-family: 'Syne', sans-serif;
    font-size: 48px; font-weight: 800; color: #111827;
    line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 0.75rem 0;
  }

  .mapa-subtitle { font-size: 15px; color: #4b5a8a; max-width: 520px; line-height: 1.75; margin: 0 0 2rem 0; }

  .mapa-controls {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 2rem;
  }

  .mapa-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px; border-radius: 14px; border: none;
    background: #23376d; color: #fdb500;
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all 0.18s ease; font-family: inherit;
  }
  .mapa-btn-primary:hover:not(:disabled) { background: #1a2b57; transform: translateY(-1px); }
  .mapa-btn-primary:disabled { background: #d6dcef; color: #4b5a8a; cursor: not-allowed; opacity: 1; }

  .mapa-select {
    padding: 12px 16px; border-radius: 14px;
    border: 0.5px solid rgba(35,55,109,0.15); background: #fff;
    font-size: 13px; color: #23376d; font-family: inherit;
    font-weight: 500; cursor: pointer; outline: none;
  }

  .mapa-badge-total {
    padding: 8px 16px; border-radius: 99px;
    background: #fff; border: 0.5px solid rgba(35,55,109,0.15);
    font-size: 13px; font-weight: 600; color: #23376d;
  }

  /* ── Mapa ancho completo ── */
  .mapa-map-wrapper {
    background: #fff; border: 0.5px solid rgba(35,55,109,0.15);
    border-radius: 24px; overflow: hidden;
    box-shadow: 0 4px 24px rgba(35,55,109,0.06);
    margin-bottom: 2rem;
  }

  #mapa-leaflet { height: 500px; width: 100%; }

  /* ── Sección título lista ── */
  .mapa-lista-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .mapa-lista-title {
    font-size: 10px; font-weight: 800; letter-spacing: 0.15em;
    color: #23376d; text-transform: uppercase;
  }

  /* ── Grid 3 columnas ── */
  .mapa-lista {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .mapa-card {
    background: #fff; border: 0.5px solid rgba(35,55,109,0.15);
    border-radius: 20px; padding: 20px;
    cursor: pointer; transition: all 0.22s ease;
    position: relative; overflow: hidden;
    display: flex; flex-direction: column; gap: 8px;
  }
  .mapa-card:hover {
    border-color: #23376d;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(35,55,109,0.10);
  }

  .mapa-card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  .mapa-card-num-name { display: flex; gap: 10px; align-items: flex-start; }
  .mapa-card-num {
    width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
    background: #23376d; color: #fdb500;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; margin-top: 1px;
  }
  .mapa-card-name { font-size: 13.5px; font-weight: 700; color: #111827; line-height: 1.35; }
  .mapa-card-dist {
    font-size: 11px; font-weight: 700; color: #eb7207;
    background: #fff0e6; padding: 3px 10px; border-radius: 99px;
    white-space: nowrap; flex-shrink: 0;
  }

  .mapa-card-address { font-size: 11.5px; color: #4b5a8a; line-height: 1.5; flex: 1; }

  .mapa-card-footer { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: auto; padding-top: 4px; }

  .mapa-chip {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 8px;
  }
  .mapa-chip-open    { background: #eef1f9; color: #23376d; }
  .mapa-chip-closed  { background: #FCEBEB; color: #791F1F; }
  .mapa-chip-unknown { background: #F1EFE8; color: #555; }
  .mapa-chip-rating  { background: #FAEEDA; color: #633806; }

  .mapa-link {
    margin-left: auto; font-size: 11px; font-weight: 600;
    color: #23376d; text-decoration: none;
    display: inline-flex; align-items: center; gap: 3px;
    padding: 4px 10px; border-radius: 8px; background: #eef1f9;
    transition: background 0.15s ease;
  }
  .mapa-link:hover { background: rgba(35,55,109,0.15); }

  /* Estado vacío */
  .mapa-empty {
    grid-column: 1 / -1;
    text-align: center; padding: 60px 24px;
    background: #fff; border: 0.5px solid rgba(35,55,109,0.15);
    border-radius: 24px;
  }
  .mapa-empty-icon { font-size: 48px; margin-bottom: 16px; }
  .mapa-empty h3 { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 8px; }
  .mapa-empty p  { font-size: 14px; color: #4b5a8a; line-height: 1.6; }

  /* Error */
  .mapa-error {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 18px; border-radius: 14px;
    background: #FCEBEB; border: 0.5px solid #F09595;
    color: #791F1F; font-size: 13px; font-weight: 500; margin-bottom: 1.5rem;
  }

  /* Skeleton — 3 cols */
  .mapa-skeleton {
    background: linear-gradient(90deg, #e8ecf5 25%, #d6dcef 50%, #e8ecf5 75%);
    background-size: 400px 100%;
    animation: skelShimmer 1.4s ease-in-out infinite;
    border-radius: 20px; height: 130px;
  }
  @keyframes skelShimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }

  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .mapa-spinner { animation: spin 0.8s linear infinite; }

  /* ── Toast ── */
  .mapa-toast {
    position: fixed; top: 24px; right: 24px; z-index: 9999;
    padding: 14px 22px; border-radius: 16px; font-weight: 600; font-size: 14px;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,.15);
    animation: toastIn .3s cubic-bezier(0.16,1,0.3,1);
    max-width: 400px; line-height: 1.4;
  }
  .mapa-toast.ok  { background: #21491e; color: white; }
  .mapa-toast.err { background: #c0392b; color: white; }
  @keyframes toastIn {
    from { transform: translateX(120%); opacity: 0; }
    to   { transform: translateX(0);   opacity: 1; }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .mapa-lista { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 700px) {
    .mapa-page { padding: 1.5rem; }
    .mapa-title { font-size: 32px; }
    #mapa-leaflet { height: 320px; }
    .mapa-lista { grid-template-columns: 1fr; }
  }
`

function OpenChip({ status }) {
  if (status === 'Abierto')  return <span className="mapa-chip mapa-chip-open">● Abierto</span>
  if (status === 'Cerrado')  return <span className="mapa-chip mapa-chip-closed">● Cerrado</span>
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

  // ── Toast local para notificación de reto ────────────────────────────────
  const [toast, setToast] = useState(null)

  const showToast = (ok, msg) => {
    setToast({ ok, msg })
    setTimeout(() => setToast(null), 4000)
  }

  // ── Buscar centros Y registrar el reto ──────────────────────────────────
  // buscarCentros() ya no llama completarRetoPorAccion internamente (se quitó
  // del store para evitar doble llamada). La acción se registra aquí, una sola vez.
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
          html: `<div style="width:18px;height:18px;border-radius:50%;background:#23376d;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
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
          html: `<div style="width:32px;height:32px;border-radius:50%;background:#23376d;border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;color:#fdb500;font-size:13px;font-weight:800;">${i + 1}</div>`,
          iconSize: [32, 32], iconAnchor: [16, 16]
        })
        const openBadge = c.open_status === 'Abierto'
          ? `<span style="color:#23376d;font-weight:700">● Abierto</span>`
          : c.open_status === 'Cerrado'
          ? `<span style="color:#791F1F;font-weight:700">● Cerrado</span>`
          : `<span style="color:#888">Horario N/D</span>`
        const popupHtml = `
          <div style="font-family:Outfit,sans-serif;min-width:200px">
            <p style="font-weight:700;font-size:14px;color:#111827;margin:0 0 4px">${c.name}</p>
            <p style="font-size:12px;color:#4b5a8a;margin:0 0 6px">${c.address}</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
              ${openBadge}
              <span style="font-size:12px;color:#eb7207;font-weight:600">${c.distance_km} km</span>
              ${c.rating ? `<span style="font-size:12px;color:#BA7517">★ ${c.rating}</span>` : ''}
            </div>
            ${c.google_maps_url ? `<a href="${c.google_maps_url}" target="_blank" style="display:inline-block;margin-top:8px;font-size:12px;color:#23376d;font-weight:600">Ver en Google Maps ↗</a>` : ''}
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

      {/* ── Toast de reto completado ── */}
      {toast && (
        <div className={`mapa-toast ${toast.ok ? 'ok' : 'err'}`}>
          <i className={`ti ${toast.ok ? 'ti-circle-check' : 'ti-alert-circle'}`} />
          {toast.msg}
        </div>
      )}

      <div className="mapa-badge">
        <svg viewBox="0 0 24 24" fill="none" style={{ width: 13, height: 13 }} stroke="#23376d" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        EcoKinal · Google Places API
      </div>
      <h1 className="mapa-title">
        Mapa de <span style={{ color: '#eb7207' }}>reciclaje</span>
      </h1>
      <p className="mapa-subtitle">
        Encuentra los centros de reciclaje y recicladoras más cercanos a tu ubicación actual.
      </p>

      {error && (
        <div className="mapa-error">
          <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16, flexShrink: 0 }} stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          {error}
        </div>
      )}

      <div className="mapa-controls">
        {/* ── Botón: llama a handleBuscar (no a buscarCentros directamente) ── */}
        <button className="mapa-btn-primary" onClick={handleBuscar} disabled={isLoading}>
          {isLoading ? (
            <svg className="mapa-spinner" viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }} stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
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
            {total} centro{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Mapa — ancho completo */}
      <div className="mapa-map-wrapper">
        <div id="mapa-leaflet" />
      </div>

      {/* Lista en grid 3 columnas */}
      {(centers.length > 0 || isLoading) && (
        <div className="mapa-lista-header">
          <span className="mapa-lista-title">Centros de reciclaje cercanos</span>
        </div>
      )}

      <div className="mapa-lista">
        {isLoading && [1,2,3,4,5,6].map((n) => <div key={n} className="mapa-skeleton" />)}

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