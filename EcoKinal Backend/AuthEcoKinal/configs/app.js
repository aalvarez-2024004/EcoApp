import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/users/users.routes.js'
import { swaggerSpec } from '../docs/swagger.auth.js'

export const createApp = () => {
    const app = express()

    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))

    app.use('/api/auth', authRoutes)
    app.use('/api/users', userRoutes)

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    return app
}
