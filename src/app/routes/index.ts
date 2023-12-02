import express from 'express'
import { userRoutes } from '../modules/user/user.route'
import { StudentRoutes } from '../modules/student/student.route'
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route'
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route'
const app = express()

const allRoutes = [
  { path: '/api/v1/users/students', route: StudentRoutes },
  { path: '/api/v1/users', route: userRoutes },
  { path: '/api/v1/academic-semesters', route: academicSemesterRouter },
  { path: '/api/v1/academic-faculties', route: academicFacultyRouter },
  { path: '/api/v1/academic-departments', route: academicDepartmentRouter },
]

allRoutes.forEach((item) => app.use(item.path, item.route))

export const routeHandler = app
