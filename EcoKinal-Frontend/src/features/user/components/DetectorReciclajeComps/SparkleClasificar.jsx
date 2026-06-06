/**
 * SparkleClasificar — Botón "Clasificar Material" con efecto sparkle
 * Adaptado al verde eco (#2d5a27) del proyecto EcoKinal.
 *
 * Uso:
 *   <SparkleClasificar onClick={onClasificar} isLoading={isLoading} />
 *
 * Props:
 *   onClick    — función a ejecutar al hacer clic
 *   isLoading  — boolean, deshabilita el botón y muestra spinner
 *   disabled   — boolean extra (opcional)
 */

const PARTICLES = Array.from({ length: 20 });

const PARTICLE_STYLES = [
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
];

function StarSVG({ size = 15 }) {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}>
      <path
        d="M6.937 3.846L7.75 1L8.563 3.846C8.773 4.581 9.167 5.251 9.708 5.791C10.248 6.332 10.918 6.726 11.653 6.936L14.5 7.75L11.654 8.563C10.919 8.773 10.249 9.167 9.709 9.708C9.168 10.248 8.774 10.918 8.564 11.653L7.75 14.5L6.937 11.654C6.727 10.919 6.333 10.249 5.792 9.709C5.252 9.168 4.582 8.774 3.847 8.564L1 7.75L3.846 6.937C4.581 6.727 5.251 6.333 5.791 5.792C6.332 5.252 6.726 4.582 6.936 3.847L6.937 3.846Z"
        fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SparkleClasificar({ onClick, isLoading = false, disabled = false }) {
  const isDisabled = isLoading || disabled;

  const cssVars = `
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

    /* ── Botón base ── */
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
      /* CAMBIO: Centrar contenido e igualar comportamiento elástico */
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

    /* Halo de foco */
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

    /* ── Hover / focus activa animaciones ── */
    .sparkle-eco-btn:is(:hover, :focus-visible) {
      --active: 1;
      --play-state: running;
    }

    /* ── Chispa giratoria ── */
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

    /* ── Icono sparkle ── */
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

    /* ── Texto ── */
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

    /* ── Partículas flotantes ── */
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

    /* ── Spinner de carga ── */
    @keyframes eco-spin { to { transform: rotate(360deg); } }
    .eco-spinner {
      width: 16px;
      height: 16px;
      animation: eco-spin 0.9s linear infinite;
    }
  `;

  return (
    <>
      <style>{cssVars}</style>

      <div className="sparkle-eco-wrap">
        {/* Botón principal */}
        <button
          className="sparkle-eco-btn"
          onClick={onClick}
          disabled={isDisabled}
          aria-label="Clasificar material"
        >
          <span className="spark-eco" aria-hidden="true" />
          <span className="backdrop-eco" aria-hidden="true" />

          {/* Icono sparkle / spinner */}
          {isLoading ? (
            <svg className="eco-spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          ) : (
            <span className="sparkle-eco-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.187 8.096L15 5.25L15.813 8.096C16.023 8.831 16.417 9.501 16.958 10.041C17.498 10.582 18.168 10.976 18.903 11.186L21.75 12L18.904 12.813C18.169 13.023 17.499 13.417 16.959 13.958C16.418 14.498 16.024 15.168 15.814 15.903L15 18.75L14.187 15.904C13.977 15.169 13.583 14.499 13.042 13.959C12.502 13.418 11.832 13.024 11.097 12.814L8.25 12L11.096 11.187C11.831 10.977 12.501 10.583 13.041 10.042C13.582 9.502 13.976 8.832 14.186 8.097L14.187 8.096Z"
                  fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                />
                <path
                  d="M6 14.25L5.741 15.285C5.593 15.879 5.286 16.421 4.853 16.853C4.421 17.286 3.879 17.593 3.285 17.741L2.25 18L3.285 18.259C3.879 18.407 4.421 18.714 4.853 19.147C5.286 19.579 5.593 20.121 5.741 20.715L6 21.75L6.259 20.715C6.407 20.122 6.714 19.580 7.146 19.147C7.579 18.714 8.121 18.408 8.714 18.259L9.75 18L8.714 17.741C8.121 17.593 7.579 17.286 7.146 16.853C6.714 16.420 6.407 15.878 6.259 15.285L6 14.25Z"
                  fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                />
                <path
                  d="M6.5 4L6.303 4.591C6.248 4.757 6.155 4.908 6.031 5.031C5.908 5.155 5.757 5.248 5.591 5.303L5 5.5L5.591 5.697C5.757 5.752 5.908 5.845 6.031 5.969C6.155 6.092 6.248 6.243 6.303 6.408L6.5 7L6.697 6.408C6.752 6.243 6.845 6.092 6.969 5.969C7.092 5.845 7.243 5.752 7.408 5.697L8 5.5L7.408 5.303C7.243 5.248 7.092 5.155 6.969 5.031C6.845 4.908 6.752 4.757 6.697 4.591L6.5 4Z"
                  fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </span>
          )}

          <span className="sparkle-eco-text">
            {isLoading ? 'Analizando…' : 'Clasificar Material'}
          </span>
        </button>

        {/* Partículas */}
        <span aria-hidden="true" className="particle-pen-eco">
          {PARTICLE_STYLES.map((style, i) => (
            <svg
              key={i}
              className="particle-eco"
              style={style}
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.937 3.846L7.75 1L8.563 3.846C8.773 4.581 9.167 5.251 9.708 5.791C10.248 6.332 10.918 6.726 11.653 6.936L14.5 7.75L11.654 8.563C10.919 8.773 10.249 9.167 9.709 9.708C9.168 10.248 8.774 10.918 8.564 11.653L7.75 14.5L6.937 11.654C6.727 10.919 6.333 10.249 5.792 9.709C5.252 9.168 4.582 8.774 3.847 8.564L1 7.75L3.846 6.937C4.581 6.727 5.251 6.333 5.791 5.792C6.332 5.252 6.726 4.582 6.936 3.847L6.937 3.846Z"
              />
            </svg>
          ))}
        </span>
      </div>
    </>
  );
}
