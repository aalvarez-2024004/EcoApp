import { useRef } from 'react'
import { useDetectorReciclaje } from '../store/useDetectorStore'

const CONTENEDOR_COLORS = {
  Verde:    { light: 'bg-emerald-50',  text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400', hex: '#16a34a' },
  Azul:     { light: 'bg-blue-50',     text: 'text-blue-700',    border: 'border-blue-200',    dot: 'bg-blue-400',    hex: '#2563eb' },
  Amarillo: { light: 'bg-amber-50',    text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-400',   hex: '#d97706' },
  Rojo:     { light: 'bg-red-50',      text: 'text-red-700',     border: 'border-red-200',     dot: 'bg-red-400',     hex: '#dc2626' },
  Gris:     { light: 'bg-slate-50',    text: 'text-slate-700',   border: 'border-slate-200',   dot: 'bg-slate-400',   hex: '#64748b' },
}

const CONSEJOS = {
  'Orgánico':          'Puedes compostarlo en casa para crear abono natural y reducir residuos.',
  'Inorgánico':        'Asegúrate de limpiar el envase antes de depositarlo en el contenedor.',
  'Residuo Peligroso': 'Nunca lo mezcles con basura común. Llévalo al punto de recolección especial.',
  'Reutilizable':      '¿Podrías darle una segunda vida antes de desecharlo? ¡Sé creativo!',
  'No reciclable':     'Intenta reducir el consumo de este tipo de materiales en el futuro.',
}

const detectarColorSet = (contenedor = '') => {
  const c = contenedor.toUpperCase()
  if (c.includes('VERDE'))    return { set: CONTENEDOR_COLORS.Verde,    nombre: 'Verde' }
  if (c.includes('AZUL'))     return { set: CONTENEDOR_COLORS.Azul,     nombre: 'Azul' }
  if (c.includes('AMARILLO')) return { set: CONTENEDOR_COLORS.Amarillo, nombre: 'Amarillo' }
  if (c.includes('ROJO'))     return { set: CONTENEDOR_COLORS.Rojo,     nombre: 'Rojo' }
  return { set: CONTENEDOR_COLORS.Gris, nombre: 'Gris' }
}

const RecycleIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
)

const BinIcon = ({ color = '#16a34a' }) => (
  <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14">
    <rect x="8" y="14" width="32" height="28" rx="4" fill={color} opacity="0.15" stroke={color} strokeWidth="2" />
    <rect x="4" y="10" width="40" height="6" rx="3" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
    <path d="M18 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M20 22v12M24 22v12M28 22v12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 24 Q24 20 32 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
)

const ScanOverlay = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-400 opacity-70 animate-scan" />
    <div className="absolute top-1/4 left-4 right-4 h-px bg-emerald-300 opacity-20" />
    <div className="absolute top-2/4 left-4 right-4 h-px bg-emerald-300 opacity-20" />
    <div className="absolute top-3/4 left-4 right-4 h-px bg-emerald-300 opacity-20" />
    <div className="absolute top-0 bottom-0 left-1/4 w-px bg-emerald-300 opacity-20" />
    <div className="absolute top-0 bottom-0 left-2/4 w-px bg-emerald-300 opacity-20" />
    <div className="absolute top-0 bottom-0 left-3/4 w-px bg-emerald-300 opacity-20" />
    <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-emerald-400" style={{ borderRadius: '4px 0 0 0' }} />
    <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-emerald-400" style={{ borderRadius: '0 4px 0 0' }} />
    <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-emerald-400" style={{ borderRadius: '0 0 0 4px' }} />
    <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-emerald-400" style={{ borderRadius: '0 0 4px 0' }} />
  </div>
)

const ConfidenceBar = ({ label, value }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs text-slate-500">
      <span>{label}</span>
      <span className="font-medium text-slate-600">{value}%</span>
    </div>
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full bg-emerald-400 rounded-full transition-all duration-1000 ease-out" style={{ width: `${value}%` }} />
    </div>
  </div>
)

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
      <style>{`
        @keyframes scan {
          0%   { top: -2px; opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-scan  { animation: scan 2.4s linear infinite; }
        .animate-float { animation: float 3.2s ease-in-out infinite; }
        .animate-fade-up { animation: fadeUp 0.45s ease-out forwards; }
      `}</style>

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
                      <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-emerald-400" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                      </svg>
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
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
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
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
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

            {/* Estado vacío: guía de pasos */}
            {!resultado && !isLoading && (
              <div className="rounded-2xl bg-white border border-slate-100 p-6 space-y-5">
                <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                  Cómo funciona
                </p>
                {[
                  { n: '01', label: 'Sube tu imagen',       desc: 'Foto del residuo que quieres clasificar' },
                  { n: '02', label: 'La IA lo analiza',     desc: 'MobileNet detecta el tipo de material' },
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
                  <ConfidenceBar label="Análisis de textura"      value={72} />
                  <ConfidenceBar label="Reconocimiento de forma"  value={58} />
                  <ConfidenceBar label="Clasificación de color"   value={89} />
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