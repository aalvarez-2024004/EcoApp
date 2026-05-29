import { useRef } from 'react'
import { ScanOverlay } from '../../../icons/DetectorIcons'

function CloseBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100
                 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200
                 transition-all text-xl leading-none pb-1"
    >
      ×
    </button>
  )
}

export default function UploadPanel({ preview, isLoading, onSelect, onLimpiar, onClasificar }) {
  const fileInputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) onSelect(file)
  }

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
      {/* Zona de drop */}
      <div
        className={`relative rounded-2xl border-2 border-dashed overflow-hidden flex flex-col items-center justify-center
          transition-all duration-300 min-h-[320px]
          ${preview
            ? 'border-transparent bg-slate-900'
            : 'border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50 cursor-pointer'
          }`}
        onClick={() => !preview && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <>
            <img src={preview} alt="Vista previa" className="absolute inset-0 w-full h-full object-contain opacity-90" />
            {isLoading && <ScanOverlay />}
            <CloseBtn onClick={(e) => { e.stopPropagation(); onLimpiar() }} />
            {/* Badge */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2
                            bg-white/95 backdrop-blur-sm text-emerald-700 text-xs font-bold
                            px-3 py-1.5 rounded-full shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Imagen cargada
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 text-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white border border-slate-100 shadow-sm
                            flex items-center justify-center animate-float text-emerald-500">
              <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div>
              <p className="text-slate-700 font-bold text-lg">Arrastra tu imagen aquí</p>
              <p className="text-slate-400 text-sm mt-1">o haz clic para explorar tus archivos</p>
            </div>
            <span className="text-xs font-medium text-slate-400 bg-white border border-slate-200 px-4 py-1.5 rounded-full">
              JPG, PNG, WEBP · máx 5 MB
            </span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => onSelect(e.target.files[0])}
      />

      {/* Botones de acción */}
      {!preview ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600
                     active:scale-[0.98] text-white font-bold text-sm
                     transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
        >
          Seleccionar imagen
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => { onLimpiar(); setTimeout(() => fileInputRef.current?.click(), 50) }}
            className="px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200
                       active:scale-[0.98] text-slate-600 font-bold text-sm transition-all"
          >
            Cambiar
          </button>
          <button
            onClick={onClasificar}
            disabled={isLoading}
            className="flex-1 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600
                       disabled:bg-emerald-300 disabled:cursor-not-allowed
                       active:scale-[0.98] text-white font-bold text-sm
                       transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
          >
            {isLoading ? 'Analizando...' : 'Clasificar material'}
          </button>
        </div>
      )}
    </div>
  )
}