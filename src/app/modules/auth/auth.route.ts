import express, { Router } from 'express'
import { changePassword, logInUser } from './auth.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import {
  chagnePasswordValidationSchema,
  loginValidationSchema,
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

const AuthRouter: Router = router

export default AuthRouter
