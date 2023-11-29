import express from 'express'
import { userRoutes } from '../modules/user/user.route'
import { StudentRoutes } from '../modules/student/student.route'
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route'
const app = express()

const allRoutes = [
  { path: '/api/v1/students', route: StudentRoutes },
  { path: '/api/v1/users', route: userRoutes },
  { path: '/api/v1/academics', route: academicSemesterRouter },
]

allRoutes.forEach((item) => app.use(item.path, item.route))

export const routeHandler = app
