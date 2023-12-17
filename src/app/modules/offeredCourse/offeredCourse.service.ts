import httpStatus from 'http-status'
import SemesterRegistrationModel from '../semesterRegistration/semesterRegistration.model'
import { TOfferedCourse, TSchedule } from './offeredCourse.interface'
import CustomError from '../../error/customError'
import AcademicFacultyModel from '../academicFaculty/academicFaculty.model'
import { CourseModel } from '../course/course.model'
import FacultyModel from '../faculty/faculty.model'
import AcademicDepartmentModel from '../academicDepartment/academicDepartment.model'
import OffoeredCourseModel from './offeredCourse.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { hasTimeConflict } from './utils.offeredCourse'

export const createOfferedCourseDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload
  console.log(semesterRegistration)
  //   check semester Registerd or not
  const isSemesterRegistered =
    await SemesterRegistrationModel.findById(semesterRegistration)
  console.log(payload, 'regis')
  if (!isSemesterRegistered) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      'Semester is not registered yet!',
    )
  }
  // get academic semester id from registered semister
  const academicSemester = isSemesterRegistered.academicSemester
  console.log(isSemesterRegistered)

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

  // check is faculty has that department
  const isDepartmnetHasThisFaculty = await AcademicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  })

  if (!isDepartmnetHasThisFaculty) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      `The department of ${isAcademicDepartmentExits.name} is not belong to faculty of ${isAcademicFacultyExits.name}!`,
    )
  }

  // check if the offered course section same or not (same section in a course is not possible to create)
  const isCourseSectionSame = await OffoeredCourseModel.findOne({
    semesterRegistration,
    course,
    section,
  })
  if (isCourseSectionSame) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      `Offered course with that section already exist!`,
    )
  }

  // time confliction resolving for offered Course
  // Get the schedule of the faculty
  const newSchedule = { days, startTime, endTime }
  const assignSchedules = (await OffoeredCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')) as TSchedule[]

  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new CustomError(
      httpStatus.CONFLICT,
      'The faculty is not available at that time! choose any other day!',
    )
  }
  //   create an offered course
  const result = await OffoeredCourseModel.create({
    ...payload,
    academicSemester,
  })
  return result
}

export const GetAllOfferedCourseDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OffoeredCourseModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await offeredCourseQuery.modelQuery
  // console.log(result)
  return result
}

export const GetSingleOfferedCourseDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  const { faculty } = payload

  // check offered course
  const isOfferdCourseExist = await OffoeredCourseModel.findById(id)
  if (!isOfferdCourseExist) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Offered course not found !')
  }
  // check faculty
  const isFacultyExist = await OffoeredCourseModel.findById(id)
  if (!isFacultyExist) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      'Faculty dose not exist in that offered course!',
    )
  }
  // const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  // const semesterRegistrationStatus =
  //   await SemesterRegistration.findById(semesterRegistration);
}
