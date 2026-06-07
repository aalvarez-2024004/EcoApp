'use strict'
import { detectarLabels } from "./clasificacion.service.js";
import Clasificacion from "./clasificacion.model.js";
import fs from "fs";
import axios from 'axios';

export const clasificarImagen = async (req, res) => {

    let imagePath = null;

    try {

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Debes enviar una imagen" });
        }

        const MAX_SIZE = 5 * 1024 * 1024;
        const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

        if (!ALLOWED_TYPES.includes(req.file.mimetype)) {
            return res.status(400).json({ success: false, message: "Formato no permitido. Solo JPG, PNG y WEBP." });
        }
        if (req.file.size > MAX_SIZE) {
            return res.status(400).json({ success: false, message: "Imagen demasiado grande (máximo 5 MB)." });
        }
        if (!req.file.size || req.file.size === 0) {
            return res.status(400).json({ success: false, message: "La imagen está vacía o dañada." });
        }

        imagePath = req.file.path;
        console.log('Archivo recibido:', req.file?.originalname, req.file?.size, 'bytes');

        const { labels, labelsConScore } = await detectarLabels(imagePath);

        if (imagePath && fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

        const resultado = clasificarResiduo(labels, labelsConScore);
        console.log('Resultado clasificación:', resultado.tipo, '| Confianza:', resultado.confianza);

        const registro = await Clasificacion.create({
            imagen: req.file.filename,
            labels,
            labelsConScore: Object.fromEntries(labelsConScore),
            tipo: resultado.tipo,
            contenedor: resultado.contenedor
        });

        try {
            await axios.post(
                'http://localhost:3008/GamificationEcoKinal/v1/gamification/add-points',
                {},
                { headers: { Authorization: req.headers.authorization } }
            );
        } catch (e) { console.error('Error al sumar puntos:', e.message); }

        try {
            await axios.post(
                'http://localhost:3008/GamificationEcoKinal/v1/daily-challenges/auto/detector_3_check',
                {},
                { headers: { Authorization: req.headers.authorization } }
            );
        } catch (_) { /* silencioso */ }

        try {
            await axios.post(
                'http://localhost:3002/api/impacto/registrar',
                { tipo: resultado.tipo },
                { headers: { Authorization: req.headers.authorization } }
            );
        } catch (e) { console.error('Error al registrar impacto:', e.response?.data || e.message); }

        return res.status(200).json({
            success: true,
            message: "Imagen clasificada correctamente",
            data: registro
        });

    } catch (error) {
        if (imagePath && fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        return res.status(500).json({
            success: false,
            message: "Error al clasificar la imagen",
            error: error.message
        });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// KEYWORDS OPTIMIZADAS PARA GOOGLE CLOUD VISION
//
// Google Vision devuelve labels en inglés formal con mayúsculas iniciales:
//   "Plastic bottle", "Glass bottle", "Electronic device", "Food", etc.
// Normalizamos todo a minúsculas antes de comparar.
//
// Cada entrada es { term, weight } donde weight (1.0–3.0) amplifica
// cuánto puntúa ese término en el sistema de scoring acumulativo.
// Terms con weight 3.0 = señales muy fuertes (casi certeras).
// Terms con weight 1.0 = señales de apoyo (confirman pero no deciden solas).
// ─────────────────────────────────────────────────────────────────────────────

const KEYWORDS = {

    // ── PELIGROSO ─────────────────────────────────────────────────────────────
    // Prioridad máxima — un objeto puede ser plástico Y tóxico,
    // pero siempre debe clasificarse como peligroso primero.
    peligroso: [
        // Electrónicos (Vision los etiqueta así)
        { term: "electronic device",        weight: 3.0 },
        { term: "electronics",              weight: 3.0 },
        { term: "electronic waste",         weight: 3.0 },
        { term: "e-waste",                  weight: 3.0 },
        { term: "mobile phone",             weight: 3.0 },
        { term: "smartphone",               weight: 3.0 },
        { term: "cellular network",         weight: 2.5 },
        { term: "feature phone",            weight: 2.5 },
        { term: "telephone",                weight: 2.0 },
        { term: "laptop",                   weight: 3.0 },
        { term: "personal computer",        weight: 3.0 },
        { term: "computer",                 weight: 2.5 },
        { term: "desktop computer",         weight: 3.0 },
        { term: "computer monitor",         weight: 3.0 },
        { term: "flat panel display",       weight: 3.0 },
        { term: "television",               weight: 3.0 },
        { term: "display device",           weight: 2.0 },
        { term: "circuit board",            weight: 3.0 },
        { term: "printed circuit board",    weight: 3.0 },
        { term: "electronic component",     weight: 3.0 },
        { term: "electrical wiring",        weight: 2.5 },
        { term: "battery",                  weight: 3.0 },
        { term: "electric battery",         weight: 3.0 },
        { term: "battery charger",          weight: 3.0 },
        { term: "power supply",             weight: 3.0 },
        { term: "power bank",               weight: 3.0 },
        { term: "charger",                  weight: 2.5 },
        { term: "adapter",                  weight: 2.0 },
        { term: "camera",                   weight: 2.5 },
        { term: "digital camera",           weight: 3.0 },
        { term: "video camera",             weight: 3.0 },
        { term: "remote control",           weight: 2.5 },
        { term: "keyboard",                 weight: 2.5 },
        { term: "computer keyboard",        weight: 3.0 },
        { term: "computer mouse",           weight: 3.0 },
        { term: "printer",                  weight: 2.5 },
        { term: "hard disk drive",          weight: 3.0 },
        { term: "flash drive",              weight: 2.5 },
        { term: "usb",                      weight: 2.0 },
        { term: "headphones",               weight: 2.5 },
        { term: "earphones",                weight: 2.5 },
        { term: "microwave oven",           weight: 3.0 },
        { term: "home appliance",           weight: 2.0 },
        { term: "small appliance",          weight: 2.0 },
        { term: "major appliance",          weight: 2.5 },
        { term: "hair dryer",               weight: 2.5 },
        { term: "electric iron",            weight: 2.5 },
        { term: "fluorescent lamp",         weight: 3.0 },
        { term: "compact fluorescent lamp", weight: 3.0 },
        { term: "light-emitting diode",     weight: 2.5 },
        { term: "light bulb",               weight: 2.5 },
        { term: "incandescent light bulb",  weight: 2.5 },
        // Químicos, medicamentos y tóxicos
        { term: "medication",               weight: 3.0 },
        { term: "medicine",                 weight: 3.0 },
        { term: "pharmaceutical drug",      weight: 3.0 },
        { term: "pill",                     weight: 2.5 },
        { term: "capsule",                  weight: 2.5 },
        { term: "syringe",                  weight: 3.0 },
        { term: "hypodermic needle",        weight: 3.0 },
        { term: "medical equipment",        weight: 2.5 },
        { term: "paint",                    weight: 2.5 },
        { term: "paint can",                weight: 3.0 },
        { term: "spray paint",              weight: 3.0 },
        { term: "aerosol spray",            weight: 3.0 },
        { term: "aerosol",                  weight: 2.5 },
        { term: "spray bottle",             weight: 2.0 },
        { term: "motor oil",                weight: 3.0 },
        { term: "engine oil",               weight: 3.0 },
        { term: "lubricant",                weight: 2.5 },
        { term: "fuel",                     weight: 2.5 },
        { term: "gasoline",                 weight: 3.0 },
        { term: "pesticide",                weight: 3.0 },
        { term: "insecticide",              weight: 3.0 },
        { term: "herbicide",                weight: 3.0 },
        { term: "chemical",                 weight: 2.0 },
        { term: "hazardous waste",          weight: 3.0 },
        { term: "toxic waste",              weight: 3.0 },
        { term: "biohazard",                weight: 3.0 },
        { term: "fire extinguisher",        weight: 3.0 },
        { term: "lighter",                  weight: 2.5 },
        { term: "thermometer",              weight: 2.0 },
        { term: "smoke detector",           weight: 2.5 },
        { term: "cleaning agent",           weight: 2.0 },
        { term: "bleach",                   weight: 2.5 },
        { term: "solvent",                  weight: 2.5 },
    ],

    // ── ORGÁNICO ──────────────────────────────────────────────────────────────
    organico: [
        // Google Vision es muy bueno identificando alimentos
        { term: "food",                     weight: 2.5 },
        { term: "natural foods",            weight: 2.5 },
        { term: "whole food",               weight: 2.5 },
        { term: "organic food",             weight: 3.0 },
        { term: "food waste",               weight: 3.0 },
        { term: "compost",                  weight: 3.0 },
        // Frutas (Vision las reconoce muy bien)
        { term: "fruit",                    weight: 2.5 },
        { term: "produce",                  weight: 2.5 },
        { term: "apple",                    weight: 2.5 },
        { term: "banana",                   weight: 2.5 },
        { term: "orange",                   weight: 2.5 },
        { term: "mango",                    weight: 2.5 },
        { term: "strawberry",               weight: 2.5 },
        { term: "watermelon",               weight: 2.5 },
        { term: "pineapple",                weight: 2.5 },
        { term: "grapes",                   weight: 2.5 },
        { term: "avocado",                  weight: 2.5 },
        { term: "citrus",                   weight: 2.0 },
        { term: "berry",                    weight: 2.0 },
        { term: "peach",                    weight: 2.0 },
        { term: "pear",                     weight: 2.0 },
        { term: "lemon",                    weight: 2.0 },
        { term: "lime",                     weight: 2.0 },
        { term: "melon",                    weight: 2.0 },
        { term: "coconut",                  weight: 2.0 },
        { term: "kiwi",                     weight: 2.0 },
        // Verduras
        { term: "vegetable",                weight: 2.5 },
        { term: "leaf vegetable",           weight: 2.5 },
        { term: "root vegetable",           weight: 2.5 },
        { term: "carrot",                   weight: 2.5 },
        { term: "broccoli",                 weight: 2.5 },
        { term: "tomato",                   weight: 2.5 },
        { term: "potato",                   weight: 2.5 },
        { term: "onion",                    weight: 2.0 },
        { term: "garlic",                   weight: 2.0 },
        { term: "lettuce",                  weight: 2.0 },
        { term: "spinach",                  weight: 2.0 },
        { term: "cucumber",                 weight: 2.0 },
        { term: "pepper",                   weight: 2.0 },
        { term: "cabbage",                  weight: 2.0 },
        { term: "corn",                     weight: 2.0 },
        { term: "mushroom",                 weight: 2.0 },
        { term: "fungi",                    weight: 1.5 },
        { term: "pumpkin",                  weight: 2.0 },
        { term: "squash",                   weight: 2.0 },
        // Proteínas y lácteos
        { term: "meat",                     weight: 2.5 },
        { term: "red meat",                 weight: 2.5 },
        { term: "chicken",                  weight: 2.5 },
        { term: "poultry",                  weight: 2.5 },
        { term: "fish",                     weight: 2.5 },
        { term: "seafood",                  weight: 2.5 },
        { term: "egg",                      weight: 2.0 },
        { term: "eggshell",                 weight: 2.5 },
        { term: "dairy",                    weight: 2.0 },
        { term: "cheese",                   weight: 2.0 },
        // Panadería y granos
        { term: "bread",                    weight: 2.5 },
        { term: "baked goods",              weight: 2.5 },
        { term: "bakery",                   weight: 2.0 },
        { term: "rice",                     weight: 2.0 },
        { term: "pasta",                    weight: 2.0 },
        { term: "cereal",                   weight: 2.0 },
        { term: "grain",                    weight: 2.0 },
        { term: "seed",                     weight: 1.5 },
        { term: "nut",                      weight: 1.5 },
        // Plantas y material vegetal (Vision lo detecta muy bien)
        { term: "leaf",                     weight: 2.0 },
        { term: "leaves",                   weight: 2.0 },
        { term: "plant",                    weight: 1.5 },
        { term: "flower",                   weight: 1.5 },
        { term: "grass",                    weight: 1.5 },
        { term: "wood",                     weight: 1.5 },
        { term: "branch",                   weight: 1.5 },
        { term: "tree",                     weight: 1.0 },
        { term: "peel",                     weight: 2.5 },
        { term: "coffee",                   weight: 2.0 },
        { term: "coffee grounds",           weight: 3.0 },
        { term: "tea",                      weight: 1.5 },
    ],

    // ── INORGÁNICO / RECICLABLE ───────────────────────────────────────────────
    inorganico: [
        // Plásticos (Vision es muy específico aquí)
        { term: "plastic bottle",           weight: 3.0 },
        { term: "plastic bag",              weight: 3.0 },
        { term: "plastic container",        weight: 3.0 },
        { term: "plastic",                  weight: 2.0 },
        { term: "polyethylene",             weight: 2.5 },
        { term: "polypropylene",            weight: 2.5 },
        { term: "polystyrene",              weight: 2.5 },
        { term: "pet bottle",               weight: 3.0 },
        { term: "water bottle",             weight: 2.5 },
        { term: "drink bottle",             weight: 2.5 },
        { term: "soft drink",               weight: 2.0 },
        { term: "bottle",                   weight: 2.0 },
        { term: "container",                weight: 1.5 },
        { term: "packaging",                weight: 2.0 },
        { term: "blister pack",             weight: 2.5 },
        { term: "bubble wrap",              weight: 2.5 },
        { term: "foam",                     weight: 2.0 },
        { term: "styrofoam",                weight: 2.5 },
        { term: "disposable cup",           weight: 2.5 },
        { term: "plastic cup",              weight: 2.5 },
        { term: "straw",                    weight: 2.5 },
        { term: "plastic straw",            weight: 3.0 },
        { term: "plastic wrap",             weight: 3.0 },
        { term: "cling film",               weight: 3.0 },
        // Metales (Vision distingue bien tipos de metal)
        { term: "aluminum can",             weight: 3.0 },
        { term: "tin can",                  weight: 3.0 },
        { term: "beverage can",             weight: 3.0 },
        { term: "metal",                    weight: 2.0 },
        { term: "aluminum",                 weight: 2.5 },
        { term: "aluminium",                weight: 2.5 },
        { term: "steel",                    weight: 2.0 },
        { term: "iron",                     weight: 1.5 },
        { term: "copper",                   weight: 2.0 },
        { term: "tin",                      weight: 2.0 },
        { term: "can",                      weight: 2.0 },
        { term: "aluminum foil",            weight: 2.5 },
        { term: "metal container",          weight: 2.5 },
        { term: "scrap metal",              weight: 2.5 },
        // Vidrio (Vision lo detecta excelente)
        { term: "glass bottle",             weight: 3.0 },
        { term: "glass",                    weight: 2.0 },
        { term: "wine bottle",              weight: 2.5 },
        { term: "beer bottle",              weight: 2.5 },
        { term: "jar",                      weight: 2.0 },
        { term: "mason jar",                weight: 2.5 },
        { term: "glass jar",                weight: 2.5 },
        { term: "glass container",          weight: 2.5 },
        { term: "drinkware",                weight: 1.5 },
        // Papel y cartón
        { term: "cardboard",                weight: 3.0 },
        { term: "cardboard box",            weight: 3.0 },
        { term: "corrugated fiberboard",    weight: 3.0 },
        { term: "paper",                    weight: 2.0 },
        { term: "newspaper",                weight: 2.5 },
        { term: "magazine",                 weight: 2.0 },
        { term: "paperboard",               weight: 2.5 },
        { term: "carton",                   weight: 2.5 },
        { term: "milk carton",              weight: 3.0 },
        { term: "juice box",                weight: 3.0 },
        { term: "tetra pak",                weight: 3.0 },
        { term: "paper bag",                weight: 2.5 },
        { term: "paper cup",                weight: 2.5 },
        { term: "tissue paper",             weight: 2.0 },
        { term: "box",                      weight: 1.5 },
        // Caucho
        { term: "tire",                     weight: 2.5 },
        { term: "tyre",                     weight: 2.5 },
        { term: "rubber",                   weight: 2.0 },
    ],

    // ── REUTILIZABLE ──────────────────────────────────────────────────────────
    reutilizable: [
        // Ropa y calzado (Vision muy bueno aquí)
        { term: "clothing",                 weight: 2.5 },
        { term: "t-shirt",                  weight: 2.5 },
        { term: "shirt",                    weight: 2.5 },
        { term: "jacket",                   weight: 2.5 },
        { term: "pants",                    weight: 2.5 },
        { term: "trousers",                 weight: 2.5 },
        { term: "jeans",                    weight: 2.5 },
        { term: "dress",                    weight: 2.5 },
        { term: "shoe",                     weight: 2.5 },
        { term: "sneakers",                 weight: 2.5 },
        { term: "boot",                     weight: 2.0 },
        { term: "textile",                  weight: 2.0 },
        { term: "fabric",                   weight: 2.0 },
        { term: "bag",                      weight: 1.5 },
        { term: "handbag",                  weight: 2.5 },
        { term: "backpack",                 weight: 2.5 },
        { term: "luggage",                  weight: 2.0 },
        // Muebles y hogar (Vision los etiqueta bien)
        { term: "furniture",                weight: 2.5 },
        { term: "chair",                    weight: 2.0 },
        { term: "table",                    weight: 2.0 },
        { term: "shelf",                    weight: 2.0 },
        { term: "lamp",                     weight: 2.0 },
        { term: "curtain",                  weight: 2.0 },
        { term: "rug",                      weight: 2.0 },
        { term: "pillow",                   weight: 2.0 },
        { term: "blanket",                  weight: 2.0 },
        { term: "picture frame",            weight: 2.0 },
        // Herramientas
        { term: "tool",                     weight: 2.0 },
        { term: "hand tool",                weight: 2.5 },
        { term: "hammer",                   weight: 2.5 },
        { term: "screwdriver",              weight: 2.5 },
        { term: "wrench",                   weight: 2.5 },
        { term: "pliers",                   weight: 2.5 },
        { term: "saw",                      weight: 2.5 },
        { term: "drill",                    weight: 2.5 },
        { term: "ladder",                   weight: 2.0 },
        // Juguetes y entretenimiento
        { term: "toy",                      weight: 2.5 },
        { term: "doll",                     weight: 2.5 },
        { term: "stuffed toy",              weight: 2.5 },
        { term: "board game",               weight: 2.5 },
        { term: "bicycle",                  weight: 2.5 },
        { term: "sporting goods",           weight: 2.0 },
        { term: "sports equipment",         weight: 2.0 },
        // Libros y papelería
        { term: "book",                     weight: 2.0 },
        { term: "textbook",                 weight: 2.5 },
        { term: "notebook",                 weight: 2.0 },
        // Artículos de cocina reutilizables
        { term: "cookware",                 weight: 2.5 },
        { term: "kitchenware",              weight: 2.5 },
        { term: "tableware",                weight: 2.5 },
        { term: "cutlery",                  weight: 2.5 },
        { term: "pot",                      weight: 2.0 },
        { term: "pan",                      weight: 2.0 },
        { term: "bowl",                     weight: 1.5 },
        { term: "plate",                    weight: 1.5 },
        { term: "mug",                      weight: 2.0 },
        { term: "thermos",                  weight: 2.5 },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// RESULTADOS POR CATEGORÍA
// ─────────────────────────────────────────────────────────────────────────────

const RESULTADOS = {
    peligroso: {
        tipo: "Residuo Peligroso",
        descripcion: "Requiere manejo especial por ser contaminante o dañino para la salud.",
        contenedor: "Llévalo a un punto de recolección especial ROJO"
    },
    organico: {
        tipo: "Orgánico",
        descripcion: "Este residuo se descompone naturalmente y puede convertirse en compost.",
        contenedor: "Esto va en el contenedor VERDE"
    },
    inorganico: {
        tipo: "Inorgánico",
        descripcion: "No se descompone fácilmente — recíclalo para darle una nueva vida.",
        contenedor: "Esto va en el contenedor de reciclaje"
    },
    reutilizable: {
        tipo: "Reutilizable",
        descripcion: "Puede reutilizarse o donarse antes de desecharse.",
        contenedor: "Esto lo puedes guardar para usarlo de nuevo o hacer alguna manualidad"
    },
    default: {
        tipo: "No reciclable",
        descripcion: "No se puede reciclar ni reutilizar fácilmente.",
        contenedor: "Esto va en el contenedor GRIS"
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// CLASIFICACIÓN BASADA EN SCORING ACUMULATIVO PONDERADO
//
// En vez de la antigua lógica binaria (¿hay alguna keyword? sí/no),
// ahora calculamos un score total por categoría:
//
//   scoreCategoría += weight_keyword × score_vision
//
// Donde score_vision es la confianza de Google Vision (0.65–1.0).
// Esto significa que un label con alta confianza (0.95) de un término
// con peso alto (3.0) aporta 2.85 puntos, mientras que un label
// de baja confianza (0.65) de un término de peso bajo (1.0) solo 0.65.
//
// Ejemplo real:
//   Vision detecta: "Plastic bottle" (score 0.97), "Container" (0.85), "Water" (0.90)
//   → inorganico: 3.0×0.97 + 1.5×0.85 = 4.185
//   → organico:   0 (ningún match)
//   → Resultado: Inorgánico ✓
//
// EXCEPCIÓN: Peligroso usa umbral de activación — si supera MIN_PELIGROSO_SCORE
// (independiente del resto), siempre gana. Esto evita que "Plastic bottle"
// con score 0.99 supere a "Battery" con score 0.80.
// ─────────────────────────────────────────────────────────────────────────────

// Un solo match de un term con weight 3.0 al 80% → 2.4 > 2.0 → activa peligroso
const MIN_PELIGROSO_SCORE = 2.0;

const clasificarResiduo = (labels, labelsConScore) => {

    // Construir mapa label → score de Vision para el scoring ponderado
    // labelsConScore ya está normalizado a minúsculas desde el service
    const scoreMap = labelsConScore instanceof Map
        ? labelsConScore
        : new Map(Object.entries(labelsConScore));

    // Texto completo para búsqueda de substrings (fallback cuando no hay score exacto)
    const textoCompleto = labels.join(" ").toLowerCase().replace(/[^a-z0-9\s]/g, " ");

    // Obtener el score de Vision para un término dado.
    // Busca coincidencia exacta primero, luego substring en las keys del mapa.
    const getVisionScore = (term) => {
        if (scoreMap.has(term)) return scoreMap.get(term);
        for (const [key, val] of scoreMap) {
            if (key.includes(term) || term.includes(key)) return val;
        }
        // Si hay match textual pero no en el mapa, usar score conservador
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp("(?<![a-z])" + escaped + "(?![a-z])");
        return regex.test(textoCompleto) ? 0.70 : 0;
    };

    // Calcular score acumulativo para una categoría
    const calcularScore = (keywords) => {
        let total = 0;
        for (const { term, weight } of keywords) {
            const vScore = getVisionScore(term);
            if (vScore > 0) {
                total += weight * vScore;
            }
        }
        return total;
    };

    // Peligroso tiene activación por umbral: si supera MIN_PELIGROSO_SCORE, siempre gana
    const scorePeligroso = calcularScore(KEYWORDS.peligroso);
    if (scorePeligroso >= MIN_PELIGROSO_SCORE) {
        console.log(`[Clasificación] peligroso activado por umbral (score: ${scorePeligroso.toFixed(2)})`);
        return { ...RESULTADOS.peligroso, confianza: scorePeligroso };
    }

    // Para el resto, gana la categoría con mayor score acumulativo
    const scores = {
        organico:     calcularScore(KEYWORDS.organico),
        inorganico:   calcularScore(KEYWORDS.inorganico),
        reutilizable: calcularScore(KEYWORDS.reutilizable),
    };

    console.log('[Clasificación] Scores:', {
        peligroso:    scorePeligroso.toFixed(2),
        organico:     scores.organico.toFixed(2),
        inorganico:   scores.inorganico.toFixed(2),
        reutilizable: scores.reutilizable.toFixed(2),
    });

    const ganador = Object.entries(scores).reduce(
        (max, [cat, score]) => score > max.score ? { cat, score } : max,
        { cat: null, score: 0 }
    );

    // Si el score máximo es demasiado bajo, no hay suficiente evidencia → default
    const MIN_SCORE_VALIDO = 1.0;
    if (ganador.score < MIN_SCORE_VALIDO) {
        console.log(`[Clasificación] Sin categoría clara (max score: ${ganador.score.toFixed(2)}) → default`);
        return { ...RESULTADOS.default, confianza: 0 };
    }

    return { ...RESULTADOS[ganador.cat], confianza: ganador.score };
};