import jwt from 'jsonwebtoken'
import { config } from '../configs/config.js'

export const generateJWT = (user) => {
  return jwt.sign(
    {
      uid: user.id,
      role: user.roleId,
      name: user.name || '',
      username: user.username || '',
      photo: user.image || null,
      profilePicture: user.image || null,
      image: user.image || null,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn
    }
  )
}