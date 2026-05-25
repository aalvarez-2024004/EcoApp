import { Routes, Route } from 'react-router-dom'

// Auth
import LandingPage from '../../features/auth/pages/LandingPage'

export const AppRoutes = () => {
    return (
        <Routes>

            {/* Públicas */}
            <Route path="/"              element={<LandingPage />} />
            <Route path="*"              element={<LandingPage />} /> 

        </Routes>
    )
}