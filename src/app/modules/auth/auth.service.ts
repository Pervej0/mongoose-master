import httpStatus from 'http-status'
import CustomError from '../../error/customError'
import UserModel from '../user/user.modal'
import { TLoginUser } from './auth.interface'
import { TUser } from '../user/user.interface'

export const logInUserDB = async (payload: TLoginUser) => {
  // chceck if user exist
  const user = (await UserModel.isUserExistById(payload.id)) as TUser
  console.log(user, 'eeeee')
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
  return null
}
