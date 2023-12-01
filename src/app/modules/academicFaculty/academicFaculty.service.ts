import TAcademicFaculty from './academicFaculty.interface'
import AcademicFacultyModel from './academicFaculty.model'

export const CreateAcademicFacultyDB = async (payload: TAcademicFaculty) => {
  const query = await AcademicFacultyModel.create(payload)
  return query
}

export const GetAllAcademicFacultyDB = async () => {
  const query = await AcademicFacultyModel.find({})
  return query
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
