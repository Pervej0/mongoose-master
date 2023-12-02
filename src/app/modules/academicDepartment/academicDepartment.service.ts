import { TAcademicDepartment } from './academicDepartment.interface'
import AcademicDepartmentModel from './academicDepartment.model'

export const CreateAcademicDepartmentDB = async (
  payload: TAcademicDepartment,
) => {
  const query = await AcademicDepartmentModel.create(payload)
  return query
}

export const GetAllAcademicDepartmentDB = async () => {
  const query = await AcademicDepartmentModel.find({}).populate(
    'academicFaculty',
  )
  return query
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
