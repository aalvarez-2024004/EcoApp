import * as authService from './auth.service.js'

export const register = async (req, res) => {
  try {

    const { name, username, email, password } = req.body

    const image = req.file?.path || null

    // =========================
    // VALIDACIONES
    // =========================

    if (!name || name.trim() === '') {
      return res.status(400).json({
        ok: false,
        message: 'El nombre es obligatorio'
      })
    }

    if (!username || username.trim() === '') {
      return res.status(400).json({
        ok: false,
        message: 'El nombre de usuario es obligatorio'
      })
    }

    if (!email || email.trim() === '') {
      return res.status(400).json({
        ok: false,
        message: 'El correo electrónico es obligatorio'
      })
    }

    if (!password || password.trim() === '') {
      return res.status(400).json({
        ok: false,
        message: 'La contraseña no puede ir nula o vacía'
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        ok: false,
        message: 'La contraseña debe tener al menos 8 caracteres'
      })
    }

    // =========================
    // DEBUG BODY
    // =========================

    console.log('========= BODY =========')
    console.log(req.body)

    console.log('========= FILE =========')
    console.log(req.file)

    // =========================
    // REGISTER
    // =========================

    const result = await authService.registerUser({
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      password,
      image
    })

    return res.status(201).json({
      ok: true,
      message: 'Usuario registrado correctamente',
      data: result
    })

  } catch (error) {

    console.error('\n========== ERROR REGISTER ==========')

    console.error('MENSAJE:')
    console.error(error.message)

    console.error('\nNOMBRE:')
    console.error(error.name)

    console.error('\nSTACK:')
    console.error(error.stack)

    console.error('\nERROR COMPLETO:')
    console.error(error)

    // =========================
    // SEQUELIZE VALIDATION
    // =========================

    if (error.name === 'SequelizeValidationError') {

      console.error('\nSEQUELIZE VALIDATION ERRORS:')
      console.error(error.errors)

      return res.status(400).json({
        ok: false,
        type: 'SequelizeValidationError',
        message: error.errors.map(e => e.message)
      })
    }

    // =========================
    // SEQUELIZE UNIQUE
    // =========================

    if (error.name === 'SequelizeUniqueConstraintError') {

      console.error('\nSEQUELIZE UNIQUE ERRORS:')
      console.error(error.errors)

      return res.status(400).json({
        ok: false,
        type: 'SequelizeUniqueConstraintError',
        message: error.errors.map(e => e.message)
      })
    }

    // =========================
    // MULTER ERROR
    // =========================

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        ok: false,
        type: 'MulterError',
        message: 'La imagen excede el tamaño permitido'
      })
    }

    // =========================
    // ERROR GENERAL
    // =========================

    return res.status(500).json({
      ok: false,
      type: error.name || 'InternalServerError',
      message: error.message || 'Error interno del servidor',
      stack:
        process.env.NODE_ENV === 'development'
          ? error.stack
          : undefined
    })
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