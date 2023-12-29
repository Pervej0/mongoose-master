import OffoeredCourseModel from '../offeredCourse/offeredCourse.model'
import { TEnrolledCourse } from './enrolledCourse.interface'
import CustomError from '../../error/customError'
import httpStatus from 'http-status'
import { StudentModel } from '../student/student.model'
import EnrolledCourseModel from './enrolledCourse.model'
import mongoose from 'mongoose'
import SemesterRegistrationModel from '../semesterRegistration/semesterRegistration.model'

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
  const student = await StudentModel.findOne({ id: userId }, { _id: 1 })
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

  // total enrolled credits + new enroll credit > maxCredits (maxCredit is fixed for per semester)

  const maxCreditsForSemester = await SemesterRegistrationModel.findById(
    { id: OfferedCourseExist.semesterRegistration },
    { maxCredit: 1 },
  )

  const maxCredits = maxCreditsForSemester?.maxCredit

  const enrolledCourse = await EnrolledCourseModel.aggregate([
    // step-1
    {
      $match: {
        semesterRegistration: OfferedCourseExist.semesterRegistration,
        student: student?._id,
      },
    },
  ])

  return
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const result = await EnrolledCourseModel.create(
      [
        {
          semesterRegistration: OfferedCourseExist.semesterRegistration,
          academicSemester: OfferedCourseExist.academicSemester,
          academicFaculty: OfferedCourseExist.academicFaculty,
          academicDepartment: OfferedCourseExist.academicDepartment,
          offeredCourse,
          course: OfferedCourseExist.course,
          student: student?._id,
          faculty: OfferedCourseExist.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    )

    if (!result) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to enroll!')
    }

    const maxCapacity = OfferedCourseExist.maxCapacity
    await OffoeredCourseModel.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    })

    await session.commitTransaction()
    await session.endSession()

    return result
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}
