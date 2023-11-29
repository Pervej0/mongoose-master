import config from '../../config'
import { StudentModel } from '../student/student.model'
import { Student } from '../student/student.interface'
import UserModel from './user.modal'
import { TUser } from './user.interface'

let userId: number = 202301212
export const createAUserDB = async (password: string, studentData: Student) => {
  const userData: Partial<TUser> = {}
  // setting default password
  userData.password = password || config.defaultPassword

  // set user role as student
  userData.role = 'student'
  // user id
  userId += 1
  userData.id = userId.toString()
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
