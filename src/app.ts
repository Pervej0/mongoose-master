import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { StudentRoutes } from './app/modules/student/student.route'
import { userRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/config/middleware/globalErrorHandler'

const app: Application = express()
console.log('app')
// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/students', StudentRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome To The Server')
})

// global error handler middleware

app.use(globalErrorHandler)

export default app
