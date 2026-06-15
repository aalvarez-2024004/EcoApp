import { useState, useEffect } from 'react'
import { ScanOverlay } from '../../../../ui/DetectorReciclaje/ScanOverlay.jsx'
import SparkleClasificar from './SparkleClasificar'
import {
  G, getVisorStyle, getVideoStyle,
  capturedBgImgStyle, capturedFgImgStyle,toggleCameraBtn,
  fixedBadgeStyle, fixedBadgeDotStyle, fixedBadgeTextStyle,
  analyzingOverlayStyle, analyzingTextStyle,closeBtnStyle, closeBtnHover,
  tipCardStyle, tipIconWrapStyle, tipTitleStyle, tipBodyStyle,activarBtnStyle, activarBtnHover,
  cancelarBtnStyle, cancelarBtnHover,capturarBtnStyle, capturarBtnHover,
  reintentarBtnStyle, reintentarBtnHover,viewfinderCornerBase, viewfinderCorners,idleIconWrapStyle, idleTitleStyle, idleSubStyle,
} from '../../../../Styles/constants/CameraPanel.js'
import { CloseBtn, Viewfinder, CameraIdle } from '../../../../icons/CameraIcons.jsx'

export default function CameraPanel({
  videoRef, canvasRef,
  camaraActiva, fotoCapturada, isLoading,
  facingMode, onToggleFacingMode,
  onActivar, onDetener, onCapturar, onClasificar, onRetomar,
}) {
  const [capturedSrc, setCapturedSrc] = useState(null)

  const camIdle      = !camaraActiva && !fotoCapturada
  const camLive      = camaraActiva  && !fotoCapturada
  const camCapturada = fotoCapturada

  useEffect(() => {
    if (fotoCapturada && canvasRef.current) {
      setCapturedSrc(canvasRef.current.toDataURL('image/jpeg', 0.92))
    }
    if (!fotoCapturada) setCapturedSrc(null)
  }, [fotoCapturada])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Visor */}
      <div style={getVisorStyle(camIdle)}>

        {/* Video stream */}
        <video
          ref={videoRef} autoPlay playsInline muted
          style={getVideoStyle(camLive)}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Foto capturada */}
        {camCapturada && capturedSrc && (
          <>
            <img src={capturedSrc} aria-hidden="true" style={capturedBgImgStyle} />
            <img src={capturedSrc} alt="Foto capturada"  style={capturedFgImgStyle} />
          </>
        )}

        {camCapturada && isLoading && <ScanOverlay />}
        {camIdle      && <CameraIdle />}
        {camLive      && <Viewfinder />}

        {/* Botón cambiar cámara */}
        {camLive && (
          <button
            onClick={onToggleFacingMode}
            style={toggleCameraBtn}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            title={facingMode === 'environment' ? 'Cambiar a cámara frontal' : 'Cambiar a cámara trasera'}
          >
            <i className="ti ti-camera-rotate" style={{ fontSize: 26, color: G.green2 }} />
          </button>
        )}

        {/* Badge "Fotograma fijado" */}
        {camCapturada && !isLoading && (
          <div style={fixedBadgeStyle}>
            <div style={fixedBadgeDotStyle} />
            <span style={fixedBadgeTextStyle}>Fotograma fijado</span>
          </div>
        )}

        {/* Overlay "Analizando" */}
        {camCapturada && isLoading && (
          <div style={analyzingOverlayStyle}>
            <span style={analyzingTextStyle}>Analizando redes moleculares…</span>
          </div>
        )}

        {camCapturada && <CloseBtn onClick={onRetomar} />}
      </div>

      {/* Tip card — solo cuando no hay foto fijada */}
      {!camCapturada && (
        <div style={tipCardStyle}>
          <div style={tipIconWrapStyle}>
            <i className="ti ti-bulb" style={{ fontSize: 14, color: G.green2 }} />
          </div>
          <div>
            <p style={tipTitleStyle}>Mejores resultados</p>
            <p style={tipBodyStyle}>
              Asegúrate de que el residuo ocupe al menos el 60% del encuadre con buena iluminación.
            </p>
          </div>
        </div>
      )}

      {/* Botones según estado */}
      {camIdle && (
        <button
          onClick={onActivar}
          style={activarBtnStyle}
          onMouseEnter={e => Object.assign(e.currentTarget.style, activarBtnHover.enter)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, activarBtnHover.leave)}
        >
          <i className="ti ti-camera" style={{ fontSize: 17 }} />
          Activar cámara
        </button>
      )}

      {camLive && (
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <button
            onClick={onDetener}
            style={cancelarBtnStyle}
            onMouseEnter={e => Object.assign(e.currentTarget.style, cancelarBtnHover.enter)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, cancelarBtnHover.leave)}
          >
            Cancelar
          </button>
          <button
            onClick={onCapturar}
            style={capturarBtnStyle}
            onMouseEnter={e => Object.assign(e.currentTarget.style, capturarBtnHover.enter)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, capturarBtnHover.leave)}
          >
            <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }} stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" stroke="currentColor" />
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
            Capturar foto
          </button>
        </div>
      )}

      {camCapturada && (
        <div style={{ display: 'flex', gap: 10, width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onRetomar}
            style={reintentarBtnStyle}
            onMouseEnter={e => Object.assign(e.currentTarget.style, reintentarBtnHover.enter)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, reintentarBtnHover.leave)}
          >
            <i className="ti ti-refresh" style={{ fontSize: 15 }} />
            Reintentar
          </button>

          <div style={{ flex: '2 1 200px', display: 'flex' }}>
            <SparkleClasificar onClick={onClasificar} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  )
}