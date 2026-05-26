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
  .ek-wrap { display: flex; min-height: 100vh; background: var(--eco-cream); }
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

  .ek-hero-icon {
    opacity: .18;
    transform: scale(1.08);
    transition:
      transform .4s ease,
      opacity .4s ease;
  }

  .ek-hero-icon:hover {
    transform: scale(1.12);
    opacity: .24;
  }
  @keyframes fadeSlideIn { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
  .ek-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 48px; }
  .ek-brand-name { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--eco-dark); letter-spacing: -0.3px; }
  .ek-heading { margin-bottom: 28px; }
  .ek-heading h1 { 
    font-family: var(--font-display); 
    font-size: clamp(40px, 4vw, 58px);
    color: var(--ink);
    line-height: .95;
    letter-spacing: -0.05em;
    margin-bottom: 12px;
  }
  .ek-heading p { 
    font-size: 15px; 
    color: var(--muted); 
    font-weight: 400; 
  }
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
  .ek-icon { 
    position: absolute; left: 14px; 
    color: var(--green-600);
    display: flex; align-items: center; 
    pointer-events: none; 
  }
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
  .ek-input-wrap input::placeholder { color: #b0c4b8; }
  .ek-input-wrap input:focus { 
    border-color: var(--green-500);
    box-shadow:
      0 0 0 4px rgba(89,177,48,.12),
      0 10px 24px rgba(89,177,48,.10);
    transform: translateY(-1px);
  }
  .ek-input-wrap input:disabled { opacity: 0.6; cursor: not-allowed; }
  .ek-eye { position: absolute; right: 12px; background: none; border: none; cursor: pointer; color: var(--eco-muted); display: flex; align-items: center; padding: 4px; border-radius: 6px; transition: color 0.15s; }
  .ek-eye:hover { color: var(--eco-green); }
  .ek-row { display: flex; align-items: center; justify-content: space-between; margin-top: -4px; }
  .ek-check { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--eco-muted); cursor: pointer; user-select: none; }
  .ek-check input { display: none; }
  .ek-checkmark { width: 17px; height: 17px; border: 1.5px solid #b0c4b8; border-radius: 5px; background: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.15s, border-color 0.15s; }
  .ek-check input:checked + .ek-checkmark { background: var(--eco-mid); border-color: var(--eco-mid); }
  .ek-check input:checked + .ek-checkmark::after { content: ''; display: block; width: 5px; height: 9px; border: 2px solid white; border-top: none; border-left: none; transform: rotate(45deg) translate(-1px,-1px); }
  .ek-forgot { font-size: 13px; color: var(--eco-mid); text-decoration: none; font-weight: 500; transition: color 0.15s; }
  .ek-forgot:hover { color: var(--eco-dark); }
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
    font-family: var(--font-main);
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition:
      transform .22s ease,
      box-shadow .25s ease;
    box-shadow: 0 14px 30px rgba(89,177,48,.20);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px; min-height: 50px; 
  }
  .ek-btn:hover:not(:disabled) { 
    background: var(--green-600); 
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(89,177,48,.28);
  }
  .ek-btn:active:not(:disabled) { transform: translateY(0); }
  .ek-btn:disabled { opacity: 0.65; cursor: not-allowed; }
  .ek-signup { margin-top: 28px; font-size: 14px; color: var(--eco-muted); text-align: center; }
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
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .ek-image-slot { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; }
  .ek-right-text { padding: 0 48px 52px; text-align: center; }
  .ek-right-text h2 { 
    font-family: var(--font-display);
    font-size: clamp(30px, 3vw, 44px);
    color: white; 
    line-height: 1;
    letter-spacing: -0.05em;
    margin-bottom: 14px;
  }
  .ek-right-text p { 
    font-size: 15px;
    color: rgba(255,255,255,.72);
    line-height: 1.7;
  }
  .ek-toast { position: fixed; top: 24px; left: 50%; transform: translateX(-50%); padding: 12px 24px; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; font-weight: 500; z-index: 9999; animation: toastIn 0.3s ease; box-shadow: 0 4px 20px rgba(0,0,0,0.15); white-space: nowrap; }
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
    transition:
      transform .2s ease;
  }

  .ek-back-btn:active {
    transform: scale(.98);
  }

  .ek-back-slider {
    position: absolute;
    left: 4px;
    top: 4px;
    width: 50px;
    height: 50px;
    background: #40916c;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: width .45s ease;
    background:
      linear-gradient(
        135deg,
        var(--green-700),
        var(--green-600)
      );
  }
  
  .ek-right-icon {
    width: 350px;
    height: 350px;
    object-fit: contain;
    display: block;
    margin: 0 auto 24px auto;
    opacity: .95;
    transition:
      transform .25s ease,
      opacity .25s ease;
  }

  .ek-right-icon:hover {
    transform: translateY(-2px) scale(1.03);
    opacity: 1;
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
  @media (max-width: 768px) { .ek-right { display: none; } .ek-left { max-width: 100%; padding: 40px 28px; } }
`
