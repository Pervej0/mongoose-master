import express, { Router } from 'express'
import { createOfferedCourse } from './offeredCourse.controller'
// import { createDataValidation } from '../../config/middleware/createDataValidation'
// import offeredCourseValidationSchema from './offeredCourse.validation'
const router = express.Router()

router.post(
  '/create-offered-course',
  //   createDataValidation(offeredCourseValidationSchema),
  createOfferedCourse,
)

const offeredCourseRouter: Router = router
export default offeredCourseRouter
