import express, { Router } from 'express'
import {
  changePassword,
  forgetPasswordGetToken,
  logInUser,
  refreshToken,
} from './auth.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import {
  chagnePasswordValidationSchema,
  forgetPasswordValidationSchema,
  loginValidationSchema,
  refreshValidationSchema,
} from './auth.validation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from '../user/user.const'
const router = express.Router()

router.post('/login', createDataValidation(loginValidationSchema), logInUser)
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  createDataValidation(chagnePasswordValidationSchema),
  changePassword,
)

router.post(
  '/refresh-token',
  createDataValidation(refreshValidationSchema),
  refreshToken,
)
router.post(
  '/forget-password',
  createDataValidation(forgetPasswordValidationSchema),
  forgetPasswordGetToken,
)

const AuthRouter: Router = router

export default AuthRouter
