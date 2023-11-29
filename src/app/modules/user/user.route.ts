import express, { Router } from 'express'
import { createAUser } from './user.controller'
import studentZodValidationSchema from '../student/student.zod.validation'
import { studentValidation } from '../../config/middleware/userValidataion'
const router = express.Router()

router.post(
  '/create-student',
  studentValidation(studentZodValidationSchema),
  createAUser,
)

export const userRoutes: Router = router
