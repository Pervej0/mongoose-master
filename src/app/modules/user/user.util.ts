import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import UserModel from './user.modal'

const findLastStudent = async () => {
  const lastStudent = await UserModel.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1, // sort document descending order
    })
    .lean()
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}

export const studentUserGeneratedId = async (
  admissionSemester: TAcademicSemester,
) => {
  const lastStudentId = await findLastStudent()
  const lastStudentYear = lastStudentId?.substring(0, 4) //2030
  const lastSemesterCode = lastStudentId?.substring(4, 6) // 01
  const currentStudentYear = admissionSemester.year.toString()
  const currentSemesterCode = admissionSemester.code
  let currentId: string
  if (
    lastStudentId &&
    lastStudentYear === currentStudentYear &&
    lastSemesterCode === currentSemesterCode
  ) {
    currentId = lastStudentId?.substring(6) //0001
  } else {
    currentId = (0).toString()
  }

  const incrementId = Number(Number(currentId) + 1)
    .toString()
    .padStart(4, '0')
  return `${admissionSemester.year}${admissionSemester.code}${incrementId}`
}
