export const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

    *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    }

    :root{

    --green-900:#1f5c2e;
    --green-800:#2d7a3d;
    --green-700:#3d9850;
    --green-600:#59B130;

    --bone:#f6f8f3;
    --white:#fff;

    --ink:#112117;
    --muted:#708171;

    --card-border:rgba(89,177,48,.12);

    --font-main:'Outfit',sans-serif;
    --font-display:'Syne',sans-serif;
    }

    body{
    font-family:var(--font-main);
    background:var(--bone);
    }

    /* LAYOUT */

    .db-layout{
    display:flex;
    min-height:100vh;
    }

    /* SIDEBAR */

    .db-sidebar{

    width:300px;

    padding:28px;

    background:
    linear-gradient(
        180deg,
        #1f5c2e,
        #2d7a3d
    );

    color:white;

    display:flex;
    flex-direction:column;
    }

    .db-logo{
    display:flex;
    align-items:center;
    gap:14px;

    margin-bottom:54px;
    }

    .db-logo-icon{

    width:58px;
    height:58px;

    border-radius:18px;

    background:
    linear-gradient(
        135deg,
        #7be956,
        #59B130
    );
    }

    .db-logo h2{

    font-family:var(--font-display);

    font-size:30px;
    }

    .db-logo p{
    opacity:.7;
    font-size:13px;
    }

    .db-nav{
    display:flex;
    flex-direction:column;
    gap:10px;
    }

    .db-nav-item{

    height:58px;

    border:none;

    border-radius:18px;

    background:transparent;

    color:white;

    font-size:15px;
    font-weight:600;

    cursor:pointer;

    transition:.25s;
    }

    .db-nav-item:hover{
    background:rgba(255,255,255,.08);
    }

    .db-nav-item.active{

    background:rgba(255,255,255,.12);

    backdrop-filter:blur(10px);
    }

    .db-sidebar-card{

    margin-top:auto;

    background:rgba(255,255,255,.08);

    border:1px solid rgba(255,255,255,.1);

    border-radius:28px;

    padding:24px;
    }

    .db-sidebar-card h4{
    opacity:.7;
    margin-bottom:10px;
    }

    .db-sidebar-card strong{
    font-size:28px;
    }

    .db-progress{

    height:10px;

    border-radius:999px;

    background:rgba(255,255,255,.1);

    margin:18px 0;

    overflow:hidden;
    }

    .db-progress-bar{

    width:75%;

    height:100%;

    background:
    linear-gradient(
        90deg,
        #7be956,
        #59B130
    );
    }

    /* MAIN */

    .db-main{
    flex:1;

    padding:40px;
    }

    .db-topbar{

    display:flex;
    justify-content:space-between;
    align-items:center;

    margin-bottom:40px;
    }

    .db-topbar h1{

    font-family:var(--font-display);

    font-size:58px;

    line-height:.95;

    color:var(--ink);

    margin-bottom:12px;
    }

    .db-topbar p{
    color:var(--muted);
    }

    .db-user{

    display:flex;
    align-items:center;
    gap:14px;

    background:white;

    padding:14px 18px;

    border-radius:24px;

    border:1px solid var(--card-border);
    }

    .db-avatar{

    width:54px;
    height:54px;

    border-radius:50%;

    background:
    linear-gradient(
        135deg,
        #59B130,
        #2d7a3d
    );
    }

    /* HERO */

    .db-hero{

    background:
    linear-gradient(
        135deg,
        #1f5c2e,
        #2d7a3d
    );

    border-radius:36px;

    padding:42px;

    color:white;

    display:flex;
    justify-content:space-between;
    align-items:center;

    margin-bottom:32px;
    }

    .db-badge{

    display:inline-flex;

    padding:10px 16px;

    border-radius:999px;

    background:rgba(255,255,255,.1);

    margin-bottom:20px;

    font-size:13px;
    }

    .db-hero h2{

    font-family:var(--font-display);

    font-size:48px;

    line-height:1;

    max-width:620px;

    margin-bottom:18px;
    }

    .db-hero p{

    max-width:520px;

    line-height:1.7;

    opacity:.8;

    margin-bottom:28px;
    }

    .db-scan-btn{

    height:58px;

    padding:0 30px;

    border:none;

    border-radius:18px;

    background:white;

    color:#1f5c2e;

    font-size:15px;
    font-weight:700;

    cursor:pointer;
    }

    .db-hero-visual{

    font-size:140px;

    opacity:.15;
    }

    /* STATS */

    .db-stats{

    display:grid;

    grid-template-columns:
    repeat(auto-fit,minmax(220px,1fr));

    gap:20px;

    margin-bottom:28px;
    }

    .db-stat-card{

    background:white;

    border-radius:28px;

    padding:28px;

    border:1px solid var(--card-border);
    }

    .db-stat-card p{
    color:var(--muted);
    }

    .db-stat-card h3{

    font-size:42px;

    margin:12px 0;

    color:var(--ink);
    }

    .db-stat-card span{
    color:#59B130;
    font-weight:600;
    }

    /* GRID */

    .db-grid{

    display:grid;

    grid-template-columns:
    repeat(auto-fit,minmax(320px,1fr));

    gap:24px;
    }

    .db-card{

    background:white;

    border-radius:32px;

    padding:30px;

    border:1px solid var(--card-border);
    }

    .db-card-header{

    margin-bottom:24px;
    }

    .db-card-header h3{

    font-family:var(--font-display);

    font-size:32px;

    color:var(--ink);
    }

    .db-history{

    display:flex;
    flex-direction:column;
    gap:14px;
    }

    .db-history-item{

    padding:16px 18px;

    border-radius:18px;

    background:#f5f8f3;

    color:var(--ink);
    }

    .db-badges{

    display:flex;
    flex-direction:column;
    gap:14px;
    }

    .db-badge-item{

    padding:16px 18px;

    border-radius:18px;

    background:
    linear-gradient(
        135deg,
        #efffe5,
        #f6fff0
    );

    font-weight:600;
    }

    .db-map-placeholder{

    height:220px;

    border-radius:24px;

    background:
    linear-gradient(
        135deg,
        #efffe5,
        #f4fff1
    );

    display:flex;
    align-items:center;
    justify-content:center;

    color:#2d7a3d;

    font-weight:700;
    }

    /* RESPONSIVE */

    @media(max-width:1000px){

    .db-layout{
        flex-direction:column;
    }

    .db-sidebar{
        width:100%;
    }

    .db-topbar{
        flex-direction:column;
        align-items:flex-start;
        gap:24px;
    }

    .db-hero{
        flex-direction:column;
        align-items:flex-start;
        gap:30px;
    }

    }
`