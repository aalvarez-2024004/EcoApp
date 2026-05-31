import useAuthStore from '../../auth/store/useAuthStore'

export const getInitials = (name = '') =>
  name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('')

export const useUser = () => {
  const user = useAuthStore((state) => state.user)

  const resolvedPhoto =
    user?.profilePicture || user?.photo || user?.image || null

  return {
    user,
    id:             user?.id             || null,
    uid:            user?.id             || user?.uid || null,
    name:           user?.name           || 'Usuario',
    username:       user?.username       || '',
    email:          user?.email          || '',
    image:          resolvedPhoto,
    photo:          resolvedPhoto,
    profilePicture: resolvedPhoto,
    role:           user?.role?.name     || '',
    initials:       getInitials(user?.name || 'U'),
  }
}