import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'

// Auth pages
import LandingPage        from '../../features/auth/pages/LandingPage'
import LoginPage          from '../../features/auth/pages/LoginPage'
import RegisterPage       from '../../features/auth/pages/RegisterPage'
import VerifyPage         from '../../features/auth/pages/VerifyPage'
import ForgotPasswordPage from '../../features/auth/pages/ForgotPasswordPage'
import ResetPasswordPage  from '../../features/auth/pages/ResetPasswordPage'

// User
import DashboardLayout from '../../features/user/layout/DashboardLayout'
import DashboardPage   from '../../features/user/pages/DashboardPage'
import ForoPage        from '../../features/user/pages/ForoPage'

export const AppRoutes = () => {
  return (
    <Routes>

      {/* ── Públicas ── */}
      <Route path="/"                element={<LandingPage />} />
      <Route path="/login"           element={<LoginPage />} />
      <Route path="/register"        element={<RegisterPage />} />
      <Route path="/verify/:token"   element={<VerifyPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password"  element={<ResetPasswordPage />} />

      {/* ── Usuario ── */}
      <Route path="/dashboard/usuario" element={
        <PrivateRoute requiredRole="USUARIO">
          <DashboardLayout />
        </PrivateRoute>
      }>
        <Route index         element={<DashboardPage />} />
        <Route path="detector" element={<div style={{ padding: 24 }}>Detector (próximamente)</div>} />
        <Route path="foro"     element={<ForoPage />} />
        <Route path="puntos"   element={<div style={{ padding: 24 }}>Gamificación (próximamente)</div>} />
        <Route path="impacto"  element={<div style={{ padding: 24 }}>Mi impacto (próximamente)</div>} />
        <Route path="mapa"     element={<div style={{ padding: 24 }}>Mapa (próximamente)</div>} />
      </Route>

      {/* ── Fallback ── */}
      <Route path="*" element={<LandingPage />} />

    </Routes>
  )
}