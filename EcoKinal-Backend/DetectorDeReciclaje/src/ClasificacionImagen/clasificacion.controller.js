'use strict'
import { detectarLabels } from "./clasificacion.service.js";
import Clasificacion from "./clasificacion.model.js";
import fs from "fs";
import axios from 'axios';

export const clasificarImagen = async (req, res) => {

    let imagePath = null;

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Debes enviar una imagen"
            });
        }

        const MAX_SIZE = 5 * 1024 * 1024;
        const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

        if (!ALLOWED_TYPES.includes(req.file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Formato no permitido. Solo JPG, PNG y WEBP."
            });
        }

        if (req.file.size > MAX_SIZE) {
            return res.status(400).json({
                success: false,
                message: "Imagen demasiado grande (máximo 5 MB)."
            });
        }

        if (!req.file.size || req.file.size === 0) {
            return res.status(400).json({
                success: false,
                message: "La imagen está vacía o dañada."
            });
        }

        imagePath = req.file.path;

        console.log('Archivo recibido:', req.file?.originalname, req.file?.size, 'bytes'); // ← aquí

        const { labels, labelsConScore } = await detectarLabels(imagePath);

        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        const resultado = clasificarResiduo(labels);

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
        } catch (error) {
            console.error('Error al sumar puntos en gamificación:', error.message);
        }

        try {
            await axios.post(
                'http://localhost:3008/GamificationEcoKinal/v1/daily-challenges/auto/detector_3_check',
                {},
                { headers: { Authorization: req.headers.authorization } }
            );
        } catch (_) { /* silencioso */ }

        // Impacto ambiental
        try {
            await axios.post(
                'http://localhost:3002/api/impacto/registrar',
                { tipo: resultado.tipo },
                { headers: { Authorization: req.headers.authorization } }
            );
        } catch (error) {
            console.error('Error al registrar impacto ambiental:', error.response?.data || error.message);
        }

        return res.status(200).json({
            success: true,
            message: "Imagen clasificada correctamente",
            data: registro
        });

    } catch (error) {

        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        return res.status(500).json({
            success: false,
            message: "Error al clasificar la imagen",
            error: error.message
        });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// KEYWORDS POR CATEGORÍA
// MobileNet (ImageNet-1k) devuelve strings compuestos como:
//   "plastic bag, polyethylene bag, produce bag"
// Por eso normalizamos dividiendo cada label por coma antes de comparar.
// ─────────────────────────────────────────────────────────────────────────────

const KEYWORDS = {

    // ── PELIGROSO ─────────────────────────────────────────────────────────────
    // Evalúa primero — siempre tiene prioridad sobre las demás categorías
    peligroso: [
        // Electrónicos y baterías
        "battery", "batteries", "lithium", "lithium battery", "power cell",
        "cell phone", "mobile phone", "smartphone", "iphone", "android phone",
        "charger", "adapter", "power adapter", "power supply", "usb charger",
        "circuit board", "circuit", "printed circuit", "pcb", "motherboard",
        "electronic", "electronics", "electronic waste", "e-waste",
        "computer", "laptop", "notebook computer", "desktop computer",
        "monitor", "screen", "television", "tv", "cathode ray tube", "crt",
        "remote control", "keyboard", "mouse", "printer", "scanner",
        "hard disk", "hard drive", "flash drive", "usb drive", "memory card",
        "camera", "digital camera", "video camera", "camcorder",
        "microwave", "microwave oven", "toaster", "blender", "electric mixer",
        "hair dryer", "electric razor", "electric shaver",
        "fluorescent lamp", "fluorescent light", "cfl bulb", "light bulb",
        "neon light", "led strip", "halogen lamp",
        // Químicos, medicamentos y tóxicos
        "chemical", "chemicals", "chemical container",
        "medicine", "medication", "pill", "pills", "capsule", "tablet",
        "drug", "drugs", "prescription", "pharmacy bottle",
        "syringe", "needle", "hypodermic needle", "medical needle",
        "paint", "paint can", "spray paint", "latex paint",
        "oil", "motor oil", "engine oil", "lubricant", "grease",
        "fuel", "gasoline", "diesel", "kerosene", "lighter fluid",
        "toxic", "hazardous", "hazardous waste", "biohazard",
        "acid", "sulfuric acid", "hydrochloric acid", "battery acid",
        "bleach", "chlorine bleach", "sodium hypochlorite",
        "cleaner", "cleaning product", "household cleaner", "drain cleaner",
        "detergent", "laundry detergent",
        "pesticide", "insecticide", "herbicide", "fungicide",
        "fertilizer", "chemical fertilizer",
        "spray", "aerosol", "aerosol can", "spray bottle",
        "fire extinguisher", "extinguisher",
        "thermometer", "mercury thermometer",
        "lighter", "butane lighter",
        "nail polish", "nail polish remover", "acetone",
        "glue", "super glue", "solvent", "thinner", "paint thinner",
        "ammonia", "hydrogen peroxide",
        "rat poison", "rodenticide",
        "smoke detector", "carbon monoxide detector",
    ],

    // ── ORGÁNICO ──────────────────────────────────────────────────────────────
    organico: [
        // Frutas
        "food", "fruit", "fruits",
        "banana", "banana peel", "plantain",
        "apple", "apple core", "red apple", "green apple",
        "orange", "orange peel", "mandarin", "tangerine", "clementine",
        "lemon", "lime", "grapefruit", "citrus",
        "mango", "papaya", "guava", "pineapple", "ananas",
        "grape", "grapes", "raisin",
        "strawberry", "strawberries", "blueberry", "raspberry", "blackberry",
        "watermelon", "melon", "cantaloupe", "honeydew",
        "peach", "plum", "cherry", "apricot", "nectarine",
        "pear", "fig", "date", "avocado",
        "coconut", "kiwi", "pomegranate",
        // Verduras y tubérculos
        "vegetable", "vegetables",
        "carrot", "potato", "sweet potato", "yam",
        "tomato", "tomatoes", "cherry tomato",
        "broccoli", "cauliflower", "cabbage", "brussels sprouts",
        "onion", "garlic", "shallot", "leek",
        "pepper", "bell pepper", "chili pepper", "jalapeño",
        "lettuce", "spinach", "kale", "arugula", "chard",
        "cucumber", "zucchini", "squash", "pumpkin",
        "corn", "corn on the cob", "maize",
        "celery", "asparagus", "artichoke", "eggplant",
        "mushroom", "fungi",
        "bean", "beans", "peas", "lentils", "chickpeas",
        "beet", "radish", "turnip", "parsnip",
        // Proteínas y lácteos
        "meat", "raw meat", "beef", "pork", "lamb",
        "chicken", "chicken breast", "chicken leg", "raw chicken", "poultry",
        "fish", "salmon", "tuna", "cod", "tilapia", "seafood",
        "shrimp", "prawn", "crab", "lobster", "oyster",
        "egg", "eggs", "eggshell",
        "cheese", "yogurt",
        // Panadería y granos
        "bread", "loaf of bread", "baguette", "toast", "bagel", "muffin",
        "cake", "pastry", "croissant",
        "rice", "cooked rice", "pasta", "noodles", "spaghetti",
        "cereal", "oatmeal", "grain",
        // Bebidas y residuos orgánicos
        "coffee", "coffee grounds", "tea", "tea bag",
        "juice", "smoothie",
        // Plantas y material vegetal
        "leaf", "leaves", "dried leaves", "autumn leaves",
        "plant", "plant pot", "potted plant", "houseplant",
        "grass", "lawn", "grass clippings",
        "flower", "flowers", "rose", "tulip", "daisy", "sunflower", "bouquet",
        "tree", "branch", "twig", "bark", "log",
        "peel", "fruit peel", "vegetable peel",
        "compost", "organic waste", "food waste", "food scraps",
        "hay", "straw", "mulch", "sawdust",
        "weed", "shrub", "bush",
        "pine cone", "acorn", "seed", "nut", "walnut", "almond", "peanut",
    ],

    // ── INORGÁNICO / RECICLABLE ───────────────────────────────────────────────
    inorganico: [
        // Plásticos
        "plastic", "plastic bottle", "water bottle", "drink bottle",
        "plastic container", "plastic bag", "polyethylene bag", "produce bag",
        "plastic wrap", "cling wrap", "plastic film",
        "container", "packaging", "package", "packet", "wrapper",
        "bag", "shopping bag", "trash bag", "garbage bag",
        "cup", "plastic cup", "disposable cup", "styrofoam cup", "foam cup",
        "lid", "cap", "bottle cap", "plastic cap",
        "straw", "plastic straw",
        "tupperware", "food container", "take-out container",
        "bucket", "bin", "plastic bin",
        "hose", "pipe", "pvc",
        // Metales
        "metal", "aluminum", "aluminium", "steel", "iron", "copper", "tin",
        "can", "tin can", "soda can", "beer can", "beverage can",
        "food can", "canned food", "metal can",
        "foil", "aluminum foil", "tin foil",
        "metal container", "metal lid", "metal cap",
        "wire", "copper wire", "metal wire",
        "nail", "screw", "bolt", "nut", "washer",
        "metal sheet", "steel sheet",
        "bike", "bicycle frame",
        // Vidrio
        "glass", "glass bottle", "wine bottle", "beer bottle",
        "jar", "mason jar", "glass jar", "pickle jar",
        "glass container", "glass cup", "wine glass", "drinking glass",
        "mirror", "window glass",
        // Papel y cartón
        "carton", "cardboard", "cardboard box", "corrugated cardboard",
        "paper", "newspaper", "magazine", "book", "notebook",
        "paperboard", "kraft paper", "brown paper bag",
        "crate", "box", "packing box",
        "paper bag", "paper cup", "paper plate",
        "envelope", "letter",
        "tissue", "paper towel", "toilet paper roll",
        "egg carton",
        // Caucho y otros reciclables
        "rubber", "tire", "tyre", "rubber band",
        "foam", "foam rubber",
    ],

    // ── REUTILIZABLE ──────────────────────────────────────────────────────────
    reutilizable: [
        // Herramientas
        "tool", "tools", "hand tool",
        "hammer", "mallet",
        "screwdriver", "wrench", "pliers", "clamp",
        "saw", "handsaw", "drill",
        "tape measure", "ruler", "level",
        "ladder", "stepladder",
        // Muebles y hogar
        "furniture", "chair", "armchair", "office chair",
        "table", "desk", "coffee table", "dining table",
        "shelf", "bookshelf", "bookcase",
        "lamp", "floor lamp", "table lamp",
        "curtain", "blind", "rug", "carpet",
        "pillow", "cushion", "blanket", "comforter",
        "picture frame", "frame", "mirror frame",
        "pot", "flower pot", "vase",
        // Ropa y calzado
        "clothing", "cloth", "clothes", "garment",
        "shirt", "t-shirt", "blouse", "sweater", "hoodie",
        "pants", "trousers", "jeans", "shorts", "leggings",
        "jacket", "coat", "raincoat", "suit",
        "dress", "skirt",
        "shoe", "shoes", "sneaker", "sneakers", "boot", "boots",
        "sandal", "slipper",
        "sock", "socks", "glove", "gloves",
        "hat", "cap", "beanie",
        "scarf", "tie", "belt",
        "bag", "handbag", "purse", "backpack", "wallet",
        // Juguetes y entretenimiento
        "toy", "toys",
        "doll", "action figure", "stuffed animal", "teddy bear",
        "board game", "puzzle", "lego", "building blocks",
        "ball", "basketball", "soccer ball", "football",
        "bicycle", "tricycle", "scooter", "skateboard",
        "kite",
        // Libros y papelería
        "book", "textbook", "novel", "comic book",
        "notebook", "journal", "binder",
        "pen", "pencil",
        // Artículos de cocina reutilizables
        "pot", "pan", "frying pan", "wok", "skillet",
        "bowl", "plate", "mug", "thermos", "canteen",
        "cutting board", "colander",
        // Instrumentos
        "guitar", "ukulele", "keyboard", "drum",
        // Deportes
        "yoga mat", "dumbbell", "kettlebell",
        "helmet", "knee pad", "elbow pad",
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
// LÓGICA DE CLASIFICACIÓN
//
// MobileNet devuelve hasta 3 predicciones, cada una con className como:
//   "plastic bag, polyethylene bag, produce bag"
// Al hacer labels.join(" ") se mezclan todas en un solo string,
// pero "plastic bag" aparece como substring y `includes` lo encuentra.
//
// MEJORA CLAVE: también dividimos por coma y evaluamos cada token
// individualmente, porque "can opener" no matchea "can" solo si buscamos
// palabras exactas, pero "soda can" sí matchea "soda can" como substring.
// ─────────────────────────────────────────────────────────────────────────────

const clasificarResiduo = (labels) => {

    // Normalizar: unir todos los labels, pasar a minúsculas, limpiar caracteres especiales
    const textoCompleto = labels
        .join(",")
        .toLowerCase()
        .replace(/[^a-z0-9,\s]/g, " ");

    // Coincidencia por palabra completa usando lookahead/lookbehind.
    //
    // POR QUÉ NO usar String.includes():
    //   "toilet".includes("oil") === true  → falso positivo: paper towel = peligroso
    //   "container".includes("tin") === false, pero "tin can".includes("tin") === true
    //
    // La regex (?<![a-z])keyword(?![a-z]) exige que la keyword
    // no esté rodeada de otras letras, evitando substrings accidentales.
    // Ejemplos:
    //   "toilet paper" → NO matchea "oil"  ✓
    //   "motor oil"    → SÍ matchea "oil"  ✓
    //   "spray paint"  → SÍ matchea "spray" y "paint" ✓
    //   "paper towel"  → NO matchea "aper" ni ninguna keyword peligrosa ✓
    const coincide = (keywords) => {
        return keywords.some(kw => {
            const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp("(?<![a-z])" + escaped + "(?![a-z])");
            return regex.test(textoCompleto);
        });
    };

    // Evaluar en orden de prioridad.
    // Peligroso SIEMPRE evalúa primero — un objeto puede ser plástico Y tóxico.
    if (coincide(KEYWORDS.peligroso))    return RESULTADOS.peligroso;
    if (coincide(KEYWORDS.organico))     return RESULTADOS.organico;
    if (coincide(KEYWORDS.inorganico))   return RESULTADOS.inorganico;
    if (coincide(KEYWORDS.reutilizable)) return RESULTADOS.reutilizable;

    return RESULTADOS.default;
};