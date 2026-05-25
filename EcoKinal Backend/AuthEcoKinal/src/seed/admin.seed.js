import { User, Role } from '../models/index.js'
import { hashPassword } from '../../helpers/hash-password.js'

export const seedAdminGeneral = async () => {
  const adminRole = await Role.findOne({
    where: { name: 'ADMIN_GENERAL' }
  })

  const exists = await User.findOne({
    where: { email: 'adminecokinal@gmail.com' }
  })

  if (!exists) {
    const hashedPassword = await hashPassword('adminKinalero2026')

    await User.create({
      username: 'admin',
      name: 'Super Admin',
      email: 'adminecokinal@gmail.com',
      password: hashedPassword,
      roleId: adminRole.id,
      isActive: true
    })

    console.log('ADMIN_GENERAL se ha creado automáticamente ;D')
  }
}
