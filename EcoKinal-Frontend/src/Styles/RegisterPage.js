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
  }

  .ek-right-icon {
    width: 100px;
    height: 100px;
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
  .ek-logo {
    width: 180px;
    height: auto;
    object-fit: contain;

    transition:
      transform .25s ease,
      opacity .25s ease;
  }

  .ek-logo:hover {
    transform: translateY(-2px);
    opacity: .92;
  }
  .ek-wrap { display: flex; min-height: 100vh; }
  .ek-left { 
    flex: 1; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    padding: 48px 56px; 
    max-width: 540px; 
    animation: fadeSlideIn 0.6s ease both; 
    background:
    radial-gradient(circle at top left, rgba(89,177,48,0.08), transparent 28%),
    var(--bone);
    position: relative;
  }
  @keyframes fadeSlideIn { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
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
  .ek-heading { margin-bottom:28px; }
  .ek-heading h1 { 
    font-family: var(--font-display);
    font-size:clamp(28px,3.5vw,40px); 
    color: var(--ink);
    letter-spacing: -0.05em;
    line-height: .95;
    margin-bottom:6px; 
  }
  .ek-heading p { 
    font-family: var(--font-main);
    font-size:14px; 
    color: var(--muted);
  }
  .ek-form { display:flex; flex-direction:column; gap:15px; }
  .ek-row-fields { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .ek-field { display:flex; flex-direction:column; gap:5px; }
  .ek-field label { 
    font-family: var(--font-main);
    font-size:11.5px; 
    font-weight: 700; 
    color: var(--ink); 
    text-transform:uppercase; 
    letter-spacing: .03em;
  }
  .ek-input-wrap { position:relative; display:flex; align-items:center; }
  .ek-icon { position:absolute; left:13px; color:var(--eco-light); display:flex; align-items:center; pointer-events:none; }
  .ek-input-wrap input { 
    font-family: var(--font-main);
    width:100%; padding:12px 38px 12px 38px; 
    border: 1px solid rgba(89,177,48,.14);
    border-radius: 16px;
    background: rgba(255,255,255,.75);
    backdrop-filter: blur(8px);
    font-family:'Outfit', sans-serif; 
    color:var(--eco-ink); outline:none; 
    transition:
      border-color .25s ease,
      box-shadow .25s ease,
      transform .2s ease;
    box-shadow 0.2s; 
  }
  .ek-input-wrap input::placeholder { color:#b0c4b8; }
  .ek-input-wrap input:focus { 
    border-color: var(--green-500); 
    box-shadow:
      0 0 0 4px rgba(89,177,48,.12),
      0 10px 24px rgba(89,177,48,.10);
    transform: translateY(-1px);
  }
  .ek-input-wrap input:disabled { opacity:0.6; cursor:not-allowed; }
  .ek-eye { position:absolute; right:11px; background:none; border:none; cursor:pointer; color:var(--eco-muted); display:flex; align-items:center; padding:4px; border-radius:6px; transition:color 0.15s; }
  .ek-eye:hover { color:var(--eco-green); }
  .ek-match-icon { position:absolute; right:36px; display:flex; align-items:center; }
  .ek-strength { display:flex; align-items:center; gap:8px; margin-top:4px; }
  .ek-strength-bar { display:flex; gap:4px; flex:1; }
  .ek-strength-seg { height:3px; flex:1; border-radius:99px; transition:background 0.3s; }
  .ek-strength span { font-size:11px; font-weight:600; white-space:nowrap; }
  .ek-btn { 
    margin-top:4px; 
    padding:13px; 
    background:
      linear-gradient(
        135deg,
        var(--green-700),
        var(--green-600)
      );
    color:white; border:none; 
    border-radius: 18px;
    font-family: var(--font-main);
    font-weight: 700; 
    cursor:pointer; transition:background 0.2s, transform 0.12s, box-shadow 0.2s; 
    box-shadow: 0 14px 30px rgba(89,177,48,.20);
    display:flex; 
    align-items:center; 
    justify-content:center; 
    gap:8px; min-height:48px;
    transition:
      transform .22s ease,
      box-shadow .25s ease;
  }
  .ek-btn:hover {
    transform: translateY(-2px);
    box-shadow:
      0 18px 40px rgba(89,177,48,.28);
  }
  .ek-btn:hover:not(:disabled) { background:var(--green-600); transform:translateY(-1px); box-shadow:0 6px 24px rgba(45,106,79,0.35); }
  .ek-btn:disabled { opacity:0.65; cursor:not-allowed; }
  .ek-signup { margin-top:22px; font-size:14px; color:var(--eco-muted); text-align:center; }
  .ek-signup a { color:var(--eco-green); font-weight:600; text-decoration:none; }
  .ek-signup a:hover { text-decoration:underline; }
  .ek-right { 
    flex:1; 
    background:
      linear-gradient(
        135deg,
        #1f5c2e 0%,
        #2d7a3d 45%,
        #3d9850 100%
      ); 
    position: relative;
    overflow: hidden;
    display:flex; align-items:center; 
    justify-content:center; padding:60px; 
    animation:fadeIn 0.8s ease both 0.2s; 
  }
  .ek-right::before {
    content: '';
    position: absolute;
    width: 700px;
    height: 700px;
    top: -220px;
    right: -180px;
    border-radius: 50%;
    background:
      radial-gradient(circle, rgba(255,255,255,.10), transparent 70%);
  }
  @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
  .ek-right-text { text-align:center; max-width:360px; }
  .ek-right-text h2 { 
    font-family: var(--font-display);
    font-size:clamp(22px,2.8vw,34px); 
    color:white; line-height:1.3; 
    margin-bottom:14px; 
    letter-spacing: -0.05em;
  }
  .ek-right-text p {
    font-family: var(--font-main);
    font-size:14px; 
    color: rgba(255,255,255,.72); 
    line-height:1.7; 
    margin-bottom:32px; 
  }
  .ek-features { display:flex; flex-direction:column; gap:12px; text-align:left; }
  .ek-feature {
    backdrop-filter: blur(10px);
    border-radius: 18px;
    display:flex; 
    align-items:center; 
    gap:10px; 
  }
  .ek-feature span { font-size:13.5px; color:rgba(255,255,255,0.8); }
  .ek-toast { position:fixed; top:24px; left:50%; transform:translateX(-50%); padding:12px 24px; border-radius:10px; font-size:14px; font-family:'Outfit', sans-serif; font-weight:500; z-index:9999; animation:toastIn 0.3s ease; box-shadow:0 4px 20px rgba(0,0,0,0.15); white-space:nowrap; }
  .ek-toast--error { background:#dc2626; color:white; }
  .ek-toast--success { background:var(--eco-green); color:white; }
  @keyframes toastIn { from{opacity:0;transform:translate(-50%,-10px);} to{opacity:1;transform:translate(-50%,0);} }
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
  .ek-back-btn:active { transform: scale(.98); }
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
  .ek-back-btn:hover .ek-back-slider { width: 184px; }
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

  /* ── Upload de imagen de perfil ── */
  .ek-upload-area {
    margin-top: 28px;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 28px;
    padding: 28px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    transition:
      transform .25s ease,
      background .25s ease;
    background: rgba(255,255,255,.08);
    backdrop-filter: blur(14px);
  }
  .ek-upload-area:hover {
    transform: translateY(-3px);
    border-color: rgba(255,255,255,0.75);
    background: rgba(255,255,255,.12);
  }
  .ek-upload-avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ek-upload-avatar--preview {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255,255,255,0.6);
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }
  .ek-upload-label {
    color: white;
    font-weight: 600;
    margin: 0;
    font-size: 14px;
    text-align: center;
  }
  .ek-upload-hint {
    color: rgba(255,255,255,0.55);
    font-size: 12px;
    margin-top: 4px;
    text-align: center;
  }
  .ek-upload-filename {
    margin-top: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #b7e4c7;
    font-size: 13px;
  }
  .ek-upload-remove {
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255,255,255,0.5);
    font-size: 18px;
    line-height: 1;
    padding: 0 2px;
    transition: color 0.15s;
  }
  .ek-upload-remove:hover { color: #ef4444; }

  @media (max-width:768px) { .ek-right { display:none; } .ek-left { max-width:100%; padding:36px 24px; } .ek-row-fields { grid-template-columns:1fr; } }
`