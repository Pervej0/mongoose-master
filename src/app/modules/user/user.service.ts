import config from '../../config'
import { StudentModel } from '../student/student.model'
import { TStudent } from '../student/student.interface'
import UserModel from './user.modal'
import { TUser } from './user.interface'
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model'
import { studentUserGeneratedId } from './user.util'

// let userId: number = 202301212
export const createAUserDB = async (
  password: string,
  studentData: TStudent,
) => {
  const userData: Partial<TUser> = {}
  // setting default password
  userData.password = password || config.defaultPassword

  // set user role as student
  userData.role = 'student'
  // user semsester info
  const admissionSemester = await AcademicSemesterModel.findById(
    studentData.admissionSemester,
  )
  // user id
  if (!admissionSemester) {
    throw new Error('Admission semester data could not found!')
  }
  userData.id = await studentUserGeneratedId(admissionSemester)
  const newUser = await UserModel.create(userData)

  // create a student
  if (Object.keys(newUser).length) {
    // set embeded id
    studentData.id = newUser.id // embedded id
    studentData.user = newUser._id // reference id
    const newStudent = await StudentModel.create(studentData)
    return newStudent
  }
}
