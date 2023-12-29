import express from 'express'
import { createEnrolledCourse } from './enrolledCourse.controller'
const router = express.Router()

router.post('create-enrolled-course', createEnrolledCourse)

const enrolledCourseRouter = router

export default enrolledCourseRouter
