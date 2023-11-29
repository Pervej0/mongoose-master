import { Response, Request } from 'express'
import httpStatus from 'http-status'

const notFound = (req: Request, res: Response) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'The API Not Found',
    error: '',
  })
}

export default notFound
