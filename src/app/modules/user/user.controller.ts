import { RequestHandler } from 'express'
import { createAUserDB } from './user.service'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'

export const createAUser: RequestHandler = useAsyncCatch(async (req, res) => {
  const { password, student: studentData } = req.body
  const result = await createAUserDB(password, studentData)

  SendResponse(res, {
    statusCode: 200,
    message: 'Successfully user has been created!',
    data: result,
  })
})
