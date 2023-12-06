import QueryBuilder from '../../builder/QueryBuilder'
import { FacultySearchableFields } from './faculty.const'
import { TFaculty } from './faculty.interface'
import FacultyModel from './faculty.model'

export const GetAllFacultyDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    FacultyModel.find().populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
    }),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await facultyQuery.modelQuery
  return result
}

export const GetSingleFacultyDB = async (id: string) => {
  const filter = { _id: id }
  const result = await FacultyModel.findOne(filter)
  return result
}

export const UpdateSingleFacultyDB = async (id: string, update: TFaculty) => {
  const { name, ...remainingPrimitiveFields } = update
  const filter = { _id: id }
  const modifiedData: Record<string, unknown> = { ...remainingPrimitiveFields }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value
    }
  }
  const result = await FacultyModel.findOneAndUpdate(filter, modifiedData, {
    new: true,
    runValidators: true,
  })
  return result
}

export const UpdateSingleFacultyDeleteFieldDB = async (id: string) => {
  const result = await FacultyModel.findOneAndUpdate(
    { id },
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}
