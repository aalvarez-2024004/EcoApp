import { BinIcon, ConfidenceBar } from '../../../icons/DetectorIcons'
import { detectarColorSet, CONSEJOS } from '../../../Styles/detector.styles'

function EmptyState() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 flex flex-col gap-8 shadow-sm h-full min-h-[400px]">
      <p className="text-xs font-black tracking-widest text-slate-300 uppercase">
        Cómo funciona
      </p>
      
      <div className="flex flex-col gap-6 flex-1">
        {[
          { n: '01', label: 'Sube o captura', desc: 'Una foto del residuo que quieres clasificar.' },
          { n: '02', label: 'La IA lo analiza', desc: 'Identifica el tipo de material automáticamente en segundos.' },
          { n: '03', label: 'Descubre el contenedor', desc: 'Sabrás exactamente en qué basurero depositarlo.' },
        ].map(({ n, label, desc }) => (
          <div key={n} className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <span className="text-sm font-black text-emerald-600">{n}</span>
            </div>
            <div className="pt-0.5">
              <p className="text-base font-bold text-slate-800">{label}</p>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-emerald-500" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
          </svg>
        </div>
        <p className="text-xs font-medium text-slate-400">Tecnología MobileNet · TensorFlow.js</p>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 p-6
                    flex flex-col items-center text-center gap-5"
         style={{ minHeight: 320 }}>
      <div className="relative w-16 h-16 mt-2">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-50" />
        <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 animate-spin" />
        <div className="absolute inset-2 rounded-full bg-emerald-50 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-emerald-500"
               stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992
                 m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7
                 M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
      </div>
      <div>
        <p className="text-slate-700 font-semibold text-sm">Identificando material…</p>
        <p className="text-slate-400 text-xs mt-1">La IA está procesando tu imagen</p>
      </div>
      <div className="w-full flex flex-col gap-2.5">
        <ConfidenceBar label="Análisis de textura"     value={72} />
        <ConfidenceBar label="Reconocimiento de forma" value={58} />
        <ConfidenceBar label="Clasificación de color"  value={89} />
      </div>
    </div>
  )
}

export default function ResultPanel({ resultado, isLoading, onLimpiar }) {
  if (isLoading) return <LoadingState />
  if (!resultado) return <EmptyState />

  const { set: colorSet, nombre: nombreBin } = detectarColorSet(resultado.contenedor)
  const consejo = CONSEJOS[resultado.tipo]

  return (
    <div className="animate-fade-up flex flex-col gap-3">

      {/* Material identificado */}
      <div className={`rounded-2xl border p-5 ${colorSet.light} ${colorSet.border}`}>
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">
          Material identificado
        </p>
        <div className="flex items-center gap-2.5 mb-2">
          <div className={`w-2.5 h-2.5 rounded-full ${colorSet.dot} animate-pulse`} />
          <h2 className={`text-xl font-black ${colorSet.text}`}>{resultado.tipo}</h2>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">{resultado.descripcion}</p>

        {resultado.labels?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {resultado.labels.slice(0, 4).map((label, i) => (
              <span key={i}
                    className="text-xs bg-white/70 border border-white/80 text-slate-500
                               px-2 py-0.5 rounded-full">
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Contenedor */}
      <div className="rounded-2xl bg-white border border-slate-100 p-5">
        <p className="text-[10px] font-bold tracking-widest text-slate-300 uppercase mb-4">
          ¿Dónde depositarlo?
        </p>
        <div className="flex items-center gap-4">
          <BinIcon color={colorSet.hex} />
          <div>
            <p className="text-slate-400 text-xs mb-0.5">Contenedor</p>
            <p className={`text-2xl font-black ${colorSet.text}`}>{nombreBin}</p>
            <p className="text-slate-400 text-xs mt-1 leading-snug max-w-[150px]">
              {resultado.contenedor}
            </p>
          </div>
        </div>
      </div>

      {/* Consejo */}
      {consejo && (
        <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 flex gap-2.5">
          <span className="text-amber-400 text-base shrink-0 mt-0.5">💡</span>
          <p className="text-amber-700 text-xs leading-relaxed">{consejo}</p>
        </div>
      )}

      {/* Reset */}
      <button
        onClick={onLimpiar}
        className="w-full py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50
                   active:scale-[0.98] text-slate-400 text-sm font-medium
                   transition-all flex items-center justify-center gap-2"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"
             stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992
               m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7
               M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Clasificar otro objeto
      </button>
    </div>
  )
}