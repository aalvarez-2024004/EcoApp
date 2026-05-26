export const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --eco-green: #2d6a4f; --eco-mid: #40916c; --eco-light: #74c69d;
    --eco-pale: #d8f3dc; --eco-dark: #1b4332; --eco-cream: #fafaf8;
    --eco-ink: #1a2e22; --eco-muted: #6b7c72; --radius: 14px;
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--eco-cream); }
  .ek-wrap { display: flex; min-height: 100vh; }
  .ek-left { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 48px 56px; max-width: 540px; animation: fadeSlideIn 0.6s ease both; }
  @keyframes fadeSlideIn { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
  .ek-brand { display:flex; align-items:center; gap:10px; margin-bottom:36px; }
  .ek-brand-name { font-family:'DM Serif Display',serif; font-size:20px; color:var(--eco-dark); }
  .ek-heading { margin-bottom:28px; }
  .ek-heading h1 { font-family:'DM Serif Display',serif; font-size:clamp(28px,3.5vw,40px); color:var(--eco-ink); line-height:1.2; margin-bottom:6px; }
  .ek-heading p { font-size:14px; color:var(--eco-muted); }
  .ek-form { display:flex; flex-direction:column; gap:15px; }
  .ek-row-fields { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .ek-field { display:flex; flex-direction:column; gap:5px; }
  .ek-field label { font-size:11.5px; font-weight:600; color:var(--eco-ink); text-transform:uppercase; letter-spacing:0.2px; }
  .ek-input-wrap { position:relative; display:flex; align-items:center; }
  .ek-icon { position:absolute; left:13px; color:var(--eco-light); display:flex; align-items:center; pointer-events:none; }
  .ek-input-wrap input { width:100%; padding:12px 38px 12px 38px; border:1.5px solid #d1e8da; border-radius:var(--radius); background:white; font-size:13.5px; font-family:'DM Sans',sans-serif; color:var(--eco-ink); outline:none; transition:border-color 0.2s, box-shadow 0.2s; }
  .ek-input-wrap input::placeholder { color:#b0c4b8; }
  .ek-input-wrap input:focus { border-color:var(--eco-mid); box-shadow:0 0 0 3px rgba(64,145,108,0.12); }
  .ek-input-wrap input:disabled { opacity:0.6; cursor:not-allowed; }
  .ek-eye { position:absolute; right:11px; background:none; border:none; cursor:pointer; color:var(--eco-muted); display:flex; align-items:center; padding:4px; border-radius:6px; transition:color 0.15s; }
  .ek-eye:hover { color:var(--eco-green); }
  .ek-match-icon { position:absolute; right:36px; display:flex; align-items:center; }
  .ek-strength { display:flex; align-items:center; gap:8px; margin-top:4px; }
  .ek-strength-bar { display:flex; gap:4px; flex:1; }
  .ek-strength-seg { height:3px; flex:1; border-radius:99px; transition:background 0.3s; }
  .ek-strength span { font-size:11px; font-weight:600; white-space:nowrap; }
  .ek-btn { margin-top:4px; padding:13px; background:var(--eco-green); color:white; border:none; border-radius:var(--radius); font-size:15px; font-weight:600; font-family:'DM Sans',sans-serif; cursor:pointer; transition:background 0.2s, transform 0.12s, box-shadow 0.2s; box-shadow:0 4px 18px rgba(45,106,79,0.28); display:flex; align-items:center; justify-content:center; gap:8px; min-height:48px; }
  .ek-btn:hover:not(:disabled) { background:var(--eco-mid); transform:translateY(-1px); box-shadow:0 6px 24px rgba(45,106,79,0.35); }
  .ek-btn:disabled { opacity:0.65; cursor:not-allowed; }
  .ek-signup { margin-top:22px; font-size:14px; color:var(--eco-muted); text-align:center; }
  .ek-signup a { color:var(--eco-green); font-weight:600; text-decoration:none; }
  .ek-signup a:hover { text-decoration:underline; }
  .ek-right { flex:1; background:linear-gradient(145deg,#1b4332 0%,#2d6a4f 50%,#40916c 100%); display:flex; align-items:center; justify-content:center; padding:60px; animation:fadeIn 0.8s ease both 0.2s; }
  @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
  .ek-right-text { text-align:center; max-width:360px; }
  .ek-right-text h2 { font-family:'DM Serif Display',serif; font-size:clamp(22px,2.8vw,34px); color:white; line-height:1.3; margin-bottom:14px; }
  .ek-right-text p { font-size:14px; color:rgba(255,255,255,0.65); line-height:1.7; margin-bottom:32px; }
  .ek-features { display:flex; flex-direction:column; gap:12px; text-align:left; }
  .ek-feature { display:flex; align-items:center; gap:10px; }
  .ek-feature span { font-size:13.5px; color:rgba(255,255,255,0.8); }
  .ek-toast { position:fixed; top:24px; left:50%; transform:translateX(-50%); padding:12px 24px; border-radius:10px; font-size:14px; font-family:'DM Sans',sans-serif; font-weight:500; z-index:9999; animation:toastIn 0.3s ease; box-shadow:0 4px 20px rgba(0,0,0,0.15); white-space:nowrap; }
  .ek-toast--error { background:#dc2626; color:white; }
  .ek-toast--success { background:var(--eco-green); color:white; }
  @keyframes toastIn { from{opacity:0;transform:translate(-50%,-10px);} to{opacity:1;transform:translate(-50%,0);} }
  @media (max-width:768px) { .ek-right { display:none; } .ek-left { max-width:100%; padding:36px 24px; } .ek-row-fields { grid-template-columns:1fr; } }
`