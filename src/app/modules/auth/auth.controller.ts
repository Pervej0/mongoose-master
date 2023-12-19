import httpStatus from 'http-status'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
import { changePasswordDB, logInUserDB } from './auth.service'

export const logInUser = useAsyncCatch(async (req, res) => {
  const result = await logInUserDB(req.body)
  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User is logged in succesfully!',
    data: result,
  })
})

export const changePassword = useAsyncCatch(async (req, res) => {
  console.log(req.user, req.body)
  await changePasswordDB(req.user, req.body)
  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User password updated successfully succesfully!',
    data: null,
  })
})
