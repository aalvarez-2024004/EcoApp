import { useEffect, useRef, useState } from 'react'
import useMapaStore from '../store/useMapaStore'
import { completarRetoPorAccion } from '../../../shared/Api/Gamificacion'
import {HeaderIllustration}from '../../../icons/ImpactoIcons.jsx'
import{BgPattern} from '../../../icons/DetectorIcons.jsx'
import {mapaStyles} from '../../../Styles/constants/MapaPage.js'
import { OpenChip } from '../../../ui/Mapa/OpenChip.jsx'
import { G } from '../../../Styles/constants/ImpactoPage.js'

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
          html: c.photo_url
            ? `
              <img
                src="${c.photo_url}"
                alt="${c.name}"
                style="
                  width:40px;
                  height:40px;
                  border-radius:50%;
                  object-fit:cover;
                  border:3px solid white;
                  box-shadow:0 2px 10px rgba(0,0,0,.25);
                "
              />
            `
            : `
              <div
                style="
                  width:32px;
                  height:32px;
                  border-radius:50%;
                  background:${G.green2};
                  border:3px solid #fff;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  color:white;
                  font-weight:bold;
                "
              >
                ${i + 1}
              </div>
            `,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        })
        const openBadge = c.open_status === 'Abierto'
          ? `<span style="color:${G.green2};font-weight:700">● Abierto</span>`
          : c.open_status === 'Cerrado'
          ? `<span style="color:#dc2626;font-weight:700">● Cerrado</span>`
          : `<span style="color:${G.textMuted}">Horario N/D</span>`
        const popupHtml = `
        <div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:200px">
          ${c.photo_url ? `<img src="${c.photo_url}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px" />` : ''}
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
                <div className="mapa-card-num">
                  <img
                    src={c.photo_url}
                    alt={c.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                </div>                <p className="mapa-card-name">{c.name}</p>
              </div>
              {c.photo_url && (
                  <img
                      src={c.photo_url}
                      alt={c.name}
                      style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 12, marginBottom: 4 }}
                  />
              )}
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