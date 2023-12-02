import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import UserModel from './user.modal'

const findLastStudent = async () => {
  const lastStudent = await UserModel.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  ).sort({
    createdAt: -1,
  })
  return lastStudent?.id.substring(6) || undefined
}

export const studentUserGeneratedId = async (
  admissionSemester: TAcademicSemester,
) => {
  const currentId: string = (await findLastStudent()) || (0).toString()
  const incrementId = Number(Number(currentId) + 1)
    .toString()
    .padStart(4, '0')
  return `${admissionSemester.year}${admissionSemester.code}${incrementId}`
}
