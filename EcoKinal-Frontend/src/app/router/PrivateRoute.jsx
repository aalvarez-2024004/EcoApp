import { Navigate } from 'react-router-dom'
import useAuthStore from '../../features/auth/store/useAuthStore'

export const PrivateRoute = ({ children, requiredRole }) => {
  const token = useAuthStore((state) => state.token)
  const user  = useAuthStore((state) => state.user)

  // Sin token → login
  if (!token) return <Navigate to="/login" replace />

  // Rol incorrecto → redirige a su propio dashboard
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate 
      to={user?.role === 'ADMIN_GENERAL' ? '/dashboard/admin' : '/dashboard/usuario'} 
      replace 
    />
  }

  return children
}