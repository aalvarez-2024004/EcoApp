import { useEffect, useRef } from 'react'
import { useUser } from '../../store/useUserStore'
import { G } from '../../../../Styles/constants/ImpactoPage.js'
import {styles} from '../../../../Styles/constants/EcoBotMessages.js'
import { BotBubble, UserBubble, TypingIndicator, WelcomeScreen, AlertIcon } from '../../../../icons/EcoBotIcons.jsx'

export default function EcoBotMessages({ mensajes, isLoading, error }) {
  const { image, initials } = useUser()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, isLoading])

  if (mensajes.length === 0 && !isLoading && !error) {
    return <WelcomeScreen />
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      gap: 14, padding: '20px 24px 12px',
      scrollbarWidth: 'thin', scrollbarColor: '#ddeedd transparent',
    }}>
      {mensajes.map((m, i) =>
        m.rol === 'user'
          ? <UserBubble key={i} texto={m.texto} image={image} initials={initials} />
          : <BotBubble  key={i} texto={m.texto} />
      )}

      {isLoading && <TypingIndicator />}

      {error && (
        <div style={styles.errorBanner}>
          <AlertIcon />
          {error}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}