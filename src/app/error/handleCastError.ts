import mongoose from 'mongoose'
import { TErrorSources } from '../interface/error'

const handleCastError = (error: mongoose.Error.CastError) => {
  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ]
  const statusCode = 400
  const message = 'Invalid ID'
  return {
    statusCode,
    message,
    errorSources,
  }
}

export default handleCastError
