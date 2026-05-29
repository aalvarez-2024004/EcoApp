import { ScanOverlay } from '../../../icons/DetectorIcons'

function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 border border-slate-200
                 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200
                 transition-all shadow-sm text-lg leading-none"
    >
      ×
    </button>
  )
}

function Viewfinder() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-emerald-400 rounded-tl-md" />
      <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-emerald-400 rounded-tr-md" />
      <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-emerald-400 rounded-bl-md" />
      <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-emerald-400 rounded-br-md" />
      {/* Crosshair central sutil */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-px bg-emerald-400/40" />
        <div className="absolute h-4 w-px bg-emerald-400/40" />
      </div>
    </div>
  )
}

export default function CameraPanel({
  videoRef,
  canvasRef,
  camaraActiva,
  fotoCapturada,
  isLoading,
  onActivar,
  onDetener,
  onCapturar,
  onClasificar,
  onRetomar,
}) {
  const camIdle      = !camaraActiva && !fotoCapturada
  const camLive      = camaraActiva  && !fotoCapturada
  const camCapturada = fotoCapturada

  return (
    <div className="flex flex-col gap-3">

      {/* Contenedor de video/canvas — siempre montado */}
      <div
        className="relative rounded-2xl overflow-hidden flex items-center justify-center bg-slate-950"
        style={{ height: 300 }}
      >
        <video
          ref={videoRef}
          autoPlay playsInline muted
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300
            ${camLive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        />
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300
            ${camCapturada ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        />

        {camCapturada && isLoading && <ScanOverlay />}

        {/* Estado idle */}
        {camIdle && (
          <div className="flex flex-col items-center gap-3 text-center px-8 z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border-2 border-dashed border-white/15
                            flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white/30"
                   stroke="currentColor" strokeWidth="1.4">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175
                     C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15
                     A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169
                     a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055
                     l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039
                     48.774 48.774 0 0 0-5.232 0
                     2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
              </svg>
            </div>
            <p className="text-white/50 text-sm font-medium">Activa tu cámara</p>
          </div>
        )}

        {camLive && <Viewfinder />}

        {/* Badge foto capturada */}
        {camCapturada && !isLoading && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5
                          bg-emerald-500 text-white text-xs font-semibold
                          px-2.5 py-1 rounded-full shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3"
                 stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Foto capturada
          </div>
        )}

        {camCapturada && <CloseBtn onClick={onRetomar} />}
      </div>

      {/* Botones según estado */}
      {camIdle && (
        <button
          onClick={onActivar}
          className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700
                     active:scale-[0.98] text-white font-semibold text-sm
                     transition-all flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"
               stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175
                 C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15
                 A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169
                 a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055
                 l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039
                 48.774 48.774 0 0 0-5.232 0
                 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
          </svg>
          Activar cámara
        </button>
      )}

      {camLive && (
        <div className="flex gap-2">
          <button
            onClick={onDetener}
            className="px-5 py-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50
                       active:scale-[0.98] text-slate-500 font-semibold text-sm transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onCapturar}
            className="flex-1 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600
                       active:scale-[0.98] text-white font-semibold text-sm
                       transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"
                 stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
            Capturar foto
          </button>
        </div>
      )}

      {camCapturada && (
        <div className="flex gap-2">
          <button
            onClick={onRetomar}
            className="px-5 py-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50
                       active:scale-[0.98] text-slate-500 font-semibold text-sm
                       transition-all flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"
                 stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992
                   m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7
                   M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Nueva foto
          </button>
          <button
            onClick={onClasificar}
            disabled={isLoading}
            className="flex-1 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600
                       disabled:bg-emerald-300 disabled:cursor-not-allowed
                       active:scale-[0.98] text-white font-semibold text-sm
                       transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analizando…
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"
                     stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992
                       m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7
                       M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Clasificar material
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}