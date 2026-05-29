export default function Avatar({ image, initials, size = 36 }) {
  const circle = {
    width: size,
    height: size,
    borderRadius: '50%',
    flexShrink: 0,
    objectFit: 'cover',
  }

  if (image) {
    return <img src={image} alt="avatar" style={circle} />
  }

  return (
    <div style={{
      ...circle,
      background: '#9FE1CB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: Math.round(size * 0.35),
      fontWeight: 500,
      color: '#085041',
    }}>
      {initials}
    </div>
  )
}