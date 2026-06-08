
export const HeaderIllustration = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      style={{ width: 200, height: 120, opacity: 0.12, flexShrink: 0 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="90" rx="80" ry="20" fill={G.green3} />
      <path d="M100 80 Q80 40 60 20 Q100 30 100 80Z" fill={G.green2} />
      <path d="M100 80 Q120 40 140 20 Q100 30 100 80Z" fill={G.green3} />
      <path d="M100 80 Q70 55 50 60 Q80 45 100 80Z" fill={G.green4} />
      <path d="M100 80 Q130 55 150 60 Q120 45 100 80Z" fill={G.green4} />
      <circle cx="100" cy="78" r="5" fill={G.green1} />
    </svg>
  )
}