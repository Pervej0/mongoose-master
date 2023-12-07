import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchCourseField } from './course.const'
import { TCourse } from './course.interface'
import CourseModel from './course.model'
import CustomError from '../../error/customError'
import httpStatus from 'http-status'

export const CreateCourseDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload)
  return result
}

export const GetAllCourseDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(searchCourseField)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await courseQuery.modelQuery
  return result
}

export const GetSingleCourseDB = async (id: string) => {
  const filter = { _id: id }
  const result = await CourseModel.findById(filter)
  return result
}

export const DeleteSingleCourseDB = async (id: string) => {
  const filter = { _id: id }
  const result = await CourseModel.findByIdAndUpdate(
    filter,
    {
      isDeleted: true,
    },
    { new: true, runValidators: true },
  )
  return result
}

export const UpdateSingleCourseDB = async (
  id: string,
  updatedData: Partial<TCourse>,
) => {
  const filter = { _id: id }
  const { preRequisiteCourses, ...remainingFields } = updatedData
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // step-1 (primitive data update)
    const updateBasicCourse = await CourseModel.findByIdAndUpdate(
      filter,
      remainingFields,
      { new: true, runValidators: true, session },
    )
    if (!updateBasicCourse) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Course failed to update!')
    }

    // step-2 add new preRequisiteCourses
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const newPreRequsiteCourses = preRequisiteCourses.filter(
        (el) => !el.isDeleted,
      )
      const updateNewPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        filter,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequsiteCourses } },
        },
        { new: true, runValidators: true, session },
      )

      if (!updateNewPreRequisiteCourses) {
        throw new CustomError(
          httpStatus.BAD_REQUEST,
          'New Prerequisite course update failed!',
        )
      }
    }
    // step -3 delete preRequisiteCourses
    const deletedPreRequisite = preRequisiteCourses
      ?.filter((el) => el.isDeleted)
      .map((el) => el.course)
    console.log(deletedPreRequisite, 'fffffff')
    const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
      filter,
      {
        $pull: {
          preRequisiteCourses: { course: { $in: deletedPreRequisite } },
        },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    )
    console.log(deletedPreRequisiteCourses, 'eeeeeeeeee')

    if (!deletedPreRequisiteCourses) {
      throw new CustomError(
        httpStatus.BAD_REQUEST,
        'Prerequisite course delete failed!',
      )
    }

    const result = await CourseModel.findById(filter).populate(
      'preRequisiteCourses.course',
    )
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    new CustomError(httpStatus.BAD_REQUEST, 'Course failed to update!')
  }
}
