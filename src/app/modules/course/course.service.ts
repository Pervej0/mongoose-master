import QueryBuilder from '../../builder/QueryBuilder'
import { searchCourseField } from './course.const'
import { TCourse } from './course.interface'
import CourseModel from './course.model'

export const CreateCourseDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload)
  return result
}

export const GetAllCourseDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseModel.find(), query)
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
    { new: true },
  )
  return result
}

export const UpdateSingleCourseDB = async (
  id: string,
  updatedData: Partial<TCourse>,
) => {
  const filter = { _id: id }
  const result = await CourseModel.findById(filter, updatedData)
  return result
}
