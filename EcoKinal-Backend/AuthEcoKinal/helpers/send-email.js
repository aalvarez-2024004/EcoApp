import nodemailer from 'nodemailer'

const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

// ─── PLANTILLA BASE ────────────────────────────────────────────────────────
const baseTemplate = ({ title, preheader, body }) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f0faf4;font-family:'Segoe UI',Arial,sans-serif;">
  <span style="display:none;max-height:0;overflow:hidden;">${preheader}</span>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0faf4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1b4332 0%,#2d6a4f 60%,#40916c 100%);border-radius:16px 16px 0 0;padding:40px 48px;text-align:center;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;">
                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:10px;">
                      <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.15)"/>
                      <path d="M8 24C8 24 10 10 24 8C24 8 26 22 8 24Z" fill="white"/>
                      <path d="M8 24C16 16 22 12 24 8" stroke="#b7e4c7" stroke-width="1.4" stroke-linecap="round"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:26px;font-weight:800;color:white;letter-spacing:-0.5px;">Eco<span style="color:#b7e4c7;">Kinal</span></span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:48px 48px 40px;border-radius:0 0 16px 16px;box-shadow:0 8px 32px rgba(27,67,50,0.10);">
              ${body}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:28px 0 8px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#8aab92;line-height:1.6;">
                © 2026 EcoKinal · Proyecto Académico Kinal<br/>
                Si no solicitaste este correo, puedes ignorarlo con seguridad.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

// ─── VERIFICACIÓN DE CUENTA ────────────────────────────────────────────────
export const sendVerificationEmail = async (email, token) => {
  const transporter = createTransporter()

  // 🔗 Link directo — el usuario solo hace clic, no copia nada
  const verificationLink = `${process.env.FRONTEND_URL}/verify/${token}`

  const body = `
    <!-- Ícono -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:#d8f3dc;border-radius:50%;width:72px;height:72px;line-height:72px;font-size:32px;">
        ✉️
      </div>
    </div>

    <!-- Título -->
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#1a2e22;text-align:center;letter-spacing:-0.3px;">
      Verifica tu cuenta
    </h1>
    <p style="margin:0 0 32px;font-size:15px;color:#5a7060;text-align:center;line-height:1.7;">
      ¡Bienvenido a EcoKinal! Haz clic en el botón para activar tu cuenta y comenzar a reciclar de forma inteligente.
    </p>

    <!-- Botón CTA -->
    <div style="text-align:center;margin-bottom:32px;">
      <a href="${verificationLink}"
         style="display:inline-block;background:linear-gradient(135deg,#2d6a4f,#40916c);color:white;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:50px;letter-spacing:0.02em;box-shadow:0 4px 16px rgba(45,106,79,0.3);">
        Verificar mi cuenta →
      </a>
    </div>

    <!-- Link alternativo -->
    <p style="margin:0 0 8px;font-size:12px;color:#8aab92;text-align:center;">
      Si el botón no funciona, copia este enlace en tu navegador:
    </p>
    <p style="margin:0 0 28px;font-size:11px;font-family:monospace;color:#40916c;text-align:center;word-break:break-all;">
      ${verificationLink}
    </p>

    <!-- Advertencia -->
    <div style="background:#f0faf4;border-left:3px solid #40916c;border-radius:0 8px 8px 0;padding:14px 16px;">
      <p style="margin:0;font-size:13px;color:#5a7060;line-height:1.6;">
        ⏱️ Este enlace expirará en <strong>1 hora</strong>. Si no creaste esta cuenta, ignora este correo.
      </p>
    </div>
  `

  await transporter.sendMail({
    from: `"EcoKinal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '✅ Verifica tu cuenta en EcoKinal',
    html: baseTemplate({
      title: 'Verifica tu cuenta — EcoKinal',
      preheader: 'Un clic y tu cuenta estará activa. Bienvenido a EcoKinal.',
      body,
    }),
  })
}

// ─── RECUPERACIÓN DE CONTRASEÑA ────────────────────────────────────────────
export const sendResetPasswordEmail = async (email, token) => {
  const transporter = createTransporter()

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

  const body = `
    <!-- Ícono -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:#d8f3dc;border-radius:50%;width:72px;height:72px;line-height:72px;font-size:32px;">
        🔒
      </div>
    </div>

    <!-- Título -->
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#1a2e22;text-align:center;letter-spacing:-0.3px;">
      Restablecer contraseña
    </h1>
    <p style="margin:0 0 32px;font-size:15px;color:#5a7060;text-align:center;line-height:1.7;">
      Recibimos una solicitud para cambiar la contraseña de tu cuenta. Haz clic en el botón para continuar.
    </p>

    <!-- Botón CTA -->
    <div style="text-align:center;margin-bottom:32px;">
      <a href="${resetLink}"
         style="display:inline-block;background:linear-gradient(135deg,#2d6a4f,#40916c);color:white;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:50px;letter-spacing:0.02em;box-shadow:0 4px 16px rgba(45,106,79,0.3);">
        Cambiar contraseña →
      </a>
    </div>

    <!-- Link alternativo -->
    <p style="margin:0 0 8px;font-size:12px;color:#8aab92;text-align:center;">
      Si el botón no funciona, copia este enlace en tu navegador:
    </p>
    <p style="margin:0 0 28px;font-size:11px;font-family:monospace;color:#40916c;text-align:center;word-break:break-all;">
      ${resetLink}
    </p>

    <!-- Advertencia -->
    <div style="background:#fff8e1;border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;padding:14px 16px;">
      <p style="margin:0;font-size:13px;color:#78580a;line-height:1.6;">
        ⏱️ Este enlace expirará en <strong>30 minutos</strong>. Si no solicitaste este cambio, ignora este correo — tu cuenta está segura.
      </p>
    </div>
  `

  await transporter.sendMail({
    from: `"EcoKinal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🔒 Recuperación de contraseña — EcoKinal',
    html: baseTemplate({
      title: 'Recuperar contraseña — EcoKinal',
      preheader: 'Solicitaste restablecer tu contraseña. El enlace expira en 30 minutos.',
      body,
    }),
  })
}