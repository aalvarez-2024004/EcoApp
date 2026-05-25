import axios from "axios";
import OpeningHours from "opening_hours";

async function getFullAddress(lat, lon) {
    try {
        const response = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
                params: {
                    lat,
                    lon,
                    format: "json"
                },
                headers: {
                    "User-Agent": "EcoKinalApp"
                }
            }
        );

        return response.data.display_name || "Dirección no disponible";

    } catch (error) {
        return "Dirección no disponible";
    }
}

function isOpenNow(opening_hours) {
    try {
        const oh = new OpeningHours(opening_hours);
        const isOpen = oh.getState();

        if (isOpen) {
            return "Abierto";
        } else {
            return "Cerrado";
        }

    } catch {
        return "Horario no disponible";
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distancia en km
}

export const getRecyclingCenters = async (req, res) => {
    try {
        const { lat, lon } = req.body;

        if (!lat || !lon) {
            return res.status(400).json({
                message: "Debe enviar lat y lon"
            });
        }

        const query = `
        [out:json][timeout:25];
        (
        node["amenity"="recycling"](around:3000,${lat},${lon});
        way["amenity"="recycling"](around:3000,${lat},${lon});
        relation["amenity"="recycling"](around:3000,${lat},${lon});
        );
        out center tags;
        `;

        const response = await axios.post(
            "https://overpass.kumi.systems/api/interpreter",
            query,
            {
                headers: { "Content-Type": "text/plain" },
                timeout: 30000
            }
        );

        const results = await Promise.all(
        response.data.elements.map(async (place) => {

            const tags = place.tags || {};
            const latitude = place.lat || place.center?.lat;
            const longitude = place.lon || place.center?.lon;

            const fullAddress = await getFullAddress(latitude, longitude);

            const openingHours = tags.opening_hours || null;
            const openStatus = openingHours
                ? isOpenNow(openingHours)
                : "Horario no especificado";

            const distance = calculateDistance(lat, lon, latitude, longitude);

            return {
                name: tags.name || "Centro de reciclaje",
                address: fullAddress,
                phone: tags.phone || tags["contact:phone"] || "No disponible",
                opening_hours: openingHours || "No especificado",
                open_status: openStatus,
                distance_km: distance.toFixed(2),
                lat: latitude,
                lon: longitude
            };
        })
    );
        results.sort((a, b) => a.distance_km - b.distance_km);

        const topFive = results.slice(0, 5);

        res.json(topFive);

    } catch (error) {
        console.error("ERROR REAL:", error.message);

        res.status(500).json({
            message: "Error consultando centros",
            error: error.message
        });
    }
};