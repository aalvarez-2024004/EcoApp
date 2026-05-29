import { useRef, useEffect } from 'react'
import { useDetectorReciclaje } from '../store/useDetectorStore'
import { detectorStyles, LEYENDA } from '../../../Styles/detector.styles'
import UploadPanel  from '../components/UploadPanel'
import CameraPanel  from '../components/CameraPanel'
import ResultPanel  from '../components/ResultPanel'

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200
        ${active
          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
        }`}
    >
      {children}
    </button>
  )
}

export default function DetectorReciclajePage() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const {
    resultado, isLoading, error,
    activeTab, camaraActiva, fotoCapturada, preview,
    seleccionarImagen, clasificar, limpiar,
    setTab, activarCamara, detenerCamara, capturarFoto, retomar,
  } = useDetectorReciclaje()

  useEffect(() => {
    return () => detenerCamara(videoRef)
  }, []) // eslint-disable-line

  const handleSwitchTab = (tab) => {
    if (camaraActiva) detenerCamara(videoRef)
    setTab(tab)
  }

  return (
    <div className="min-h-screen bg-[#f4f6f3] p-4 lg:p-8">
      <style>{detectorStyles}</style>

      <div className="max-w-6xl mx-auto">
        
        {/* Header Corregido */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/50 border border-emerald-200/50 mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-emerald-600" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span className="text-[11px] font-black tracking-widest text-emerald-700 uppercase">
              EcoKinal · IA Visión
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">
            Detector de <br className="hidden lg:block"/>
            <span className="text-emerald-500">reciclaje</span>
          </h1>
          <p className="mt-3 text-base text-slate-500 max-w-md leading-relaxed">
            Sube una foto o usa tu cámara para que la Inteligencia Artificial identifique el material y el contenedor correcto.
          </p>
        </div>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Columna Izquierda (Controles) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Tabs Corregidos */}
            <div className="flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm w-fit">
              <TabBtn active={activeTab === 'subir'} onClick={() => handleSwitchTab('subir')}>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Subir imagen
              </TabBtn>
              <TabBtn active={activeTab === 'camara'} onClick={() => handleSwitchTab('camara')}>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                </svg>
                Cámara en vivo
              </TabBtn>
            </div>

            {/* Panel Activo */}
            {activeTab === 'subir' ? (
              <UploadPanel preview={preview} isLoading={isLoading} onSelect={seleccionarImagen} onLimpiar={limpiar} onClasificar={clasificar} />
            ) : (
              <CameraPanel videoRef={videoRef} canvasRef={canvasRef} camaraActiva={camaraActiva} fotoCapturada={fotoCapturada} isLoading={isLoading} onActivar={() => activarCamara(videoRef)} onDetener={() => detenerCamara(videoRef)} onCapturar={() => capturarFoto(videoRef, canvasRef)} onClasificar={clasificar} onRetomar={retomar} />
            )}

            {error && (
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 font-medium text-sm">
                ⚠ {error}
              </div>
            )}

            {/* Leyenda Corregida */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
              {LEYENDA.map(({ color, label, desc }) => (
                <div key={label} className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col items-center gap-1.5 text-center shadow-sm">
                  <div className={`w-3 h-3 rounded-full ${color} shadow-sm`} />
                  <div>
                    <p className="text-sm font-bold text-slate-700 leading-tight">{label}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha (Resultados/Cómo funciona) */}
          <div className="lg:col-span-5">
            <ResultPanel resultado={resultado} isLoading={isLoading} onLimpiar={limpiar} />
          </div>

        </div>
      </div>
    </div>
  )
}