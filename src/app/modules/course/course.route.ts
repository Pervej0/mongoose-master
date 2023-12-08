import express, { Router } from 'express'
import {
  AssignCourseFaculties,
  CreateCourse,
  DeleteSingleCourse,
  GetAllCourse,
  GetSingleCourse,
  RemoveCourseFaculties,
  UpdateSingleCourse,
} from './course.controller'
const router = express.Router()

router.post('/create-course', CreateCourse)
router.get('/', GetAllCourse)
router.get('/:courseId', GetSingleCourse)
router.delete('/:courseId', DeleteSingleCourse)
router.patch('/:courseId', UpdateSingleCourse)
router.put('/:courseId/assign-faculties', AssignCourseFaculties)
router.delete('/:courseId/assign-faculties', RemoveCourseFaculties)

const courseRouter: Router = router
export default courseRouter
