import express, { Router } from 'express'
import {
  DeleteOfferedCourse,
  GetAllOfferedCourse,
  GetSingleOfferdCourse,
  MyOfferedCourse,
  UpdateSingleOfferedCourse,
  createOfferedCourse,
} from './offeredCourse.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import {
  UpdateOfferedCourseValidationSchema,
  offeredCourseValidationSchema,
} from './offeredCourse.validation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from '../user/user.const'
const router = express.Router()

router.post(
  '/create-offered-course',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  createDataValidation(offeredCourseValidationSchema),
  createOfferedCourse,
)
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  GetAllOfferedCourse,
)
router.get(
  '/:courseId',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  GetSingleOfferdCourse,
)
router.put(
  '/:courseId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  createDataValidation(UpdateOfferedCourseValidationSchema),
  UpdateSingleOfferedCourse,
)

router.delete(
  '/:courseId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  DeleteOfferedCourse,
)

router.get('/my-offered-course', auth(USER_ROLE.admin), MyOfferedCourse)

const offeredCourseRouter: Router = router
export default offeredCourseRouter
