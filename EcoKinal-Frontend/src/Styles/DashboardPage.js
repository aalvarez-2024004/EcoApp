export const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  /* ── Paleta Landing-match ── */
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
  --card-border: rgba(89,177,48,0.08);

  /* ── Tipografía ── */
  --font-main: 'Outfit', sans-serif;
  --font-display: 'Outfit', sans-serif;

  /* ── Curvas ── */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.25, 1, 0.5, 1);

  /* ── Sombras verdes suaves (igual que Landing) ── */
  --shadow-sm: 0 2px 8px rgba(89,177,48,0.06);
  --shadow-md: 0 8px 24px rgba(89,177,48,0.1);
  --shadow-lg: 0 16px 48px rgba(89,177,48,0.12);
}

body {
  font-family: var(--font-main);
  background: var(--bone);
  color: var(--ink);
  overflow-x: hidden;
}

/* ── ANIMACIONES DE ENTRADA ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes slideRight {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(89,177,48,0.0); }
  50%       { box-shadow: 0 0 0 6px rgba(89,177,48,0.12); }
}

/* ── LAYOUT ── */
.db-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--bone);
  background-image:
    radial-gradient(rgba(89,177,48,0.035) 1px, transparent 0),
    linear-gradient(rgba(89,177,48,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(89,177,48,0.015) 1px, transparent 1px);
  background-size: 20px 20px, 40px 40px, 40px 40px;
  background-position: 0 0, 20px 20px, 20px 20px;
}

.db-main-content {
  flex: 1;
  padding: 44px 52px;
  overflow-y: auto;
  min-width: 0;
  animation: fadeIn 0.4s var(--ease) both;
}

.db-main-content::-webkit-scrollbar { width: 8px; }
.db-main-content::-webkit-scrollbar-track { background: var(--bone); }
.db-main-content::-webkit-scrollbar-thumb {
  background: rgba(89,177,48,0.18);
  border-radius: 20px;
}
.db-main-content::-webkit-scrollbar-thumb:hover { background: var(--green-600); }

/* ── SIDEBAR ── */
.db-sidebar {
  width: 280px;
  padding: 36px 24px;
  background: linear-gradient(185deg, #1a3d24 0%, #0d2013 100%);
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  flex-shrink: 0;
  border-right: 1px solid rgba(255,255,255,0.04);
  box-shadow: 6px 0 32px rgba(0,0,0,0.12);
  z-index: 100;
  animation: slideRight 0.45s var(--ease) both;
}

.db-nav-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
  margin-right: -12px;
  padding-right: 12px;
  scrollbar-width: thin;
  scrollbar-color: rgba(89,177,48,0.2) transparent;
}
.db-nav-container::-webkit-scrollbar { width: 4px; }
.db-nav-container::-webkit-scrollbar-track { background: transparent; }
.db-nav-container::-webkit-scrollbar-thumb {
  background: rgba(89,177,48,0.18);
  border-radius: 20px;
}

.db-nav-section { display: flex; flex-direction: column; }

/* Logo */
.db-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  animation: fadeUp 0.5s 0.05s var(--ease) both;
}

.db-logo-icon {
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: linear-gradient(135deg, var(--green-400), var(--green-600));
  display: grid;
  place-items: center;
  color: #0d2013;
  font-size: 20px;
  box-shadow:
    0 6px 20px rgba(89,177,48,0.35),
    inset 0 1px 3px rgba(255,255,255,0.4);
}

.db-logo h2 {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.04em;
  background: linear-gradient(90deg, #fff, rgba(255,255,255,0.72));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Perfil */
.db-profile-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  margin-bottom: 36px;
  backdrop-filter: blur(10px);
  animation: fadeUp 0.5s 0.1s var(--ease) both;
}

.db-profile-info h4 {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255,255,255,0.92);
}
.db-profile-info p {
  font-size: 11.5px;
  color: var(--muted-2);
  margin-top: 1px;
}

.db-edit-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.06);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  margin-left: auto;
  display: grid;
  place-items: center;
  transition: all 0.25s var(--ease-smooth);
  flex-shrink: 0;
}
.db-edit-btn:hover {
  opacity: 1;
  background: var(--green-600);
  color: #fff;
  border-color: transparent;
  transform: rotate(15deg) scale(1.1);
}

/* Nav section titles */
.db-nav-section-title {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--green-500);
  letter-spacing: 0.14em;
  margin: 26px 0 10px 14px;
  text-transform: uppercase;
}

.db-nav-list { display: flex; flex-direction: column; gap: 4px; }

.db-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 46px;
  padding: 0 16px;
  border-radius: 14px;
  color: rgba(255,255,255,0.50);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  transition: all 0.25s var(--ease-smooth);
}
.db-nav-link:hover {
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.9);
  transform: translateX(4px);
}
.db-nav-link.active {
  background: linear-gradient(90deg, rgba(89,177,48,0.16) 0%, rgba(89,177,48,0.03) 100%);
  color: var(--green-400);
  font-weight: 600;
  box-shadow: inset 2px 0 0 var(--green-500);
}
.db-nav-link.active::after {
  content: '';
  position: absolute;
  right: 16px;
  width: 5px; height: 5px;
  background: var(--green-400);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--green-400);
}

.db-nav-link i,
.db-edit-btn i,
.db-logout-btn i {
  font-size: 17px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Logout */
.db-logout-wrapper { margin-top: auto; padding-top: 20px; }
.db-logout-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 46px;
  padding: 0 16px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 14px;
  color: rgba(255,115,115,0.8);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-main);
  transition: all 0.25s var(--ease-smooth);
}
.db-logout-btn:hover {
  background: rgba(255,115,115,0.06);
  border-color: rgba(255,115,115,0.12);
  color: #ff6060;
  transform: translateY(-1px);
}

/* ── DASHBOARD PAGE CONTENT ── */

.db-page-container {
  width: 100%;
  max-width: none;
}

/* Hero banner */
.db-hero-banner {
  background: linear-gradient(135deg, var(--green-900) 0%, var(--green-800) 55%, var(--green-700) 100%);
  border-radius: 28px;
  padding: 50px 56px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg), 0 24px 56px rgba(31,92,46,0.22);
  border: 1px solid rgba(255,255,255,0.04);
  animation: scaleIn 0.5s 0.1s var(--ease) both;
}

/* Orb decorativo igual que el hero del landing */
.db-hero-banner::before {
  content: '';
  position: absolute;
  width: 480px; height: 480px;
  background: radial-gradient(circle, rgba(168,224,122,0.15) 0%, transparent 70%);
  right: -100px; top: -160px;
  pointer-events: none;
}
.db-hero-banner::after {
  content: '';
  position: absolute;
  width: 280px; height: 280px;
  background: radial-gradient(circle, rgba(0,0,0,0.18) 0%, transparent 80%);
  left: -60px; bottom: -80px;
  pointer-events: none;
}

/* Ruido sutil (igual que hero del landing) */
.db-hero-noise {
  position: absolute;
  inset: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
  pointer-events: none;
}

.db-hero-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  max-width: 580px;
}

.db-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.13);
  margin-bottom: 22px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--green-300);
  backdrop-filter: blur(8px);
}
.db-hero-badge i { font-size: 13px; }

.db-hero-banner h2 {
  font-family: var(--font-display);
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 800;
  line-height: 1.18;
  margin-bottom: 14px;
  letter-spacing: -0.03em;
  background: linear-gradient(120deg, #ffffff 45%, rgba(255,255,255,0.72));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.db-hero-banner p {
  font-size: 15px;
  color: rgba(255,255,255,0.68);
  line-height: 1.68;
}

.db-hero-illustration {
  font-size: 88px;
  opacity: 0.12;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  flex-shrink: 0;
}

/* Sección title */
.db-section-title {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 800;
  color: var(--green-700);
  letter-spacing: 0.15em;
  margin-bottom: 26px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
}
.db-section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--card-border), transparent);
}

/* Grid de módulos */
.db-modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

/* Tarjetas */
.db-module-card {
  background: var(--white);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: var(--font-main);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.4s var(--ease-elastic),
    box-shadow 0.4s var(--ease-smooth),
    border-color 0.3s var(--ease);
}

/* Línea de acento superior (igual al landing) */
.db-module-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--brand-color, var(--green-600)), transparent 80%);
  opacity: 0;
  transition: opacity 0.3s var(--ease-smooth);
}

.db-module-card .db-card-icon-box {
  background-color: var(--brand-bg);
  color: var(--brand-color);
}
.db-module-card .db-card-arrow { color: var(--brand-color); }
.db-module-card .db-card-badge {
  background-color: var(--brand-bg);
  color: var(--brand-color);
}

.db-module-card:hover {
  transform: translateY(-8px) scale(1.01);
  border-color: color-mix(in srgb, var(--brand-color, var(--green-600)) 50%, transparent);
  box-shadow: var(--shadow-md), 0 20px 40px color-mix(in srgb, var(--brand-color, var(--green-600)) 10%, transparent);
}
.db-module-card:hover::before { opacity: 1; }

.db-card-icon-box {
  width: 58px; height: 58px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  margin-bottom: 24px;
  font-size: 22px;
  transition: all 0.4s var(--ease-elastic);
  border: 1px solid rgba(89,177,48,0.06);
}
.db-card-icon-box i { font-size: 24px; display: inline-flex; }

.db-module-card:hover .db-card-icon-box {
  transform: scale(1.1) rotate(6deg);
  background-color: var(--brand-color) !important;
  color: #fff !important;
  box-shadow: 0 8px 18px rgba(0,0,0,0.12);
}

.db-module-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 8px 0;
  letter-spacing: -0.03em;
  transition: color 0.25s var(--ease);
}
.db-module-card:hover h3 { color: var(--ink-2); }

.db-module-card p {
  font-size: 14px;
  color: var(--muted);
  margin: 0;
  line-height: 1.62;
  max-width: 94%;
}

.db-card-arrow {
  position: absolute;
  bottom: 30px; right: 30px;
  font-size: 18px;
  opacity: 0.18;
  transform: translate(-6px, 6px);
  transition: all 0.35s var(--ease-elastic);
}
.db-card-arrow i { display: inline-flex; }
.db-module-card:hover .db-card-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

.db-card-badge {
  position: absolute;
  top: 28px; right: 28px;
  font-size: 9.5px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Animaciones escalonadas para las tarjetas */
.db-module-card:nth-child(1) { animation: fadeUp 0.5s 0.18s var(--ease) both; }
.db-module-card:nth-child(2) { animation: fadeUp 0.5s 0.24s var(--ease) both; }
.db-module-card:nth-child(3) { animation: fadeUp 0.5s 0.30s var(--ease) both; }
.db-module-card:nth-child(4) { animation: fadeUp 0.5s 0.36s var(--ease) both; }
.db-module-card:nth-child(5) { animation: fadeUp 0.5s 0.42s var(--ease) both; }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) {
  .db-main-content { padding: 36px 36px; }
  .db-hero-banner { padding: 44px 44px; }
}

@media (max-width: 900px) {
  .db-layout { flex-direction: column; }
  .db-sidebar {
    width: 100%;
    height: auto;
    position: relative;
    padding: 28px 22px;
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .db-nav-container {
    margin-right: 0;
    padding-right: 0;
    overflow-y: visible;
  }
  .db-hero-illustration { display: none; }
  .db-logo { margin-bottom: 26px; }
  .db-profile-section { margin-bottom: 22px; }
  .db-logout-wrapper { margin-top: 18px; }
  .db-modules-grid { gap: 18px; }
  .db-main-content { padding: 28px 20px; }
  .db-hero-banner { padding: 36px 28px; margin-bottom: 32px; }
}
`;