import { Response } from 'express'

type TMeta = {
  page: number
  limit: number
  total: number
  totalPage: number
}

type TResponseData<T> = {
  statusCode: number
  message: string
  meta?: TMeta
  data: T
}

const SendResponse = <T>(res: Response, data: TResponseData<T>) => {
  return res.status(data.statusCode).json({
    success: true,
    message: data.message,
    meta: data.meta,
    data: data.data,
  })
}

export default SendResponse
