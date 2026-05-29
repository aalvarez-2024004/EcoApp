import { useRef } from 'react'
import { useDetectorReciclaje } from '../store/useDetectorStore'
import {
  RecycleIcon, BinIcon, UploadIcon, CameraIcon,
  SpinnerIcon, ScanOverlay, ConfidenceBar,
} from '../../../icons/DetectorIcons'
import {
  detectorStyles, detectarColorSet, CONSEJOS,
} from '../../../styles/DetectorPage'

export default function DetectorReciclaje() {
  const inputRef = useRef(null)
  const { imagen, preview, resultado, isLoading, error, seleccionarImagen, clasificar, limpiar } =
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
    <div className="min-h-screen bg-[#f5f7f2]">
      <style>{detectorStyles}</style>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <RecycleIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
              EcoKinal · IA Vision
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 leading-tight">
            Detector de<br />
            <span className="text-emerald-500">reciclaje</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-sm">
            Sube una foto y la IA identifica el material y el contenedor correcto al instante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Columna izquierda: zona de imagen ── */}
          <div className="lg:col-span-3 space-y-4">

            {/* Drop zone */}
            <div
              className={`relative rounded-2xl border-2 border-dashed overflow-hidden transition-all duration-300
                ${preview
                  ? 'border-emerald-300 bg-white'
                  : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer'
                }`}
              style={{ minHeight: 340 }}
              onClick={() => !preview && inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="w-full object-cover"
                    style={{ maxHeight: 380 }}
                  />
                  {isLoading && <ScanOverlay />}
                  <button
                    onClick={(e) => { e.stopPropagation(); limpiar() }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-200 transition-colors text-xl leading-none"
                  >
                    ×
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-16 px-8 text-center">
                  <div className="mb-5 animate-float">
                    <div className="w-20 h-20 rounded-2xl bg-emerald-50 border-2 border-dashed border-emerald-200 flex items-center justify-center">
                      <CameraIcon className="w-9 h-9 text-emerald-400" />
                    </div>
                  </div>
                  <p className="text-slate-600 font-semibold mb-1">Arrastra tu imagen aquí</p>
                  <p className="text-slate-400 text-sm mb-4">o haz clic para seleccionar</p>
                  <span className="text-xs text-slate-300 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
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

            {/* Botones de acción */}
            <div className="flex gap-3">
              {!preview ? (
                <button
                  onClick={() => inputRef.current?.click()}
                  className="flex-1 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <UploadIcon className="w-4 h-4" />
                  Subir imagen
                </button>
              ) : (
                <>
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="px-5 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] text-slate-600 font-medium text-sm transition-all"
                  >
                    Cambiar
                  </button>
                  <button
                    onClick={clasificar}
                    disabled={isLoading}
                    className="flex-1 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed active:scale-[0.98] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <SpinnerIcon className="animate-spin w-4 h-4" />
                        Analizando…
                      </>
                    ) : (
                      <>
                        <RecycleIcon className="w-4 h-4" />
                        Clasificar material
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                <span className="text-red-400 text-lg leading-none mt-0.5">⚠</span>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* ── Columna derecha: resultado / estado ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Estado vacío */}
            {!resultado && !isLoading && (
              <div className="rounded-2xl bg-white border border-slate-100 p-6 space-y-5">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                  Cómo funciona
                </p>
                {[
                  { n: '01', label: 'Sube tu imagen',         desc: 'Foto del residuo que quieres clasificar' },
                  { n: '02', label: 'La IA lo analiza',       desc: 'MobileNet detecta el tipo de material' },
                  { n: '03', label: 'Descubre el contenedor', desc: 'Sabrás exactamente dónde tirarlo' },
                ].map(({ n, label, desc }) => (
                  <div key={n} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-emerald-500">{n}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Estado cargando */}
            {isLoading && (
              <div className="rounded-2xl bg-white border border-slate-100 p-8 flex flex-col items-center text-center space-y-5">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 animate-spin" />
                  <div className="absolute inset-2 rounded-full bg-emerald-50 flex items-center justify-center">
                    <RecycleIcon className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
                <div>
                  <p className="text-slate-700 font-semibold text-sm">Identificando material…</p>
                  <p className="text-slate-400 text-xs mt-1">La IA está procesando tu imagen</p>
                </div>
                <div className="w-full space-y-2.5">
                  <ConfidenceBar label="Análisis de textura"     value={72} />
                  <ConfidenceBar label="Reconocimiento de forma" value={58} />
                  <ConfidenceBar label="Clasificación de color"  value={89} />
                </div>
              </div>
            )}

            {/* Estado con resultado */}
            {resultado && !isLoading && (
              <div className="animate-fade-up space-y-4">

                {/* Tarjeta: material */}
                <div className={`rounded-2xl border p-5 ${colorSet?.light} ${colorSet?.border}`}>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                    Material identificado
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${colorSet?.dot} animate-pulse`} />
                    <h2 className={`text-xl font-bold ${colorSet?.text}`}>
                      {resultado.tipo}
                    </h2>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {resultado.descripcion}
                  </p>
                  {resultado.labels?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {resultado.labels.slice(0, 4).map((l, i) => (
                        <span key={i} className="text-xs bg-white/70 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full">
                          {l}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tarjeta: contenedor */}
                <div className="rounded-2xl bg-white border border-slate-100 p-5">
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
                    ¿Dónde tirarlo?
                  </p>
                  <div className="flex items-center gap-4">
                    <BinIcon color={colorSet?.hex} />
                    <div>
                      <p className="text-slate-400 text-xs mb-1">Contenedor</p>
                      <p className={`text-2xl font-bold ${colorSet?.text}`}>
                        {nombreBin}
                      </p>
                      <p className="text-slate-400 text-xs mt-1 leading-snug">
                        {resultado.contenedor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consejo */}
                {consejo && (
                  <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 flex gap-3">
                    <span className="text-amber-400 text-base shrink-0 mt-0.5">💡</span>
                    <p className="text-amber-700 text-sm leading-relaxed">{consejo}</p>
                  </div>
                )}

                {/* Botón limpiar */}
                <button
                  onClick={limpiar}
                  className="w-full py-3 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] text-slate-500 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <RecycleIcon className="w-4 h-4" />
                  Clasificar otro objeto
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Leyenda de contenedores */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { color: 'bg-emerald-500', label: 'Verde',    desc: 'Orgánico' },
            { color: 'bg-blue-500',    label: 'Azul',     desc: 'Papel / Cartón' },
            { color: 'bg-amber-400',   label: 'Amarillo', desc: 'Plástico / Metal' },
            { color: 'bg-red-500',     label: 'Rojo',     desc: 'Peligroso' },
          ].map(({ color, label, desc }) => (
            <div key={label} className="rounded-xl bg-white border border-slate-100 p-3 flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${color} shrink-0`} />
              <div>
                <p className="text-xs font-semibold text-slate-700">{label}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}