export const PARTICLES = Array.from({ length: 20 })

export const PARTICLE_STYLES = [
  { '--x': 10,  '--y': 25,  '--size': 0.4, '--alpha': 0.9, '--duration': 1.4, '--delay': 0.2 },
  { '--x': 20,  '--y': 60,  '--size': 0.3, '--alpha': 0.7, '--duration': 1.6, '--delay': 0.5 },
  { '--x': 35,  '--y': 15,  '--size': 0.5, '--alpha': 0.8, '--duration': 1.2, '--delay': 0.1 },
  { '--x': 50,  '--y': 80,  '--size': 0.3, '--alpha': 0.6, '--duration': 1.8, '--delay': 0.7 },
  { '--x': 60,  '--y': 30,  '--size': 0.4, '--alpha': 0.9, '--duration': 1.3, '--delay': 0.3 },
  { '--x': 75,  '--y': 70,  '--size': 0.5, '--alpha': 0.7, '--duration': 1.5, '--delay': 0.6 },
  { '--x': 85,  '--y': 20,  '--size': 0.3, '--alpha': 0.8, '--duration': 1.7, '--delay': 0.4 },
  { '--x': 90,  '--y': 55,  '--size': 0.4, '--alpha': 0.6, '--duration': 1.1, '--delay': 0.8 },
  { '--x': 15,  '--y': 85,  '--size': 0.3, '--alpha': 0.9, '--duration': 1.6, '--delay': 0.2 },
  { '--x': 45,  '--y': 45,  '--size': 0.5, '--alpha': 0.7, '--duration': 1.4, '--delay': 0.5 },
  { '--x': 5,   '--y': 50,  '--size': 0.3, '--alpha': 0.8, '--duration': 1.9, '--delay': 0.3 },
  { '--x': 30,  '--y': 90,  '--size': 0.4, '--alpha': 0.6, '--duration': 1.2, '--delay': 0.7 },
  { '--x': 55,  '--y': 10,  '--size': 0.3, '--alpha': 0.9, '--duration': 1.5, '--delay': 0.1 },
  { '--x': 70,  '--y': 50,  '--size': 0.5, '--alpha': 0.7, '--duration': 1.3, '--delay': 0.6 },
  { '--x': 80,  '--y': 85,  '--size': 0.3, '--alpha': 0.8, '--duration': 1.6, '--delay': 0.4 },
  { '--x': 95,  '--y': 35,  '--size': 0.4, '--alpha': 0.6, '--duration': 1.8, '--delay': 0.2 },
  { '--x': 25,  '--y': 40,  '--size': 0.3, '--alpha': 0.9, '--duration': 1.1, '--delay': 0.8 },
  { '--x': 65,  '--y': 65,  '--size': 0.5, '--alpha': 0.7, '--duration': 1.7, '--delay': 0.5 },
  { '--x': 40,  '--y': 75,  '--size': 0.3, '--alpha': 0.8, '--duration': 1.4, '--delay': 0.3 },
  { '--x': 88,  '--y': 10,  '--size': 0.4, '--alpha': 0.6, '--duration': 1.6, '--delay': 0.7 },
]

export const SPARKLE_CSS = `
  .sparkle-eco-wrap {
    --spark: 1.8s;
    --transition: 0.3s;
    --cut: 0.1em;
    --eco-dark: #1b3c1a;
    --eco-mid:  #2d5a27;
    --eco-light: #52b788;
    --eco-glow: #74c69d;
    position: relative;
    display: flex;
    width: 100%;
  }

  .sparkle-eco-btn {
    --active: 0;
    --bg:
      radial-gradient(40% 50% at center 100%,
        hsl(130 calc(var(--active) * 60%) 50% / var(--active)),
        transparent),
      radial-gradient(80% 100% at center 120%,
        hsl(135 calc(var(--active) * 55%) 40% / var(--active)),
        transparent),
      hsl(128 calc(var(--active) * 40%) calc((var(--active) * 20%) + 18%));
    background: var(--bg);
    font-size: 14px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    padding: 13px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 8px;
    white-space: nowrap;
    border-radius: 100px;
    position: relative;
    color: #fff;
    letter-spacing: 0.01em;
    box-shadow:
      0 0 calc(var(--active) * 2.5em) calc(var(--active) * 0.6em) hsl(135 60% 35% / 0.6),
      0 0em 0 0 hsl(130 calc(var(--active) * 55%) calc((var(--active) * 30%) + 22%)) inset,
      0 -0.05em 0 0 hsl(130 calc(var(--active) * 50%) calc(var(--active) * 40%)) inset;
    scale: calc(1 + (var(--active) * 0.04));
    transition: box-shadow var(--transition), scale var(--transition),
                background var(--transition), opacity 0.2s;
    background-color: var(--eco-mid);
  }
  .sparkle-eco-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  .sparkle-eco-btn:active { scale: 0.98; }

  .sparkle-eco-btn:before {
    content: "";
    position: absolute;
    inset: -0.2em;
    z-index: -1;
    border: 0.2em solid hsl(135 60% 40% / 0.45);
    border-radius: 100px;
    opacity: var(--active, 0);
    transition: opacity var(--transition);
  }

  .sparkle-eco-btn:is(:hover, :focus-visible) {
    --active: 1;
    --play-state: running;
  }

  .spark-eco {
    position: absolute;
    inset: 0;
    border-radius: 100px;
    rotate: 0deg;
    overflow: hidden;
    mask: linear-gradient(white, transparent 50%);
    animation: eco-flip calc(var(--spark) * 2) infinite steps(2, end);
  }
  .spark-eco:before {
    content: "";
    position: absolute;
    width: 200%;
    aspect-ratio: 1;
    top: 0%;
    left: 50%;
    z-index: -1;
    translate: -50% -15%;
    rotate: 0;
    transform: rotate(-90deg);
    opacity: calc(var(--active) + 0.35);
    background: conic-gradient(from 0deg, transparent 0 340deg, #a7f3c8 360deg);
    transition: opacity var(--transition);
    animation: eco-rotate var(--spark) linear infinite both;
  }
  .spark-eco:after {
    content: "";
    position: absolute;
    inset: var(--cut);
    border-radius: 100px;
  }
  .backdrop-eco {
    position: absolute;
    inset: var(--cut);
    background: var(--bg);
    background-color: var(--eco-mid);
    border-radius: 100px;
    transition: background var(--transition);
  }

  @keyframes eco-flip { to { rotate: 360deg; } }
  @keyframes eco-rotate { to { transform: rotate(90deg); } }

  .sparkle-eco-icon {
    display: inline-flex;
    translate: -10% -4%;
  }
  .sparkle-eco-icon svg { width: 1.15em; height: 1.15em; }
  .sparkle-eco-icon path {
    fill: hsl(0 0% calc((var(--active, 0) * 60%) + var(--base)));
    stroke: hsl(0 0% calc((var(--active, 0) * 60%) + var(--base)));
    transform-box: fill-box;
    transform-origin: center;
    animation-duration: 0.6s;
    animation-delay: calc(var(--transition) * 1.5 + var(--delay) * 1s);
    transition: fill var(--transition), stroke var(--transition);
  }
  .sparkle-eco-btn:is(:hover, :focus-visible) .sparkle-eco-icon path {
    animation-name: eco-bounce;
  }
  @keyframes eco-bounce { 35%, 65% { scale: var(--scale); } }

  .sparkle-eco-icon path:nth-of-type(1) { --scale: 0.5; --delay: 0.1; --base: 80%; }
  .sparkle-eco-icon path:nth-of-type(2) { --scale: 1.5; --delay: 0.2; --base: 60%; }
  .sparkle-eco-icon path:nth-of-type(3) { --scale: 2.5; --delay: 0.35; --base: 70%; }

  .sparkle-eco-text {
    translate: 2% -5%;
    letter-spacing: 0.015ch;
    background: linear-gradient(
      90deg,
      hsl(0 0% calc((var(--active) * 30%) + 88%)),
      hsl(0 0% calc((var(--active) * 10%) + 78%))
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: background var(--transition);
  }

  .particle-pen-eco {
    position: absolute;
    width: 200%;
    aspect-ratio: 1;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    -webkit-mask: radial-gradient(white, transparent 65%);
    z-index: -1;
    opacity: var(--active, 0);
    transition: opacity var(--transition);
    pointer-events: none;
  }
  .particle-eco {
    fill: #a7f3c8;
    width: calc(var(--size, 0.25) * 1rem);
    aspect-ratio: 1;
    position: absolute;
    top: calc(var(--y) * 1%);
    left: calc(var(--x) * 1%);
    opacity: var(--alpha, 1);
    animation: eco-float calc(var(--duration, 1) * 1s) calc(var(--delay) * -1s) infinite linear;
    transform-origin: var(--origin-x, 1000%) var(--origin-y, 1000%);
    z-index: -1;
    animation-play-state: var(--play-state, paused);
  }
  .particle-eco path { fill: #86efac; stroke: none; }
  .particle-eco:nth-of-type(even) { animation-direction: reverse; }
  @keyframes eco-float { to { rotate: 360deg; } }

  @keyframes eco-spin { to { transform: rotate(360deg); } }
  .eco-spinner {
    width: 16px;
    height: 16px;
    animation: eco-spin 0.9s linear infinite;
  }
`