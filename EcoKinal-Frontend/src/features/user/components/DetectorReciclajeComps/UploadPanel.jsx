import { useRef } from 'react'
import { ScanOverlay } from '../../../../ui/DetectorReciclaje/ScanOverlay.jsx'
import SparkleClasificar from './SparkleClasificar'
import { G } from '../../../../Styles/constants/ImpactoPage.js'
import { LeafIllustration, CloseBtn } from '../../../../icons/UploadPanelIcons.jsx'
import {
  getDropZoneStyle, dropZoneHover,
  previewBgImgStyle, previewFgImgStyle,
  loadedBadgeStyle, loadedBadgeDotStyle, loadedBadgeTextStyle,
  analyzingOverlayStyle, analyzingTextStyle,
  closeBtnStyle, closeBtnHover,
  emptyContentWrapStyle, emptyTitleStyle, emptySubStyle, emptyFormatsBadgeStyle,
  tipCardStyle, tipIconWrapStyle, tipTitleStyle, tipBodyStyle,
  selectBtnStyle, selectBtnHover,
  changeBtnStyle, changeBtnHover,
} from '../../../../Styles/constants/UploadPanel.js'

export default function UploadPanel({ preview, isLoading, onSelect, onLimpiar, onClasificar }) {
  const fileInputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) onSelect(file)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Drop zone */}
      <div
        style={getDropZoneStyle(preview)}
        onClick={() => !preview && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onMouseEnter={e => { if (!preview) Object.assign(e.currentTarget.style, dropZoneHover.enter) }}
        onMouseLeave={e => { if (!preview) Object.assign(e.currentTarget.style, dropZoneHover.leave) }}
      >
        {preview ? (
          <>
            <img src={preview} aria-hidden="true" style={previewBgImgStyle} />
            <img src={preview} alt="Vista previa"  style={previewFgImgStyle} />

            {isLoading && <ScanOverlay />}

            <CloseBtn
              style={closeBtnStyle}
              hoverEnter={closeBtnHover.enter}
              hoverLeave={closeBtnHover.leave}
              onClick={e => { e.stopPropagation(); onLimpiar() }}
            />

            {/* Badge imagen cargada */}
            {!isLoading && (
              <div style={loadedBadgeStyle}>
                <div style={loadedBadgeDotStyle(G.green3)} />
                <span style={loadedBadgeTextStyle(G.green1)}>Imagen cargada</span>
              </div>
            )}

            {/* Overlay analizando */}
            {isLoading && (
              <div style={analyzingOverlayStyle}>
                <span style={analyzingTextStyle}>Analizando redes moleculares…</span>
              </div>
            )}
          </>
        ) : (
          <div style={emptyContentWrapStyle}>
            <LeafIllustration />
            <div>
              <p style={emptyTitleStyle(G.green1)}>Arrastra tu muestra aquí</p>
              <p style={emptySubStyle(G.textMuted)}>o explora archivos locales</p>
            </div>
            <span style={emptyFormatsBadgeStyle(G.green2)}>
              JPG · PNG · WEBP · máx. 5 MB
            </span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={e => onSelect(e.target.files[0])}
      />

      {/* Tip card */}
      {!preview && (
        <div style={tipCardStyle(G.border)}>
          <div style={tipIconWrapStyle}>
            <i className="ti ti-bulb" style={{ fontSize: 14, color: G.green2 }} />
          </div>
          <div>
            <p style={tipTitleStyle(G.green1)}>Mejores resultados</p>
            <p style={tipBodyStyle(G.textMuted)}>
              Asegúrate de que el residuo ocupe al menos el 60% del encuadre con buena iluminación.
            </p>
          </div>
        </div>
      )}

      {/* Botones */}
      {!preview ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          style={selectBtnStyle(G.green2)}
          onMouseEnter={e => Object.assign(e.currentTarget.style, selectBtnHover.enter)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, selectBtnHover.leave)}
        >
          <i className="ti ti-upload" style={{ fontSize: 16 }} />
          Seleccionar imagen
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 10, width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => { onLimpiar(); setTimeout(() => fileInputRef.current?.click(), 50) }}
            style={changeBtnStyle(G.border, G.green2)}
            onMouseEnter={e => Object.assign(e.currentTarget.style, changeBtnHover(G.border, G.green3).enter)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, changeBtnHover(G.border, G.green3).leave)}
          >
            <i className="ti ti-refresh" style={{ fontSize: 15 }} />
            Cambiar
          </button>

          <div style={{ flex: '2 1 200px', display: 'flex' }}>
            <SparkleClasificar onClick={onClasificar} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  )
}