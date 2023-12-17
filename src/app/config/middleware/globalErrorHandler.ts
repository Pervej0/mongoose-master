/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import handledZodError from '../../error/handledZodError'
import { TCustomSimplifiedError, TErrorSources } from '../../interface/error'
import config from '..'
import handleMongooseError from '../../error/handleMongooseError'
import handleCastError from '../../error/handleCastError'
import handleDuplicateError from '../../error/handleDuplicateError'
import CustomError from '../../error/customError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Something Went Wrong!'

  let errorSources: TErrorSources = [
    {
      path: '',
      message: err.message,
    },
  ]

  if (err instanceof ZodError) {
    const customSimplifiedError = handledZodError(err)
    statusCode = customSimplifiedError?.statusCode
    message = customSimplifiedError?.message
    errorSources = customSimplifiedError?.errorSources
  } else if (err.name === 'ValidationError') {
    const customSimplifiedError = handleMongooseError(err)
    statusCode = customSimplifiedError.statusCode
    message = customSimplifiedError.message
    errorSources = customSimplifiedError.errorSources
  } else if (err.name === 'CastError') {
    const customSimplifiedError = handleCastError(err)
    statusCode = customSimplifiedError.statusCode
    message = customSimplifiedError.message
    errorSources = customSimplifiedError.errorSources
  } else if (err.code === 11000) {
    const customSimplifiedError = handleDuplicateError(err)
    statusCode = customSimplifiedError.statusCode
    message = customSimplifiedError.message
    errorSources = customSimplifiedError.errorSources
  } else if (err instanceof CustomError) {
    statusCode = err.statusCode
    message = err.message
    errorSources = [{ path: '', message: err?.message }]
  } else if (err instanceof Error) {
    message = err.message
    errorSources = [{ path: '', message: err?.message }]
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV ? err?.stack : null,
  })
}

export default globalErrorHandler
