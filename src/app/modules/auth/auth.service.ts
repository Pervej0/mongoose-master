import httpStatus from 'http-status'
import CustomError from '../../error/customError'
import UserModel from '../user/user.modal'
import { TChangePassword, TLoginUser } from './auth.interface'
import { TUser } from '../user/user.interface'
import config from '../../config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  })

  return {
    accessToken,
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

  // update new password
  await UserModel.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
    },
  )

  // return null because i don't want to send password and data in response
  return null
}
