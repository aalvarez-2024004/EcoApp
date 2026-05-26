import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import logoBlanco from "../../../assets/logo.png";
import logoOscuro from "../../../assets/logo_2.png";
import { Lock, Zap, MessageCircle, Trophy, MapPin, Leaf, Trash2, AlertTriangle, ArrowRight } from "lucide-react";



// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Inicio", "Módulos", "Tecnología", "Comunidad", "Contacto"];

const MODULES = [
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

const RECYCLING_TYPES = [
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


const COMMUNITY_POSTS = [
  { user: "María G.", time: "hace 2h", title: "💡 Consejos para lavar plásticos PET antes de reciclar", likes: 124 },
  { user: "Carlos R.", time: "hace 5h", title: "🗺️ Nuevo centro de acopio en Zona 4 — ¡ya está en el mapa!", likes: 89 },
  { user: "Ana P.", time: "ayer", title: "🏆 ¡Llegué al nivel Guardián Verde esta semana!", likes: 231 },
];

const STEPS = [
  { step: "01", icon: Lock, title: "Autenticación", desc: "Regístrate en AuthEcoKinal y obtén tu token JWT de seguridad para acceder a toda la plataforma." },
  { step: "02", icon: Zap, title: "Captura & Análisis", desc: "Sube una foto de tu residuo al Detector IA. En milisegundos sabrás si es reciclable, orgánico o no reciclable." },
  { step: "03", icon: Trophy, title: "Gana Recompensas", desc: "Cada clasificación suma puntos a tu perfil. Escala el ranking y desbloquea logros en GamificaciónEcoKinal." },
  { step: "04", icon: MapPin, title: "Encuentra Centros", desc: "Localiza los 5 puntos de reciclaje más cercanos y obtén la ruta óptima con MapaEcoKinal." },
];

// ─── COMPONENT ──────────────────────────────────────────────────────────────

// Componente principal que renderiza la página de destino de EcoKinal.
// Incluye navegación, sección hero, información de módulos, pasos de flujo de usuario,
// testimonios de comunidad, y llamadas a la acción con animaciones y diseño responsivo.
export const LandingPage = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(new Set());
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisible((v) => new Set([...v, e.target.id]));
      }),
      { threshold: 0.12 }
    );
    setTimeout(() => {
      document.querySelectorAll("[data-observe]").forEach((el) => observer.observe(el));
    }, 100);
    return () => observer.disconnect();
  }, []);

  const v = (id) => visible.has(id);

  return (
    <div className="ek-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;800&display=swap');

        :root {
          --green-900: #1f5c2e;
          --green-800: #2d7a3d;
          --green-700: #3d9850;
          --green-600: #59B130;
          --green-500: #6ec945;
          --green-400: #8fd55d;
          --green-300: #a8e07a;
          --green-100: #e8f5e0;
          --green-50:  #f4faed;
          --bone:      #fafbf8;
          --white:     #ffffff;
          --ink:       #0a1a0f;
          --ink-2:     #1c2e22;
          --ink-3:     #2d4033;
          --muted:     #5a7060;
          --muted-2:   #8aab92;
          --radius-sm: 12px;
          --radius-md: 20px;
          --radius-lg: 32px;
          --ease: cubic-bezier(0.4, 0, 0.2, 1);
          --shadow-sm: 0 2px 8px rgba(89,177,48,0.06);
          --shadow-md: 0 8px 24px rgba(89,177,48,0.1);
          --shadow-lg: 0 16px 48px rgba(89,177,48,0.12);
          --font-family: 'Outfit', sans-serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ek-root {
          font-family: var(--font-family); /* Aplicamos la fuente a todo el root */
          background: var(--bone);
          color: var(--ink);
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        /* ── TYPOGRAPHY ── */
        .font-display {
          font-family: var(--font-family);
          font-weight: 800;
        }

        .hero-title, .sec-title, .nav-logo {
          font-family: var(--font-family);
          font-weight: 800;
        }

        /* ── NAVBAR ── */
        .ek-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.5rem 6rem;
          transition: all 0.4s var(--ease);
        }
        .ek-nav.scrolled {
          background: rgba(250,251,248,0.94);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(89,177,48,0.08);
          padding: 1rem 6rem;
          box-shadow: var(--shadow-sm);
        }
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: white;
          letter-spacing: -0.04em;
          transition: color 0.3s ease;
        }
        .nav-logo span { color: var(--green-600); }
        .nav-logo sup {
          font-size: 0.55rem; font-weight: 600;
          background: var(--green-600); color: white;
          border-radius: 4px; padding: 1px 4px;
          margin-left: 2px; vertical-align: super;
          letter-spacing: 0.05em;
        }
        .nav-links { display: flex; gap: 3rem; list-style: none; }
        .nav-links a {
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: all 0.3s ease;
          letter-spacing: 0.01em;
        }
        .nav-links a:hover {
          color: var(--green-300);
        }
        .ek-nav.scrolled .nav-logo {
          color: var(--ink);
        }

        .ek-nav.scrolled .nav-links a {
          color: var(--muted);
        }

        .ek-nav.scrolled .nav-links a:hover {
          color: var(--green-600);
        }
        .nav-cta {
          font-family: 'Inter', sans-serif;
          background: var(--green-600); color: white;
          border: none; border-radius: 50px;
          padding: 0.7rem 1.8rem; font-size: 0.88rem; font-weight: 600;
          cursor: pointer; transition: all 0.25s var(--ease);
          letter-spacing: 0.02em;
        }
        .nav-cta:hover {
          background: var(--green-700);
          box-shadow: 0 8px 20px rgba(89,177,48,0.3);
          transform: translateY(-2px);
        }

        /* ── HERO ── */
        .ek-hero {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--green-900) 0%, var(--green-800) 40%, var(--green-700) 75%, var(--green-600) 100%);
          display: flex; align-items: center;
          padding: 9rem 6rem 12rem;
          position: relative; overflow: hidden;
        }
        .hero-noise {
          position: absolute; inset: 0; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .hero-orb-1 {
          position: absolute; width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(168,224,122,0.2) 0%, transparent 70%);
          right: -200px; top: -200px; border-radius: 50%; pointer-events: none;
        }
        .hero-orb-2 {
          position: absolute; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%);
          left: -150px; bottom: -150px; border-radius: 50%; pointer-events: none;
        }
        .hero-leaf {
          position: absolute; right: 3%; top: 12%;
          width: 450px; height: 450px;
          border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02);
          animation: morph 12s ease-in-out infinite alternate;
        }
        @keyframes morph {
          0%   { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; }
          50%  { border-radius: 30% 70% 40% 60% / 60% 40% 70% 30%; }
          100% { border-radius: 50% 50% 30% 70% / 40% 60% 50% 60%; }
        }

        .hero-inner {
          position: relative; z-index: 2;
          display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50px; padding: 0.5rem 1.2rem;
          color: var(--green-300); font-size: 0.82rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          margin-bottom: 2rem; backdrop-filter: blur(8px);
        }
        .hero-title {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: clamp(3.5rem, 7.5vw, 6.5rem);
          color: white; line-height: 1.0;
          letter-spacing: -0.03em; margin-bottom: 1.8rem;
        }
        .hero-title em {
          font-style: italic; font-weight: 700;
          color: transparent;
          background: linear-gradient(90deg, var(--green-300), var(--green-400));
          -webkit-background-clip: text; background-clip: text;
        }
        .hero-sub {
          font-size: 1.1rem; color: rgba(255,255,255,0.7);
          line-height: 1.85; max-width: 600px; margin-bottom: 2.8rem;
          font-weight: 300;
        }
        .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-hero-primary {
          font-family: 'Inter', sans-serif;
          background: white; color: var(--green-800);
          border: none; border-radius: 50px;
          padding: 0.95rem 2.6rem; font-size: 1rem; font-weight: 700;
          cursor: pointer; transition: all 0.25s var(--ease);
          letter-spacing: 0.01em;
        }
        .btn-hero-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(0,0,0,0.25); }
        .btn-hero-outline {
          font-family: 'Inter', sans-serif;
          background: transparent; color: rgba(255,255,255,0.9);
          border: 1.5px solid rgba(255,255,255,0.35); border-radius: 50px;
          padding: 0.95rem 2.6rem; font-size: 1rem; font-weight: 500;
          cursor: pointer; transition: all 0.25s var(--ease);
        }
        .btn-hero-outline:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.65); }

        .hero-mini-stats {
          margin-top: 3.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3.5rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 2.5rem;
          text-align: center;
          flex-wrap: wrap;
        }
        .hero-mini-stats > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .hms-val {
          font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800;
          color: var(--green-300); line-height: 1;
        }
        .hms-lbl { font-size: 0.8rem; color: rgba(255,255,255,0.45); margin-top: 0.3rem; font-weight: 500; }

        /* Hero right panel */
        .hero-panel {
          display: flex; flex-direction: column; gap: 1.4rem;
        }
        .glass-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-md);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 2rem; color: white;
          transition: all 0.3s var(--ease);
        }
        .glass-card:hover { background: rgba(255,255,255,0.1); transform: translateY(-4px); }

        /* ── IMG PLACEHOLDER ── */
        .img-ph {
          border: 2px dashed rgba(255,255,255,0.15);
          border-radius: var(--radius-md);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          color: rgba(255,255,255,0.35);
          font-family: 'Inter', sans-serif; font-size: 0.82rem;
          gap: 0.6rem; text-align: center; padding: 1.5rem;
          min-height: 200px;
        }
        .img-ph-light {
          border: 2px dashed rgba(89,177,48,0.18);
          border-radius: var(--radius-md);
          background: rgba(89,177,48,0.03);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          color: rgba(89,177,48,0.4);
          font-family: 'Inter', sans-serif; font-size: 0.82rem;
          gap: 0.6rem; text-align: center; padding: 2rem;
        }
        .img-ph-icon { font-size: 2.5rem; }
        .img-ph strong { font-size: 0.92rem; font-weight: 600; color: inherit; }

        /* ── STATS FLOATING BAR ── */
        .stats-float-wrap {
          max-width: 1400px; 
          margin: 0 auto;
          padding: 0 6rem; 
          position: relative; 
          z-index: 10;
          margin-top: -150px;
          margin-bottom: -80px; 
        }
        .stats-float {
          background: linear-gradient(135deg, var(--green-800) 0%, var(--green-700) 100%);
          border-radius: var(--radius-lg);
          padding: 3.5rem 4.5rem;
          display: grid; grid-template-columns: repeat(4,1fr); gap: 3rem;
          margin-top: -80px;
          box-shadow: var(--shadow-lg);
        }
        .sf-item { text-align: center; }
        .sf-val {
          font-family: 'Syne', sans-serif; font-size: 3.2rem; font-weight: 800;
          color: var(--green-300); line-height: 1;
        }
        .sf-lbl { font-size: 0.88rem; color: rgba(255,255,255,0.5); margin-top: 0.6rem; font-weight: 500; }

        /* ── SECTIONS ── */
        .ek-section { padding: 8rem 6rem; }
        .ek-section-sm { padding: 5rem 6rem; }
        .bg-white { background: var(--white); }
        .bg-bone { background: var(--bone); }
        .bg-ink { background: var(--ink); }
        .bg-green { background: var(--green-800); }

        .sec-inner,
        .hero-inner,
        .footer-inner {
          width: min(92vw, 1600px);
          margin: 0 auto;
        }
        .sec-label {
          font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--green-600); margin-bottom: 1rem;
        }
        .sec-label-light { color: var(--green-300); }
        .sec-title {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: clamp(2.4rem, 4.5vw, 3.5rem);
          color: var(--ink); line-height: 1.15; letter-spacing: -0.025em;
          margin-bottom: 1.2rem;
        }
        .sec-title em { font-style: italic; color: var(--green-600); }
        .sec-title-light { color: white; }
        .sec-title-light em { color: var(--green-300); }
        .sec-body {
          font-size: 1.05rem; color: var(--muted);
          line-height: 1.8; max-width: 620px;
        }
        .sec-body-light { color: rgba(255,255,255,0.65); }

        /* ── ANIMATE ── */
        .anim { opacity: 0; transform: translateY(36px); transition: opacity 0.75s var(--ease), transform 0.75s var(--ease); }
        .anim.in { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.1s; }
        .d2 { transition-delay: 0.2s; }
        .d3 { transition-delay: 0.3s; }
        .d4 { transition-delay: 0.4s; }

        /* ── ABOUT ── */
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 7rem; align-items: center; }
        .feature-list { display: flex; flex-direction: column; gap: 1.3rem; margin-top: 2.5rem; }
        .feature-item {
          display: flex; align-items: center; gap: 1.2rem;
          font-size: 0.98rem; font-weight: 500; color: var(--ink-2);
        }
        .feature-check {
          width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
          background: var(--green-100); color: var(--green-700);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 700;
        }

        /* ── AI SECTION ── */
        .recycle-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2.5rem; }
        .recycle-card {
          border-radius: var(--radius-md); padding: 3rem 2.5rem; text-align: center;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          transition: all 0.3s var(--ease);
          backdrop-filter: blur(8px);
        }
        .recycle-card:hover { transform: translateY(-8px); background: rgba(255,255,255,0.09); }
        .recycle-icon { 
          font-size: 3rem; 
          margin-bottom: 1.5rem; 
          display: flex;
          justify-content: center;
          color: white;
        }
        .recycle-type {
          font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 700;
          color: white; margin-bottom: 1rem;
        }
        .recycle-ex { font-size: 0.92rem; color: rgba(255,255,255,0.55); line-height: 1.7; }
        .recycle-dot {
          width: 10px; height: 10px; border-radius: 50%;
          margin: 1.8rem auto 0; display: block;
        }

        /* ── MODULE CARDS ── */
        .modules-grid { 
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
          gap: 1.5rem; 
          width: 100%;
        }
        .module-card {
          background: var(--white); border: 1px solid rgba(0,0,0,0.04);
          border-radius: var(--radius-md); padding: 2.5rem;
          cursor: pointer; transition: all 0.3s var(--ease);
          position: relative; overflow: hidden;
        }
        .module-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          border-radius: var(--radius-md) var(--radius-md) 0 0;
          background: var(--accent-color, var(--green-600));
          opacity: 0; transition: opacity 0.3s;
        }
        .module-card:hover, .module-card.active {
          border-color: rgba(89,177,48,0.15);
          box-shadow: var(--shadow-md);
          transform: translateY(-8px);
        }
        .module-card:hover::after, .module-card.active::after { opacity: 1; }
        .mod-tag {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--green-600);
          background: var(--green-50); border: 1px solid var(--green-100);
          border-radius: 50px; padding: 0.3rem 0.95rem;
          display: inline-block; margin-bottom: 1.5rem;
        }
        .mod-icon { 
          font-size: 2.8rem; 
          margin-bottom: 1.2rem; 
          display: flex;
          color: var(--green-600);
        }
        .mod-name {
          font-family: 'Syne', sans-serif; font-size: 1.35rem; font-weight: 700;
          color: var(--ink); margin-bottom: 0.8rem;
        }
        .mod-desc { font-size: 0.92rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.5rem; }
        .mod-hl {
          font-size: 0.82rem; font-weight: 700; color: var(--green-600);
          display: flex; align-items: center; gap: 0.5rem;
        }
        .mod-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green-500); flex-shrink: 0; }
        .tech-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.5rem; }
        .tech-pill {
          font-size: 0.74rem; font-weight: 600; color: var(--muted);
          background: var(--bone); border: 1px solid rgba(89,177,48,0.1);
          border-radius: 6px; padding: 0.3rem 0.85rem;
        }
        .mod-hint { font-size: 0.8rem; color: var(--muted-2); font-weight: 500; margin-top: 1.2rem; }

        /* ── STEPS ── */
        .steps-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 3.5rem; }
        .step-card { text-align: center; }
        .step-bubble {
          width: 80px; height: 80px; border-radius: 20px;
          background: var(--green-50); border: 1px solid var(--green-100);
          display: flex; align-items: center; justify-content: center;
          font-size: 2.2rem; margin: 0 auto 1.8rem;
          transition: all 0.3s var(--ease);
          color: var(--green-600);
        }
        .step-card:hover .step-bubble {
          background: var(--green-100);
          box-shadow: 0 12px 28px rgba(89,177,48,0.18);
          transform: scale(1.08);
        }
        .step-n {
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--green-600); margin-bottom: 0.6rem;
        }
        .step-title {
          font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 700;
          color: var(--ink); margin-bottom: 0.8rem;
        }
        .step-desc { font-size: 0.92rem; color: var(--muted); line-height: 1.7; }

        /* ── COMMUNITY ── */
        .post-card {
          background: var(--white); border-radius: var(--radius-sm);
          border: 1px solid rgba(0,0,0,0.03); padding: 1.6rem 1.8rem;
          display: flex; justify-content: space-between; align-items: center; gap: 1.2rem;
          transition: all 0.2s var(--ease);
          box-shadow: var(--shadow-sm);
        }
        .post-card:hover { transform: translateX(8px); border-color: var(--green-100); }
        .post-user { font-size: 0.82rem; color: var(--green-600); font-weight: 700; margin-bottom: 0.4rem; }
        .post-time { color: var(--muted-2); font-weight: 400; }
        .post-title { font-size: 0.98rem; font-weight: 600; color: var(--ink); }
        .post-likes {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.85rem; font-weight: 600; color: var(--muted);
          background: var(--bone); border-radius: 50px; padding: 0.5rem 1.1rem;
          flex-shrink: 0; white-space: nowrap;
        }

        /* ── CTA ── */
        .cta-section {
          background: linear-gradient(135deg, var(--green-900) 0%, var(--green-800) 100%);
          padding: 9rem 6rem; text-align: center; position: relative; overflow: hidden;
        }
        .cta-grid {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .btn-cta-white {
          font-family: 'Inter', sans-serif;
          background: white; color: var(--green-900);
          border: none; border-radius: 50px;
          padding: 1.15rem 3rem; font-size: 1rem; font-weight: 700;
          cursor: pointer; transition: all 0.25s var(--ease);
        }
        .btn-cta-white:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(0,0,0,0.2); }
        .btn-cta-outline {
          font-family: 'Inter', sans-serif;
          background: transparent; color: white;
          border: 1.5px solid rgba(255,255,255,0.3); border-radius: 50px;
          padding: 1.15rem 3rem; font-size: 1rem; font-weight: 500;
          cursor: pointer; transition: all 0.25s var(--ease);
        }
        .btn-cta-outline:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.65); }

        /* ── FOOTER ── */
        .ek-footer { background: var(--ink); color: white; padding: 8rem 6rem 4rem; }
        .footer-inner { max-width: 1400px; margin: 0 auto; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 5rem; margin-bottom: 5rem; }
        .footer-logo {
          font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800;
          margin-bottom: 1.2rem; letter-spacing: -0.03em;
        }
        .footer-logo span { color: var(--green-400); }
        .footer-desc { color: rgba(255,255,255,0.4); font-size: 0.92rem; line-height: 1.8; max-width: 300px; }
        .footer-col-title {
          font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.12em; color: rgba(255,255,255,0.25); margin-bottom: 1.6rem;
        }
        .footer-lnk {
          display: block; color: rgba(255,255,255,0.55); text-decoration: none;
          font-size: 0.92rem; margin-bottom: 0.9rem;
          transition: all 0.2s; font-weight: 400;
        }
        .footer-lnk:hover { color: var(--green-400); transform: translateX(4px); }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2.5rem;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.82rem; color: rgba(255,255,255,0.2);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ek-nav, .ek-section, .ek-section-sm, .cta-section, .ek-footer { padding-left: 3rem; padding-right: 3rem; }
          .hero-inner, .two-col { grid-template-columns: 1fr; gap: 3.5rem; }
          .stats-float-wrap { padding: 0 3rem; }
          .stats-float { grid-template-columns: repeat(2,1fr); padding: 2.8rem 2.5rem; transform: translateY(-30px); }
          .recycle-grid { grid-template-columns: 1fr; }
          .steps-grid { grid-template-columns: repeat(2,1fr); gap: 2.5rem; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
        }
        @media (max-width: 768px) {
          .ek-hero { padding: 7rem 2rem 4rem; }
          .nav-links { display: none; }
          .hero-mini-stats { gap: 2rem; }
          .ek-section, .ek-section-sm { padding: 4rem 2rem; }
          .stats-float { grid-template-columns: 1fr 1fr; }
          .recycle-grid, .steps-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
          .cta-section { padding: 6rem 2rem; }
          .ek-footer { padding: 5rem 2rem 3rem; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <nav className={`ek-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          <img 
            src={scrolled ? logoOscuro : logoBlanco}
            alt="EcoKinal Logo" 
            style={{ height: '60px', width: 'auto' }} 
          />
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => navigate('/register')}>
          Comenzar ahora →
        </button>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="ek-hero" id="inicio">
        <div className="hero-noise" />
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="hero-leaf" />

        <div className="hero-inner">
          {/* LEFT */}
          <div>
            <div className="hero-badge">
              <Leaf size={16} />
              Plataforma de reciclaje inteligente · 2026
            </div>
            <h1 className="hero-title">
              Recicla.<br />
              Clasifica.<br />
              <em>Impacta.</em>
            </h1>
            <p className="hero-sub">
              EcoKinal une Inteligencia Artificial, Gamificación y Geolocalización en una arquitectura de microservicios diseñada para transformar la forma en que el mundo recicla.
            </p>
            <div className="hero-btns">
              <button className="btn-hero-primary" onClick={() => navigate('/register')}>
                Crear cuenta gratis
              </button>
              <button className="btn-hero-outline" onClick={() => navigate('/login')}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Iniciar sesión
                  <ArrowRight size={18} />
                </span>
              </button>
            </div>
            <div className="hero-mini-stats">
              {[["5", "Módulos Core"], ["IA", "Clasificación"], ["JWT", "Seguridad 100%"], ["GPS", "Centros cercanos"]].map(([v, l]) => (
                <div key={l}>
                  <div className="hms-val">{v}</div>
                  <div className="hms-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — image placeholders */}
          <div className="hero-panel">
            <div className="img-ph" style={{ minHeight: 280 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📱</div>
              <strong>Mockup principal de la app</strong>
              <span>Captura del dashboard EcoKinal en alta resolución<br />Sugerido: 700 × 450 px</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem" }}>
              <div className="glass-card" style={{ 
                padding: "1.6rem", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center" 
              }}>
                <div style={{ marginBottom: "0.6rem" }}><Trophy size={32} /></div>
                <div style={{ fontSize: "0.78rem", color: "var(--green-300)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Eco Score</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "white", lineHeight: 1.1, marginTop: "0.4rem" }}>2,480</div>
              </div>
              <div className="img-ph" style={{ minHeight: 0 }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "0.3rem" }}><MapPin size={32} /></div>
                <strong style={{ fontSize: "0.78rem" }}>Mapa de centros</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FLOATING STATS BAR
      ══════════════════════════════════════════ */}
      <div style={{ background: "transparent", position: "relative", zIndex: 10 }}>
        <div className="stats-float-wrap">
          <div className="stats-float">
            {[
              ["5", "Módulos independientes"],
              ["3", "Categorías IA"],
              ["JWT", "Autenticación segura"],
              ["GPS", "Centros de reciclaje"],
            ].map(([v, l]) => (
              <div className="sf-item" key={l}>
                <div className="sf-val">{v}</div>
                <div className="sf-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ABOUT — ECOSISTEMA
      ══════════════════════════════════════════ */}
      <section className="ek-section bg-white" id="tecnología">
        <div className="sec-inner">
          <div className="two-col">
            {/* Image placeholder */}
            <div
              id="about-img" data-observe
              className={`anim ${v("about-img") ? "in" : ""}`}
            >
              <div className="img-ph-light" style={{ height: 500, borderRadius: "var(--radius-lg)", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <MapPin size={56} color="rgba(89,177,48,0.5)" style={{ marginBottom: '1rem' }} />
                <strong>Diagrama de arquitectura</strong>
                <span style={{ fontSize: "0.78rem" }}>
                  Infografía del ecosistema de microservicios<br />o foto del equipo EcoKinal<br />
                  <b>Sugerido: 600 × 520 px</b>
                </span>
              </div>
            </div>

            {/* Text */}
            <div
              id="about-txt" data-observe
              className={`anim d2 ${v("about-txt") ? "in" : ""}`}
            >
              <div className="sec-label">Ecosistema integrado</div>
              <h2 className="sec-title">Una arquitectura <em>modular</em><br />para el futuro</h2>
              <p className="sec-body">
                EcoKinal no es solo una app — es una red de microservicios diseñados para escalar. Cada módulo opera de forma autónoma bajo una capa de seguridad centralizada con JWT.
              </p>
              <div className="feature-list">
                {[
                  "Autenticación centralizada con tokens JWT",
                  "Clasificación inteligente de residuos por imagen",
                  "Gamificación y rankings en tiempo real",
                  "Foro comunitario con MongoDB",
                  "Geolocalización con OpenRouteService",
                ].map((f) => (
                  <div className="feature-item" key={f}>
                    <div className="feature-check">✓</div>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IA — CLASIFICACIÓN
      ══════════════════════════════════════════ */}
      <section className="ek-section bg-green" id="ia">
        <div className="sec-inner">
          <div
            id="ia-head" data-observe
            className={`anim ${v("ia-head") ? "in" : ""}`}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <div className="sec-label sec-label-light">Visión artificial</div>
            <h2 className="sec-title sec-title-light">
              Clasifica cualquier residuo <em>al instante</em>
            </h2>
            <p className="sec-body sec-body-light" style={{ margin: "0 auto" }}>
              Nuestra IA procesa imágenes JPG, JPEG y PNG en milisegundos. Solo sube la foto y el sistema determina la categoría exacta del residuo.
            </p>
          </div>

          <div className="recycle-grid">
            {RECYCLING_TYPES.map(({ type, icon: IconComponent, examples, gradient }, i) => (
              <div
                id={`rt-${i}`} key={type} data-observe
                className={`recycle-card anim d${i + 1} ${v(`rt-${i}`) ? "in" : ""}`}
              >
                <div className="recycle-icon"><IconComponent size={48} /></div>
                <div className="recycle-type">{type}</div>
                <div className="recycle-ex">{examples}</div>
                <span className="recycle-dot" style={{ background: gradient }} />
              </div>
            ))}
          </div>

          {/* AI demo placeholder */}
          <div
            id="ia-demo" data-observe
            className={`anim d3 ${v("ia-demo") ? "in" : ""}`}
            style={{ marginTop: "4rem" }}
          >
            <div className="img-ph" style={{ minHeight: 340, borderRadius: "var(--radius-lg)", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '2.5rem' }}>
                <Zap size={56} />
              </div>
              <strong>Demo interactiva del DetectorDeReciclaje</strong>
              <span>GIF animado o screenshot del módulo IA clasificando en vivo<br />Sugerido: 1200 × 400 px</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MÓDULOS
      ══════════════════════════════════════════ */}
      <section className="ek-section bg-bone" id="módulos">
        <div className="sec-inner">
          <div
            id="mod-head" data-observe
            className={`anim ${v("mod-head") ? "in" : ""}`}
            style={{ marginBottom: "3.5rem" }}
          >
            <div className="sec-label">Colección de APIs</div>
            <h2 className="sec-title">Cinco módulos.<br /><em>Un ecosistema poderoso.</em></h2>
          </div>

          <div className="modules-grid">
            {MODULES.map((mod, i) => {
              const IconComponent = mod.icon;
              return (
                <div
                  id={`mod-${mod.id}`} key={mod.id} data-observe
                  className={`module-card anim d${(i % 3) + 1} ${activeModule === mod.id ? "active" : ""} ${v(`mod-${mod.id}`) ? "in" : ""}`}
                  style={{ "--accent-color": mod.accentColor }}
                  onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
                >
                  <span className="mod-tag">{mod.tag}</span>
                  <div className="mod-icon"><IconComponent size={44} color={mod.accentColor} /></div>
                  <div className="mod-name">{mod.name}</div>
                  <div className="mod-desc">{mod.desc}</div>
                  <div className="mod-hl">
                    <span className="mod-dot" style={{ background: mod.accentColor }} />
                    {mod.highlight}
                  </div>
                  {activeModule === mod.id ? (
                    <div className="tech-pills">
                      {mod.tech.map((t) => <span key={t} className="tech-pill">{t}</span>)}
                    </div>
                  ) : (
                    <div className="mod-hint">Click para ver stack tecnológico <ArrowRight size={14} style={{ display: 'inline', marginLeft: '0.3rem' }} /></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="ek-section bg-white">
        <div className="sec-inner">
          <div
            id="flow-head" data-observe
            className={`anim ${v("flow-head") ? "in" : ""}`}
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <div className="sec-label">Flujo de usuario</div>
            <h2 className="sec-title">¿Cómo funciona <em>EcoKinal</em>?</h2>
          </div>

          <div className="steps-grid">
            {STEPS.map(({ step, icon: IconComponent, title, desc }, i) => (
              <div
                id={`step-${i}`} key={step} data-observe
                className={`step-card anim d${i + 1} ${v(`step-${i}`) ? "in" : ""}`}
              >
                <div className="step-bubble"><IconComponent size={40} /></div>
                <div className="step-n">Paso {step}</div>
                <div className="step-title">{title}</div>
                <div className="step-desc">{desc}</div>
              </div>
            ))}
          </div>

          {/* Screenshots row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginTop: "5.5rem" }}>
            <div className="img-ph-light" style={{ minHeight: 260, borderRadius: "var(--radius-md)", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: "2rem", marginBottom: '0.5rem' }}><Trophy size={48} color="rgba(89,177,48,0.6)" /></div>
              <strong>Dashboard del usuario</strong>
              <span style={{ fontSize: "0.78rem" }}>Perfil, puntos y estadísticas · 580 × 300 px</span>
            </div>
            <div className="img-ph-light" style={{ minHeight: 260, borderRadius: "var(--radius-md)", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: "2rem", marginBottom: '0.5rem' }}><MapPin size={48} color="rgba(89,177,48,0.6)" /></div>
              <strong>Vista del MapaEcoKinal</strong>
              <span style={{ fontSize: "0.78rem" }}>Centros de reciclaje cercanos · 580 × 300 px</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMUNIDAD
      ══════════════════════════════════════════ */}
      <section className="ek-section bg-bone" id="comunidad">
        <div className="sec-inner">
          <div className="two-col">
            <div
              id="com-txt" data-observe
              className={`anim ${v("com-txt") ? "in" : ""}`}
            >
              <div className="sec-label">Foro social</div>
              <h2 className="sec-title">Una comunidad que <em>transforma</em> realidades</h2>
              <p className="sec-body" style={{ marginBottom: "2.5rem" }}>
                ForoEcoKinal es el corazón social de la plataforma. Comparte logros, aprende técnicas de reciclaje, organiza brigadas y construye junto a otros una comunidad ecológica activa.
              </p>
              <button
                style={{
                  fontFamily: "'Inter',sans-serif",
                  background: "var(--green-600)", color: "white",
                  border: "none", borderRadius: "50px",
                  padding: "0.95rem 2.4rem", fontSize: "0.97rem", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.25s",
                  display: "flex", alignItems: "center", gap: "0.6rem",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "var(--green-700)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "var(--green-600)"; e.currentTarget.style.transform = "none"; }}
              >
                <MessageCircle size={20} />
                Unirse a la conversación
              </button>
            </div>

            <div
              id="com-posts" data-observe
              className={`anim d2 ${v("com-posts") ? "in" : ""}`}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {COMMUNITY_POSTS.map(({ user, time, title, likes }) => (
                <div className="post-card" key={title}>
                  <div>
                    <div className="post-user">{user} <span className="post-time">· {time}</span></div>
                    <div className="post-title">{title}</div>
                  </div>
                  <div className="post-likes">❤️ {likes}</div>
                </div>
              ))}
              <div className="img-ph-light" style={{ minHeight: 140, borderRadius: "var(--radius-sm)", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <MessageCircle size={32} color="rgba(89,177,48,0.5)" style={{ marginBottom: '0.4rem' }} />
                <strong style={{ fontSize: "0.82rem" }}>Captura del foro en vivo · 560 × 160 px</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-grid" />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 780, margin: "0 auto" }}>
          <div className="sec-label sec-label-light" style={{ marginBottom: "1.5rem" }}>
            Únete al movimiento
          </div>
          <h2
            className="sec-title sec-title-light font-display"
            style={{ fontSize: "clamp(2.8rem,6vw,4.5rem)", marginBottom: "2rem" }}
          >
            El planeta necesita<br /><em>tu acción hoy</em>
          </h2>
          <p className="sec-body sec-body-light" style={{ margin: "0 auto 3.5rem", maxWidth: 620 }}>
            Despliega EcoKinal, clasifica residuos con IA, gana puntos y encuentra tu centro de reciclaje más cercano. Todo desde una sola plataforma.
          </p>
          <div style={{ display: "flex", gap: "1.4rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-cta-white" onClick={() => navigate('/register')}>
              Crear cuenta gratis
            </button>
            <button className="btn-hero-outline" onClick={() => navigate('/login')}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Ya tengo cuenta
                  <ArrowRight size={18} />
                </span>
              </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="ek-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">Eco<span>Kinal</span></div>
              <p className="footer-desc">
                Plataforma modular de reciclaje inteligente. Tecnología web moderna al servicio del planeta y las comunidades.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <img 
                  src={logoBlanco}
                  alt="EcoKinal Logo" 
                  style={{ height: '80px', width: 'auto' }} 
                />
              </div>
            </div>
            <div>
              <div className="footer-col-title">Módulos REST</div>
              {["AuthEcoKinal", "DetectorDeReciclaje", "ForoEcoKinal", "Gamificación", "MapaEcoKinal"].map((m) => (
                <a key={m} href="#" className="footer-lnk">{m}</a>
              ))}
            </div>
            <div>
              <div className="footer-col-title">Recursos</div>
              <a href="#" className="footer-lnk">Documentación API</a>
              <a href="#" className="footer-lnk">Swagger UI</a>
              <a href="#" className="footer-lnk">Guía de despliegue</a>
              <a href="#" className="footer-lnk">Repositorio GitHub</a>
            </div>
            <div>
              <div className="footer-col-title">Expo Kinal 2026</div>
              <a href="#" className="footer-lnk">Sobre el proyecto</a>
              <a href="#" className="footer-lnk">El equipo</a>
              <a href="#" className="footer-lnk">Contacto</a>
              <a href="#" className="footer-lnk">Swagger Docs</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 EcoKinal — Proyecto Académico Kinal</span>
            <span>Construido con React · Node.js · IA · 🌿</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;