import express, { Router } from 'express'
import { logInUser } from './auth.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { loginValidationSchema } from './auth.validation'
const router = express.Router()

router.post('/login', createDataValidation(loginValidationSchema), logInUser)

const AuthRouter: Router = router

export default AuthRouter
