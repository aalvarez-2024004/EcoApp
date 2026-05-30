export const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

/* ─── KEYFRAMES ─────────────────────────────────────────────────────────── */
@keyframes gami-fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes gami-popIn {
  0%   { opacity: 0; transform: scale(0.82); }
  70%  { transform: scale(1.04); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes gami-shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}
@keyframes gami-barFill {
  from { width: 0%; }
}
@keyframes gami-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(89, 177, 48, 0.35); }
  50%       { box-shadow: 0 0 0 10px rgba(89, 177, 48, 0); }
}
@keyframes gami-orbit {
  from { transform: rotate(0deg)   translateX(28px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
}
@keyframes gami-countUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes gami-glowBorder {
  0%,100% { border-color: rgba(89,177,48,0.18); }
  50%     { border-color: rgba(89,177,48,0.55); }
}
@keyframes gami-floatBadge {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-5px); }
}

/* ─── CONTENEDOR PRINCIPAL ──────────────────────────────────────────────── */
.gami-page {
  padding: 52px 56px;
  font-family: 'Outfit', sans-serif;
  color: var(--ink);
  animation: gami-fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
}

/* ─── HERO BANNER ───────────────────────────────────────────────────────── */
.gami-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(130deg, #0d2e1c 0%, #1a4d2e 55%, #246b3e 100%);
  border-radius: 32px;
  padding: 52px 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 40px;
}
.gami-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(89,177,48,0.12) 0%, transparent 55%),
    radial-gradient(circle at 80% 20%, rgba(122,228,76,0.08) 0%, transparent 45%);
}
.gami-hero-deco {
  position: absolute;
  right: -30px; top: -30px;
  width: 260px; height: 260px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.04);
}
.gami-hero-deco::after {
  content: '';
  position: absolute;
  inset: 28px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.05);
}
.gami-hero-left {
  position: relative;
  z-index: 1;
}
.gami-hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(89,177,48,0.18);
  border: 1px solid rgba(89,177,48,0.3);
  border-radius: 100px;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #7ae44c;
  margin-bottom: 18px;
}
.gami-hero-eyebrow i { font-size: 13px; }
.gami-hero h1 {
  font-family: 'Syne', sans-serif;
  font-size: 38px;
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  margin: 0 0 14px;
  letter-spacing: -0.5px;
}
.gami-hero h1 span {
  color: #7ae44c;
}
.gami-hero-sub {
  font-size: 15.5px;
  color: rgba(255,255,255,0.62);
  margin: 0;
  max-width: 440px;
  line-height: 1.6;
}
.gami-hero-right {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.gami-hero-orb {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: rgba(89,177,48,0.12);
  border: 1px solid rgba(89,177,48,0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: gami-pulse 2.6s ease-in-out infinite;
}
.gami-hero-orb-num {
  font-family: 'Syne', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: #7ae44c;
  line-height: 1;
  animation: gami-countUp 0.7s ease both;
}
.gami-hero-orb-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  margin-top: 4px;
}

/* ─── GRID DE STATS ─────────────────────────────────────────────────────── */
.gami-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}
.gami-stat-card {
  background: #fff;
  border: 1px solid rgba(36,107,62,0.07);
  border-radius: 24px;
  padding: 28px 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
  animation: gami-popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
}
.gami-stat-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 24px 48px rgba(13,46,28,0.08);
}
.gami-stat-card:nth-child(1) { animation-delay: 0.05s; }
.gami-stat-card:nth-child(2) { animation-delay: 0.12s; }
.gami-stat-card:nth-child(3) { animation-delay: 0.19s; }
.gami-stat-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--gami-accent, #59B130);
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 24px 24px 0 0;
}
.gami-stat-card:hover::after { opacity: 1; }
.gami-stat-icon {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 24px;
  flex-shrink: 0;
  background: var(--gami-icon-bg, rgba(89,177,48,0.1));
  color: var(--gami-accent, #59B130);
  border: 1px solid rgba(36,107,62,0.06);
}
.gami-stat-body { flex: 1; }
.gami-stat-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #617364;
  margin: 0 0 5px;
}
.gami-stat-value {
  font-family: 'Syne', sans-serif;
  font-size: 30px;
  font-weight: 800;
  color: #0b130e;
  line-height: 1;
  margin: 0 0 3px;
}
.gami-stat-caption {
  font-size: 12.5px;
  color: #617364;
  margin: 0;
}

/* ─── LAYOUT DE 2 COLUMNAS ──────────────────────────────────────────────── */
.gami-two-col {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  margin-bottom: 40px;
  align-items: start;
}

/* ─── LEADERBOARD ───────────────────────────────────────────────────────── */
.gami-leaderboard {
  background: #fff;
  border: 1px solid rgba(36,107,62,0.07);
  border-radius: 28px;
  overflow: hidden;
  animation: gami-fadeUp 0.5s ease 0.2s both;
}
.gami-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 26px 30px 20px;
  border-bottom: 1px solid rgba(36,107,62,0.06);
}
.gami-section-title {
  font-family: 'Syne', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #0b130e;
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0;
}
.gami-section-title i { color: #59B130; font-size: 18px; }
.gami-section-badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .05em;
  background: rgba(89,177,48,0.1);
  color: #246b3e;
  border: 1px solid rgba(89,177,48,0.2);
  border-radius: 100px;
  padding: 4px 12px;
}
.gami-lb-list { padding: 10px 0; }
.gami-lb-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 30px;
  transition: background 0.2s;
  position: relative;
}
.gami-lb-row:hover { background: rgba(89,177,48,0.04); }
.gami-lb-row.is-me {
  background: rgba(89,177,48,0.07);
  animation: gami-glowBorder 2.5s ease-in-out infinite;
  border-left: 3px solid #59B130;
}
.gami-lb-pos {
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #617364;
  width: 22px;
  text-align: center;
  flex-shrink: 0;
}
.gami-lb-pos.top1 { color: #c9960a; }
.gami-lb-pos.top2 { color: #808080; }
.gami-lb-pos.top3 { color: #8c5e1e; }
.gami-lb-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #246b3e, #59B130);
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  border: 2px solid rgba(89,177,48,0.2);
}
.gami-lb-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.gami-lb-info { flex: 1; min-width: 0; }
.gami-lb-name {
  font-size: 14px;
  font-weight: 600;
  color: #0b130e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0 1px;
}
.gami-lb-username {
  font-size: 12px;
  color: #617364;
  margin: 0;
}
.gami-lb-pts {
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #246b3e;
  flex-shrink: 0;
}
.gami-lb-medal {
  font-size: 18px;
  flex-shrink: 0;
  width: 22px;
  text-align: center;
}
.gami-lb-empty {
  text-align: center;
  padding: 40px 30px;
  color: #617364;
  font-size: 14px;
}
.gami-lb-shimmer {
  padding: 10px 30px;
}
.gami-lb-shimmer-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
}
.gami-lb-shimmer-circle {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 600px 100%;
  animation: gami-shimmer 1.4s ease-in-out infinite;
  flex-shrink: 0;
}
.gami-lb-shimmer-lines { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.gami-lb-shimmer-line {
  height: 10px;
  border-radius: 6px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 600px 100%;
  animation: gami-shimmer 1.4s ease-in-out infinite;
}
.gami-lb-shimmer-line.short { width: 60%; }

/* ─── NIVEL / PROGRESO ───────────────────────────────────────────────────── */
.gami-nivel-card {
  background: #fff;
  border: 1px solid rgba(36,107,62,0.07);
  border-radius: 28px;
  overflow: hidden;
  animation: gami-fadeUp 0.5s ease 0.25s both;
}
.gami-nivel-body { padding: 26px 30px; }
.gami-nivel-arc-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px 20px;
}
.gami-nivel-arc {
  position: relative;
  width: 150px;
  height: 150px;
}
.gami-nivel-arc svg { width: 150px; height: 150px; transform: rotate(-90deg); }
.gami-nivel-arc-bg { fill: none; stroke: rgba(36,107,62,0.08); stroke-width: 10; }
.gami-nivel-arc-fg {
  fill: none;
  stroke: url(#gamiGrad);
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1);
}
.gami-nivel-arc-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.gami-nivel-arc-num {
  font-family: 'Syne', sans-serif;
  font-size: 30px;
  font-weight: 800;
  color: #0b130e;
  line-height: 1;
}
.gami-nivel-arc-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #617364;
  margin-top: 2px;
}
.gami-nivel-name {
  font-family: 'Syne', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #0b130e;
  margin: 16px 0 4px;
  text-align: center;
}
.gami-nivel-progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
  color: #617364;
  font-weight: 600;
  margin: 0 0 8px;
}
.gami-nivel-bar-wrap {
  width: 100%;
  height: 8px;
  background: rgba(36,107,62,0.08);
  border-radius: 100px;
  overflow: hidden;
}
.gami-nivel-bar {
  height: 100%;
  border-radius: 100px;
  background: linear-gradient(90deg, #3d9850, #7ae44c);
  animation: gami-barFill 1.2s cubic-bezier(0.22,1,0.36,1) both;
}

/* ─── INSIGNIAS ─────────────────────────────────────────────────────────── */
.gami-badges-section {
  background: #fff;
  border: 1px solid rgba(36,107,62,0.07);
  border-radius: 28px;
  overflow: hidden;
  margin-bottom: 40px;
  animation: gami-fadeUp 0.5s ease 0.3s both;
}
.gami-badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  padding: 24px 30px 30px;
}
.gami-badge-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: var(--bone, #f4f7f4);
  border: 1px solid rgba(36,107,62,0.06);
  border-radius: 20px;
  padding: 20px 14px 16px;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s;
  cursor: default;
}
.gami-badge-card.unlocked:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 20px 40px rgba(13,46,28,0.09);
}
.gami-badge-card.locked {
  opacity: 0.45;
  filter: grayscale(1);
}
.gami-badge-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 26px;
  background: var(--badge-bg, rgba(89,177,48,0.1));
  color: var(--badge-color, #246b3e);
  border: 2px solid var(--badge-border, rgba(89,177,48,0.2));
  position: relative;
}
.gami-badge-card.unlocked .gami-badge-icon-wrap {
  animation: gami-floatBadge 3.5s ease-in-out infinite;
}
.gami-badge-dot {
  position: absolute;
  top: -2px; right: -2px;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: #59B130;
  border: 2px solid #fff;
}
.gami-badge-name {
  font-size: 12.5px;
  font-weight: 700;
  color: #0b130e;
  text-align: center;
  line-height: 1.3;
  margin: 0;
}
.gami-badge-desc {
  font-size: 11px;
  color: #617364;
  text-align: center;
  margin: 0;
  line-height: 1.4;
}
.gami-badge-lock-icon {
  position: absolute;
  top: 12px; right: 12px;
  font-size: 12px;
  color: #617364;
}

/* ─── RETOS ──────────────────────────────────────────────────────────────── */
.gami-challenges-section {
  background: #fff;
  border: 1px solid rgba(36,107,62,0.07);
  border-radius: 28px;
  overflow: hidden;
  animation: gami-fadeUp 0.5s ease 0.35s both;
}
.gami-challenges-list {
  padding: 10px 30px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.gami-challenge-card {
  border: 1px solid rgba(36,107,62,0.07);
  border-radius: 18px;
  padding: 20px 22px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.gami-challenge-card:hover {
  border-color: rgba(89,177,48,0.25);
  box-shadow: 0 8px 24px rgba(13,46,28,0.05);
}
.gami-challenge-card.completed {
  background: rgba(89,177,48,0.04);
  border-color: rgba(89,177,48,0.18);
}
.gami-challenge-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 20px;
  flex-shrink: 0;
  background: var(--ch-bg, rgba(89,177,48,0.1));
  color: var(--ch-color, #246b3e);
}
.gami-challenge-body { flex: 1; min-width: 0; }
.gami-challenge-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}
.gami-challenge-name {
  font-size: 14.5px;
  font-weight: 700;
  color: #0b130e;
  margin: 0 0 3px;
}
.gami-challenge-desc {
  font-size: 12.5px;
  color: #617364;
  margin: 0;
}
.gami-challenge-reward {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(89,177,48,0.1);
  border: 1px solid rgba(89,177,48,0.18);
  border-radius: 100px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #246b3e;
  white-space: nowrap;
}
.gami-challenge-reward i { font-size: 13px; }
.gami-progress-track {
  height: 6px;
  background: rgba(36,107,62,0.08);
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 6px;
}
.gami-progress-fill {
  height: 100%;
  border-radius: 100px;
  background: linear-gradient(90deg, #3d9850, #7ae44c);
  animation: gami-barFill 1s cubic-bezier(0.22,1,0.36,1) both;
}
.gami-challenge-card.completed .gami-progress-fill {
  background: linear-gradient(90deg, #59B130, #7ae44c);
}
.gami-progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #617364;
  font-weight: 600;
}
.gami-challenge-done-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  color: #246b3e;
  background: rgba(89,177,48,0.12);
  border-radius: 100px;
  padding: 3px 10px;
  margin-top: 8px;
}
.gami-challenge-done-chip i { font-size: 12px; }

.gami-empty {
  text-align: center;
  padding: 48px 30px;
}
.gami-empty i {
  font-size: 42px;
  color: rgba(36,107,62,0.2);
  display: block;
  margin-bottom: 12px;
}
.gami-empty p {
  font-size: 14px;
  color: #617364;
  margin: 0;
}
.gami-error-banner {
  background: rgba(220,53,69,0.06);
  border: 1px solid rgba(220,53,69,0.15);
  border-radius: 14px;
  padding: 16px 22px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  font-size: 14px;
  color: #842029;
}
.gami-error-banner i { font-size: 18px; flex-shrink: 0; }

/* ─── SKELETON GENÉRICO ─────────────────────────────────────────────────── */
.gami-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 600px 100%;
  animation: gami-shimmer 1.4s ease-in-out infinite;
  border-radius: 12px;
}

/* ─── RESPONSIVE ────────────────────────────────────────────────────────── */
@media (max-width: 1100px) {
  .gami-two-col { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  .gami-page { padding: 32px 24px; }
  .gami-hero { padding: 36px 32px; flex-direction: column; text-align: center; }
  .gami-hero-sub { max-width: 100%; }
  .gami-stats-row { grid-template-columns: 1fr; gap: 14px; }
  .gami-badge-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
}
`