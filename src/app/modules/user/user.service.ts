import config from '../../config'
import { StudentModel } from '../student.model'
import { Student } from '../student/student.interface'
import UserModel from '../user.modal'
import { TUser } from './user.interface'

export const createAUserDB = async (password: string, studentData: Student) => {
  console.log('user services')

  const userData: Partial<TUser> = {}
  // setting default password
  userData.password = password || config.defaultPassword

  // set user role as student
  userData.role = 'student'
  userData.id = '202301212'
  console.log(userData, 'xxxx')
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
