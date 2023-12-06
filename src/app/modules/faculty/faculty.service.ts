import TFaculty from './faculty.interface'
import FacultyModel from './faculty.model'

export const GetAllFacultyDB = async () => {
  const result = await FacultyModel.find({})
  return result
}

export const GetSingleFacultyDB = async (id: string) => {
  const result = await FacultyModel.findOne({ id })
  return result
}

export const UpdateSingleFacultyDB = async (id: string, update: TFaculty) => {
  const result = await FacultyModel.findOneAndUpdate({ id }, update, {
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
