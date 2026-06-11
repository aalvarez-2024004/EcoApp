import { useEcoBotStore } from '../store/useEcoBotStore'
import EcoBotHeader   from '../components/EcoBotComps/EcoBotHeader'
import EcoBotMessages from '../components/EcoBotComps/EcoBotMessages'
import EcoBotInput    from '../components/EcoBotComps/EcoBotInput'
import { useEffect }  from 'react'

// Altura del navbar del DashboardLayout
const NAVBAR_H = 68

export default function EcoBotPage() {
  const { mensajes, isLoading, error, enviar, limpiar, cargarHistorial } = useEcoBotStore()

  useEffect(() => {
    // cargarHistorial se encarga internamente de no recargar
    // si el usuario ya limpió el chat (wasCleared flag en el store)
    cargarHistorial()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* El page ocupa exactamente el viewport restante debajo del navbar */
        .ecobot-page {
          position: fixed;
          top: ${NAVBAR_H}px;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          background: white;
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow: hidden;
        }

        /* Zona de mensajes, crece y tiene su propio scroll */
        .ecobot-messages-area {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
          scrollbar-width: thin;
          scrollbar-color: #ddeedd transparent;
        }
        .ecobot-messages-area::-webkit-scrollbar       { width: 4px; }
        .ecobot-messages-area::-webkit-scrollbar-track { background: transparent; }
        .ecobot-messages-area::-webkit-scrollbar-thumb { background: #ddeedd; border-radius: 4px; }

        /* Input nunca se mueve */
        .ecobot-input-bar {
          flex-shrink: 0;
        }
      `}</style>

      <div className="ecobot-page">
        {/* Header fijo arriba */}
        <EcoBotHeader onLimpiar={limpiar} hayMensajes={mensajes.length > 0} />

        {/* Mensajes con scroll propio */}
        <div className="ecobot-messages-area">
          <EcoBotMessages
            mensajes={mensajes}
            isLoading={isLoading}
            error={error}
          />
        </div>

        {/* Input siempre pegado abajo */}
        <div className="ecobot-input-bar">
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
