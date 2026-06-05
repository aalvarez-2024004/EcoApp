import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'

// Auth pages
import {LandingPage}        from '../../features/auth/pages/LandingPage'
import LoginPage          from '../../features/auth/pages/LoginPage'
import RegisterPage       from '../../features/auth/pages/RegisterPage'
import VerifyPage         from '../../features/auth/pages/VerifyPage'
import ForgotPasswordPage from '../../features/auth/pages/ForgotPasswordPage'
import ResetPasswordPage  from '../../features/auth/pages/ResetPasswordPage'

// User
import DashboardLayout   from '../../features/user/layout/DashboardLayout'
import DashboardPage     from '../../features/user/pages/DashboardPage'
import ForoPage          from '../../features/user/pages/ForoPage'
import DetectorReciclaje from '../../features/user/pages/DetectorReciclajePage'
import GamificacionPage  from '../../features/user/pages/GamificacionPage'
import MapaPage          from '../../features/user/pages/MapaPage'
import ImpactoPage       from '../../features/user/pages/ImpactoPage'

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
        <Route index           element={<DashboardPage />} />
        <Route path="detector" element={<DetectorReciclaje />} />
        <Route path="foro"     element={<ForoPage />} />
        <Route path="puntos"   element={<GamificacionPage />} />
        <Route path="impacto"  element={<ImpactoPage />} />
        <Route path="mapa"     element={<MapaPage />} />
      </Route>

      {/* ── Fallback ── */}
      <Route path="*" element={<LandingPage />} />

    </Routes>
  )
}
