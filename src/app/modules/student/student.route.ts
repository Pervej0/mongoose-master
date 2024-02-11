import express, { Router } from 'express'
import { studentControllers } from './student.controller'
import {
  UpdateStudentZodValidationSchema,
  studentZodValidationSchema,
} from './student.zod.validation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from '../user/user.const'

const router = express.Router()

// router.post(
//   '/create-student',
//   auth(USER_ROLE.student),
//   createDataValidation(studentZodValidationSchema),
//   studentControllers.createAStudent,
// )
router.get('/:studentId', studentControllers.getSingleStudent)
router.get('/', studentControllers.getAllStudent)
router.delete('/:studentId', studentControllers.updateIsDeletedField)
router.patch(
  '/:studentId',
  createDataValidation(UpdateStudentZodValidationSchema),
  studentControllers.updateSingleStudent,
)

export const StudentRoutes: Router = router
