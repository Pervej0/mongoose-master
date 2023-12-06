import express, { Router } from 'express'
import { CreateFaculty, createAUser } from './user.controller'
import { studentZodValidationSchema } from '../student/student.zod.validation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { FacultyValidationSchema } from '../faculty/faculty.validation'
const router = express.Router()

router.post(
  '/create-student',
  createDataValidation(studentZodValidationSchema),
  createAUser,
)

router.post(
  '/create-faculty',
  createDataValidation(FacultyValidationSchema),
  CreateFaculty,
)

export const userRoutes: Router = router
