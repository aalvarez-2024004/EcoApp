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
    "places.photos",
    "places.types"          // necesario para el filtro de relevancia
].join(",");

// ─── FILTRO DE RELEVANCIA ────────────────────────────────────────────────────
// Tipos de Google Places que corresponden a centros de reciclaje o
// puntos de gestión de residuos legítimos.
const ALLOWED_TYPES = new Set([
    "recycling_center",
    "waste_management_facility",
    "garbage_collection",
    "scrap_metal_dealer",
    "junk_dealer",
    "junk_store",
    "car_dealer",           // raramente relevante, pero algunos chatarreros lo usan
    "moving_company",
    "storage",
]);

// Palabras clave en el nombre que confirman que es un centro de reciclaje
const RECYCLING_NAME_KEYWORDS = [
    "recicl",       // reciclaje, recicladora, recicladora, etc.
    "residuo",
    "basura",
    "chatarra",
    "punto limpio",
    "desecho",
    "ecocentro",
    "acopio",
    "compost",
    "scrap",
    "waste",
    "junk",
    "metal",        // chatarrería de metales
];

/**
 * Decide si un lugar devuelto por Google es realmente un centro de reciclaje.
 * Acepta si:
 *  - tiene el tipo "recycling_center" o "waste_management_facility", O
 *  - su nombre contiene alguna palabra clave de reciclaje.
 * Rechaza si ninguna de las dos condiciones se cumple.
 */
const isRecyclingRelevant = (place) => {
    const types = place.types || [];

    // Tipo explícito de reciclaje → siempre aceptar
    if (types.includes("recycling_center") || types.includes("waste_management_facility")) {
        return true;
    }

    // Nombre con keyword de reciclaje → aceptar
    const nameLower = (place.displayName?.text || "").toLowerCase();
    if (RECYCLING_NAME_KEYWORDS.some((kw) => nameLower.includes(kw))) {
        return true;
    }

    return false;
};

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
                        // BUG FIX: searchNearby también tiene límite de 50 000 m
                        radius: Math.min(radiusMeters, 50000)
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
 *
 * BUG FIX: locationBias tiene un límite máximo de 50 000 m en Google Places API.
 * Antes se usaba radiusMeters * 3, lo que para 20 km = 60 000 m → Google rechazaba
 * la petición silenciosamente y devolvía 0 resultados.
 * Ahora se aplica Math.min(..., 50000) para respetar ese límite.
 */
const searchByText = async (lat, lon, radiusMeters) => {
    const keywords = [
        "Centro de reciclaje",
        "Recicladora",
        "Punto limpio reciclaje"
    ];

    // Bias generoso para capturar más candidatos, pero nunca > 50 000 m (límite de la API)
    const biasRadius = Math.min(radiusMeters * 3, 50000);

    const requests = keywords.map((keyword) =>
        axios.post(
            `${PLACES_BASE_URL}/places:searchText`,
            {
                textQuery: keyword,
                maxResultCount: 10,
                locationBias: {
                    circle: {
                        center: { latitude: lat, longitude: lon },
                        radius: biasRadius
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
    const firstPhoto = place.photos?.[0]?.name;
    const photoUrl = firstPhoto
        ? `https://places.googleapis.com/v1/${firstPhoto}/media?maxWidthPx=400&key=${GOOGLE_API_KEY}`
        : null;

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
 *  3. Filtra por relevancia: solo acepta lugares que sean realmente
 *     centros de reciclaje (por tipo de Google o por nombre).
 *  4. Filtra estrictamente por radio usando distancia Haversine.
 */
export const findNearbyRecyclingCenters = async (lat, lon, radiusMeters = 5000, maxResults = 20) => {
    const radiusKm = radiusMeters / 1000;

    // Ejecutar ambas estrategias en paralelo
    const [nearbyResults, textResults] = await Promise.all([
        searchNearby(lat, lon, radiusMeters, maxResults),
        searchByText(lat, lon, radiusMeters)
    ]);

    // Fusionar deduplicando por ID
    const seen = new Set(nearbyResults.map((p) => p.id));
    const merged = [...nearbyResults];

    for (const place of textResults) {
        if (!seen.has(place.id)) {
            seen.add(place.id);
            merged.push(place);
        }
    }

    return merged.filter((place) => {
        const pLat = place.location?.latitude;
        const pLon = place.location?.longitude;
        if (!pLat || !pLon) return false;

        // ── Filtro 1: distancia estricta ──────────────────────────────────────
        if (calculateDistance(lat, lon, pLat, pLon) > radiusKm) return false;

        // ── Filtro 2: relevancia — solo centros de reciclaje reales ──────────
        if (!isRecyclingRelevant(place)) return false;

        return true;
    });
};
