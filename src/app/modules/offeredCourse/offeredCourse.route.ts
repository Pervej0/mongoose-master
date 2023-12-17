import express, { Router } from 'express'
import {
  GetAllOfferedCourse,
  createOfferedCourse,
} from './offeredCourse.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { offeredCourseValidationSchema } from './offeredCourse.validation'
const router = express.Router()

router.post(
  '/create-offered-course',
  createDataValidation(offeredCourseValidationSchema),
  createOfferedCourse,
)
router.get('/', GetAllOfferedCourse)

const offeredCourseRouter: Router = router
export default offeredCourseRouter
