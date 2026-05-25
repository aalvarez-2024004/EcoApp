import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AuthEcoKinal API',
      version: '1.0.0',
      description: 'Sistema de autenticación con JWT, roles y recuperación de contraseña'
    },
    servers: [
      {
        url: 'http://localhost:3005',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        RegisterRequest: {
          type: 'object',
          required: ['name', 'username', 'email', 'password'],
          properties: {
            name: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string', minLength: 8 }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' }
          }
        },
        ForgotPasswordRequest: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string' }
          }
        },
        ResetPasswordRequest: {
          type: 'object',
          required: ['token', 'newPassword'],
          properties: {
            token: { type: 'string' },
            newPassword: { type: 'string', minLength: 8 }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            isActive: { type: 'boolean' },
            roleId: { type: 'string' }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: { $ref: '#/components/schemas/User' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/**/*.js']
}

export const swaggerSpec = swaggerJsdoc(options)