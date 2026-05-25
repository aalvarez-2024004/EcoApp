import { changePassword, updateUserProfile } from './users.service.js'

export const updateMyPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    const response = await changePassword(
      req.user.id,
      currentPassword,
      newPassword
    )

    res.json(response)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


export const updateProfile = async (req, res) => {
  try {
    const { name, username } = req.body

    if (!name || name.trim() === '') {
      return res.status(400).json({
        error: 'El nombre no puede estar vacío'
      })
    }

    if (!username || username.trim() === '') {
      return res.status(400).json({
        error: 'El nombre de usuario no puede estar vacío'
      })
    }

    const updatedUser = await updateUserProfile(req.user.id, {
      name: name.trim(),
      username: username.trim()
    })

    res.json({
      message: 'Usuario actualizado correctamente',
      user: updatedUser
    })

  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}