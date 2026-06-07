import { Lock, Zap, MessageCircle, Trophy, MapPin, Leaf, Trash2, AlertTriangle } from "lucide-react";

export const NAV_LINKS = ["Inicio", "Módulos", "Tecnología", "Comunidad", "Contacto"];

export const MODULES = [
  {
    id: "auth",
    icon: Lock,
    tag: "Seguridad",
    name: "AuthEcoKinal",
    desc: "Núcleo de autenticación central. Gestiona registro, inicio de sesión y tokens JWT que protegen toda la plataforma.",
    tech: ["Node.js", "PostgreSQL", "JWT", "Docker"],
    highlight: "Base de todo el ecosistema",
    accentColor: "#59B130",
  },
  {
    id: "detector",
    icon: Zap,
    tag: "IA",
    name: "DetectorDeReciclaje",
    desc: "Módulo de inteligencia artificial que analiza imágenes y clasifica residuos en reciclable, orgánico o no reciclable.",
    tech: ["Node.js", "Vision AI", "Swagger", "JWT"],
    highlight: "El módulo más innovador",
    accentColor: "#0284c7",
  },
  {
    id: "foro",
    icon: MessageCircle,
    tag: "Comunidad",
    name: "ForoEcoKinal",
    desc: "Espacio social donde los usuarios comparten publicaciones, consejos y experiencias sobre reciclaje.",
    tech: ["Node.js", "Express", "MongoDB", "Swagger"],
    highlight: "Comunidad activa",
    accentColor: "#7c3aed",
  },
  {
    id: "gamification",
    icon: Trophy,
    tag: "Recompensas",
    name: "GamificaciónEcoKinal",
    desc: "Sistema de puntos e incentivos. Se activa automáticamente al clasificar residuos y crea rankings de usuarios.",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    highlight: "Reciclar tiene premio",
    accentColor: "#d97706",
  },
  {
    id: "mapa",
    icon: MapPin,
    tag: "Geolocalización",
    name: "MapaEcoKinal",
    desc: "Encuentra los 5 centros de reciclaje más cercanos usando coordenadas GPS y rutas optimizadas.",
    tech: ["Node.js", "OpenRouteService", "REST API"],
    highlight: "Tu punto más cercano",
    accentColor: "#db2777",
  },
];

export const RECYCLING_TYPES = [
  {
    type: "Reciclable",
    icon: Trash2,
    examples: "Plásticos · Vidrio · Metales · Papel",
    gradient: "linear-gradient(135deg, #59B130, #7ec956)",
  },
  {
    type: "Orgánico",
    icon: Leaf,
    examples: "Restos de comida · Materiales biodegradables",
    gradient: "linear-gradient(135deg, #4a8c1e, #59B130)",
  },
  {
    type: "No Reciclable",
    icon: AlertTriangle,
    examples: "Residuos contaminados · Materiales mixtos",
    gradient: "linear-gradient(135deg, #b91c1c, #f87171)",
  },
];

export const COMMUNITY_POSTS = [
  { user: "María G.", time: "hace 2h", title: "💡 Consejos para lavar plásticos PET antes de reciclar", likes: 124 },
  { user: "Carlos R.", time: "hace 5h", title: "🗺️ Nuevo centro de acopio en Zona 4 — ¡ya está en el mapa!", likes: 89 },
  { user: "Ana P.", time: "ayer", title: "🏆 ¡Llegué al nivel Guardián Verde esta semana!", likes: 231 },
];

export const STEPS = [
  { step: "01", icon: Lock, title: "Autenticación", desc: "Regístrate en AuthEcoKinal y obtén tu token JWT de seguridad para acceder a toda la plataforma." },
  { step: "02", icon: Zap, title: "Captura & Análisis", desc: "Sube una foto de tu residuo al Detector IA. En milisegundos sabrás si es reciclable, orgánico o no reciclable." },
  { step: "03", icon: Trophy, title: "Gana Recompensas", desc: "Cada clasificación suma puntos a tu perfil. Escala el ranking y desbloquea logros en GamificaciónEcoKinal." },
  { step: "04", icon: MapPin, title: "Encuentra Centros", desc: "Localiza los 5 puntos de reciclaje más cercanos y obtén la ruta óptima con MapaEcoKinal." },
];