import dashboardImg from '../../assets/Dashboard.jpeg'

export const dashboardCss = `
  .db-page-container {
    min-height: 100vh;
    background-color: #f8f9f2;
    color: #121212;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: relative;
  }

  /* ══ HERO pantalla completa ══ */
  .db-hero-banner {
    position: relative;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    min-height: 380px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4rem 3.5rem;
    box-sizing: border-box;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    margin-bottom: 3rem;
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
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.5;
    margin: 0;
  }

  .db-hero-badge {
    background: rgba(255, 255, 255, 0.15);
    padding: 0.45rem 1.1rem;
    border-radius: 100px;
    font-size: 0.85rem;
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
    width: 220px;
    height: 220px;
    object-fit: contain;
    flex-shrink: 0;
    mix-blend-mode: screen;
    opacity: 0.88;
    filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.25));
  }

  /* ══ CONTENIDO ══ */
  .db-content {
    padding: 0 2.5rem 3rem;
  }

  .db-section-title {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #1b3c1a;
    text-transform: uppercase;
    margin: 0 0 20px;
    padding-left: 1rem;
    border-left: 4px solid #2d5a27;
    display: flex;
    align-items: center;
  }

  .db-modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  /* ══ CARDS ══ */
  .db-module-card {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    padding: 1.75rem;
    min-height: 200px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
    transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    gap: 14px;
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
    width: 52px; height: 52px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }

  .dp-badge {
    font-size: 11.5px; font-weight: 700;
    padding: 3px 10px; border-radius: 8px;
  }

  .dp-card-name {
    font-size: 17px; font-weight: 800;
    color: #111827; margin: 0 0 6px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .dp-card-desc {
    font-size: 13.5px; color: #6b7280;
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
    .db-modules-grid { grid-template-columns: 1fr; }
  }
`

export { dashboardImg }