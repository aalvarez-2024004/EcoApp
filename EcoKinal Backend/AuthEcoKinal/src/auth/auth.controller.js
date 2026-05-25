import * as authService from './auth.service.js'

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body


    if (!name || name.trim() === '') {
      return res.status(400).json({
        message: 'El nombre es obligatorio'
      })
    }

    if (!username || username.trim() === '') {
      return res.status(400).json({
        message: 'El nombre de usuario es obligatorio'
      })
    }

    if (!email || email.trim() === '') {
      return res.status(400).json({
        message: 'El correo electrónico es obligatorio'
      })
    }

    if (!password || password.trim() === '') {
      return res.status(400).json({
        message: 'La contraseña no puede ir nula o vacía'
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'La contraseña debe tener al menos 8 caracteres'
      })
    }

    const result = await authService.registerUser({
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      password
    })

    res.status(201).json(result)

  } catch (error) {

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: error.errors.map(e => e.message)
      })
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: error.errors.map(e => e.message)
      })
    }

    res.status(400).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await authService.loginUser(email, password)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const verify = async (req, res) => {
  try {
    const { token } = req.params
    const result = await authService.verifyAccount(token)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const result = await authService.requestPasswordReset(email)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body
    const result = await authService.resetPassword(token, newPassword)
    res.json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}