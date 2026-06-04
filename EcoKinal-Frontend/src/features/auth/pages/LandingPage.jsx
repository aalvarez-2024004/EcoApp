import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import logoBlanco from "../../../assets/logo.png";
import logoOscuro from "../../../assets/logo_2.png";
import { Lock, Zap, MessageCircle, Trophy, MapPin, Leaf, Trash2, AlertTriangle, ArrowRight, X } from "lucide-react";
import { landingCss } from "../../../Styles/LandingPage.js";

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

export const LandingPage = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(new Set());
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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

  const handleNavLink = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="ek-root">
      <style>{landingCss}</style>

      {/* ── MENÚ MÓVIL OVERLAY ── */}
      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="nav-mobile-close" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
          <X size={28} />
        </button>
        {NAV_LINKS.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={(e) => { e.preventDefault(); handleNavLink(`#${l.toLowerCase()}`); }}
          >
            {l}
          </a>
        ))}
        <button
          className="nav-cta"
          style={{ marginTop: '1rem' }}
          onClick={() => { setMenuOpen(false); navigate('/register'); }}
        >
          Comenzar ahora →
        </button>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`ek-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          <img
            src={scrolled ? logoOscuro : logoBlanco}
            alt="EcoKinal Logo"
            style={{ height: 'clamp(40px, 5vw, 60px)', width: 'auto' }}
          />
        </div>

        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>

        <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
          <span /><span /><span />
        </button>

        <button className="nav-cta" onClick={() => navigate('/register')}>
          Comenzar ahora →
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="ek-hero" id="inicio">
        <div className="hero-noise" />
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="hero-leaf" />

        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <Leaf size={14} />
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
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  Iniciar sesión <ArrowRight size={18} />
                </span>
              </button>
            </div>
            <div className="hero-mini-stats">
              {[["5", "Módulos Core"], ["IA", "Clasificación"], ["JWT", "Seguridad 100%"], ["GPS", "Centros cercanos"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="hms-val">{val}</div>
                  <div className="hms-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel derecho — oculto en móvil vía CSS */}
          <div className="hero-panel">
            <div className="img-ph" style={{ minHeight: 280 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📱</div>
              <strong>Mockup principal de la app</strong>
              <span>Captura del dashboard EcoKinal<br />Sugerido: 700 × 450 px</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
              <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ marginBottom: "0.5rem" }}><Trophy size={30} /></div>
                <div style={{ fontSize: "0.76rem", color: "var(--green-300)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Eco Score</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.7rem", fontWeight: 800, color: "white", lineHeight: 1.1, marginTop: "0.3rem" }}>2,480</div>
              </div>
              <div className="img-ph" style={{ minHeight: 0 }}>
                <MapPin size={28} />
                <strong style={{ fontSize: "0.76rem" }}>Mapa de centros</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS FLOAT ── */}
      <div style={{ background: "transparent", position: "relative", zIndex: 10 }}>
        <div className="stats-float-wrap">
          <div className="stats-float">
            {[
              ["5", "Módulos independientes"],
              ["3", "Categorías IA"],
              ["JWT", "Autenticación segura"],
              ["GPS", "Centros de reciclaje"],
            ].map(([val, lbl]) => (
              <div className="sf-item" key={lbl}>
                <div className="sf-val">{val}</div>
                <div className="sf-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ECOSISTEMA ── */}
      <section className="ek-section bg-white" id="tecnología">
        <div className="sec-inner">
          <div className="two-col">
            <div id="about-img" data-observe className={`anim ${v("about-img") ? "in" : ""}`}>
              <div className="img-ph-light" style={{ height: 460, borderRadius: "var(--radius-lg)", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <MapPin size={52} color="rgba(89,177,48,0.5)" style={{ marginBottom: '1rem' }} />
                <strong>Diagrama de arquitectura</strong>
                <span style={{ fontSize: "0.76rem" }}>
                  Infografía del ecosistema de microservicios<br />
                  Sugerido: 600 × 520 px
                </span>
              </div>
            </div>

            <div id="about-txt" data-observe className={`anim d2 ${v("about-txt") ? "in" : ""}`}>
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

      {/* ── IA ── */}
      <section className="ek-section bg-green" id="ia">
        <div className="sec-inner">
          <div id="ia-head" data-observe className={`anim ${v("ia-head") ? "in" : ""}`}
            style={{ textAlign: "center", marginBottom: "3rem" }}>
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
              <div id={`rt-${i}`} key={type} data-observe
                className={`recycle-card anim d${i + 1} ${v(`rt-${i}`) ? "in" : ""}`}>
                <div className="recycle-icon"><IconComponent size={44} /></div>
                <div className="recycle-type">{type}</div>
                <div className="recycle-ex">{examples}</div>
                <span className="recycle-dot" style={{ background: gradient }} />
              </div>
            ))}
          </div>

          <div id="ia-demo" data-observe className={`anim d3 ${v("ia-demo") ? "in" : ""}`}
            style={{ marginTop: "3.5rem" }}>
            <div className="img-ph" style={{ minHeight: 300, borderRadius: "var(--radius-lg)", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Zap size={52} style={{ marginBottom: '1rem' }} />
              <strong>Demo del DetectorDeReciclaje</strong>
              <span>GIF animado o screenshot del módulo IA clasificando en vivo<br />Sugerido: 1200 × 400 px</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MÓDULOS ── */}
      <section className="ek-section bg-bone" id="módulos">
        <div className="sec-inner">
          <div id="mod-head" data-observe className={`anim ${v("mod-head") ? "in" : ""}`}
            style={{ marginBottom: "3rem" }}>
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
                  <div className="mod-icon"><IconComponent size={40} color={mod.accentColor} /></div>
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
                    <div className="mod-hint">
                      Click para ver stack tecnológico
                      <ArrowRight size={13} style={{ display: 'inline', marginLeft: '0.3rem' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="ek-section bg-white">
        <div className="sec-inner">
          <div id="flow-head" data-observe className={`anim ${v("flow-head") ? "in" : ""}`}
            style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="sec-label">Flujo de usuario</div>
            <h2 className="sec-title">¿Cómo funciona <em>EcoKinal</em>?</h2>
          </div>

          <div className="steps-grid">
            {STEPS.map(({ step, icon: IconComponent, title, desc }, i) => (
              <div id={`step-${i}`} key={step} data-observe
                className={`step-card anim d${i + 1} ${v(`step-${i}`) ? "in" : ""}`}>
                <div className="step-bubble"><IconComponent size={36} /></div>
                <div className="step-n">Paso {step}</div>
                <div className="step-title">{title}</div>
                <div className="step-desc">{desc}</div>
              </div>
            ))}
          </div>

          {/* Grid de imágenes inferior — clase CSS para control responsivo */}
          <div className="how-imgs-grid">
            <div className="img-ph-light" style={{ minHeight: 240, borderRadius: "var(--radius-md)", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Trophy size={44} color="rgba(89,177,48,0.6)" style={{ marginBottom: '0.5rem' }} />
              <strong>Dashboard del usuario</strong>
              <span style={{ fontSize: "0.76rem" }}>Perfil, puntos y estadísticas · 580 × 300 px</span>
            </div>
            <div className="img-ph-light" style={{ minHeight: 240, borderRadius: "var(--radius-md)", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <MapPin size={44} color="rgba(89,177,48,0.6)" style={{ marginBottom: '0.5rem' }} />
              <strong>Vista del MapaEcoKinal</strong>
              <span style={{ fontSize: "0.76rem" }}>Centros de reciclaje cercanos · 580 × 300 px</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMUNIDAD ── */}
      <section className="ek-section bg-bone" id="comunidad">
        <div className="sec-inner">
          <div className="two-col">
            <div id="com-txt" data-observe className={`anim ${v("com-txt") ? "in" : ""}`}>
              <div className="sec-label">Foro social</div>
              <h2 className="sec-title">Una comunidad que <em>transforma</em> realidades</h2>
              <p className="sec-body" style={{ marginBottom: "2rem" }}>
                ForoEcoKinal es el corazón social de la plataforma. Comparte logros, aprende técnicas de reciclaje, organiza brigadas y construye junto a otros una comunidad ecológica activa.
              </p>
              <button
                style={{
                  background: "var(--green-600)", color: "white",
                  border: "none", borderRadius: "50px",
                  padding: "0.9rem 2.2rem", fontSize: "0.95rem", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.25s",
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  fontFamily: "var(--font-family)",
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "var(--green-700)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "var(--green-600)"; e.currentTarget.style.transform = "none"; }}
              >
                <MessageCircle size={18} />
                Unirse a la conversación
              </button>
            </div>

            <div id="com-posts" data-observe
              className={`anim d2 ${v("com-posts") ? "in" : ""}`}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {COMMUNITY_POSTS.map(({ user, time, title, likes }) => (
                <div className="post-card" key={title}>
                  <div>
                    <div className="post-user">{user} <span className="post-time">· {time}</span></div>
                    <div className="post-title">{title}</div>
                  </div>
                  <div className="post-likes">❤️ {likes}</div>
                </div>
              ))}
              <div className="img-ph-light" style={{ minHeight: 120, borderRadius: "var(--radius-sm)", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <MessageCircle size={28} color="rgba(89,177,48,0.5)" style={{ marginBottom: '0.3rem' }} />
                <strong style={{ fontSize: "0.8rem" }}>Captura del foro en vivo · 560 × 160 px</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="cta-section">
        <div className="cta-grid" />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 780, margin: "0 auto" }}>
          <div className="sec-label sec-label-light" style={{ marginBottom: "1.2rem" }}>
            Únete al movimiento
          </div>
          <h2 className="sec-title sec-title-light font-display"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", marginBottom: "1.8rem" }}>
            El planeta necesita<br /><em>tu acción hoy</em>
          </h2>
          <p className="sec-body sec-body-light" style={{ margin: "0 auto 3rem", maxWidth: 620 }}>
            Despliega EcoKinal, clasifica residuos con IA, gana puntos y encuentra tu centro de reciclaje más cercano. Todo desde una sola plataforma.
          </p>
          <div className="cta-btns">
            <button className="btn-cta-white" onClick={() => navigate('/register')}>
              Crear cuenta gratis
            </button>
            <button className="btn-cta-outline" onClick={() => navigate('/login')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                Ya tengo cuenta <ArrowRight size={18} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ek-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">Eco<span>Kinal</span></div>
              <p className="footer-desc">
                Plataforma modular de reciclaje inteligente. Tecnología web moderna al servicio del planeta y las comunidades.
              </p>
              <div style={{ marginTop: "1.8rem" }}>
                <img src={logoBlanco} alt="EcoKinal Logo" style={{ height: 'clamp(50px, 8vw, 80px)', width: 'auto' }} />
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