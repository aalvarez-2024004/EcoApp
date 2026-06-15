import { BinIcon } from '../../../../icons/DetectorIcons'
import { ConfidenceBar } from '../../../../ui/DetectorReciclaje/ConfidenceBar.jsx'
import { LeafSpinner } from '../../../../ui/DetectorReciclaje/LeafSpinner.jsx'
import { detectarColorSet, CONSEJOS } from '../../../../Styles/constants/detector.styles.js'
import { G } from '../../../../Styles/constants/ImpactoPage.js'
import {
  emptyHeaderStyle, emptyHeaderIconWrapStyle, emptyHeaderLabelStyle,emptyStepNumberStyle, 
  emptyStepConnectorStyle,emptyStepBadgeStyle, emptyStepTitleStyle, emptyStepDescStyle,
  emptyFooterStyle, emptyFooterDotStyle, emptyFooterTextStyle,loadingWrapStyle, 
  loadingTitleStyle, loadingSubStyle, loadingBarsWrapStyle,resultCardStyle, 
  resultCardHeaderStyle, resultCardHeaderBadgeStyle,resultCardDotStyle, resultCardTipoStyle, 
  resultCardDescStyle,labelsWrapStyle, labelsSectionTitleStyle, labelChipStyle,
  destinoSectionStyle, destinoSectionTitleStyle, destinoRowStyle,destinoDotStyle, 
  destinoNombreStyle, destinoSubStyle,consejoWrapStyle, consejoIconWrapStyle, 
  consejoTextStyle,resetBtnStyle, resetBtnHover
} from '../../../../Styles/constants/ResultPanel.js'
import {EmptyState, LoadingState} from '../../../../icons/ResultPanelIcons.jsx'

export const STEPS = [
  {
    n: '01', label: 'Sube o captura',
    desc: 'Introduce un registro visual claro del residuo sólido.',
    icon: <i className="ti ti-upload" style={{ fontSize: 16, color: G.green2 }} />,
  },
  {
    n: '02', label: 'Google Vision Core',
    desc: 'Nuestros modelos procesan texturas y contornos vectoriales.',
    icon: <i className="ti ti-cpu" style={{ fontSize: 16, color: G.green2 }} />,
  },
  {
    n: '03', label: 'Segmentación óptima',
    desc: 'Descubre en tiempo real el contenedor ecológico correcto.',
    icon: <i className="ti ti-bell" style={{ fontSize: 16, color: G.green2 }} />,
  },
]

export default function ResultPanel({ resultado, isLoading, onLimpiar }) {
  if (isLoading) return <LoadingState />
  if (!resultado) return <EmptyState />

  const { set: colorSet, nombre: nombreBin } = detectarColorSet(resultado.contenedor)
  const consejo = CONSEJOS[resultado.tipo]
  const resetHover = resetBtnHover(G.border, G.green3)

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 14,
      height: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif",
      animation: 'fadeUp 0.35s ease both',
    }}>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`}</style>

      {/* Tarjeta material detectado */}
      <div style={resultCardStyle(G.border)}>

        {/* Header dinámico */}
        <div style={resultCardHeaderStyle(colorSet.hex)}>
          <p style={resultCardHeaderBadgeStyle(colorSet.hex)}>Material identificado</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={resultCardDotStyle(colorSet.hex)} />
                <h2 style={resultCardTipoStyle(G.green1)}>{resultado.tipo}</h2>
              </div>
              <p style={resultCardDescStyle(G.textMuted)}>{resultado.descripcion}</p>
            </div>
            <BinIcon color={colorSet.hex} size={58} />
          </div>
        </div>

        {/* Labels de detección */}
        {resultado.labels?.length > 0 && (
          <div style={labelsWrapStyle(G.border)}>
            <p style={labelsSectionTitleStyle(G.textSub)}>Metadatos de detección</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {resultado.labels.slice(0, 4).map((label, i) => (
                <span key={i} style={labelChipStyle(G.border, G.green2)}>{label}</span>
              ))}
            </div>
          </div>
        )}

        {/* Destino */}
        <div style={destinoSectionStyle}>
          <p style={destinoSectionTitleStyle(G.textSub)}>Ubicación de depósito</p>
          <div style={destinoRowStyle(G.border)}>
            <div style={destinoDotStyle(colorSet.hex)} />
            <div>
              <p style={destinoNombreStyle(G.green1)}>Contenedor {nombreBin}</p>
              <p style={destinoSubStyle(G.textMuted)}>{resultado.contenedor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consejo */}
      {consejo && (
        <div style={consejoWrapStyle}>
          <div style={consejoIconWrapStyle}>
            <i className="ti ti-leaf" style={{ fontSize: 14 }} />
          </div>
          <p style={consejoTextStyle}>{consejo}</p>
        </div>
      )}

      {/* Botón reinicio */}
      <button
        onClick={onLimpiar}
        style={resetBtnStyle(G.border, G.green2)}
        onMouseEnter={e => Object.assign(e.currentTarget.style, resetHover.enter)}
        onMouseLeave={e => Object.assign(e.currentTarget.style, resetHover.leave)}
      >
        <i className="ti ti-refresh" style={{ fontSize: 15 }} />
        Escanear nueva muestra
      </button>
    </div>
  )
}