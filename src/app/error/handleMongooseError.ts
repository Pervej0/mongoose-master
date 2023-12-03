import mongoose from 'mongoose'
import { TCustomSimplifiedError, TErrorSources } from '../interface/error'

const handleMongooseError = (
  err: mongoose.Error.ValidationError,
): TCustomSimplifiedError => {
  const errorSources: TErrorSources = Object.values(err.errors).map((error) => {
    return {
      path: error.path,
      message: error.message,
    }
  })
  const statusCode = 400

  return {
    statusCode,
    message: 'Validation error occurs!',
    errorSources,
  }
}

export default handleMongooseError
