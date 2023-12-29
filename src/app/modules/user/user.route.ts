import express, { NextFunction, Request, Response, Router } from 'express'
import {
  CreateAdmin,
  CreateFaculty,
  changeStatus,
  createAUser,
  getSingleUser,
} from './user.controller'
import { studentZodValidationSchema } from '../student/student.zod.validation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { FacultyValidationSchema } from '../faculty/faculty.validation'
import { AdminValidationSchema } from '../admin/admin.validation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from './user.const'
import { changeStatusValidataionSchema } from './user.validation'
import { upload } from '../../utils/sendImageToClodudinary'
// import { auth } from '../../config/middleware/auth'
const router = express.Router()

router.post(
  '/create-student',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  createDataValidation(studentZodValidationSchema),
  createAUser,
)

router.post(
  '/create-faculty',
  auth(USER_ROLE.faculty, USER_ROLE.admin),
  createDataValidation(FacultyValidationSchema),
  CreateFaculty,
)

router.post(
  '/create-admin',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  createDataValidation(AdminValidationSchema),
  CreateAdmin,
)

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  getSingleUser,
)

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  createDataValidation(changeStatusValidataionSchema),
  changeStatus,
)

export const userRoutes: Router = router
