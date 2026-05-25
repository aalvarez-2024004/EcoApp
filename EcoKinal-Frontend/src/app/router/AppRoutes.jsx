import { Routes, Route } from 'react-router-dom'

// Pages
import LandingPage        from '../../features/auth/pages/LandingPage'
import LoginPage          from '../../features/auth/pages/LoginPage'
import RegisterPage       from '../../features/auth/pages/RegisterPage'

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Públicas */}
            <Route path="/"                 element={<LandingPage />} />
            <Route path="/login"            element={<LoginPage />} />
            <Route path="/register"         element={<RegisterPage />} />

            {/* Fallback */}
            <Route path="*"                 element={<LandingPage />} />
        </Routes>
    )
}