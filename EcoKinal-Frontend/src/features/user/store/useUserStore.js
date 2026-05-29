import useAuthStore from '../../auth/store/useAuthStore'

export const getInitials = (name = '') =>
  name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('')

export const useUser = () => {
  const user = useAuthStore((state) => state.user)

  return {
    user,
    id:       user?.id       || null,
    name:     user?.name     || 'Usuario',
    username: user?.username || '',
    email:    user?.email    || '',
    image:    user?.image    || null,
    role:     user?.role?.name || '',
    initials: getInitials(user?.name || 'U'),
  }
}