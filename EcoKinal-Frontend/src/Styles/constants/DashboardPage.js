import dashboardImg from '../../assets/Dashboard.jpeg'

export const dashboardCss = `
  .db-page-container {
    background-color: #ffffff;
    color: #121212;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  /* ══ HERO pantalla completa ══ */
  .db-hero-banner {
    position: relative;
    width: 100%;
    min-height: 480px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4rem 3.5rem;
    box-sizing: border-box;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    margin-bottom: 3.6rem;
  }

  .db-hero-banner::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(15, 35, 14, 0.85) 0%,
      rgba(15, 35, 14, 0.65) 55%,
      rgba(15, 35, 14, 0.25) 100%
    );
    z-index: 0;
  }

  .db-hero-text {
    position: relative;
    z-index: 1;
    max-width: 680px;
  }

  .db-hero-text h2 {
    font-size: 3rem;
    margin: 0.75rem 0 0.6rem;
    font-weight: 800;
    font-family: 'Plus Jakarta Sans', sans-serif;
    letter-spacing: -0.02em;
    color: #ffffff;
    line-height: 1.1;
  }

  .db-hero-text p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.5;
    margin: 0;
  }

  .db-hero-badge {
    background: rgba(255, 255, 255, 0.15);
    padding: 0.45rem 1.1rem;
    border-radius: 100px;
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(4px);
  }

  .db-hero-illustration {
    position: relative;
    z-index: 1;
    width: 320px;
    height: 320px;
    margin-right: 6rem;
    object-fit: contain;
    flex-shrink: 0;
    mix-blend-mode: screen;
    opacity: 0.88;
    filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.25));
  }

  /* ══ CONTENIDO ══ */
  .db-content {
    padding: 0 2.5rem 3.6rem;
  }

  .db-section-title {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #1b3c1a;
    text-transform: uppercase;
    margin: 0 0 24px;
    padding-left: 1rem;
    border-left: 4px solid #2d5a27;
    display: flex;
    align-items: center;
  }

  .db-modules-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }

  /* ══ CARDS ══ */
  .db-module-card {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    padding: 2rem;
    min-height: 260px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
    transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: left;
    position: relative;
  }

  .db-module-card:hover {
    border-color: rgba(45, 90, 39, 0.25);
    transform: translateY(-5px);
    box-shadow: 0 14px 28px rgba(45, 90, 39, 0.1);
  }

  .db-module-card:hover .dp-arrow i { transform: translateX(5px); }
  .db-module-card:hover .dp-icon-wrap { transform: scale(1.06); }

  .dp-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .dp-icon-wrap {
    width: 58px; height: 58px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }

  .dp-badge {
    font-size: 12px; font-weight: 700;
    padding: 4px 12px; border-radius: 8px;
  }

  .dp-card-name {
    font-size: 20px; font-weight: 800;
    color: #111827; margin: 0 0 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .dp-card-desc {
    font-size: 15px; color: #6b7280;
    margin: 0; line-height: 1.6;
  }

  .dp-arrow {
    font-size: 18px; color: #2d5a27;
    margin-top: auto; padding-top: 10px; text-align: right;
  }

  .dp-arrow i { display: inline-block; transition: transform 0.3s ease; }

  .icon-green  { background: #EAF3DE; color: #3B6D11; }
  .icon-teal   { background: #E1F5EE; color: #0F6E56; }
  .icon-amber  { background: #FAEEDA; color: #854F0B; }
  .icon-blue   { background: #E6F1FB; color: #185FA5; }
  .icon-purple { background: #EEEDFE; color: #534AB7; }

  .badge-popular   { background: #EAF3DE; color: #3B6D11; }
  .badge-comunidad { background: #E1F5EE; color: #0F6E56; }
  .badge-retos     { background: #FAEEDA; color: #854F0B; }
  .badge-nuevo     { background: #E6F1FB; color: #185FA5; }

  /* ══ RESPONSIVE ══ */
  @media (max-width: 1200px) {
    .db-modules-grid { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 768px) {
    .db-hero-banner {
      flex-direction: column;
      text-align: left;
      padding: 2.5rem 1.5rem;
      align-items: flex-start;
      min-height: 300px;
    }
    .db-hero-illustration { display: none; }
    .db-hero-text h2 { font-size: 2rem; }
    .db-content { padding: 0 1rem 2rem; }
    .db-modules-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 480px) {
    .db-modules-grid { grid-template-columns: 1fr; }
  }
`

export { dashboardImg }