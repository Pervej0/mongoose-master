import { NextFunction, Response, Request } from 'express'
import useAsyncCatch from '../../utils/useAsyncCatch'
import CustomError from '../../error/customError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '..'
import { TUser_role } from '../../modules/user/user.const'

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
      jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decode) {
          if (err) {
            throw new CustomError(
              httpStatus.UNAUTHORIZED,
              'You are not authorized!',
            )
          }
          req.user = decode as JwtPayload
        },
      )

      if (userRole && !userRole.includes(req.user.role)) {
        throw new CustomError(
          httpStatus.UNAUTHORIZED,
          'You have no permission to access there!',
        )
      }
      next()
    },
  )
}
