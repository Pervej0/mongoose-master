import express, { Router } from 'express'
import { CreateFaculty, createAUser } from './user.controller'
import { studentZodValidationSchema } from '../student/student.zod.validation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { facultyValidationSchema } from '../faculty/faculty.validation'
const router = express.Router()

router.post(
  '/create-student',
  createDataValidation(studentZodValidationSchema),
  createAUser,
)

router.post(
  '/create-faculty',
  createDataValidation(facultyValidationSchema),
  CreateFaculty,
)

export const userRoutes: Router = router
