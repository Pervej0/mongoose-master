import { TErrorSources } from '../interface/error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (error: any) => {
  // Extract value within double quotes using regex
  const match = error.message.match(/"([^"]*)"/)

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1]
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists!`,
    },
  ]
  const statusCode = 400
  const message = 'duplicate error!'
  return {
    statusCode,
    message,
    errorSources,
  }
}

export default handleDuplicateError
