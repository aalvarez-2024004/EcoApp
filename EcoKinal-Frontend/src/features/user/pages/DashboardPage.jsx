import { css } from '../../../Styles/DashboardPage.js'

export default function DashboardPage() {

    const stats = [
        {
        title: 'Objetos reciclados',
        value: '128',
        desc: 'Este mes'
        },
        {
        title: 'Puntos ecológicos',
        value: '2,450',
        desc: 'Nivel Verde'
        },
        {
        title: 'CO₂ Ahorrado',
        value: '54kg',
        desc: 'Impacto positivo'
        }
    ]

    const history = [
        'Botella plástica → Reciclable',
        'Caja de cartón → Papel',
        'Lata de aluminio → Metal',
        'Botella de vidrio → Vidrio'
    ]

    const badges = [
        '🌱 Reciclador Inicial',
        '♻️ Eco Experto',
        '🏆 Guardián Verde'
    ]

    return (
        <>
        <style>{css}</style>

        <div className="db-layout">

            {/* SIDEBAR */}
            <aside className="db-sidebar">

            <div className="db-logo">
                <div className="db-logo-icon"></div>

                <div>
                <h2>EcoKinal</h2>
                <p>Smart Recycling</p>
                </div>
            </div>

            <nav className="db-nav">
                <button className="db-nav-item active">
                Dashboard
                </button>

                <button className="db-nav-item">
                Escanear residuos
                </button>

                <button className="db-nav-item">
                Historial
                </button>

                <button className="db-nav-item">
                Centros de reciclaje
                </button>

                <button className="db-nav-item">
                Educación ambiental
                </button>
            </nav>

            <div className="db-sidebar-card">
                <h4>Nivel actual</h4>
                <strong>Eco Hero</strong>

                <div className="db-progress">
                <div className="db-progress-bar"></div>
                </div>

                <p>75% para subir de nivel</p>
            </div>

            </aside>

            {/* MAIN */}
            <main className="db-main">

            {/* TOP */}
            <div className="db-topbar">

                <div>
                <h1>Bienvenido de nuevo 👋</h1>

                <p>
                    Tu impacto ambiental sigue creciendo.
                </p>
                </div>

                <div className="db-user">
                <div className="db-avatar"></div>

                <div>
                    <strong>Usuario Eco</strong>
                    <span>Miembro verde</span>
                </div>
                </div>

            </div>

            {/* HERO */}
            <section className="db-hero">

                <div className="db-hero-content">

                <span className="db-badge">
                    Inteligencia Artificial
                </span>

                <h2>
                    Escanea residuos y descubre dónde reciclarlos
                </h2>

                <p>
                    Usa la cámara o sube una imagen para clasificar materiales automáticamente.
                </p>

                <button className="db-scan-btn">
                    Iniciar escaneo
                </button>

                </div>

                <div className="db-hero-visual">
                ♻️
                </div>

            </section>

            {/* STATS */}
            <section className="db-stats">

                {
                stats.map((s) => (
                    <div className="db-stat-card" key={s.title}>
                    <p>{s.title}</p>

                    <h3>{s.value}</h3>

                    <span>{s.desc}</span>
                    </div>
                ))
                }

            </section>

            {/* GRID */}
            <section className="db-grid">

                {/* HISTORY */}
                <div className="db-card">

                <div className="db-card-header">
                    <h3>Historial reciente</h3>
                </div>

                <div className="db-history">

                    {
                    history.map((h) => (
                        <div className="db-history-item" key={h}>
                        {h}
                        </div>
                    ))
                    }

                </div>

                </div>

                {/* BADGES */}
                <div className="db-card">

                <div className="db-card-header">
                    <h3>Logros obtenidos</h3>
                </div>

                <div className="db-badges">

                    {
                    badges.map((b) => (
                        <div className="db-badge-item" key={b}>
                        {b}
                        </div>
                    ))
                    }

                </div>

                </div>

                {/* MAP */}
                <div className="db-card db-map-card">

                <div className="db-card-header">
                    <h3>Centros de reciclaje</h3>
                </div>

                <div className="db-map-placeholder">
                    🌍 Mapa interactivo próximamente
                </div>

                </div>

            </section>

            </main>

        </div>
        </>
    )
}