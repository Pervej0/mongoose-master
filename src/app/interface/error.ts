export type TErrorSources = {
  path: string | number
  message: string
}[]

export type TCustomSimplifiedError = {
  statusCode: number
  message: string
  errorSources: TErrorSources
}
