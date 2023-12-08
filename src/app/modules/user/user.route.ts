import express, { Router } from 'express'
import { CreateAdmin, CreateFaculty, createAUser } from './user.controller'
import { studentZodValidationSchema } from '../student/student.zod.validation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { FacultyValidationSchema } from '../faculty/faculty.validation'
import { AdminValidationSchema } from '../admin/admin.validation'
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

router.post(
  '/create-admin',
  createDataValidation(AdminValidationSchema),
  CreateAdmin,
)

export const userRoutes: Router = router
