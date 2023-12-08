import config from '../../config'
import { StudentModel } from '../student/student.model'
import { TStudent } from '../student/student.interface'
import UserModel from './user.modal'
import { TUser } from './user.interface'
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model'
import {
  generateAdminUserId,
  generateFacultyId,
  studentUserGeneratedId,
} from './user.util'
import mongoose, { startSession } from 'mongoose'
import CustomError from '../../error/customError'
import httpStatus from 'http-status'
import FacultyModel from '../faculty/faculty.model'
import { TFaculty } from '../faculty/faculty.interface'
import { TAdmin } from '../admin/admin.interface'
import AdminModel from '../admin/admin.model'

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
  const session = await startSession()
  try {
    session.startTransaction()

    const newUser = await UserModel.create([userData], { session })
    if (!newUser.length) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to Create user!')
    }
    // create a student

    // set embeded id
    studentData.id = newUser[0].id // embedded id
    studentData.user = newUser[0]._id // reference id
    const newStudent = await StudentModel.create([studentData], { session })
    if (!newStudent.length) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to Create Student!')
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new CustomError(httpStatus.BAD_REQUEST, 'Students Faild To Create!')
  }
}

export const CreateFacultyDB = async (
  password: string,
  facultyData: TFaculty,
) => {
  const userData: Partial<TUser> = {}
  userData.password = password || config.defaultPassword
  userData.role = 'faculty'

  const generateId = await generateFacultyId()
  userData.id = generateId
  const session = await startSession()
  try {
    session.startTransaction()
    const newFaculty = await UserModel.create([userData], { session })
    if (!newFaculty.length) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'User failed to create!')
    }
    facultyData.id = newFaculty[0].id
    facultyData.user = newFaculty[0]._id
    const result = await FacultyModel.create([facultyData], { session })
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    // throw new Error(error)
    throw new CustomError(httpStatus.BAD_REQUEST, 'Faculty failed to create!')
  }
}

// admin user

export const CreateAdminDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {}
  userData.password = password || config.defaultPassword
  console.log(userData, 'efff')

  const generateId = await generateAdminUserId()
  console.log(generateId, 'eeeeee')
  userData.id = generateId
  userData.role = 'admin'
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newAdminUser = await UserModel.create([userData], { session })
    if (!newAdminUser) {
      throw new CustomError(
        httpStatus.BAD_REQUEST,
        'Admin User failed to create!',
      )
    }
    payload.user = newAdminUser[0]._id
    payload.id = newAdminUser[0].id
    const newAdmin = await AdminModel.create([payload], [session])
    await session.commitTransaction()
    await session.endSession()
    return newAdmin
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
}
