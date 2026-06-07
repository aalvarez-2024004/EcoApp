import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import logoBlanco from "../../../assets/logo.png";
import logoOscuro from "../../../assets/logo_2.png";
import { Leaf, ArrowRight, X, Trophy, MapPin, Zap, MessageCircle, Lock } from "lucide-react";
import { landingCss } from "../../../Styles/constants/LandingPage.js";
import { NAV_LINKS, MODULES, RECYCLING_TYPES, COMMUNITY_POSTS, STEPS } from "../../../Styles/constants/LandingData.js";

export const LandingPage = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [scrolled, setScrolled]         = useState(false);
  const [visible, setVisible]           = useState(new Set());
  const [menuOpen, setMenuOpen]         = useState(false);
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
          className="nav-cta nav-cta-mobile"
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
            className="nav-logo-img"
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
              EcoKinal une Inteligencia Artificial, Gamificación y Geolocalización en una arquitectura
              de microservicios diseñada para transformar la forma en que el mundo recicla.
            </p>
            <div className="hero-btns">
              <button className="btn-hero-primary" onClick={() => navigate('/register')}>
                Crear cuenta gratis
              </button>
              <button className="btn-hero-outline" onClick={() => navigate('/login')}>
                <span className="btn-icon-row">
                  Iniciar sesión <ArrowRight size={18} />
                </span>
              </button>
            </div>
            <div className="hero-mini-stats">
              {[["5","Módulos Core"],["IA","Clasificación"],["JWT","Seguridad 100%"],["GPS","Centros cercanos"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="hms-val">{val}</div>
                  <div className="hms-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel derecho — oculto en móvil vía CSS */}
          <div className="hero-panel">
            <div className="img-ph img-ph-hero">
              <div className="img-ph-emoji">📱</div>
              <strong>Mockup principal de la app</strong>
              <span>Captura del dashboard EcoKinal<br />Sugerido: 700 × 450 px</span>
            </div>
            <div className="hero-panel-bottom">
              <div className="glass-card glass-card-inner">
                <div className="glass-card-icon"><Trophy size={30} /></div>
                <div className="glass-card-label">Eco Score</div>
                <div className="glass-card-value">2,480</div>
              </div>
              <div className="img-ph img-ph-map">
                <MapPin size={28} />
                <strong className="img-ph-sm-label">Mapa de centros</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS FLOAT ── */}
      <div className="stats-wrap">
        <div className="stats-float-wrap">
          <div className="stats-float">
            {[
              ["5","Módulos independientes"],
              ["3","Categorías IA"],
              ["JWT","Autenticación segura"],
              ["GPS","Centros de reciclaje"],
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
              <div className="img-ph-light img-ph-arch">
                <MapPin size={52} color="rgba(89,177,48,0.5)" />
                <strong>Diagrama de arquitectura</strong>
                <span className="img-ph-arch-label">
                  Infografía del ecosistema de microservicios<br />
                  Sugerido: 600 × 520 px
                </span>
              </div>
            </div>
            <div id="about-txt" data-observe className={`anim d2 ${v("about-txt") ? "in" : ""}`}>
              <div className="sec-label">Ecosistema integrado</div>
              <h2 className="sec-title">Una arquitectura <em>modular</em><br />para el futuro</h2>
              <p className="sec-body">
                EcoKinal no es solo una app — es una red de microservicios diseñados para escalar.
                Cada módulo opera de forma autónoma bajo una capa de seguridad centralizada con JWT.
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
          <div id="ia-head" data-observe className={`anim sec-head-center ${v("ia-head") ? "in" : ""}`}>
            <div className="sec-label sec-label-light">Visión artificial</div>
            <h2 className="sec-title sec-title-light">
              Clasifica cualquier residuo <em>al instante</em>
            </h2>
            <p className="sec-body sec-body-light sec-body-centered">
              Nuestra IA procesa imágenes JPG, JPEG y PNG en milisegundos. Solo sube la foto y el
              sistema determina la categoría exacta del residuo.
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

          <div id="ia-demo" data-observe className={`ia-demo anim d3 ${v("ia-demo") ? "in" : ""}`}>
            <div className="img-ph img-ph-ia-demo">
              <Zap size={52} />
              <strong>Demo del DetectorDeReciclaje</strong>
              <span>GIF animado o screenshot del módulo IA clasificando en vivo<br />Sugerido: 1200 × 400 px</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MÓDULOS ── */}
      <section className="ek-section bg-bone" id="módulos">
        <div className="sec-inner">
          <div id="mod-head" data-observe className={`anim sec-head-left ${v("mod-head") ? "in" : ""}`}>
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
                      <ArrowRight size={13} className="mod-hint-arrow" />
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
          <div id="flow-head" data-observe className={`anim sec-head-center-lg ${v("flow-head") ? "in" : ""}`}>
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

          <div className="how-imgs-grid">
            <div className="img-ph-light img-ph-how">
              <Trophy size={44} color="rgba(89,177,48,0.6)" />
              <strong>Dashboard del usuario</strong>
              <span className="img-ph-how-label">Perfil, puntos y estadísticas · 580 × 300 px</span>
            </div>
            <div className="img-ph-light img-ph-how">
              <MapPin size={44} color="rgba(89,177,48,0.6)" />
              <strong>Vista del MapaEcoKinal</strong>
              <span className="img-ph-how-label">Centros de reciclaje cercanos · 580 × 300 px</span>
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
              <p className="sec-body community-body">
                ForoEcoKinal es el corazón social de la plataforma. Comparte logros, aprende técnicas
                de reciclaje, organiza brigadas y construye junto a otros una comunidad ecológica activa.
              </p>
              <button className="btn-join" onClick={() => navigate('/register')}>
                <MessageCircle size={18} />
                Unirse a la conversación
              </button>
            </div>

            <div id="com-posts" data-observe className={`anim d2 com-posts-list ${v("com-posts") ? "in" : ""}`}>
              {COMMUNITY_POSTS.map(({ user, time, title, likes }) => (
                <div className="post-card" key={title}>
                  <div>
                    <div className="post-user">{user} <span className="post-time">· {time}</span></div>
                    <div className="post-title">{title}</div>
                  </div>
                  <div className="post-likes">❤️ {likes}</div>
                </div>
              ))}
              <div className="img-ph-light img-ph-forum">
                <MessageCircle size={28} color="rgba(89,177,48,0.5)" />
                <strong className="img-ph-forum-label">Captura del foro en vivo · 560 × 160 px</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="cta-section">
        <div className="cta-grid" />
        <div className="cta-inner">
          <div className="sec-label sec-label-light cta-label">Únete al movimiento</div>
          <h2 className="sec-title sec-title-light font-display cta-title">
            El planeta necesita<br /><em>tu acción hoy</em>
          </h2>
          <p className="sec-body sec-body-light cta-body">
            Despliega EcoKinal, clasifica residuos con IA, gana puntos y encuentra tu centro de
            reciclaje más cercano. Todo desde una sola plataforma.
          </p>
          <div className="cta-btns">
            <button className="btn-cta-white" onClick={() => navigate('/register')}>
              Crear cuenta gratis
            </button>
            <button className="btn-cta-outline" onClick={() => navigate('/login')}>
              <span className="btn-icon-row">
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
                Plataforma modular de reciclaje inteligente. Tecnología web moderna al servicio del
                planeta y las comunidades.
              </p>
              <div className="footer-logo-img">
                <img src={logoBlanco} alt="EcoKinal Logo" />
              </div>
            </div>
            <div>
              <div className="footer-col-title">Módulos REST</div>
              {["AuthEcoKinal","DetectorDeReciclaje","ForoEcoKinal","Gamificación","MapaEcoKinal"].map((m) => (
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