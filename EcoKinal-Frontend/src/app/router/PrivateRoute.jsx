import { Navigate } from 'react-router-dom'
import useAuthStore from '../../features/auth/store/useAuthStore'

export const PrivateRoute = ({ children, requiredRole }) => {
  const token = useAuthStore((state) => state.token)
  const user  = useAuthStore((state) => state.user)

  if (!token) return <Navigate to="/login" replace />

  if (requiredRole && user?.role?.name !== requiredRole) {
    const role = user?.role?.name
    return <Navigate
      to={role === 'ADMIN_GENERAL' ? '/dashboard/admin' : '/dashboard/usuario'}
      replace
    />
  }

  return children
}