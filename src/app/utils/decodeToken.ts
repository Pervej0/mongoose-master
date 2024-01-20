import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import CustomError from '../error/customError'
import httpStatus from 'http-status'

export const decodeToken = async (token: string) => {
  try {
    const decode = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload
    return decode
  } catch {
    throw new CustomError(httpStatus.UNAUTHORIZED, 'User is not Authorized')
  }
}
