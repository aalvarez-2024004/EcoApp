const Spinner = ({ size = 'md', color = '#2d6a4f' }) => {
  const sizes = { sm: 18, md: 28, lg: 44 }
  const px = sizes[size] ?? sizes.md

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'eco-spin 0.8s linear infinite' }}
    >
      <style>{`@keyframes eco-spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="9" stroke={color} strokeOpacity="0.25" strokeWidth="2.5" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Spinner
