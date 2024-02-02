import { NextFunction, Response, Request } from 'express'
import useAsyncCatch from '../../utils/useAsyncCatch'
import CustomError from '../../error/customError'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { TUser_role } from '../../modules/user/user.const'
import UserModel from '../../modules/user/user.modal'
import { decodeToken } from '../../utils/decodeToken'

export const auth = (...userRole: TUser_role[]) => {
  return useAsyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization
      //   is token sent form client
      if (!token) {
        throw new CustomError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized!',
        )
      }
      //   json token varified
      // const decode = jwt.verify(
      //   token,
      //   config.jwt_access_secret as string,
      // ) as JwtPayload
      const decode = (await decodeToken(token)) as JwtPayload

      const { userId, role, iat } = decode
      if (userRole && !userRole.includes(role)) {
        throw new CustomError(
          httpStatus.UNAUTHORIZED,
          'You have no permission to access there!',
        )
      }
      const user = await UserModel.isUserExistById(userId)
      if (!user) {
        throw new CustomError(httpStatus.FORBIDDEN, 'The user not found!')
      }
      if (user.isDeleted) {
        throw new CustomError(
          httpStatus.FORBIDDEN,
          'The user has been deleted!',
        )
      }
      if (user.status === 'blocked') {
        throw new CustomError(httpStatus.FORBIDDEN, 'The user is blocked')
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

      req.user = decode
      next()
    },
  )
}
