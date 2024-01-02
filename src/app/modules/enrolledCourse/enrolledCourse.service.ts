import OffoeredCourseModel from '../offeredCourse/offeredCourse.model'
import { TEnrolledCourse } from './enrolledCourse.interface'
import CustomError from '../../error/customError'
import httpStatus from 'http-status'
import { StudentModel } from '../student/student.model'
import EnrolledCourseModel from './enrolledCourse.model'
import mongoose from 'mongoose'
import SemesterRegistrationModel from '../semesterRegistration/semesterRegistration.model'
import { CourseModel } from '../course/course.model'
import FacultyModel from '../faculty/faculty.model'
import { CountGradeAndPoints } from './enrolledCourse.utils'

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
    { _id: OfferedCourseExist.semesterRegistration },
    { maxCredit: 1 },
  )

  const maxCredits = maxCreditsForSemester?.maxCredit

  const enrolledCourseTotallCredits = await EnrolledCourseModel.aggregate([
    // step-1
    {
      $match: {
        semesterRegistration: OfferedCourseExist.semesterRegistration,
        student: student?._id,
      },
    },
    // stage-2
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    // stage-3  unwind enrolledCourseData
    { $unwind: '$enrolledCourseData' },
    // stage-4
    {
      $group: {
        _id: null,
        totalEnroledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    // stage-5
    { $project: { _id: 0, totalEnroledCredits: 1 } },
  ])

  // check credits extend from limites semester credits or not
  // check students credits extended more than maxCredits
  const totalCredits =
    enrolledCourseTotallCredits.length > 0
      ? enrolledCourseTotallCredits[0].totalEnroledCredits
      : 0

  const course = await CourseModel.findById(OfferedCourseExist.course, {
    credits: 1,
  })
  const CurrentCredits = course?.credits

  if (
    totalCredits &&
    maxCredits &&
    totalCredits + CurrentCredits > maxCredits
  ) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits !',
    )
  }

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

export const updateEnrolledCourseDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, courseMarks, student } = payload

  const OfferedCourseExist = await OffoeredCourseModel.findById(offeredCourse)
  if (!OfferedCourseExist) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      'Offered course dose not exist!',
    )
  }

  const semesterRegistrationExist =
    await SemesterRegistrationModel.findById(semesterRegistration)
  if (!semesterRegistrationExist) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Semester dose not exist!')
  }

  const isStudentExists = await StudentModel.findById(student)
  if (!isStudentExists) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Student not found !')
  }

  // is course belong to the faculty check
  const faculty = await FacultyModel.findOne({ id: facultyId }, { _id: 1 })
  if (!faculty) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Faculty not found !')
  }
  const isCourseBelongToTheFaculty = await EnrolledCourseModel.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  })
  if (!isCourseBelongToTheFaculty) {
    throw new CustomError(httpStatus.FORBIDDEN, 'You are forbidden to access !')
  }

  const modifiedData: Record<string, unknown> = { ...courseMarks }
  if (courseMarks?.finalTerm) {
    const { grade, gradePoints } = CountGradeAndPoints(
      isCourseBelongToTheFaculty.courseMarks,
    )
    modifiedData.grade = grade
    modifiedData.gradePoints = gradePoints
    modifiedData.isCompleted = true
  }

  if (courseMarks && Object.keys(courseMarks).length > 0) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value
    }
  }
  const result = await EnrolledCourseModel.findByIdAndUpdate(
    isCourseBelongToTheFaculty._id,
    modifiedData,
    { new: true },
  )
  return result
}

export const getAllEnrolledCourseDB = (query: Record<string, unknown>) => {
  console.log(query)
}
