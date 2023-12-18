import httpStatus from 'http-status'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
import { logInUserDB } from './auth.service'

export const logInUser = useAsyncCatch(async (req, res) => {
  const result = await logInUserDB(req.body)
  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User is logged in succesfully!',
    data: result,
  })
})
