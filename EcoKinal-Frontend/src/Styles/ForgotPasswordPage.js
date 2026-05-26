export const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --green-900: #1f5c2e;
    --green-800: #2d7a3d;
    --green-700: #3d9850;
    --green-600: #59B130;
    --green-500: #6ec945;

    --bone: #f7f8f5;
    --white: #ffffff;

    --ink: #112117;
    --muted: #708171;

    --shadow-sm: 0 4px 12px rgba(89,177,48,.06);
    --shadow-md: 0 10px 28px rgba(89,177,48,.10);
    --shadow-lg: 0 20px 50px rgba(89,177,48,.16);

    --font-main: 'Outfit', sans-serif;
    --font-display: 'Syne', sans-serif;
  }
  body { 
    font-family: var(--font-main); 
    background: var(--bone); 
  }

  .ek-wrap { display: flex; min-height: 100vh; background: var(--bone); }
  .ek-left { 
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 64px;
    max-width: 520px; 
    background:
      radial-gradient(circle at top left, rgba(89,177,48,.08), transparent 28%),
      var(--bone);
    animation: fadeSlideIn .6s ease both;
  }
  @keyframes fadeSlideIn { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }

  .ek-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 48px; }
  .ek-brand-name { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--eco-dark); letter-spacing: -0.3px; }

  .ek-heading { 
    margin-top: 42px;
    margin-bottom: 34px;
  }
  .ek-heading h1 { 
    font-family: var(--font-display);
    font-size: clamp(40px, 4vw, 56px);
    color: var(--ink);
    line-height: .95;
    letter-spacing: -.05em;
    margin-bottom: 12px;
  }
  .ek-heading p { 
    font-size: 15px;
    color: var(--muted);
    font-weight: 400;
    line-height: 1.7;
  }
  .ek-heading p strong { color: var(--eco-dark); font-weight: 600; }

  .ek-form { display: flex; flex-direction: column; gap: 18px; }
  .ek-field { display: flex; flex-direction: column; gap: 6px; }
  .ek-field label { 
    font-size: 12px; 
    font-weight: 700;
    color: var(--ink);
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  .ek-input-wrap { position: relative; display: flex; align-items: center; }
  .ek-icon { position: absolute; left: 14px; color: var(--green-600); display: flex; align-items: center; pointer-events: none; }
  .ek-input-wrap input { 
    width: 100%;
    height: 58px;
    padding: 0 46px;
    border: 1px solid rgba(89,177,48,.14);
    border-radius: 18px;
    background: rgba(255,255,255,.78);
    backdrop-filter: blur(8px);
    font-size: 14px;
    font-family: var(--font-main);
    color: var(--ink);
    outline: none;
    transition:
      border-color .25s ease,
      box-shadow .25s ease,
      transform .2s ease;
  }
  .ek-input-wrap input::placeholder { 
    color: #a3b3a5; 
  }
  .ek-input-wrap input:focus { 
    border-color: var(--green-500); 
    box-shadow:
      0 0 0 4px rgba(89,177,48,.12),
      0 10px 24px rgba(89,177,48,.10);
    transform: translateY(-1px);
  }
  .ek-input-wrap input:disabled { opacity: 0.6; cursor: not-allowed; }

  .ek-btn { 
    margin-top: 8px;
    height: 58px;
    padding: 14px; 
    background:
      linear-gradient(
        135deg,
        var(--green-700),
        var(--green-600)
      );
    color: white;
    border: none;
    border-radius: 18px;
    font-size: 15px;
    font-weight: 700;
    font-family: var(--font-main);
    cursor: pointer;
    transition:
      transform .22s ease,
      box-shadow .25s ease;
    box-shadow: 0 14px 30px rgba(89,177,48,.20);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    min-height: 50px; 
  }
  .ek-btn:hover:not(:disabled) { background: var(--green-600); transform: translateY(-2px); box-shadow: 0 18px 40px rgba(89,177,48,.28); }
  .ek-btn:active:not(:disabled) { transform: translateY(0); }
  .ek-btn:disabled { opacity: 0.65; cursor: not-allowed; }

  .ek-btn--outline { 
    background: rgba(255,255,255,.65);
    backdrop-filter: blur(8px);
    color: var(--green-700);
    border: 1px solid rgba(89,177,48,.18);
    box-shadow: none;
  }
  .ek-btn--outline:hover:not(:disabled) { background: rgba(255,255,255,.9); transform: translateY(-2px); box-shadow: none; }

  .ek-sent-state { display: flex; flex-direction: column; gap: 16px; }
  .ek-state-card { 
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    border-radius: 24px;
    backdrop-filter: blur(10px);
    border: 1px solid;
  }
  .ek-state-card--success { 
    background: rgba(89,177,48,.08);
    border-color: rgba(89,177,48,.18);
    color: var(--ink);
  }
  .ek-state-card p { font-size: 14px; font-weight: 500; line-height: 1.4; }
  .ek-state-icon { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ek-state-icon--success { background: #d8f3dc; color: var(--eco-green); }
  .ek-sent-actions { display: flex; flex-direction: column; gap: 10px; }

  .ek-signup { font-size: 14px; color: var(--eco-muted); text-align: center; }
  .ek-signup a { color: var(--eco-green); font-weight: 600; text-decoration: none; }
  .ek-signup a:hover { text-decoration: underline; }

  .ek-right { 
    flex: 1;
    background:
      linear-gradient(
        135deg,
        #1f5c2e 0%,
        #2d7a3d 45%,
        #3d9850 100%
      );
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden; 
    animation: fadeIn 0.8s ease both 0.2s; 
  }
  .ek-right::before {
    content: '';
    position: absolute;
    width: 720px;
    height: 720px;
    top: -240px;
    right: -180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,.10), transparent 70%);
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .ek-right-icon { display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: rgba(255,255,255,0.25); }
  .ek-right-text { padding: 0 48px 52px; text-align: center; }
  .ek-right-text h2 { 
    font-family: var(--font-display);
    font-size: clamp(30px, 3vw, 44px);
    line-height: 1;
    letter-spacing: -.05em;
    color: white;
    margin-bottom: 14px;
  }
  .ek-right-text p { 
    font-size: 15px;
    color: rgba(255,255,255,.72);
    line-height: 1.7;
    margin-bottom: 28px; 
  }
  .ek-features { 
    display: flex; 
    flex-direction: column; 
    gap: 14px;
    text-align: left; 
  }
  .ek-feature { 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    padding: 14px 18px;
    border-radius: 18px;
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.08);
    backdrop-filter: blur(10px);
    color: rgba(255,255,255,.82);
    font-size: 14px;
  }

  .ek-toast { 
    position: fixed; 
    top: 24px; 
    left: 50%; 
    transform: translateX(-50%); 
    padding: 12px 24px; 
    border-radius: 18px;
    backdrop-filter: blur(12px);
    font-size: 14px; 
    font-family: var(--font-display);
    font-weight: 500; 
    z-index: 9999; 
    animation: toastIn 0.3s ease; 
    box-shadow: 0 16px 40px rgba(0,0,0,.16);
    white-space: nowrap; 
  }
  .ek-toast--error { background: #dc2626; color: white; }
  .ek-toast--success { background: var(--eco-green); color: white; }
  @keyframes toastIn { from { opacity: 0; transform: translate(-50%, -10px); } to { opacity: 1; transform: translate(-50%, 0); } }

  .ek-back-btn { 
    width: 190px;
    height: 58px;
    background: rgba(255,255,255,.82);
    backdrop-filter: blur(10px);
    border: none;
    border-radius: 18px;
    position: relative;
    overflow: hidden; 
    cursor: pointer; 
    font-size: 20px; 
    font-weight: 600; 
    color: #000; 
    box-shadow: 0 8px 24px rgba(0,0,0,.06);
    transition: transform .2s ease;
  }
  .ek-back-btn:active { transform: scale(.98); }
  .ek-back-slider { 
    position: absolute; 
    left: 4px; 
    top: 4px; 
    width: 50px; 
    height: 50px; 
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
    transition: width .45s ease;
  }
  .ek-back-btn:hover .ek-back-slider { width: 182px; }
  .ek-back-text { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; transform: translateX(8px); position: relative; z-index: 1; }

  @media (max-width: 768px) { .ek-right { display: none; } .ek-left { max-width: 100%; padding: 40px 28px; } }
`