import { ZodError } from 'zod'
import { TCustomSimplifiedError, TErrorSources } from '../interface/error'

export const handledZodError = (error: ZodError): TCustomSimplifiedError => {
  const errorSources: TErrorSources = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }
  })
  const statusCode = 400
  const message = 'Validation error occur!'
  return {
    statusCode,
    message,
    errorSources,
  }
}
