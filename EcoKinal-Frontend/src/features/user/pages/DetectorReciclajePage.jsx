import { useRef } from 'react'
import { useDetectorReciclaje } from '../store/useDetectorStore'
import {
  BinIcon, ScanOverlay, ConfidenceBar,
} from '../../../icons/DetectorIcons'
import {
  detectorStyles, detectarColorSet, CONSEJOS,
} from '../../../styles/DetectorPage'

export default function DetectorReciclajePage() {
  const inputRef = useRef(null)
  const { preview, resultado, isLoading, error, seleccionarImagen, clasificar, limpiar } =
    useDetectorReciclaje()

  const { set: colorSet, nombre: nombreBin } = resultado?.contenedor
    ? detectarColorSet(resultado.contenedor)
    : { set: null, nombre: null }

  const consejo = resultado?.tipo ? CONSEJOS[resultado.tipo] : null

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) seleccionarImagen(file)
  }

  return (
    <div className="min-h-screen bg-[#f0f2ed] p-6 lg:p-10">
      <style>{detectorStyles}</style>

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm">
              {/* icono reciclaje */}
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
              EcoKinal · IA Visión
            </span>
          </div>
          <h1 className="text-5xl font-black text-slate-800 leading-none">
            Detector de
          </h1>
          <h1 className="text-5xl font-black text-emerald-500 leading-tight">
            reciclaje
          </h1>
          <p className="mt-3 text-sm text-slate-400 max-w-xs leading-relaxed">
            Sube una foto y la IA identifica el material y el contenedor correcto al instante.
          </p>
        </div>

        {/* ── Layout principal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ── Columna izquierda ── */}
          <div className="lg:col-span-3 flex flex-col gap-4">

            {/* Drop zone */}
            <div
              className={`relative rounded-3xl border-2 border-dashed overflow-hidden transition-all duration-300 flex flex-col
                ${preview
                  ? 'border-emerald-300 bg-white'
                  : 'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/40 cursor-pointer'
                }`}
              style={{ height: 360 }}
              onClick={() => !preview && inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {preview ? (
                <>
                  <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
                  {isLoading && <ScanOverlay />}
                  <button
                    onClick={(e) => { e.stopPropagation(); limpiar() }}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-200 transition-all text-xl leading-none shadow-sm"
                  >
                    ×
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 px-8 text-center">
                  <div className="mb-6 animate-float">
                    <div className="w-24 h-24 rounded-3xl bg-emerald-50 border-2 border-dashed border-emerald-200 flex items-center justify-center">
                      {/* icono cámara */}
                      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-emerald-400" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-slate-700 font-bold text-lg mb-1">Arrastra tu imagen aquí</p>
                  <p className="text-slate-400 text-sm mb-5">o haz clic para seleccionar</p>
                  <span className="text-xs text-slate-300 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full">
                    JPG · PNG · WEBP
                  </span>
                </div>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => seleccionarImagen(e.target.files[0])}
            />

            {/* Botones */}
            <div className="flex gap-3">
              {!preview ? (
                <button
                  onClick={() => inputRef.current?.click()}
                  className="flex-1 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {/* icono subir */}
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                  Subir imagen
                </button>
              ) : (
                <>
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.98] text-slate-600 font-semibold text-sm transition-all"
                  >
                    Cambiar
                  </button>
                  <button
                    onClick={clasificar}
                    disabled={isLoading}
                    className="flex-1 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        {/* spinner */}
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Analizando…
                      </>
                    ) : (
                      <>
                        {/* icono reciclar */}
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        Clasificar material
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 px-4 py-3 rounded-2xl bg-red-50 border border-red-100">
                <span className="text-red-400 text-lg leading-none mt-0.5">⚠</span>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Leyenda de contenedores */}
            <div className="grid grid-cols-4 gap-2 mt-1">
              {[
                { color: 'bg-emerald-500', label: 'Verde',    desc: 'Orgánico' },
                { color: 'bg-blue-500',    label: 'Azul',     desc: 'Papel' },
                { color: 'bg-amber-400',   label: 'Amarillo', desc: 'Plástico' },
                { color: 'bg-red-500',     label: 'Rojo',     desc: 'Peligroso' },
              ].map(({ color, label, desc }) => (
                <div key={label} className="rounded-2xl bg-white border border-slate-100 p-3 flex flex-col items-center gap-1.5 text-center">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <p className="text-xs font-bold text-slate-700">{label}</p>
                  <p className="text-xs text-slate-400 leading-none">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Columna derecha ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Estado vacío */}
            {!resultado && !isLoading && (
              <div className="rounded-3xl bg-white border border-slate-100 p-7 flex flex-col gap-6" style={{ minHeight: 360 }}>
                <p className="text-xs font-black tracking-widest text-slate-300 uppercase">
                  Cómo funciona
                </p>
                {[
                  { n: '01', label: 'Sube tu imagen',          desc: 'Foto del residuo que quieres clasificar' },
                  { n: '02', label: 'La IA lo analiza',        desc: 'Identifica el tipo de material automáticamente' },
                  { n: '03', label: 'Descubre el contenedor',  desc: 'Sabrás exactamente dónde depositarlo' },
                ].map(({ n, label, desc }) => (
                  <div key={n} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <span className="text-xs font-black text-emerald-500">{n}</span>
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-bold text-slate-700">{label}</p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                    {/* chip/cpu icon */}
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-emerald-400" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tecnología MobileNet + TensorFlow.js
                  </p>
                </div>
              </div>
            )}

            {/* Estado cargando */}
            {isLoading && (
              <div className="rounded-3xl bg-white border border-slate-100 p-8 flex flex-col items-center text-center gap-6" style={{ minHeight: 360 }}>
                <div className="relative w-20 h-20 mt-4">
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-50" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 animate-spin" />
                  <div className="absolute inset-2.5 rounded-full bg-emerald-50 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-emerald-500" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-slate-800 font-bold">Identificando material…</p>
                  <p className="text-slate-400 text-xs mt-1.5">La IA está procesando tu imagen</p>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <ConfidenceBar label="Análisis de textura"     value={72} />
                  <ConfidenceBar label="Reconocimiento de forma" value={58} />
                  <ConfidenceBar label="Clasificación de color"  value={89} />
                </div>
              </div>
            )}

            {/* Estado con resultado */}
            {resultado && !isLoading && (
              <div className="animate-fade-up flex flex-col gap-4">

                {/* Material */}
                <div className={`rounded-3xl border-2 p-6 ${colorSet?.light} ${colorSet?.border}`}>
                  <p className="text-xs font-black tracking-widest text-slate-400 uppercase mb-4">
                    Material identificado
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${colorSet?.dot} animate-pulse`} />
                    <h2 className={`text-2xl font-black ${colorSet?.text}`}>
                      {resultado.tipo}
                    </h2>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {resultado.descripcion}
                  </p>
                  {resultado.labels?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {resultado.labels.slice(0, 4).map((etiqueta, i) => (
                        <span key={i} className="text-xs bg-white/80 border border-white text-slate-500 px-2.5 py-1 rounded-full">
                          {etiqueta}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contenedor */}
                <div className="rounded-3xl bg-white border border-slate-100 p-6">
                  <p className="text-xs font-black tracking-widest text-slate-300 uppercase mb-5">
                    ¿Dónde depositarlo?
                  </p>
                  <div className="flex items-center gap-5">
                    <BinIcon color={colorSet?.hex} />
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Contenedor</p>
                      <p className={`text-3xl font-black ${colorSet?.text}`}>
                        {nombreBin}
                      </p>
                      <p className="text-slate-400 text-xs mt-1.5 leading-snug max-w-[160px]">
                        {resultado.contenedor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consejo */}
                {consejo && (
                  <div className="rounded-3xl bg-amber-50 border border-amber-100 p-5 flex gap-3">
                    <span className="text-amber-400 text-lg shrink-0 mt-0.5">💡</span>
                    <p className="text-amber-700 text-sm leading-relaxed">{consejo}</p>
                  </div>
                )}

                {/* Limpiar */}
                <button
                  onClick={limpiar}
                  className="w-full py-3.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.98] text-slate-500 text-sm font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Clasificar otro objeto
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}