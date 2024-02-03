import QueryBuilder from '../../builder/QueryBuilder'
import { academicFacultySearchFields } from './academicFaculty.const.name'
import TAcademicFaculty from './academicFaculty.interface'
import AcademicFacultyModel from './academicFaculty.model'

export const CreateAcademicFacultyDB = async (payload: TAcademicFaculty) => {
  const query = await AcademicFacultyModel.create(payload)
  return query
}

export const GetAllAcademicFacultyDB = async (
  query: Record<string, unknown>,
) => {
  const allacademicFaculty = new QueryBuilder(
    AcademicFacultyModel.find({}),
    query,
  )
    .search(academicFacultySearchFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await allacademicFaculty.modelQuery
  const meta = await allacademicFaculty.countTotal()

  return {
    meta,
    result,
  }
}

export const GetSingleAcademicFacultyDB = async (id: string) => {
  const filter = { _id: id }
  const query = await AcademicFacultyModel.findById(filter)
  return query
}

export const UpdateSingleAcademicFacultyDB = async (
  id: string,
  updateData: TAcademicFaculty,
) => {
  const filter = { _id: id }
  const query = await AcademicFacultyModel.findOneAndUpdate(filter, updateData)
  return query
}
