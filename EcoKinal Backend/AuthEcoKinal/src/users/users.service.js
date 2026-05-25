import { User, Role } from '../models/index.js'
import { hashPassword } from '../../helpers/hash-password.js'
import bcrypt from 'bcryptjs'

export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findByPk(userId)

  if (!user) {  
    throw new Error('Usuario no encontrado')
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password)

  if (!isMatch) {
    throw new Error('Contraseña actual incorrecta')
  }

  const newHashedPassword = await hashPassword(newPassword)

  await user.update({ password: newHashedPassword })

  return { message: 'Contraseña actualizada correctamente' }
}

export const updateUserProfile = async (userId, data) => {

  const user = await User.findByPk(userId)

  if (!user) {
    throw new Error('Usuario no encontrado')
  }

  await user.update(data)

  return {
    id: user.id,
    name: user.name,
    username: user.username
  }
}
