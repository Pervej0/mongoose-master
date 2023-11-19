import { StudentModel } from '../student.model'
import { Student } from './student.interface'

const createAStudentDB = async (student: Student) => {
  const result = await StudentModel.create(student)
  return result
}

const getAllStudentDB = async () => {
  const result = await StudentModel.find({})
  return result
}

const getSingleStudentDB = async (studentId: string) => {
  const filter = { id: studentId }
  const result = await StudentModel.findOne(filter).exec()
  return result
}

export const studentServices = {
  createAStudentDB,
  getAllStudentDB,
  getSingleStudentDB,
}
