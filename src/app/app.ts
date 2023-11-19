import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

// parser
app.use(express.json())
app.use(cors())

// routes
// app.use("/api/vi/student", )

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome To The Server')
})

export default app
