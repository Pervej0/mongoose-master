import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/config/middleware/globalErrorHandler'
import notFound from './app/config/middleware/notFound'
import { routeHandler } from './app/routes'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use(routeHandler)

// testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome To The Server')
})

// global error handler middleware
app.use(globalErrorHandler)
//  notFound routes
app.use(notFound)

export default app
