import QueryBuilder from '../../builder/QueryBuilder'
import { AcademicDepartmentSearchableFields } from './academicDepartment.const'
import { TAcademicDepartment } from './academicDepartment.interface'
import AcademicDepartmentModel from './academicDepartment.model'

export const CreateAcademicDepartmentDB = async (
  payload: TAcademicDepartment,
) => {
  const query = await AcademicDepartmentModel.create(payload)
  return query
}

export const GetAllAcademicDepartmentDB = async (
  query: Record<string, unknown>,
) => {
  const academicDepartment = new QueryBuilder(
    AcademicDepartmentModel.find({}).populate('academicFaculty'),
    query,
  )
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await academicDepartment.modelQuery
  const meta = await academicDepartment.countTotal()
  return {
    meta,
    result,
  }
}

export const GetSingleAcademicDepartmentDB = async (id: string) => {
  const filter = { _id: id }
  const query = await AcademicDepartmentModel.findById(filter)
  return query
}

export const UpdateSingeAcademicDepartmentDB = async (
  id: string,
  updateData: TAcademicDepartment,
) => {
  const filter = { _id: id }
  const query = await AcademicDepartmentModel.findOneAndUpdate(
    filter,
    updateData,
  )
  return query
}
