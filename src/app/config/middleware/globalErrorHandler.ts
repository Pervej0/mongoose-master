/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (
  err: { message: string },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500
  const message = err.message || 'Something Went Wrong!'

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  })
}

export default globalErrorHandler
