import express, { Router } from 'express'
import {
  createEnrolledCourse,
  getMYEnrolledCourse,
  updateEnrolledCourse,
} from './enrolledCourse.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { EnrolledCourseValidationSchema } from './enrolledCourse.validation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from '../user/user.const'

const router = express.Router()

router.post(
  '/create-enrolled-course',
  createDataValidation(EnrolledCourseValidationSchema),
  auth(USER_ROLE.student),
  createEnrolledCourse,
)

router.get('/my-enrolled-courses', auth(USER_ROLE.student), getMYEnrolledCourse)
router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.faculty),
  updateEnrolledCourse,
)

const enrolledCourseRouter: Router = router

export default enrolledCourseRouter
