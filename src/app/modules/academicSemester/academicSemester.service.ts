import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterModel } from './academicSemester.model'
import { AcademicSemesterNameCode } from './acadmicSemester.constent'

export const CreateAcademicSemesterDB = async (data: TAcademicSemester) => {
  // const validateSemester = await AcademicSemesterModel.findOne({data.n})

  if (AcademicSemesterNameCode[data.name] !== data.code) {
    throw new Error('The Semester Code is not valid!')
  }
  const query = await AcademicSemesterModel.create(data)
  return query
}

export const GetAllAcademicSemesterDB = async () => {
  const query = await AcademicSemesterModel.find({})
  return query
}

export const GetSingleAcademicSemesterDB = async (id: string) => {
  const filter = { _id: id }
  const query = await AcademicSemesterModel.findById(filter)
  return query
}

export const UpdateSingleAcademicSemesterDB = async (
  id: string,
  updateData: TAcademicSemester,
) => {
  const filter = { _id: id }
  const query = await AcademicSemesterModel.findOneAndUpdate(filter, updateData)
  return query
}
