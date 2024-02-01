import httpStatus from 'http-status'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
import {
  changePasswordDB,
  forgetPasswordGetTokenDB,
  logInUserDB,
  refreshTokenDB,
  resetPasswordDB,
} from './auth.service'
import config from '../../config'

export const logInUser = useAsyncCatch(async (req, res) => {
  const result = await logInUserDB(req.body)
  const { accessToken, refreshToken, needsPasswordChange } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })
  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
  })
})

export const changePassword = useAsyncCatch(async (req, res) => {
  await changePasswordDB(req.user, req.body)
  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User password updated succesfully!',
    data: null,
  })
})

export const refreshToken = useAsyncCatch(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await refreshTokenDB(refreshToken)

  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Refresh token retrieved succesfully!',
    data: result,
  })
})

export const forgetPasswordGetToken = useAsyncCatch(async (req, res) => {
  const { id } = req.body
  const result = await forgetPasswordGetTokenDB(id)

  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Access token retrieved succesfully!',
    data: result,
  })
})

export const resetPassword = useAsyncCatch(async (req, res) => {
  const token = req.headers.authorization
  const result = await resetPasswordDB(req.body, token as string)

  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Password reseted succesfully!',
    data: result,
  })
})
