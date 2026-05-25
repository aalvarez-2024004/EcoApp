import nodemailer from 'nodemailer'

export const sendVerificationEmail = async (email, token) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

const verificationLink = `${token}`

  await transporter.sendMail({
    from: `"Autenticacion ECO KINAL" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verifica tu cuenta!',
    html: `
      <h2>Verifica tu cuenta</h2>
      <p>Copia este token y pegalo donde se te solicita para verificar tu cuenta:</p>
      <br>
      <a href="${verificationLink}">${verificationLink}</a>
    `
  })
}

export const sendResetPasswordEmail = async (email, token) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const resetLink = `http://localhost:3000/api/auth/reset-password?token=${token}`

  await transporter.sendMail({
    from: `"Autenticacion ECO KINAL" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Recuperación de contraseña',
    html: `
      <h2>Restablecer contraseña</h2>
      <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
      <a href="${resetLink}">${resetLink}</a>
      <br><br>
      <p>Este enlace expirará en 30 minutos.</p>
      <p>Si no solicitaste este cambio, ignora este correo.</p>
    `
  })
}
