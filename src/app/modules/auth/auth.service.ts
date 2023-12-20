import httpStatus from 'http-status'
import CustomError from '../../error/customError'
import UserModel from '../user/user.modal'
import { TChangePassword, TLoginUser } from './auth.interface'
import { TUser } from '../user/user.interface'
import config from '../../config'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { createToken } from './utils.auth'
import jwt from 'jsonwebtoken'

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

  console.log(payload.password, user.password, 'xxxx')
  //   checking if the password matched
  if (await UserModel.isPasswordMatched(payload.password, user.password)) {
    throw new CustomError(
      httpStatus.FORBIDDEN,
      'User password dose not matched!',
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
  const decode = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload

  const { userId, iat } = decode

  const user = await UserModel.isUserExistById(userId)

  if (!user) {
    throw new CustomError(httpStatus.FORBIDDEN, 'The user not found!')
  }
  if (user.isDeleted) {
    throw new CustomError(httpStatus.FORBIDDEN, 'The user has been deleted!')
  }
  if (user.status === 'blocked') {
    throw new CustomError(httpStatus.FORBIDDEN, 'The usr is')
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
