import express, { Router } from 'express'
import {
  CreateCourse,
  DeleteSingleCourse,
  GetAllCourse,
  GetSingleCourse,
  //   UpdateSingleCourse,
} from './course.controller'
const router = express.Router()

router.post('/create-course', CreateCourse)
router.get('/', GetAllCourse)
router.get('/:courseId', GetSingleCourse)
router.delete('/:courseId', DeleteSingleCourse)
// router.patch('/:courseId', UpdateSingleCourse)

const courseRouter: Router = router
export default courseRouter
