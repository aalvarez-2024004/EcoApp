export const landingCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;800&family=Syne:wght@700;800&display=swap');

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

    /* Espaciado responsivo centralizado */
    --section-px: clamp(1.2rem, 5vw, 8rem);
    --section-py: clamp(3.5rem, 8vw, 8rem);
    --nav-px:     clamp(1.2rem, 5vw, 8rem);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ek-root {
    font-family: var(--font-family);
    background: var(--bone);
    color: var(--ink);
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  /* ══ TYPOGRAPHY ══ */
  .font-display { font-family: var(--font-family); font-weight: 800; }
  .hero-title, .sec-title, .nav-logo { font-family: var(--font-family); font-weight: 800; }

  /* ══ NAVBAR ══ */
  .ek-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.4rem var(--nav-px);
    transition: all 0.4s var(--ease);
  }
  .ek-nav.scrolled {
    background: rgba(250,251,248,0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(89,177,48,0.08);
    padding: 0.9rem var(--nav-px);
    box-shadow: var(--shadow-sm);
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.2rem, 3vw, 1.6rem); font-weight: 800;
    color: white; letter-spacing: -0.04em;
    transition: color 0.3s ease;
    flex-shrink: 0;
  }
  .nav-logo span { color: var(--green-600); }
  .nav-links { display: flex; gap: clamp(1.2rem, 2.5vw, 3rem); list-style: none; }
  .nav-links a {
    font-size: clamp(0.8rem, 1.2vw, 0.9rem); font-weight: 500;
    color: rgba(255,255,255,0.85);
    text-decoration: none; transition: all 0.3s ease;
    letter-spacing: 0.01em;
  }
  .nav-links a:hover { color: var(--green-300); }
  .ek-nav.scrolled .nav-logo { color: var(--ink); }
  .ek-nav.scrolled .nav-links a { color: var(--muted); }
  .ek-nav.scrolled .nav-links a:hover { color: var(--green-600); }
  .nav-cta {
    background: var(--green-600); color: white;
    border: none; border-radius: 50px;
    padding: 0.65rem clamp(1rem, 2vw, 1.8rem);
    font-size: clamp(0.78rem, 1.2vw, 0.88rem); font-weight: 600;
    cursor: pointer; transition: all 0.25s var(--ease);
    letter-spacing: 0.02em; font-family: var(--font-family);
    white-space: nowrap; flex-shrink: 0;
  }
  .nav-cta:hover {
    background: var(--green-700);
    box-shadow: 0 8px 20px rgba(89,177,48,0.3);
    transform: translateY(-2px);
  }

  /* ── Hamburger ── */
  .nav-hamburger {
    display: none;
    flex-direction: column; justify-content: center; align-items: center;
    gap: 5px; width: 40px; height: 40px;
    background: none; border: none; cursor: pointer; padding: 4px;
    flex-shrink: 0;
  }
  .nav-hamburger span {
    display: block; width: 24px; height: 2px;
    background: white; border-radius: 2px;
    transition: all 0.3s ease;
  }
  .ek-nav.scrolled .nav-hamburger span { background: var(--ink); }

  /* ── Menú móvil overlay ── */
  .nav-mobile-menu {
    display: none;
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(10,26,15,0.97);
    backdrop-filter: blur(16px);
    z-index: 300;
    flex-direction: column; align-items: center; justify-content: center;
    gap: 2.2rem;
  }
  .nav-mobile-menu.open { display: flex; }
  .nav-mobile-menu a {
    font-size: clamp(1.4rem, 5vw, 1.8rem); font-weight: 700;
    color: white; text-decoration: none;
    letter-spacing: -0.02em; transition: color 0.2s;
  }
  .nav-mobile-menu a:hover { color: var(--green-300); }
  .nav-mobile-close {
    position: absolute; top: 1.2rem; right: 1.2rem;
    background: none; border: none; color: white;
    font-size: 2rem; cursor: pointer; padding: 8px; line-height: 1;
  }

  /* ══ HERO ══ */
  .ek-hero {
    min-height: 100svh;
    background: linear-gradient(135deg, var(--green-900) 0%, var(--green-800) 40%, var(--green-700) 75%, var(--green-600) 100%);
    display: flex; align-items: center;
    padding: clamp(6rem, 12vw, 10rem) var(--section-px) clamp(5rem, 12vw, 12rem);
    position: relative; overflow: hidden;
  }
  .hero-noise {
    position: absolute; inset: 0; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px;
  }
  .hero-orb-1 {
    position: absolute; width: min(800px, 70vw); height: min(800px, 70vw);
    background: radial-gradient(circle, rgba(168,224,122,0.2) 0%, transparent 70%);
    right: -15%; top: -15%; border-radius: 50%; pointer-events: none;
  }
  .hero-orb-2 {
    position: absolute; width: min(500px, 50vw); height: min(500px, 50vw);
    background: radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%);
    left: -10%; bottom: -10%; border-radius: 50%; pointer-events: none;
  }
  .hero-leaf {
    position: absolute; right: 3%; top: 12%;
    width: min(450px, 40vw); height: min(450px, 40vw);
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
    display: grid; grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 5vw, 5rem); align-items: center;
    width: min(92vw, 1600px); margin: 0 auto; width: 100%;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50px; padding: 0.45rem 1.1rem;
    color: var(--green-300); font-size: clamp(0.68rem, 1.2vw, 0.82rem); font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    margin-bottom: 1.6rem; backdrop-filter: blur(8px);
    max-width: 100%;
  }
  .hero-title {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(2.4rem, 7vw, 6.5rem);
    color: white; line-height: 1.0;
    letter-spacing: -0.03em; margin-bottom: 1.6rem;
  }
  .hero-title em {
    font-style: italic; font-weight: 700;
    color: transparent;
    background: linear-gradient(90deg, var(--green-300), var(--green-400));
    -webkit-background-clip: text; background-clip: text;
  }
  .hero-sub {
    font-size: clamp(0.92rem, 1.6vw, 1.05rem); color: rgba(255,255,255,0.7);
    line-height: 1.85; max-width: 600px; margin-bottom: 2.4rem;
    font-weight: 300;
  }
  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-hero-primary {
    background: white; color: var(--green-800);
    border: none; border-radius: 50px;
    padding: 0.9rem clamp(1.4rem, 3vw, 2.6rem);
    font-size: clamp(0.88rem, 1.4vw, 1rem); font-weight: 700;
    cursor: pointer; transition: all 0.25s var(--ease);
    letter-spacing: 0.01em; font-family: var(--font-family);
  }
  .btn-hero-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(0,0,0,0.25); }
  .btn-hero-outline {
    background: transparent; color: rgba(255,255,255,0.9);
    border: 1.5px solid rgba(255,255,255,0.35); border-radius: 50px;
    padding: 0.9rem clamp(1.4rem, 3vw, 2.6rem);
    font-size: clamp(0.88rem, 1.4vw, 1rem); font-weight: 500;
    cursor: pointer; transition: all 0.25s var(--ease);
    font-family: var(--font-family);
  }
  .btn-hero-outline:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.65); }
  .hero-mini-stats {
    margin-top: 3rem;
    display: flex; justify-content: flex-start; align-items: center;
    gap: clamp(1.5rem, 4vw, 3.5rem); flex-wrap: wrap;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 2rem; text-align: center;
  }
  .hero-mini-stats > div { display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .hms-val {
    font-family: 'Syne', sans-serif; font-size: clamp(1.3rem, 3vw, 2rem); font-weight: 800;
    color: var(--green-300); line-height: 1;
  }
  .hms-lbl { font-size: clamp(0.7rem, 1.2vw, 0.8rem); color: rgba(255,255,255,0.45); margin-top: 0.3rem; font-weight: 500; }

  /* Hero right panel */
  .hero-panel { display: flex; flex-direction: column; gap: 1.4rem; }
  .glass-card {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--radius-md);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    padding: 2rem; color: white;
    transition: all 0.3s var(--ease);
  }
  .glass-card:hover { background: rgba(255,255,255,0.1); transform: translateY(-4px); }

  /* ══ IMAGE PLACEHOLDERS ══ */
  .img-ph {
    border: 2px dashed rgba(255,255,255,0.15);
    border-radius: var(--radius-md);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    color: rgba(255,255,255,0.35);
    font-size: 0.82rem; gap: 0.6rem;
    text-align: center; padding: 1.5rem; min-height: 200px;
  }
  .img-ph-light {
    border: 2px dashed rgba(89,177,48,0.18);
    border-radius: var(--radius-md);
    background: rgba(89,177,48,0.03);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    color: rgba(89,177,48,0.4);
    font-size: 0.82rem; gap: 0.6rem;
    text-align: center; padding: 2rem;
  }
  .img-ph strong { font-size: 0.92rem; font-weight: 600; color: inherit; }

  /* ══ STATS FLOATING BAR ══ */
  .stats-float-wrap {
    max-width: 1600px; margin: 0 auto;
    padding: 0 var(--section-px);
    position: relative; z-index: 10;
    margin-top: clamp(-80px, -10vw, -150px);
    margin-bottom: clamp(-40px, -5vw, -80px);
  }
  .stats-float {
    background: linear-gradient(135deg, var(--green-800) 0%, var(--green-700) 100%);
    border-radius: var(--radius-lg);
    padding: clamp(1.8rem, 4vw, 3.5rem) clamp(1.5rem, 5vw, 4.5rem);
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: clamp(1rem, 3vw, 3rem);
    box-shadow: var(--shadow-lg);
  }
  .sf-item { text-align: center; }
  .sf-val {
    font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 4vw, 3.2rem); font-weight: 800;
    color: var(--green-300); line-height: 1;
  }
  .sf-lbl { font-size: clamp(0.75rem, 1.2vw, 0.88rem); color: rgba(255,255,255,0.5); margin-top: 0.6rem; font-weight: 500; }

  /* ══ SECTIONS ══ */
  .ek-section { padding: var(--section-py) var(--section-px); }
  .bg-white { background: var(--white); }
  .bg-bone  { background: var(--bone); }
  .bg-ink   { background: var(--ink); }
  .bg-green { background: var(--green-800); }

  .sec-inner {
    width: min(100%, 1600px); margin: 0 auto;
  }
  .sec-label {
    font-size: clamp(0.7rem, 1.2vw, 0.78rem); font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--green-600); margin-bottom: 1rem;
  }
  .sec-label-light { color: var(--green-300); }
  .sec-title {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(1.7rem, 4vw, 3.5rem);
    color: var(--ink); line-height: 1.15; letter-spacing: -0.025em; margin-bottom: 1.2rem;
  }
  .sec-title em { font-style: italic; color: var(--green-600); }
  .sec-title-light { color: white; }
  .sec-title-light em { color: var(--green-300); }
  .sec-body { font-size: clamp(0.92rem, 1.5vw, 1.05rem); color: var(--muted); line-height: 1.8; max-width: 620px; }
  .sec-body-light { color: rgba(255,255,255,0.65); }

  /* ══ ANIMATE ══ */
  .anim { opacity: 0; transform: translateY(36px); transition: opacity 0.75s var(--ease), transform 0.75s var(--ease); }
  .anim.in { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: 0.1s; }
  .d2 { transition-delay: 0.2s; }
  .d3 { transition-delay: 0.3s; }
  .d4 { transition-delay: 0.4s; }

  /* ══ ABOUT ══ */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 6vw, 7rem); align-items: center; }
  .feature-list { display: flex; flex-direction: column; gap: 1.2rem; margin-top: 2.2rem; }
  .feature-item {
    display: flex; align-items: center; gap: 1rem;
    font-size: clamp(0.88rem, 1.4vw, 0.98rem); font-weight: 500; color: var(--ink-2);
  }
  .feature-check {
    width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
    background: var(--green-100); color: var(--green-700);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.78rem; font-weight: 700;
  }

  /* ══ AI SECTION ══ */
  .recycle-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(1rem, 2.5vw, 2.5rem); }
  .recycle-card {
    border-radius: var(--radius-md); padding: clamp(1.5rem, 3vw, 3rem) clamp(1.2rem, 2.5vw, 2.5rem);
    text-align: center;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    transition: all 0.3s var(--ease);
    backdrop-filter: blur(8px);
  }
  .recycle-card:hover { transform: translateY(-8px); background: rgba(255,255,255,0.09); }
  .recycle-icon { font-size: 3rem; margin-bottom: 1.2rem; display: flex; justify-content: center; color: white; }
  .recycle-type {
    font-family: 'Syne', sans-serif; font-size: clamp(1.1rem, 2vw, 1.4rem); font-weight: 700;
    color: white; margin-bottom: 0.8rem;
  }
  .recycle-ex { font-size: clamp(0.82rem, 1.3vw, 0.92rem); color: rgba(255,255,255,0.55); line-height: 1.7; }
  .recycle-dot { width: 10px; height: 10px; border-radius: 50%; margin: 1.5rem auto 0; display: block; }

  /* ══ MODULE CARDS ══ */
  .modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
    gap: clamp(1rem, 2vw, 1.5rem); width: 100%;
  }
  .module-card {
    background: var(--white); border: 1px solid rgba(0,0,0,0.04);
    border-radius: var(--radius-md); padding: clamp(1.5rem, 3vw, 2.5rem);
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
    box-shadow: var(--shadow-md); transform: translateY(-8px);
  }
  .module-card:hover::after, .module-card.active::after { opacity: 1; }
  .mod-tag {
    font-size: clamp(0.68rem, 1.1vw, 0.72rem); font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--green-600);
    background: var(--green-50); border: 1px solid var(--green-100);
    border-radius: 50px; padding: 0.3rem 0.9rem;
    display: inline-block; margin-bottom: 1.2rem;
  }
  .mod-icon { font-size: 2.8rem; margin-bottom: 1rem; display: flex; color: var(--green-600); }
  .mod-name {
    font-family: 'Syne', sans-serif; font-size: clamp(1rem, 1.8vw, 1.2rem); font-weight: 700;
    color: var(--ink); margin-bottom: 0.7rem;
  }
  .mod-desc { font-size: clamp(0.84rem, 1.3vw, 0.92rem); color: var(--muted); line-height: 1.7; margin-bottom: 1.3rem; }
  .mod-hl {
    font-size: 0.82rem; font-weight: 700; color: var(--green-600);
    display: flex; align-items: center; gap: 0.5rem;
  }
  .mod-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green-500); flex-shrink: 0; }
  .tech-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.2rem; }
  .tech-pill {
    font-size: 0.74rem; font-weight: 600; color: var(--muted);
    background: var(--bone); border: 1px solid rgba(89,177,48,0.1);
    border-radius: 6px; padding: 0.3rem 0.8rem;
  }
  .mod-hint { font-size: 0.8rem; color: var(--muted-2); font-weight: 500; margin-top: 1rem; }

  /* ══ STEPS ══ */
  .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(1.5rem, 3vw, 3.5rem); }
  .step-card { text-align: center; }
  .step-bubble {
    width: clamp(60px, 8vw, 80px); height: clamp(60px, 8vw, 80px); border-radius: 20px;
    background: var(--green-50); border: 1px solid var(--green-100);
    display: flex; align-items: center; justify-content: center;
    font-size: 2.2rem; margin: 0 auto 1.5rem;
    transition: all 0.3s var(--ease); color: var(--green-600);
  }
  .step-card:hover .step-bubble {
    background: var(--green-100);
    box-shadow: 0 12px 28px rgba(89,177,48,0.18);
    transform: scale(1.08);
  }
  .step-n {
    font-size: clamp(0.68rem, 1.1vw, 0.75rem); font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--green-600); margin-bottom: 0.5rem;
  }
  .step-title {
    font-family: 'Syne', sans-serif; font-size: clamp(1rem, 1.8vw, 1.2rem); font-weight: 700;
    color: var(--ink); margin-bottom: 0.7rem;
  }
  .step-desc { font-size: clamp(0.84rem, 1.3vw, 0.92rem); color: var(--muted); line-height: 1.7; }

  /* ══ HOW IT WORKS — imágenes inferiores ══ */
  .how-imgs-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: clamp(1.2rem, 3vw, 3rem); margin-top: 5rem;
  }

  /* ══ COMMUNITY ══ */
  .post-card {
    background: var(--white); border-radius: var(--radius-sm);
    border: 1px solid rgba(0,0,0,0.03); padding: clamp(1rem, 2vw, 1.6rem) clamp(1.1rem, 2vw, 1.8rem);
    display: flex; justify-content: space-between; align-items: center; gap: 1rem;
    transition: all 0.2s var(--ease); box-shadow: var(--shadow-sm);
  }
  .post-card:hover { transform: translateX(6px); border-color: var(--green-100); }
  .post-user { font-size: 0.82rem; color: var(--green-600); font-weight: 700; margin-bottom: 0.35rem; }
  .post-time { color: var(--muted-2); font-weight: 400; }
  .post-title { font-size: clamp(0.88rem, 1.4vw, 0.98rem); font-weight: 600; color: var(--ink); }
  .post-likes {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.85rem; font-weight: 600; color: var(--muted);
    background: var(--bone); border-radius: 50px; padding: 0.45rem 1rem;
    flex-shrink: 0; white-space: nowrap;
  }

  /* ══ CTA ══ */
  .cta-section {
    background: linear-gradient(135deg, var(--green-900) 0%, var(--green-800) 100%);
    padding: clamp(4rem, 10vw, 9rem) var(--section-px); text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-grid {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .cta-btns { display: flex; gap: 1.2rem; justify-content: center; flex-wrap: wrap; }
  .btn-cta-white {
    background: white; color: var(--green-900);
    border: none; border-radius: 50px;
    padding: clamp(0.85rem, 2vw, 1.15rem) clamp(1.6rem, 3vw, 3rem);
    font-size: clamp(0.88rem, 1.4vw, 1rem); font-weight: 700;
    cursor: pointer; transition: all 0.25s var(--ease);
    font-family: var(--font-family);
  }
  .btn-cta-white:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(0,0,0,0.2); }
  .btn-cta-outline {
    background: transparent; color: white;
    border: 1.5px solid rgba(255,255,255,0.3); border-radius: 50px;
    padding: clamp(0.85rem, 2vw, 1.15rem) clamp(1.6rem, 3vw, 3rem);
    font-size: clamp(0.88rem, 1.4vw, 1rem); font-weight: 500;
    cursor: pointer; transition: all 0.25s var(--ease);
    font-family: var(--font-family);
  }
  .btn-cta-outline:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.65); }

  /* ══ FOOTER ══ */
  .ek-footer { background: var(--ink); color: white; padding: clamp(4rem, 8vw, 8rem) var(--section-px) clamp(2.5rem, 4vw, 4rem); }
  .footer-grid {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: clamp(2rem, 4vw, 5rem); margin-bottom: clamp(3rem, 5vw, 5rem);
  }
  .footer-logo {
    font-family: 'Syne', sans-serif; font-size: clamp(1.4rem, 3vw, 1.8rem); font-weight: 800;
    margin-bottom: 1.1rem; letter-spacing: -0.03em;
  }
  .footer-logo span { color: var(--green-400); }
  .footer-desc { color: rgba(255,255,255,0.4); font-size: clamp(0.82rem, 1.3vw, 0.92rem); line-height: 1.8; max-width: 300px; }
  .footer-col-title {
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.12em; color: rgba(255,255,255,0.25); margin-bottom: 1.4rem;
  }
  .footer-lnk {
    display: block; color: rgba(255,255,255,0.55); text-decoration: none;
    font-size: clamp(0.84rem, 1.3vw, 0.92rem); margin-bottom: 0.85rem;
    transition: all 0.2s; font-weight: 400;
  }
  .footer-lnk:hover { color: var(--green-400); transform: translateX(4px); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2rem;
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;
    font-size: clamp(0.75rem, 1.2vw, 0.82rem); color: rgba(255,255,255,0.2);
  }

  /* ══════════════════════════════════════════
     BREAKPOINTS
  ══════════════════════════════════════════ */

  /* ── TABLET GRANDE (≤ 1100px) ── */
  @media (max-width: 1100px) {
    .stats-float { grid-template-columns: repeat(2, 1fr); }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .steps-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* ── TABLET (≤ 900px) ── */
  @media (max-width: 900px) {
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }

    .hero-inner { grid-template-columns: 1fr; }
    .hero-panel { display: none; }

    .two-col { grid-template-columns: 1fr; }
    .recycle-grid { grid-template-columns: repeat(2, 1fr); }
    .modules-grid { grid-template-columns: repeat(2, 1fr); }
    .how-imgs-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* ── MÓVIL (≤ 640px) ── */
  @media (max-width: 640px) {
    .nav-cta { padding: 0.55rem 1rem; font-size: 0.78rem; }

    .hero-btns { flex-direction: column; }
    .btn-hero-primary,
    .btn-hero-outline { width: 100%; justify-content: center; text-align: center; }

    .hero-mini-stats { gap: 1.2rem; justify-content: center; }

    .stats-float { grid-template-columns: repeat(2, 1fr); border-radius: var(--radius-md); }

    .recycle-grid { grid-template-columns: 1fr; }
    .steps-grid { grid-template-columns: 1fr; }
    .modules-grid { grid-template-columns: 1fr; }
    .how-imgs-grid { grid-template-columns: 1fr; margin-top: 3rem; }

    .post-card { flex-direction: column; align-items: flex-start; }
    .post-likes { align-self: flex-end; }

    .footer-grid { grid-template-columns: 1fr; }
    .footer-desc { max-width: 100%; }
    .footer-bottom { justify-content: center; text-align: center; }

    .btn-cta-white,
    .btn-cta-outline { width: 100%; }
    .cta-btns { flex-direction: column; align-items: center; }

    .step-bubble { border-radius: 14px; }
  }

  /* ── MÓVIL PEQUEÑO (≤ 380px) ── */
  @media (max-width: 380px) {
    .nav-cta { display: none; }
    .stats-float { grid-template-columns: 1fr 1fr; }
    .hero-badge { font-size: 0.62rem; }
  }
`