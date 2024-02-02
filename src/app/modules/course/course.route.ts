import express, { Router } from 'express'
import {
  AssignCourseFaculties,
  CreateCourse,
  DeleteSingleCourse,
  GetAllCourse,
  GetSingleCourse,
  GetSingleFacultyAndCourse,
  RemoveCourseFaculties,
  UpdateSingleCourse,
} from './course.controller'
import { auth } from '../../config/middleware/auth'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import {
  CourseValidationSchema,
  courseFaculitesValidationSchema,
} from './course.validation'
import { USER_ROLE } from '../user/user.const'
const router = express.Router()

router.post(
  '/create-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  createDataValidation(CourseValidationSchema),
  CreateCourse,
)
router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  GetAllCourse,
)

router.get(
  '/:courseId/faculty',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  GetSingleFacultyAndCourse,
)

router.get(
  '/:courseId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  GetSingleCourse,
)
router.delete(
  '/:courseId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  DeleteSingleCourse,
)
router.patch(
  '/:courseId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UpdateSingleCourse,
)

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  createDataValidation(courseFaculitesValidationSchema),
  AssignCourseFaculties,
)
router.delete(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RemoveCourseFaculties,
)

const courseRouter: Router = router
export default courseRouter
