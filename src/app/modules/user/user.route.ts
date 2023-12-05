import express, { Router } from 'express'
import { createAUser } from './user.controller'
import { studentZodValidationSchema } from '../student/student.zod.validation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
// import { facultyValidationSchema } from '../faculty/faculty.validation'
import { CreateFaculty } from '../faculty/faculty.controller'
const router = express.Router()

router.post(
  '/create-student',
  createDataValidation(studentZodValidationSchema),
  createAUser,
)

router.post('/create-faculty', CreateFaculty)

export const userRoutes: Router = router
