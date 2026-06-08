export const gamificacionCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  :root{
    --green-900:#1a3316; --green-800:#21491e; --green-700:#2a5c25;
    --green-600:#21491e; --green-500:#3b6b35; --green-300:#8fa88b;
    --bone:#f1f6f0; --white:#ffffff; --ink:#1a3316; --ink-2:#21491e;
    --muted:#556b52; --radius:24px;
    --shadow-sm:0 6px 18px rgba(33,73,30,.04);
    --shadow-md:0 12px 30px rgba(33,73,30,.08);
    --shadow-lg:0 20px 50px rgba(33,73,30,.12);
    font-family:'Outfit',sans-serif;
  }

  .gam-page{ width:100%; max-width:1400px; margin:0 auto; padding:20px; background:var(--bone); min-height:100vh; box-sizing:border-box; }

  /* ── Toast ── */
    .gam-toast{
    position:fixed; top:24px; right:24px; z-index:9999;
    padding:14px 22px; border-radius:16px; font-weight:600; font-size:14px;
    display:flex; align-items:center; gap:10px;
    box-shadow:0 8px 24px rgba(0,0,0,.15);
    animation: toastIn .3s cubic-bezier(0.16,1,0.3,1);
  }
  .gam-toast.ok  { background:#21491e; color:white; }
  .gam-toast.err { background:#c0392b; color:white; }
  @keyframes toastIn {
    from { transform: translateX(120%); opacity:0; }
    to   { transform: translateX(0);   opacity:1; }
  }

  .gam-header{ position:relative; overflow:hidden; background:linear-gradient(135deg,var(--green-900) 0%,var(--green-800) 45%,var(--green-700) 100%); border-radius:32px; padding:50px; margin-bottom:35px; box-shadow:var(--shadow-lg); }
  .gam-header::before{ content:''; position:absolute; width:500px; height:500px; background:radial-gradient(circle,rgba(214,228,211,.15),transparent 70%); top:-250px; right:-150px; }
  .gam-header h2{ color:white; font-size:42px; font-weight:800; margin-bottom:10px; }
  .gam-header p { color:rgba(255,255,255,.8); font-size:17px; }

  .gam-stats-row{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:30px; }
  .gam-skel-row { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:30px; }

  .gam-stat-card{ background:white; border-radius:28px; padding:28px; display:flex; flex-direction:column; align-items:center; box-shadow:var(--shadow-sm); transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s; }
  .gam-stat-card:hover{ transform:translateY(-6px); box-shadow:var(--shadow-md); }
  .gam-stat-icon{ width:60px; height:60px; border-radius:18px; display:flex; align-items:center; justify-content:center; font-size:24px; background:color-mix(in srgb,var(--c) 12%,transparent); color:var(--c); }
  .gam-stat-value{ margin-top:14px; font-size:34px; font-weight:800; color:var(--ink); }
  .gam-stat-label{ color:var(--muted); font-size:14px; }

  .gam-badges-wrap{ margin-bottom:25px; }
  .gam-section-label{ font-size:12px; letter-spacing:.15em; font-weight:800; color:var(--green-700); }
  .gam-badges-list{ display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }
  .gam-badge-chip{ border-radius:999px; padding:10px 16px; font-size:13px; font-weight:700; color:var(--bc); background:var(--bb); border:1px solid color-mix(in srgb,var(--bc) 25%,transparent); display:inline-flex; align-items:center; gap:6px; transition:transform .2s; }
  .gam-badge-chip:hover{ transform:scale(1.05); }

  .gam-prog-wrap{ background:white; border-radius:22px; padding:18px 22px; margin-bottom:30px; box-shadow:var(--shadow-sm); }
  .gam-prog-label{ display:flex; justify-content:space-between; margin-bottom:10px; font-weight:600; font-size:14px; color:var(--ink); }
  .gam-prog-count{ color:var(--green-600); font-weight:700; }
  .gam-prog-track{ height:12px; background:#e4ede2; border-radius:999px; overflow:hidden; }
  .gam-prog-fill{ height:100%; background:linear-gradient(90deg,var(--green-600),var(--green-500)); border-radius:999px; transition:width .5s cubic-bezier(.4,0,.2,1); }

  .gam-tabs{ display:flex; gap:10px; margin-bottom:30px; }
  .gam-tab{ border:none; background:white; padding:14px 24px; border-radius:16px; font-weight:600; cursor:pointer; transition:.3s cubic-bezier(.16,1,.3,1); box-shadow:var(--shadow-sm); color:var(--muted); display:flex; align-items:center; gap:8px; }
  .gam-tab:hover{ transform:translateY(-2px); color:var(--ink); }
  .gam-tab.active{ background:var(--green-600); color:white; box-shadow:0 8px 20px rgba(33,73,30,.25); }

  .gam-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:22px; }

  .gam-ch-card{ background:white; border-radius:28px; padding:24px; box-shadow:var(--shadow-sm); transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s,border-color .3s; display:flex; flex-direction:column; border:1px solid transparent; }
  .gam-ch-card:hover{ transform:translateY(-8px); box-shadow:var(--shadow-md); border-color:color-mix(in srgb,var(--brand) 20%,transparent); }
  .gam-ch-card.done{ opacity:.72; background:#f4faf3; }
  .gam-ch-top{ display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; }
  .gam-ch-icon{ width:50px; height:50px; border-radius:15px; display:flex; align-items:center; justify-content:center; background:var(--brand-bg); color:var(--brand); font-size:20px; }
  .gam-ch-pts{ font-size:13px; font-weight:700; color:var(--brand); background:var(--brand-bg); padding:6px 12px; border-radius:999px; }
  .gam-ch-card h4{ font-size:18px; font-weight:700; color:var(--ink); margin-bottom:10px; }
  .gam-ch-card p{ color:var(--muted); line-height:1.7; flex-grow:1; font-size:14px; }
  .gam-ch-howto{ margin-top:12px; display:flex; align-items:flex-start; gap:8px; background:var(--bone); padding:10px 14px; border-radius:12px; font-size:12px; color:var(--green-700); }
  .gam-ch-howto i{ margin-top:2px; }
  .gam-ch-btn{ margin-top:18px; width:100%; border:none; border-radius:14px; padding:13px; background:var(--brand); color:white; font-weight:700; cursor:pointer; transition:.2s ease; display:flex; align-items:center; justify-content:center; gap:8px; font-size:14px; }
  .gam-ch-btn:hover:not(:disabled){ opacity:.9; transform:scale(1.01); }
  .gam-ch-btn:disabled{ background:#d6e4d3; color:var(--green-700); cursor:not-allowed; }

  .gam-rank-list{ display:flex; flex-direction:column; gap:10px; background:white; padding:24px; border-radius:28px; box-shadow:var(--shadow-sm); }
  .gam-my-rank{ display:flex; align-items:center; gap:12px; background:rgba(33,73,30,.06); color:#21491e; padding:14px 20px; border-radius:16px; font-size:15px; margin-bottom:10px; border:1px dashed rgba(33,73,30,.2); }
  .gam-rank-header{ display:grid; grid-template-columns:60px 1fr 120px 100px; padding:10px 22px; font-size:12px; font-weight:800; color:var(--muted); letter-spacing:.05em; text-transform:uppercase; }
  .gam-rank-row{ background:var(--bone); border-radius:18px; padding:18px 22px; display:grid; grid-template-columns:60px 1fr 120px 100px; align-items:center; transition:.2s cubic-bezier(.16,1,.3,1); }
  .gam-rank-row:hover{ transform:translateX(5px); background:#e4ede2; }
  .gam-rank-row.top{ background:white; border:1px solid rgba(33,73,30,.06); box-shadow:var(--shadow-sm); }
  .gam-rank-row.me{ background:#e4ede2; border:2px solid var(--green-700); }
  .gam-rank-pos{ font-size:16px; font-weight:800; color:var(--ink); }
  .gam-rank-info{ display:flex; flex-direction:column; }
  .gam-rank-name{ font-weight:700; color:var(--ink); }
  .gam-rank-user{ color:var(--muted); font-size:13px; }
  .gam-rank-pts{ font-weight:800; color:var(--green-700); }
  .gam-rank-rc{ font-weight:600; color:var(--ink); }
  .gam-rank-you{ background:var(--green-600); color:white; padding:4px 10px; border-radius:999px; font-size:11px; font-weight:700; width:fit-content; margin-top:2px; }

  .gam-empty{ text-align:center; padding:40px; color:var(--muted); font-size:15px; }
  .gam-skel{ border-radius:20px; background:linear-gradient(90deg,#f1f6f0 25%,#d6e4d3 50%,#f1f6f0 75%); background-size:400% 100%; animation:shimmer 1.4s infinite; }
  @keyframes shimmer{ from{ background-position:100% 0; } to{ background-position:-100% 0; } }

  @media(max-width:1200px){ .gam-stats-row,.gam-skel-row{ grid-template-columns:repeat(2,1fr); } .gam-grid{ grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); } }
  @media(max-width:900px){ .gam-page{ padding:15px; } .gam-header{ padding:35px; } .gam-stats-row,.gam-skel-row{ grid-template-columns:repeat(2,1fr); gap:15px; } }
  @media(max-width:640px){ .gam-page{ padding:10px; } .gam-header{ padding:25px; } .gam-header h2{ font-size:28px; } .gam-header p{ font-size:15px; } .gam-stats-row,.gam-skel-row{ grid-template-columns:1fr; gap:12px; } .gam-grid{ grid-template-columns:1fr; } .gam-rank-row,.gam-rank-header{ grid-template-columns:50px 1fr 90px; padding:12px 16px; } .gam-rank-rc,.gam-rank-you{ display:none; } .gam-tabs{ flex-direction:column; } .gam-tab{ width:100%; justify-content:center; } }
`

export const KEY_REDIRECT = {
  detector:      '/dashboard/usuario/detector',
  detector_3:    '/dashboard/usuario/detector',
  foro_publicar: '/dashboard/usuario/foro',
  foro_comentar: '/dashboard/usuario/foro',
  impacto:       '/dashboard/usuario/impacto',
  mapa:          '/dashboard/usuario/mapa',
}
