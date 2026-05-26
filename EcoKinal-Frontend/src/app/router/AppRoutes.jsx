import { Routes, Route } from 'react-router-dom'

// Pages
import LandingPage        from '../../features/auth/pages/LandingPage'
import LoginPage          from '../../features/auth/pages/LoginPage'
import RegisterPage       from '../../features/auth/pages/RegisterPage'
import VerifyPage       from '../../features/auth/pages/VerifyPage'
import ForgotPasswordPage from '../../features/auth/pages/ForgotPasswordPage'

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Públicas */}
            <Route path="/"                 element={<LandingPage />} />
            <Route path="/login"            element={<LoginPage />} />
            <Route path="/register"         element={<RegisterPage />} />
            <Route path="/verify/:token"    element={<VerifyPage />} />
            <Route path="/forgot-password"  element={<ForgotPasswordPage />} />

            {/* Fallback */}
            <Route path="*"                 element={<LandingPage />} />
        </Routes>
    )
}