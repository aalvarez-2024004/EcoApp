export const dashboardCss = `
  .db-page-container {
    min-height: 100vh;
    background-color: var(--bone-white);
    padding: 2.5rem 1.5rem;
    color: var(--pure-black);
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .leaf-bg {
    position: absolute;
    color: var(--soft-green);
    opacity: 0.15;
    z-index: 0;
    pointer-events: none;
  }

  .db-hero-banner {
    position: relative;
    z-index: 1;
    background: linear-gradient(135deg, var(--forest-green) 0%, var(--leaf-green) 100%);
    border-radius: 28px;
    padding: 3.5rem 2.5rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3.5rem;
    box-shadow: 0 20px 40px rgba(27, 60, 26, 0.2);
  }

  .db-hero-text h2 {
    font-size: 2.8rem;
    margin: 1rem 0;
    font-weight: 800;
    font-family: 'Plus Jakarta Sans', sans-serif;
    letter-spacing: -0.02em;
  }

  .db-hero-text p {
    font-size: 1.1rem;
    opacity: 0.9;
    line-height: 1.5;
  }

  .db-hero-badge {
    background: rgba(255,255,255,0.15);
    padding: 0.5rem 1.25rem;
    border-radius: 100px;
    font-size: 0.9rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid rgba(255,255,255,0.25);
    backdrop-filter: blur(4px);
  }

  .db-hero-illustration {
    font-size: 7rem;
    opacity: 0.85;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
  }

  .db-section-title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #8ca399;
    text-transform: uppercase;
    margin: 0 0 16px;
    padding-left: 0.75rem;
    border-left: 4px solid var(--leaf-green);
    position: relative;
    z-index: 1;
  }

  .db-modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    position: relative;
    z-index: 1;
  }

  .db-module-card {
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.04);
    border-radius: 24px;
    padding: 2rem;
    min-height: 220px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: left;
    position: relative;
    overflow: hidden;
  }

  .db-module-card:hover {
    border-color: rgba(45, 90, 39, 0.3);
    transform: translateY(-6px);
    box-shadow: 0 16px 32px rgba(45, 90, 39, 0.12);
  }

  .db-module-card:hover .dp-arrow i {
    transform: translateX(6px);
  }

  .db-module-card:hover .dp-icon-wrap {
    transform: scale(1.05);
  }

  .dp-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .dp-icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    transition: transform 0.3s ease;
  }

  .dp-badge {
    font-size: 12px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 10px;
  }

  .dp-card-name {
    font-size: 18px;
    font-weight: 800;
    color: #111827;
    margin: 0 0 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .dp-card-desc {
    font-size: 14.5px;
    color: #6b7280;
    margin: 0;
    line-height: 1.6;
  }

  .dp-arrow {
    font-size: 20px;
    color: var(--leaf-green);
    margin-top: auto;
    padding-top: 12px;
    text-align: right;
  }

  .dp-arrow i {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  /* ══ COLORES DE ICONOS ══ */
  .icon-green  { background: #EAF3DE; color: #3B6D11; }
  .icon-teal   { background: #E1F5EE; color: #0F6E56; }
  .icon-amber  { background: #FAEEDA; color: #854F0B; }
  .icon-blue   { background: #E6F1FB; color: #185FA5; }
  .icon-purple { background: #EEEDFE; color: #534AB7; }

  /* ══ COLORES DE BADGES ══ */
  .badge-popular   { background: #EAF3DE; color: #3B6D11; }
  .badge-comunidad { background: #E1F5EE; color: #0F6E56; }
  .badge-retos     { background: #FAEEDA; color: #854F0B; }
  .badge-nuevo     { background: #E6F1FB; color: #185FA5; }

  /* ══ VARIABLES CSS ══ */
  .db-page-container {
    --forest-green: #1b3c1a;
    --leaf-green:   #2d5a27;
    --soft-green:   #a8c69f;
    --bone-white:   #f8f9f2;
    --pure-black:   #121212;
    --text-gray:    #4a4a4a;
  }

  /* ══ HOJAS DECORATIVAS ══ */
  .leaf-bg--top    { top: 5%; left: 5%; font-size: 8rem; transform: rotate(-15deg); }
  .leaf-bg--bottom { bottom: 10%; right: 5%; font-size: 10rem; transform: rotate(160deg); }

  /* ══ RESPONSIVE ══ */
  @media (max-width: 768px) {
    .db-page-container { padding: 1.5rem 1rem; }
    .db-hero-banner {
      flex-direction: column;
      text-align: center;
      padding: 2.5rem 1.5rem;
    }
    .db-hero-illustration { display: none; }
    .db-hero-text h2 { font-size: 2rem; }
    .db-modules-grid { grid-template-columns: 1fr; }
  }
`;