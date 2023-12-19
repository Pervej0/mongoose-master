import express, { Router } from 'express'
import { CreateAdmin, CreateFaculty, createAUser } from './user.controller'
import { studentZodValidationSchema } from '../student/student.zod.validation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { FacultyValidationSchema } from '../faculty/faculty.validation'
import { AdminValidationSchema } from '../admin/admin.validation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from './user.const'
// import { auth } from '../../config/middleware/auth'
const router = express.Router()

router.post(
  '/create-student',
  // auth(),
  createDataValidation(studentZodValidationSchema),
  createAUser,
)

router.post(
  '/create-faculty',
  auth(USER_ROLE.faculty),
  createDataValidation(FacultyValidationSchema),
  CreateFaculty,
)

router.post(
  '/create-admin',
  createDataValidation(AdminValidationSchema),
  CreateAdmin,
)

export const userRoutes: Router = router
