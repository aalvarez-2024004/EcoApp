import { findNearbyRecyclingCenters, formatPlace, calculateDistance } from "./recycling.service.js";

export const getRecyclingCenters = async (req, res) => {
    try {
        const { lat, lon, radius, limit } = req.body;

        if (lat === undefined || lon === undefined) {
            return res.status(400).json({ message: "Debe enviar lat y lon" });
        }

        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({ message: "lat y lon deben ser números válidos" });
        }

        const radiusMeters = Math.min(Number(radius) || 5000, 50000);
        const radiusKm     = radiusMeters / 1000;
        const maxResults   = Math.min(Number(limit)  || 20,   20);

        const places = await findNearbyRecyclingCenters(lat, lon, radiusMeters, maxResults);

        if (!places.length) {
            return res.status(200).json({
                message: "No se encontraron centros de reciclaje en el área indicada. Intenta aumentar el radio de búsqueda.",
                total: 0,
                centers: []
            });
        }

        const centers = places
            .map((place) => formatPlace(place, lat, lon))
            // Descartar resultados sin coordenadas
            .filter((c) => c.lat && c.lon)
            // ─── FILTRO ESTRICTO DE RADIO (segunda línea de defensa) ───────────
            // Aunque el servicio ya filtra, el controller valida contra distance_km
            // formateado para garantizar consistencia en la respuesta.
            .filter((c) => Number(c.distance_km) <= radiusKm)
            .sort((a, b) => Number(a.distance_km) - Number(b.distance_km))
            .slice(0, maxResults);

        return res.status(200).json({
            total: centers.length,
            radius_km: radiusKm.toFixed(1),
            centers
        });

    } catch (error) {
        console.error("Error en getRecyclingCenters:", error?.response?.data || error.message);

        const googleError = error?.response?.data?.error;
        if (googleError) {
            return res.status(502).json({
                message: "Error al consultar Google Places API",
                detail: googleError.message || "Error desconocido"
            });
        }

        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};