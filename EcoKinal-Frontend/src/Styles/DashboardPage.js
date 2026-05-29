export const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  /* Paleta de Colores Exclusiva */
  --green-900: #0d2e1c;
  --green-800: #164327;
  --green-700: #246b3e;
  --green-600: #3d9850;
  --green-500: #59B130;
  --green-400: #7ae44c;
  --bone: #f4f7f4;
  --white: #ffffff;
  --ink: #0b130e;
  --muted: #617364;
  
  /* Tipografías */
  --font-main: 'Outfit', sans-serif;
  --font-display: 'Syne', sans-serif;

  /* Curvas de animación "Elastic" de Apple/Framer Motion */
  --ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.25, 1, 0.5, 1);
  
  /* Sombras de nueva generación (Sofisticadas y difusas) */
  --shadow-sm: 0 2px 8px rgba(13, 46, 28, 0.02);
  --shadow-md: 0 12px 34px rgba(13, 46, 28, 0.05);
  --shadow-lg: 0 30px 60px rgba(13, 46, 28, 0.08);
}

body {
  font-family: var(--font-main);
  background: var(--bone);
  color: var(--ink);
  overflow-x: hidden;
}

/* LAYOUT CON TEXTURA NANO-TECH */
.db-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--bone);
  background-image: 
    radial-gradient(rgba(36, 107, 62, 0.04) 1px, transparent 0),
    linear-gradient(rgba(36, 107, 62, 0.01) 1px, transparent 1px),
    linear-gradient(90deg, rgba(36, 107, 62, 0.01) 1px, transparent 1px);
  background-size: 20px 20px, 40px 40px, 40px 40px;
  background-position: 0 0, 20px 20px, 20px 20px;
}

.db-main-content {
  flex: 1;
  padding: 60px 50px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

/* MAIN CONTENT SCROLLBAR OVERRIDE */
.db-main-content::-webkit-scrollbar {
  width: 8px;
}
.db-main-content::-webkit-scrollbar-track {
  background: var(--bone);
}
.db-main-content::-webkit-scrollbar-thumb {
  background: rgba(36, 107, 62, 0.2);
  border-radius: 20px;
}
.db-main-content::-webkit-scrollbar-thumb:hover {
  background: var(--green-700);
}

/* SIDEBAR HIGH-END LUXURY */
.db-sidebar {
  width: 290px;
  padding: 40px 28px;
  background: linear-gradient(185deg, #0d2315 0%, #05110a 100%);
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  flex-shrink: 0;
  box-shadow: 10px 0 50px rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(255, 255, 255, 0.03);
  z-index: 100;
}

/* CONTENEDOR INTERNO DE NAVEGACIÓN Y CONFIGURACIÓN DE SCROLLBAR OSCURO */
.db-nav-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  margin-right: -14px;
  padding-right: 14px;
  scrollbar-width: thin;
  scrollbar-color: rgba(89, 177, 48, 0.2) transparent;
}

.db-nav-container::-webkit-scrollbar {
  width: 5px;
}

.db-nav-container::-webkit-scrollbar-track {
  background: transparent;
}

.db-nav-container::-webkit-scrollbar-thumb {
  background: rgba(89, 177, 48, 0.15);
  border-radius: 20px;
}

.db-nav-container::-webkit-scrollbar-thumb:hover {
  background: rgba(89, 177, 48, 0.4);
}

.db-nav-section {
  display: flex;
  flex-direction: column;
}

.db-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 45px;
}

.db-logo-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--green-400), var(--green-600));
  display: grid;
  place-items: center;
  color: #05110a;
  font-size: 22px;
  font-weight: 700;
  box-shadow: 
    0 8px 24px rgba(89, 177, 48, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.4);
}

.db-logo h2 {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.8px;
  background: linear-gradient(90deg, #ffffff, rgba(255,255,255,0.7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* SECCIÓN PERFIL ESTILO GLASSMORPHISM */
.db-profile-section {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 40px;
  backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.05);
}

.db-profile-info h4 { 
  font-size: 14.5px; 
  font-weight: 600; 
  color: rgba(255,255,255,0.95);
}
.db-profile-info p { 
  font-size: 12px; 
  color: var(--muted);
  margin-top: 1px;
}

.db-edit-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.05);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: white;
  opacity: 0.6;
  cursor: pointer;
  margin-left: auto;
  display: grid;
  place-items: center;
  transition: all 0.25s var(--ease-smooth);
}
.db-edit-btn:hover { 
  opacity: 1; 
  background: var(--green-500); 
  color: #05110a;
  transform: rotate(15deg) scale(1.1); 
}

.db-nav-section-title {
  font-size: 11px;
  font-weight: 800;
  color: var(--green-600);
  letter-spacing: .15em;
  margin: 28px 0 12px 14px;
  text-transform: uppercase;
}

.db-nav-list { display: flex; flex-direction: column; gap: 8px; }

.db-nav-link {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 48px;
  padding: 0 18px;
  border-radius: 16px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 14.5px;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  transition: all 0.3s var(--ease-smooth);
}

.db-nav-link:hover {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255,255,255,0.95);
  transform: translateX(6px);
}

.db-nav-link.active {
  background: linear-gradient(90deg, rgba(89, 177, 48, 0.15) 0%, rgba(89, 177, 48, 0.02) 100%);
  color: var(--green-400);
  font-weight: 600;
  box-shadow: inset 1px 0 0 var(--green-400);
}

.db-nav-link.active::after {
  content: '';
  position: absolute;
  right: 18px;
  width: 5px;
  height: 5px;
  background-color: var(--green-400);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--green-400);
}

/* NORMALIZACIÓN TAMAÑO DE ICONOS */
.db-nav-link i, 
.db-edit-btn i, 
.db-logout-btn i {
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.db-logout-wrapper { margin-top: auto; padding-top: 20px; }
.db-logout-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  height: 48px;
  padding: 0 18px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 16px;
  color: #ff7373;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s var(--ease-smooth);
}
.db-logout-btn:hover {
  background: rgba(255, 115, 115, 0.06);
  border-color: rgba(255, 115, 115, 0.1);
  color: #ff4d4d;
  transform: translateY(-1px);
}

/* CONTENEDOR ESPECÍFICO DE LA PÁGINA DASHBOARD */
.db-page-container {
  max-width: 1140px;
  margin: 0 auto;
}

/* HERO BANNER CINEMÁTICO */
.db-hero-banner {
  background: linear-gradient(135deg, var(--green-900) 0%, #081d11 100%);
  border-radius: 32px;
  padding: 55px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg), 0 20px 50px rgba(13, 46, 28, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.db-hero-banner::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(122, 228, 76, 0.12) 0%, transparent 70%);
  right: -100px;
  top: -150px;
  pointer-events: none;
}
.db-hero-banner::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(36, 107, 62, 0.4) 0%, transparent 80%);
  left: -50px;
  bottom: -100px;
  pointer-events: none;
}

.db-hero-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
}

.db-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 26px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--green-400);
}

.db-hero-badge i {
  font-size: 14px;
}

.db-hero-banner h2 {
  font-family: var(--font-display);
  font-size: 42px;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 16px;
  letter-spacing: -1px;
  background: linear-gradient(120deg, #ffffff 40%, rgba(255,255,255,0.7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.db-hero-banner p {
  font-size: 16px;
  color: rgba(255,255,255,0.75);
  max-width: 600px;
  line-height: 1.65;
}

.db-hero-illustration {
  font-size: 94px;
  opacity: 0.14;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.db-section-title {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 800;
  color: var(--green-800);
  letter-spacing: .15em;
  margin-bottom: 28px;
  text-transform: uppercase;
}

/* GRID Y TARJETAS MACRO-ERGONÓMICAS */
.db-modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.db-module-card {
  background: #ffffff;
  border: 1px solid rgba(36, 107, 62, 0.06);
  border-radius: 28px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: inherit;
  transition: 
    transform 0.45s var(--ease-elastic), 
    box-shadow 0.45s var(--ease-smooth), 
    border-color 0.45s var(--ease-smooth);
  box-shadow: var(--shadow-sm);
}

.db-module-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--green-500), var(--green-400));
  opacity: 0;
  transition: opacity 0.3s var(--ease-smooth);
}

/* LÓGICA DE ILUMINACIÓN Y DINAMISMO CON VARIABLES DE MARCA INYECTADAS */
.db-module-card .db-card-icon-box {
  background-color: var(--brand-bg);
  color: var(--brand-color);
}

.db-module-card .db-card-arrow {
  color: var(--brand-color);
}

.db-module-card .db-card-badge {
  background-color: var(--brand-bg);
  color: var(--brand-color);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

/* COMPORTAMIENTO PREMIUM AL PASAR EL CURSOR (HOVER) */
.db-module-card:hover {
  transform: translateY(-10px) scale(1.01);
  border-color: var(--brand-color);
  box-shadow: var(--shadow-lg), 0 20px 40px rgba(13, 46, 28, 0.03);
}

.db-module-card:hover::before {
  opacity: 1;
}

.db-card-icon-box {
  width: 62px;
  height: 62px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  margin-bottom: 28px;
  font-size: 24px;
  transition: all 0.4s var(--ease-elastic);
  border: 1px solid rgba(36, 107, 62, 0.05);
  box-shadow: inset 0 -3px 6px rgba(13, 46, 28, 0.05);
}

.db-card-icon-box i {
  font-size: 26px;
  display: inline-flex;
}

.db-module-card:hover .db-card-icon-box {
  transform: scale(1.12) rotate(6deg);
  background-color: var(--brand-color);
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(13, 46, 28, 0.15);
}

.db-module-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--ink);
  margin: 0 0 10px 0;
  letter-spacing: -0.4px;
  transition: color 0.3s var(--ease-smooth);
}

.db-module-card:hover h3 {
  color: var(--green-900);
}

.db-module-card p {
  font-size: 14.5px;
  color: var(--muted);
  margin: 0;
  line-height: 1.6;
  max-width: 92%;
}

.db-card-arrow {
  position: absolute;
  bottom: 36px;
  right: 36px;
  font-size: 20px;
  opacity: 0.2;
  transform: translate(-8px, 8px);
  transition: all 0.35s var(--ease-elastic);
}

.db-card-arrow i {
  display: inline-flex;
}

.db-module-card:hover .db-card-arrow {
  opacity: 1;
  color: var(--brand-color);
  transform: translate(0, 0);
}

.db-card-badge {
  position: absolute;
  top: 36px;
  right: 36px;
  font-size: 10px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 0.3s var(--ease-smooth);
}

/* RESPONSIVE FLUIDO */
@media (max-width: 1024px) {
  .db-main-content { padding: 40px 30px; }
  .db-hero-banner { padding: 45px; }
}

@media (max-width: 900px) {
  .db-layout { flex-direction: column; }
  .db-sidebar { 
    width: 100%; 
    height: auto; 
    position: relative; 
    padding: 30px 24px; 
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  .db-nav-container {
    margin-right: 0;
    padding-right: 0;
    overflow-y: visible;
  }
  .db-hero-illustration {
    display: none;
  }
  .db-logo { margin-bottom: 30px; }
  .db-profile-section { margin-bottom: 25px; }
  .db-logout-wrapper { margin-top: 20px; }
  .db-modules-grid { gap: 24px; }
}
`;