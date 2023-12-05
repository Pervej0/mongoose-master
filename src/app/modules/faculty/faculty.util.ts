import FacultyModel from './faculty.model'

const findLastFacultyId = async () => {
  const lastFaculty = await FacultyModel.find({}).sort({ _id: -1 }).limit(1)

  return lastFaculty[0]?.id ? lastFaculty[0].id : undefined
}

export const generateFacultyId = async () => {
  const latestId = (await findLastFacultyId()) || '0000'
  const currentId = Number(Number(latestId) + 1)
    .toString()
    .padStart(4, '0')

  return currentId
}
