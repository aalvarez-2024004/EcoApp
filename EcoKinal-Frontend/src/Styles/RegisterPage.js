export const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --green-900: #1f5c2e;
    --green-800: #2d7a3d;
    --green-700: #3d9850;
    --green-600: #59B130;
    --green-500: #6ec945;

    --bone: #f7f8f5;
    --white: #ffffff;

    --ink: #112117;
    --muted: #6f8172;

    --shadow-sm: 0 4px 12px rgba(89,177,48,0.06);
    --shadow-md: 0 10px 28px rgba(89,177,48,0.10);
    --shadow-lg: 0 20px 50px rgba(89,177,48,0.16);

    --font-main: 'Outfit', sans-serif;
    --font-display: 'Syne', sans-serif;
  }

  body {
    font-family: var(--font-main);
    background: var(--bone);
    color: var(--ink);
    overflow-x: hidden;
  }

  .ek-wrap {
    display: flex;
    min-height: 100vh;
    width: 100%;
  }

  /* =========================
      LEFT
  ========================= */

  .ek-left {
    width: 100%;
    max-width: 540px;
    min-width: 540px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 48px 56px;

    background:
      radial-gradient(circle at top left, rgba(89,177,48,0.08), transparent 28%),
      var(--bone);

    position: relative;
    z-index: 2;

    animation: fadeSlideIn 0.6s ease both;
  }

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateX(-24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .ek-brand {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 12px 0 28px 0;
    margin-bottom: 18px;
  }

  .ek-brand-name {
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: -0.04em;
    color: var(--ink);
  }

  .ek-heading {
    margin-bottom: 28px;
  }

  .ek-heading h1 {
    font-family: var(--font-display);
    font-size: clamp(28px, 3.5vw, 40px);
    color: var(--ink);
    letter-spacing: -0.05em;
    line-height: .95;
    margin-bottom: 6px;
  }

  .ek-heading p {
    font-size: 14px;
    color: var(--muted);
  }

  /* =========================
      FORM
  ========================= */

  .ek-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .ek-row-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .ek-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .ek-field label {
    font-size: 11.5px;
    font-weight: 700;
    color: var(--ink);
    text-transform: uppercase;
    letter-spacing: .03em;
  }

  .ek-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .ek-icon {
    position: absolute;
    left: 13px;
    color: #8ca59a;
    display: flex;
    align-items: center;
    pointer-events: none;
    z-index: 2;
  }

  .ek-input-wrap input {
    width: 100%;
    padding: 12px 38px 12px 38px;

    border: 1px solid rgba(89,177,48,.14);
    border-radius: 16px;

    background: rgba(255,255,255,.75);
    backdrop-filter: blur(8px);

    color: var(--ink);
    outline: none;

    transition:
      border-color .25s ease,
      box-shadow .25s ease,
      transform .2s ease;

    font-family: var(--font-main);
  }

  .ek-input-wrap input::placeholder {
    color: #b0c4b8;
  }

  .ek-input-wrap input:focus {
    border-color: var(--green-500);

    box-shadow:
      0 0 0 4px rgba(89,177,48,.12),
      0 10px 24px rgba(89,177,48,.10);

    transform: translateY(-1px);
  }

  .ek-input-wrap input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .ek-eye {
    position: absolute;
    right: 11px;

    background: none;
    border: none;

    cursor: pointer;

    color: #7a9288;

    display: flex;
    align-items: center;

    padding: 4px;
    border-radius: 6px;

    transition: color 0.15s;
  }

  .ek-eye:hover {
    color: var(--green-700);
  }

  .ek-match-icon {
    position: absolute;
    right: 36px;
    display: flex;
    align-items: center;
  }

  /* =========================
      PASSWORD STRENGTH
  ========================= */

  .ek-strength {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
  }

  .ek-strength-bar {
    display: flex;
    gap: 4px;
    flex: 1;
  }

  .ek-strength-seg {
    height: 3px;
    flex: 1;
    border-radius: 99px;
    transition: background 0.3s;
  }

  .ek-strength span {
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
  }

  /* =========================
      BUTTONS
  ========================= */

  .ek-btn {
    margin-top: 4px;
    padding: 13px;

    background:
      linear-gradient(
        135deg,
        var(--green-700),
        var(--green-600)
      );

    color: white;
    border: none;
    border-radius: 18px;

    font-family: var(--font-main);
    font-weight: 700;

    cursor: pointer;

    box-shadow: 0 14px 30px rgba(89,177,48,.20);

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    min-height: 48px;

    transition:
      transform .22s ease,
      box-shadow .25s ease;
  }

  .ek-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(89,177,48,.28);
  }

  .ek-btn:hover:not(:disabled) {
    background: var(--green-600);
  }

  .ek-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .ek-signup {
    margin-top: 22px;
    font-size: 14px;
    color: var(--muted);
    text-align: center;
  }

  .ek-signup a {
    color: var(--green-700);
    font-weight: 600;
    text-decoration: none;
  }

  .ek-signup a:hover {
    text-decoration: underline;
  }

/* =========================
    RIGHT SIDE
========================= */

.ek-right {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;   /* texto pegado abajo */
  padding: 0 40px 48px 40px;
  background: linear-gradient(135deg, #1f5c2e 0%, #2d7a3d 45%, #3d9850 100%);
  animation: fadeIn 0.8s ease both 0.2s;
}

.ek-right-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center 40%;   /* imagen centrada, algo más arriba */
  z-index: 0;
  padding: 32px 32px 160px 32px; /* deja espacio abajo para el texto */
  transition: transform .4s ease;
}

.ek-right:hover .ek-right-bg {
  transform: scale(1.02);
}

.ek-right-text {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 500px;
  padding: 0;
}

.ek-right-text h2 {
  font-family: var(--font-display);
  font-size: clamp(32px, 3.5vw, 56px);
  line-height: .95;
  font-weight: 800;
  color: white;
  letter-spacing: -0.06em;
  margin-bottom: 12px;
}

.ek-right-text p {
  font-size: 14px;
  color: rgba(255,255,255,.78);
  line-height: 1.7;
}

  /* =========================
      BACKGROUND IMAGE
  ========================= */

  .ek-right img {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 80%;

    object-fit: contain;
    object-position: center center;

    z-index: 0;

    padding: 40px;

    transition: transform .4s ease;
  }

  .ek-right:hover img {
    transform: scale(1.02);
  }

  /* =========================
      RIGHT TEXT
  ========================= */

  .ek-right-text {
    position: relative;
    z-index: 2;

    text-align: center;

    max-width: 700px;

    padding: 0;
  }

  .ek-right-text h2 {
    font-family: var(--font-display);

    font-size: clamp(44px, 4vw, 76px);

    line-height: .95;

    font-weight: 800;

    color: white;

    letter-spacing: -0.06em;

    margin-bottom: 18px;

    text-shadow:
      0 4px 18px rgba(0,0,0,0.18);
  }

  .ek-right-text p {
    font-size: 14px;

    color: rgba(255,255,255,.78);

    line-height: 1.7;
  }

  /* =========================
      TOAST
  ========================= */

  .ek-toast {
    position: fixed;

    top: 24px;
    left: 50%;

    transform: translateX(-50%);

    padding: 12px 24px;

    border-radius: 10px;

    font-size: 14px;
    font-weight: 500;

    z-index: 9999;

    animation: toastIn 0.3s ease;

    box-shadow: 0 4px 20px rgba(0,0,0,0.15);

    white-space: nowrap;
  }

  .ek-toast--error {
    background: #dc2626;
    color: white;
  }

  .ek-toast--success {
    background: var(--green-700);
    color: white;
  }

  @keyframes toastIn {
    from {
      opacity: 0;
      transform: translate(-50%,-10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%,0);
    }
  }

  /* =========================
      BACK BUTTON
  ========================= */

  .ek-back-btn {
    width: 192px;
    height: 56px;

    background: rgba(255,255,255,.82);
    backdrop-filter: blur(10px);

    border: none;
    border-radius: 18px;

    position: relative;
    overflow: hidden;

    cursor: pointer;

    font-size: 20px;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;

    color: #000;

    box-shadow: 0 8px 24px rgba(0,0,0,.06);

    transition: transform .15s ease;
  }

  .ek-back-btn:active {
    transform: scale(.98);
  }

  .ek-back-slider {
    position: absolute;

    left: 4px;
    top: 4px;

    width: 48px;
    height: 48px;

    background:
      linear-gradient(
        135deg,
        var(--green-700),
        var(--green-600)
      );

    border-radius: 14px;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 2;

    transition: width .5s ease;
  }

  .ek-back-btn:hover .ek-back-slider {
    width: 184px;
  }

  .ek-back-text {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    transform: translateX(8px);

    position: relative;
    z-index: 1;
  }

  /* =========================
      UPLOAD
  ========================= */

  .ek-upload-filename {
    margin-top: 14px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    color: #74c69d;
    font-size: 13px;
  }

  .ek-upload-remove {
    background: none;
    border: none;

    cursor: pointer;

    color: rgba(0,0,0,.45);

    font-size: 18px;
    line-height: 1;

    padding: 0 2px;

    transition: color 0.15s;
  }

  .ek-upload-remove:hover {
    color: #ef4444;
  }

  /* =========================
      STEPS
  ========================= */

  .ek-steps {
    display: flex;
    align-items: center;
    gap: 6px;

    margin-bottom: 22px;
  }

  .ek-step-dot {
    width: 8px;
    height: 8px;

    border-radius: 50%;

    background: rgba(89,177,48,.18);

    flex-shrink: 0;

    transition: background .3s;
  }

  .ek-step-dot--active {
    background: var(--green-600);
  }

  .ek-step-line {
    width: 28px;
    height: 2px;

    background: rgba(89,177,48,.18);

    border-radius: 2px;

    transition: background .3s;
  }

  .ek-step-line--done {
    background: var(--green-600);
  }

  .ek-step-label {
    font-size: 11px;
    font-weight: 600;

    color: var(--muted);

    margin-left: 4px;

    white-space: nowrap;
  }

  .ek-hero-image {
  width: min(90%, 900px);

  height: auto;

  object-fit: contain;

  margin-bottom: 32px;

  z-index: 1;

  animation: floatImage 6s ease-in-out infinite;
}

  /* =========================
      RESPONSIVE
  ========================= */

  @media (max-width: 1200px) {
    .ek-right img {
      padding: 20px;
      object-fit: contain;
    }

    .ek-right-text {
      max-width: 360px;
    }
  }

  @media (max-width: 992px) {
    .ek-left {
      min-width: 460px;
      max-width: 460px;
      padding: 40px;
    }

    .ek-right img {
      object-fit: contain;
      padding: 10px;
    }
  }

  @media (max-width: 768px) {

    .ek-wrap {
      flex-direction: column;
    }

    .ek-right {
      display: none;
    }

    .ek-left {
      min-width: 100%;
      max-width: 100%;

      padding: 36px 24px;
    }

    .ek-row-fields {
      grid-template-columns: 1fr;
    }

    .ek-back-btn {
      width: 160px;
      height: 52px;
    }

    .ek-back-btn:hover .ek-back-slider {
      width: 152px;
    }
  }
`