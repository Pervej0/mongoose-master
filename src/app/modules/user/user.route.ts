import express, { Router } from 'express'
import { createAUser } from './user.controller'
import studentZodValidationSchema from '../student/student.zod.validation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
const router = express.Router()

router.post(
  '/create-student',
  createDataValidation(studentZodValidationSchema),
  createAUser,
)

export const userRoutes: Router = router
