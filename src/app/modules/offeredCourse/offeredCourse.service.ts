import httpStatus from 'http-status'
import SemesterRegistrationModel from '../semesterRegistration/semesterRegistration.model'
import { TOfferedCourse } from './offeredCourse.interface'
import CustomError from '../../error/customError'
import AcademicFacultyModel from '../academicFaculty/academicFaculty.model'
import { CourseModel } from '../course/course.model'
import FacultyModel from '../faculty/faculty.model'
import AcademicDepartmentModel from '../academicDepartment/academicDepartment.model'
import OffoeredCourseModel from './offeredCourse.model'

export const createOfferedCourseDB = async (payload: TOfferedCourse) => {
  const {
    registeredSemester,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload
  //   check semester Registerd or not
  const isSemesterRegistered = await SemesterRegistrationModel.findById({
    _id: registeredSemester,
  })
  console.log(payload, 'regis')
  if (!isSemesterRegistered) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      'Semester is not registered yet!',
    )
  }
  // get academic semester id from registered semister
  const academicSemester = isSemesterRegistered.academicSemester

  //   academic faculty check
  const isAcademicFacultyExits = await AcademicFacultyModel.findById({
    _id: academicFaculty,
  })

  if (!isAcademicFacultyExits) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Academic Faculty not found !')
  }

  //   academic departements check
  const isAcademicDepartmentExits =
    await AcademicDepartmentModel.findById(academicDepartment)

  if (!isAcademicDepartmentExits) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      'Academic Department not found !',
    )
  }

  //   course check
  const isCourseExits = await CourseModel.findById(course)

  if (!isCourseExits) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Course not found !')
  }

  //   faculty check
  const isFacultyExits = await FacultyModel.findById(faculty)

  if (!isFacultyExits) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Faculty not found !')
  }

  //   create an offered course
  const result = await OffoeredCourseModel.create({
    ...payload,
    academicSemester,
  })

  return result
}
