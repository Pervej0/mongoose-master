import OffoeredCourseModel from '../offeredCourse/offeredCourse.model'
import { TEnrolledCourse } from './enrolledCourse.interface'
import CustomError from '../../error/customError'
import httpStatus from 'http-status'
import { StudentModel } from '../student/student.model'
import EnrolledCourseModel from './enrolledCourse.model'

export const createEnrolledCourseDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  // step:1- check offeredCourse exist
  const { offeredCourse } = payload
  const OfferedCourseExist = await OffoeredCourseModel.findById(offeredCourse)
  if (!OfferedCourseExist) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      'Offered course dose not exist!',
    )
  }

  // step:2-check if the  student is already enrolled
  const student = await StudentModel.findOne({ id: userId }).select('_id')
  const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
    student: student?._id,
    offeredCourse,
    semesterRegistration: OfferedCourseExist.semesterRegistration,
  })
  if (isStudentAlreadyEnrolled) {
    throw new CustomError(httpStatus.CONFLICT, 'Student Already enrolled!')
  }

  if (OfferedCourseExist.maxCapacity <= 0) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Room is full!')
  }
  const result = await EnrolledCourseModel.create({
    semesterRegistration: OfferedCourseExist.semesterRegistration,
    academicSemester: OfferedCourseExist.academicSemester,
    academicFaculty: OfferedCourseExist.academicFaculty,
    academicDepartment: OfferedCourseExist.academicDepartment,
    offeredCourse,
    course: OfferedCourseExist.course,
    student: student?._id,
    faculty: OfferedCourseExist.faculty,
    isEnrolled: true,
  })
  if (!result) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to enroll!')
  }

  const maxCapacity = OfferedCourseExist.maxCapacity
  await OffoeredCourseModel.findByIdAndUpdate(offeredCourse, {
    maxCapacity: maxCapacity - 1,
    // create an enrolled course
  })
}
