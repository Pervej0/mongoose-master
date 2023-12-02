import { StudentModel } from './student.model'
import { Student } from './student.interface'

const createAStudentDB = async (student: Student) => {
  const result = await StudentModel.create(student)
  return result
}

const getAllStudentDB = async () => {
  const result = await StudentModel.find({})
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  // const result = await StudentModel.aggregate([])
  return result
}
const getSingleStudentDB = async (studentId: string) => {
  const filter = { id: studentId }
  // const result = await StudentModel.findOne(filter).exec()
  const result = await StudentModel.findOne(filter)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const updateIsDeletedFieldDB = async (studentId: string) => {
  const filter = { _id: studentId }
  const result = await StudentModel.updateOne(filter, { isDeleted: true })
  return result
}

export const studentServices = {
  createAStudentDB,
  getAllStudentDB,
  getSingleStudentDB,
  updateIsDeletedFieldDB,
}
