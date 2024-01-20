import httpStatus from 'http-status'
import CustomError from '../../error/customError'
import UserModel from '../user/user.modal'
import { TChangePassword, TLoginUser, TResetPassword } from './auth.interface'
import { TUser } from '../user/user.interface'
import config from '../../config'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { createToken, verifyToken } from './utils.auth'
import sendEmail from '../../utils/sendEmail'

export const logInUserDB = async (payload: TLoginUser) => {
  // chceck if user exist
  const user = (await UserModel.isUserExistById(payload.id)) as TUser
  if (!user) {
    throw new Error('This user is not found !')
  }
  // checking if the user is already deleted
  if (user.isDeleted) {
    throw new CustomError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }
  // checking if the user is blocked
  if (user?.status === 'blocked') {
    throw new CustomError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  //   checking if the password matched
  const passwordMatched = await UserModel.isPasswordMatched(
    payload.password,
    user.password,
  )
  if (!passwordMatched) {
    throw new CustomError(httpStatus.FORBIDDEN, 'User password do not matched!')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  }
}

export const changePasswordDB = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  // chceck if user exist
  const user = (await UserModel.isUserExistById(userData.userId)) as TUser
  if (!user) {
    throw new Error('This user is not found !')
  }
  // checking if the user is already deleted
  if (user.isDeleted) {
    throw new CustomError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }
  // checking if the user is blocked
  if (user?.status === 'blocked') {
    throw new CustomError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  //   checking if the password matched

  if (!(await UserModel.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new CustomError(httpStatus.FORBIDDEN, 'Password do not matched')

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_round),
  )

  // console.log(newHashedPassword, 'ewe')
  // update new password
  await UserModel.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordUpdatedAt: new Date(),
    },
  )

  // console.log(await UserModel.jwtIssuedAndPasswordChangedTime(user))

  // return null because i don't want to send password and data in response
  return null
}

export const refreshTokenDB = async (token: string) => {
  //   json token varified
  const decode = verifyToken(token, config.jwt_refresh_secret as string)

  const { userId, iat } = decode

  const user = await UserModel.isUserExistById(userId)

  if (!user) {
    throw new CustomError(httpStatus.FORBIDDEN, 'The user not found!')
  }
  if (user.isDeleted) {
    throw new CustomError(httpStatus.FORBIDDEN, 'The user has been deleted!')
  }
  if (user.status === 'blocked') {
    throw new CustomError(httpStatus.FORBIDDEN, 'The usr is blocked')
  }
  // check user password update so that new token can create
  const isPasswordChangedRecently =
    await UserModel.jwtIssuedAndPasswordChangedTime(
      iat as number,
      user.passwordUpdatedAt,
    )

  if (isPasswordChangedRecently) {
    throw new CustomError(
      httpStatus.FORBIDDEN,
      'You updated your password, Please sign in your account!',
    )
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return accessToken
}

export const forgetPasswordGetTokenDB = async (userId: string) => {
  // chceck if user exist
  const user = (await UserModel.isUserExistById(userId)) as TUser
  if (!user) {
    throw new Error('This user is not found !')
  }
  // checking if the user is already deleted
  if (user.isDeleted) {
    throw new CustomError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }
  // checking if the user is blocked
  if (user?.status === 'blocked') {
    throw new CustomError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  )

  const createResetLink = `${config.reset_password_client_link}/api/v1?id=${user.id}&token=${accessToken}`
  sendEmail(user.email, createResetLink)
  console.log(createResetLink, 'ee')
}

export const resetPasswordDB = async (
  payload: TResetPassword,
  token: string,
) => {
  // chceck if user exist
  const user = (await UserModel.isUserExistById(payload.id)) as TUser
  if (!user) {
    throw new Error('This user is not found !')
  }
  // checking if the user is already deleted
  if (user.isDeleted) {
    throw new CustomError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }
  // checking if the user is blocked
  if (user?.status === 'blocked') {
    throw new CustomError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }
  // check user sent valid token or not!
  const decode = verifyToken(token, config.jwt_access_secret as string)
  if (payload.id !== decode.userId) {
    throw new CustomError(httpStatus.FORBIDDEN, 'You are forbidden to access!')
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_round),
  )
  const result = await UserModel.findOneAndUpdate(
    { id: decode.userId, role: decode.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordUpdatedAt: new Date(),
    },
  )
  console.log(result, 'xxx')

  return null
}
