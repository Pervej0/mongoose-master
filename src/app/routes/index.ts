import express from 'express'
import { userRoutes } from '../modules/user/user.route'
import { StudentRoutes } from '../modules/student/student.route'
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route'
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route'
import facultyRouter from '../modules/faculty/faculty.route'
import courseRouter from '../modules/course/course.route'
import AdminRouter from '../modules/admin/admin.route'
import semesterRegistrationRouter from '../modules/semesterRegistration/semesterRegistration.route'
import offeredCourseRouter from '../modules/offeredCourse/offeredCourse.route'
import AuthRouter from '../modules/auth/auth.route'
import enrolledCourseRouter from '../modules/enrolledCourse/enrolledCourse.route'
const app = express()

const allRoutes = [
  { path: '/api/v1/users/students', route: StudentRoutes },
  { path: '/api/v1/users', route: userRoutes },
  { path: '/api/v1/academic-semesters', route: academicSemesterRouter },
  { path: '/api/v1/academic-faculties', route: academicFacultyRouter },
  { path: '/api/v1/academic-departments', route: academicDepartmentRouter },
  { path: '/api/v1/faculties', route: facultyRouter },
  { path: '/api/v1/admins', route: AdminRouter },
  { path: '/api/v1/courses', route: courseRouter },
  { path: '/api/v1/semister-registrations', route: semesterRegistrationRouter },
  { path: '/api/v1/offered-courses', route: offeredCourseRouter },
  { path: '/api/v1/enrolled-courses', route: enrolledCourseRouter },
  { path: '/api/v1/auth', route: AuthRouter },
]

allRoutes.forEach((item) => app.use(item.path, item.route))

export const routeHandler = app
