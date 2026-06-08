import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PLACES_BASE_URL = "https://places.googleapis.com/v1";

// Campos mínimos para mantener el costo al mínimo (Places API PRO)
const FIELD_MASK = [
    "places.id",
    "places.displayName",
    "places.formattedAddress",
    "places.location",
    "places.nationalPhoneNumber",
    "places.regularOpeningHours",
    "places.currentOpeningHours",
    "places.rating",
    "places.googleMapsUri",
    "places.photos"
].join(",");

/**
 * ESTRATEGIA 1: searchNearby con tipo recycling_center
 * Es el método más eficiente pero en Guatemala puede devolver pocos resultados.
 */
const searchNearby = async (lat, lon, radiusMeters, maxResults) => {
    try {
        const response = await axios.post(
            `${PLACES_BASE_URL}/places:searchNearby`,
            {
                includedTypes: ["recycling_center"],
                maxResultCount: maxResults,
                locationRestriction: {
                    circle: {
                        center: { latitude: lat, longitude: lon },
                        radius: radiusMeters
                    }
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": GOOGLE_API_KEY,
                    "X-Goog-FieldMask": FIELD_MASK
                }
            }
        );
        return response.data.places || [];
    } catch (error) {
        console.warn("searchNearby falló:", error?.response?.data?.error?.message || error.message);
        return [];
    }
};

/**
 * ESTRATEGIA 2: searchText con términos en español
 * Más útil en Guatemala donde recycling_center no está bien indexado.
 * Se ejecuta en paralelo con múltiples keywords.
 *
 * NOTA: searchText no soporta locationRestriction (solo locationBias),
 * por lo que Google puede devolver resultados fuera del radio.
 * El filtrado estricto se aplica después con calculateDistance.
 */
const searchByText = async (lat, lon, radiusMeters) => {
    const keywords = [
        "Centro de reciclaje",
        "Recicladora",
        "Punto limpio reciclaje"
    ];

    const requests = keywords.map((keyword) =>
        axios.post(
            `${PLACES_BASE_URL}/places:searchText`,
            {
                textQuery: keyword,
                maxResultCount: 10,
                // locationBias: Google puede ignorar el radio y devolver resultados lejanos.
                // Usamos un radio generoso (3x) para capturar más candidatos,
                // y luego filtramos estrictamente por distancia Haversine.
                locationBias: {
                    circle: {
                        center: { latitude: lat, longitude: lon },
                        radius: radiusMeters * 3
                    }
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": GOOGLE_API_KEY,
                    "X-Goog-FieldMask": FIELD_MASK
                }
            }
        ).then((r) => r.data.places || []).catch(() => [])
    );

    const results = await Promise.all(requests);

    // Aplanar y deduplicar por place ID
    const seen = new Set();
    return results.flat().filter((place) => {
        if (seen.has(place.id)) return false;
        seen.add(place.id);
        return true;
    });
};

/**
 * Calcula la distancia entre dos coordenadas (Haversine).
 * @returns {number} Distancia en km
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/**
 * Formatea un lugar de Google Places al formato estándar de EcoKinal.
 */
export const formatPlace = (place, userLat, userLon) => {
    const lat = place.location?.latitude;
    const lon = place.location?.longitude;
    const distance = (lat && lon)
        ? calculateDistance(userLat, userLon, lat, lon).toFixed(2)
        : null;

    let openStatus = "Horario no especificado";
    if (place.currentOpeningHours?.openNow !== undefined) {
        openStatus = place.currentOpeningHours.openNow ? "Abierto" : "Cerrado";
    } else if (place.regularOpeningHours?.openNow !== undefined) {
        openStatus = place.regularOpeningHours.openNow ? "Abierto" : "Cerrado";
    }

    const weekdayDescriptions =
        place.currentOpeningHours?.weekdayDescriptions ||
        place.regularOpeningHours?.weekdayDescriptions ||
        [];
    const firstPhoto = place.photos?.[0]?.name
    const photoUrl = firstPhoto
        ? `https://places.googleapis.com/v1/${firstPhoto}/media?maxWidthPx=400&key=${GOOGLE_API_KEY}`
        : null

    return {
        id: place.id || null,
        name: place.displayName?.text || "Centro de reciclaje",
        address: place.formattedAddress || "Dirección no disponible",
        phone: place.nationalPhoneNumber || "No disponible",
        open_status: openStatus,
        opening_hours: weekdayDescriptions,
        rating: place.rating || null,
        google_maps_url: place.googleMapsUri || null,
        distance_km: distance,
        lat,
        lon,
        photo_url: photoUrl
    };
};

/**
 * Punto de entrada principal del servicio.
 * Combina searchNearby + searchText para maximizar resultados en Guatemala.
 *
 * Estrategia:
 *  1. Ejecuta searchNearby y searchText en PARALELO.
 *  2. Fusiona los resultados deduplicando por place ID.
 *  3. Filtra estrictamente por radio usando distancia Haversine.
 *     (searchNearby respeta el radio; searchText solo usa locationBias y puede ignorarlo)
 *  4. Si searchNearby ya tiene suficientes resultados (>= 3), omite el text search.
 */
export const findNearbyRecyclingCenters = async (lat, lon, radiusMeters = 5000, maxResults = 20) => {
    const radiusKm = radiusMeters / 1000;

    // Ejecutar ambas estrategias en paralelo
    const [nearbyResults, textResults] = await Promise.all([
        searchNearby(lat, lon, radiusMeters, maxResults),
        searchByText(lat, lon, radiusMeters)
    ]);

    // Si searchNearby ya trajo suficientes, usarlo solo (más barato)
    // Igual aplicamos el filtro de distancia como segunda línea de defensa
    if (nearbyResults.length >= 3) {
        return nearbyResults.filter((place) => {
            const pLat = place.location?.latitude;
            const pLon = place.location?.longitude;
            if (!pLat || !pLon) return false;
            return calculateDistance(lat, lon, pLat, pLon) <= radiusKm;
        });
    }

    // Fusionar ambos resultados deduplicando por ID
    const seen = new Set(nearbyResults.map((p) => p.id));
    const merged = [...nearbyResults];

    for (const place of textResults) {
        if (!seen.has(place.id)) {
            seen.add(place.id);
            merged.push(place);
        }
    }

    // ─── FILTRO ESTRICTO DE RADIO ───────────────────────────────────────────
    // searchText usa locationBias, no locationRestriction: Google puede devolver
    // lugares fuera del radio elegido por el usuario. Este filtro garantiza que
    // solo se incluyan centros dentro del radio real seleccionado.
    return merged.filter((place) => {
        const pLat = place.location?.latitude;
        const pLon = place.location?.longitude;
        if (!pLat || !pLon) return false;
        return calculateDistance(lat, lon, pLat, pLon) <= radiusKm;
    });
};