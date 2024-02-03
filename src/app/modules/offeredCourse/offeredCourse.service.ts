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
import { StudentModel } from '../student/student.model'

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
  //   check semester Registerd or not
  const isSemesterRegistered =
    await SemesterRegistrationModel.findById(semesterRegistration)
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

export const GetSingleOfferdCourseDB = async (id: string) => {
  const offeredCourse = await OffoeredCourseModel.findById(id)
  if (!offeredCourse) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Offered Course not found')
  }
  return offeredCourse
}

export const UpdateSingleOfferedCourseDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  const { faculty, days, startTime, endTime } = payload

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
  const semesterRegistration = isOfferdCourseExist.semesterRegistration
  // get the schedules of the faculties
  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration)

  if (semesterRegistrationStatus?.status === 'UPCOMING') {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    )
  }

  const assignedSchedules = (await OffoeredCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')) as TSchedule[]

  const newSchedule = { days, startTime, endTime } as TSchedule

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new CustomError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    )
  }
  const result = await OffoeredCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const DeleteOfferedCourseDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OffoeredCourseModel.findById(id)

  if (!isOfferedCourseExists) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Offered Course not found')
  }

  const semesterRegistation = isOfferedCourseExists.semesterRegistration

  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistation).select(
      'status',
    )

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    )
  }

  const result = await OffoeredCourseModel.findByIdAndDelete(id)
  return result
}

export const MyOfferedCourseDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const student = await StudentModel.findOne({ id: userId })

  if (!student) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Student is not found!')
  }

  // find current ongoing semester
  const currentOnGoingSemester = await SemesterRegistrationModel.findOne({
    status: 'ONGOING',
  })

  const aggregationQuery = [
    // offerdCourse data for specific
    // registered Ongoing Semester and for sepecific student
    {
      $match: {
        semesterRegistration: currentOnGoingSemester?._id,
        academicFaculty: student?.academicFaculty,
        academicDepartment: student?.academicDepartment,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    // my enrolled course and offered course
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentOnGoingSemester: currentOnGoingSemester?._id,
          currentStudent: student?._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$semesterRegistration', '$$currentOnGoingSemester'],
                  },
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledcourses',
      },
    },
    // comparison  between my enrolled course and offered course
    {
      $addFields: {
        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledcourses',
                as: 'enroll',
                in: '$$enroll.course',
              },
            },
          ],
        },
      },
    },
    // completed enrolled courses and available offered courses
    {
      $lookup: {
        from: 'enrolledcourses',
        let: { currentStudent: student._id },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$currentStudent', '$student'] },
                  { $eq: ['$isCompleted', true] },
                ],
              },
            },
          },
        ],
        as: 'completedCourse',
      },
    },
    // comparison between completed course and  logical offered course and add those
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: '$completedCourse',
            as: 'completed',
            in: '$$completed.course',
          },
        },
      },
    },

    // check is course has any prerequiste if yes the show those course prerequiste
    // if no show successfully courseIsfullfilled true.
    {
      $addFields: {
        isPrerequisiteCourseFullfilled: {
          $or: [
            { $eq: ['$course.preRequisiteCourses', []] },
            {
              $setIsSubset: [
                '$course.preRequisiteCourses.course',
                '$completedCourseIds',
              ],
            },
          ],
        },
      },
    },

    // send only those offered course which is not alreadyEnrolled
    {
      $match: {
        isAlreadyEnrolled: false,
        isPrerequisiteCourseFullfilled: true,
      },
    },
  ]

  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10
  const skip = (page - 1) * limit
  const total = (await OffoeredCourseModel.aggregate(aggregationQuery)).length

  const totalPage = Math.ceil(total / limit)

  // pagination query
  const paginationQuery = [
    {
      $skip: skip,
    },
    { $limit: limit },
  ]

  const offeredCourse = await OffoeredCourseModel.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ])

  return { meta: { page, limit, total, totalPage }, result: offeredCourse }
}
