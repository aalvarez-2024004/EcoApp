import { PARTICLE_STYLES, SPARKLE_CSS } from '../../../../Styles/constants/SparkleClasificar.js'

export default function SparkleClasificar({ onClick, isLoading = false, disabled = false }) {
  const isDisabled = isLoading || disabled

  return (
    <>
      <style>{SPARKLE_CSS}</style>

      <div className="sparkle-eco-wrap">

        <button
          className="sparkle-eco-btn"
          onClick={onClick}
          disabled={isDisabled}
          aria-label="Clasificar material"
        >
          <span className="spark-eco" aria-hidden="true" />
          <span className="backdrop-eco" aria-hidden="true" />

          {/* Icono sparkle / spinner */}
          {isLoading ? (
            <svg className="eco-spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          ) : (
            <span className="sparkle-eco-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.187 8.096L15 5.25L15.813 8.096C16.023 8.831 16.417 9.501 16.958 10.041C17.498 10.582 18.168 10.976 18.903 11.186L21.75 12L18.904 12.813C18.169 13.023 17.499 13.417 16.959 13.958C16.418 14.498 16.024 15.168 15.814 15.903L15 18.75L14.187 15.904C13.977 15.169 13.583 14.499 13.042 13.959C12.502 13.418 11.832 13.024 11.097 12.814L8.25 12L11.096 11.187C11.831 10.977 12.501 10.583 13.041 10.042C13.582 9.502 13.976 8.832 14.186 8.097L14.187 8.096Z"
                  fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                />
                <path
                  d="M6 14.25L5.741 15.285C5.593 15.879 5.286 16.421 4.853 16.853C4.421 17.286 3.879 17.593 3.285 17.741L2.25 18L3.285 18.259C3.879 18.407 4.421 18.714 4.853 19.147C5.286 19.579 5.593 20.121 5.741 20.715L6 21.75L6.259 20.715C6.407 20.122 6.714 19.580 7.146 19.147C7.579 18.714 8.121 18.408 8.714 18.259L9.75 18L8.714 17.741C8.121 17.593 7.579 17.286 7.146 16.853C6.714 16.420 6.407 15.878 6.259 15.285L6 14.25Z"
                  fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                />
                <path
                  d="M6.5 4L6.303 4.591C6.248 4.757 6.155 4.908 6.031 5.031C5.908 5.155 5.757 5.248 5.591 5.303L5 5.5L5.591 5.697C5.757 5.752 5.908 5.845 6.031 5.969C6.155 6.092 6.248 6.243 6.303 6.408L6.5 7L6.697 6.408C6.752 6.243 6.845 6.092 6.969 5.969C7.092 5.845 7.243 5.752 7.408 5.697L8 5.5L7.408 5.303C7.243 5.248 7.092 5.155 6.969 5.031C6.845 4.908 6.752 4.757 6.697 4.591L6.5 4Z"
                  fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </span>
          )}

          <span className="sparkle-eco-text">
            {isLoading ? 'Analizando…' : 'Clasificar Material'}
          </span>
        </button>

        {/* Partículas */}
        <span aria-hidden="true" className="particle-pen-eco">
          {PARTICLE_STYLES.map((style, i) => (
            <svg
              key={i}
              className="particle-eco"
              style={style}
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.937 3.846L7.75 1L8.563 3.846C8.773 4.581 9.167 5.251 9.708 5.791C10.248 6.332 10.918 6.726 11.653 6.936L14.5 7.75L11.654 8.563C10.919 8.773 10.249 9.167 9.709 9.708C9.168 10.248 8.774 10.918 8.564 11.653L7.75 14.5L6.937 11.654C6.727 10.919 6.333 10.249 5.792 9.709C5.252 9.168 4.582 8.774 3.847 8.564L1 7.75L3.846 6.937C4.581 6.727 5.251 6.333 5.791 5.792C6.332 5.252 6.726 4.582 6.936 3.847L6.937 3.846Z" />
            </svg>
          ))}
        </span>
      </div>
    </>
  )
}