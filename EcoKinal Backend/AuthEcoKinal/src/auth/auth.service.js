import { User, Role } from '../models/index.js'
import { hashPassword, comparePassword } from '../../helpers/hash-password.js'
import { generateJWT } from '../../helpers/generate-jwt.js'
import { generateVerificationToken } from '../../helpers/generate-verification-token.js'
import { sendVerificationEmail } from '../../helpers/send-email.js'
import crypto from 'crypto'
import { sendResetPasswordEmail } from '../../helpers/send-email.js'
 
import jwt from 'jsonwebtoken'
import { config } from '../../configs/config.js'
 
 
export const registerUser = async (data) => {
  const { name, username, email, password } = data
 
  if (!username) throw new Error('El nombre de usuario es obligatorio');
 
  const usernameExists = await User.findOne({ where: { username } });
  if (usernameExists) throw new Error('El nombre de usuario ya está en uso');
 
  const exists = await User.findOne({ where: { email } })
  if (exists) throw new Error('El correo ya está registrado')
 
  const clientRole = await Role.findOne({
    where: { name: 'USUARIO' }
  })
 
  const hashedPassword = await hashPassword(password)
 
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    roleId: clientRole.id,
    isActive: false
  })
 
 const verificationToken = generateVerificationToken(user)
 
 //Enviar el correo
 await sendVerificationEmail(user.email, verificationToken)
 
 
  const userWithoutPassword = user.toJSON()
  delete userWithoutPassword.password
 
  return {
    user: userWithoutPassword
  }
}
 
export const loginUser = async (email, password) => {
  const user = await User.findOne({
    where: { email },
    include: Role
  })
 
  if (!user) throw new Error('Credenciales inválidas')
 
  const validPassword = await comparePassword(password, user.password)
  if (!validPassword) throw new Error('Credenciales inválidas')
 
  if (!user.isActive) throw new Error('Usuario no aprobado')
 
  const token = generateJWT(user)
 
  return {
    token,
    user
  }
}
 
export const verifyAccount = async (token) => {
  try {
    const { uid } = jwt.verify(token, config.jwt.secret)
 
    const user = await User.findByPk(uid)
 
    if (!user) throw new Error('Usuario no encontrado')
 
    if (user.isActive) {
      return { message: 'Cuenta ya verificada' }
    }
 
    user.isActive = true
    await user.save()
 
    return { message: 'Cuenta verificada correctamente' }
 
  } catch (error) {
    throw new Error('Token inválido o expirado')
  }
}
 
export const requestPasswordReset = async (email) => {
  const user = await User.findOne({ where: { email } })

  if (!user) {
    // Por seguridad NO se dice que existe
    return { message: 'Si el correo existe, se enviará un enlace' }
  }

  const token = crypto.randomBytes(32).toString('hex')

  const expiration = new Date(Date.now() + 1000 * 60 * 30)

  await user.update({
    resetPasswordToken: token,
    resetPasswordExpires: expiration
  })

  await sendResetPasswordEmail(user.email, token)

  return {
    message: 'Si el correo existe, se enviará un enlace.'
  }
}

export const resetPassword = async (token, newPassword) => {

  const user = await User.findOne({
    where: { resetPasswordToken: token }
  })

  if (!user) {
    throw new Error('Token inválido')
  }

  if (user.resetPasswordExpires < new Date()) {
    throw new Error('Token expirado')
  }

  const hashedPassword = await hashPassword(newPassword)

  await user.update({
    password: hashedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null
  })

  return {
    message: 'Contraseña actualizada correctamente'
  }
}