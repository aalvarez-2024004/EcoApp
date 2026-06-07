// src/features/user/pages/EcoBotPage.jsx
import { useEcoBotStore } from '../store/useEcoBotStore'
import EcoBotHeader   from '../components/EcoBotComps/EcoBotHeader'
import EcoBotMessages from '../components/EcoBotComps/EcoBotMessages'
import EcoBotInput    from '../components/EcoBotComps/EcoBotInput'
import { useEffect }  from 'react'

export default function EcoBotPage() {
  const { mensajes, isLoading, error, enviar, cargarHistorial } = useEcoBotStore()

  useEffect(() => { cargarHistorial() }, [])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 2px rgba(82,183,136,0.35); }
          50%       { box-shadow: 0 0 0 4px rgba(82,183,136,0.15); }
        }
        .ecobot-scroll::-webkit-scrollbar       { width: 4px; }
        .ecobot-scroll::-webkit-scrollbar-track { background: transparent; }
        .ecobot-scroll::-webkit-scrollbar-thumb { background: #ddeedd; border-radius: 4px; }
      `}</style>

      {/* Wrapper: ocupa el espacio disponible de la página sin forzar 100vh */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <div style={{
          background: 'white',
          border: '1px solid #ddeedd',
          borderRadius: 0,           // sin bordes si va full
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: '100%',
          overflow: 'hidden',
        }}>
          <EcoBotHeader />

          {/* Zona de mensajes — crece y scrollea */}
          <div className="ecobot-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            <EcoBotMessages
              mensajes={mensajes}
              isLoading={isLoading}
              error={error}
            />
          </div>

          <EcoBotInput
            onEnviar={enviar}
            isLoading={isLoading}
            hayMensajes={mensajes.length > 0}
          />
        </div>
      </div>
    </>
  )
}