export const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --eco-green: #2d6a4f; --eco-mid: #40916c; --eco-light: #74c69d;
    --eco-pale: #d8f3dc; --eco-dark: #1b4332; --eco-cream: #fafaf8;
    --eco-ink: #1a2e22; --eco-muted: #6b7c72; --radius: 14px;
    --shadow: 0 8px 40px rgba(27,67,50,0.13);
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--eco-cream); }

  .ek-wrap { display: flex; min-height: 100vh; background: var(--eco-cream); }
  .ek-left { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 60px 64px; max-width: 520px; animation: fadeSlideIn 0.6s ease both; }
  @keyframes fadeSlideIn { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }

  .ek-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 48px; }
  .ek-brand-name { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--eco-dark); letter-spacing: -0.3px; }

  .ek-heading { margin-bottom: 32px; }
  .ek-heading h1 { font-family: 'DM Serif Display', serif; font-size: clamp(32px, 4vw, 44px); color: var(--eco-ink); line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 8px; }
  .ek-heading p { font-size: 14px; color: var(--eco-muted); font-weight: 400; }
  .ek-heading p strong { color: var(--eco-dark); font-weight: 600; }

  .ek-form { display: flex; flex-direction: column; gap: 18px; }
  .ek-field { display: flex; flex-direction: column; gap: 6px; }
  .ek-field label { font-size: 12.5px; font-weight: 600; color: var(--eco-ink); letter-spacing: 0.2px; text-transform: uppercase; }
  .ek-input-wrap { position: relative; display: flex; align-items: center; }
  .ek-icon { position: absolute; left: 14px; color: var(--eco-light); display: flex; align-items: center; pointer-events: none; }
  .ek-input-wrap input { width: 100%; padding: 13px 42px 13px 40px; border: 1.5px solid #d1e8da; border-radius: var(--radius); background: white; font-size: 14px; font-family: 'DM Sans', sans-serif; color: var(--eco-ink); outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
  .ek-input-wrap input::placeholder { color: #b0c4b8; }
  .ek-input-wrap input:focus { border-color: var(--eco-mid); box-shadow: 0 0 0 3px rgba(64,145,108,0.12); }
  .ek-input-wrap input:disabled { opacity: 0.6; cursor: not-allowed; }

  .ek-btn { margin-top: 4px; padding: 14px; background: var(--eco-green); color: white; border: none; border-radius: var(--radius); font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background 0.2s, transform 0.12s, box-shadow 0.2s; box-shadow: 0 4px 18px rgba(45,106,79,0.28); display: flex; align-items: center; justify-content: center; gap: 8px; min-height: 50px; width: 100%; }
  .ek-btn:hover:not(:disabled) { background: var(--eco-mid); transform: translateY(-1px); box-shadow: 0 6px 24px rgba(45,106,79,0.35); }
  .ek-btn:active:not(:disabled) { transform: translateY(0); }
  .ek-btn:disabled { opacity: 0.65; cursor: not-allowed; }

  .ek-btn--outline { background: transparent; color: var(--eco-green); border: 1.5px solid var(--eco-mid); box-shadow: none; }
  .ek-btn--outline:hover:not(:disabled) { background: var(--eco-pale); transform: translateY(-1px); box-shadow: none; }

  .ek-sent-state { display: flex; flex-direction: column; gap: 16px; }
  .ek-state-card { display: flex; align-items: center; gap: 16px; padding: 18px 20px; border-radius: var(--radius); border: 1.5px solid; }
  .ek-state-card--success { background: #f0faf4; border-color: #74c69d; color: var(--eco-dark); }
  .ek-state-card p { font-size: 14px; font-weight: 500; line-height: 1.4; }
  .ek-state-icon { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ek-state-icon--success { background: #d8f3dc; color: var(--eco-green); }
  .ek-sent-actions { display: flex; flex-direction: column; gap: 10px; }

  .ek-signup { font-size: 14px; color: var(--eco-muted); text-align: center; }
  .ek-signup a { color: var(--eco-green); font-weight: 600; text-decoration: none; }
  .ek-signup a:hover { text-decoration: underline; }

  .ek-right { flex: 1; background: linear-gradient(145deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%); position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; animation: fadeIn 0.8s ease both 0.2s; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .ek-right-icon { display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: rgba(255,255,255,0.25); }
  .ek-right-text { padding: 0 48px 52px; text-align: center; }
  .ek-right-text h2 { font-family: 'DM Serif Display', serif; font-size: clamp(22px, 2.5vw, 30px); color: white; line-height: 1.3; margin-bottom: 10px; }
  .ek-right-text p { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 28px; }
  .ek-features { display: flex; flex-direction: column; gap: 12px; text-align: left; }
  .ek-feature { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.75); font-size: 13.5px; }

  .ek-toast { position: fixed; top: 24px; left: 50%; transform: translateX(-50%); padding: 12px 24px; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; font-weight: 500; z-index: 9999; animation: toastIn 0.3s ease; box-shadow: 0 4px 20px rgba(0,0,0,0.15); white-space: nowrap; }
  .ek-toast--error { background: #dc2626; color: white; }
  .ek-toast--success { background: var(--eco-green); color: white; }
  @keyframes toastIn { from { opacity: 0; transform: translate(-50%, -10px); } to { opacity: 1; transform: translate(-50%, 0); } }

  .ek-back-btn { width: 192px; height: 56px; background: #fff; border: none; border-radius: 16px; position: relative; overflow: hidden; cursor: pointer; font-size: 20px; font-weight: 600; color: #000; box-shadow: 0 4px 15px rgba(0,0,0,.08); transition: transform .15s ease; }
  .ek-back-btn:active { transform: scale(.98); }
  .ek-back-slider { position: absolute; left: 4px; top: 4px; width: 48px; height: 48px; background: #40916c; border-radius: 12px; display: flex; align-items: center; justify-content: center; z-index: 2; transition: width .5s ease; }
  .ek-back-btn:hover .ek-back-slider { width: 184px; }
  .ek-back-text { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; transform: translateX(8px); position: relative; z-index: 1; }

  @media (max-width: 768px) { .ek-right { display: none; } .ek-left { max-width: 100%; padding: 40px 28px; } }
`