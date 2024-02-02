/* eslint-disable @typescript-eslint/no-explicit-any */
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
import mongoose from 'mongoose'
import CustomError from '../../error/customError'
import httpStatus from 'http-status'
import FacultyModel from '../faculty/faculty.model'
import { TFaculty } from '../faculty/faculty.interface'
import { TAdmin } from '../admin/admin.interface'
import AdminModel from '../admin/admin.model'
import { JwtPayload } from 'jsonwebtoken'
import { sendImageToCloudinary } from '../../utils/sendImageToClodudinary'
import AcademicDepartmentModel from '../academicDepartment/academicDepartment.model'

// let userId: number = 202301212
export const createAUserDB = async (
  file: any,
  password: string,
  studentData: TStudent,
) => {
  const userData: Partial<TUser> = {}
  // setting default password
  userData.password = password || config.defaultPassword

  // set user role as student
  userData.role = 'student'
  // set user email
  userData.email = studentData.email

  // academic department
  const academicDepartment = await AcademicDepartmentModel.findById(
    studentData.academicDepartment,
  )
  if (!academicDepartment) {
    throw new Error('Academic Department data is not found!')
  }
  // user semsester info
  const admissionSemester = await AcademicSemesterModel.findById(
    studentData.admissionSemester,
  )
  // user id
  if (!admissionSemester) {
    throw new Error('Admission semester data is not found!')
  }

  const generatedId = await studentUserGeneratedId(admissionSemester)
  // if user sends profile img
  if (file) {
    const imageName = `${generatedId}-${studentData?.name?.firstName}`
    const { secure_url } = (await sendImageToCloudinary(
      imageName,
      file?.path,
    )) as any
    studentData.studentProfile = secure_url
  }

  // create a student
  userData.id = generatedId
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newUser = await UserModel.create([userData], { session })
    if (!newUser.length) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to Create user!')
    }

    // set embeded id
    studentData.id = newUser[0].id // embedded id
    studentData.user = newUser[0]._id // reference id
    studentData.studentProfile = ''
    studentData.academicFaculty = academicDepartment.academicFaculty
    const newStudent = await StudentModel.create([studentData], { session })
    if (!newStudent.length) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to Create Student!')
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new CustomError(httpStatus.BAD_REQUEST, error)
  }
}

export const CreateFacultyDB = async (
  password: string,
  facultyData: TFaculty,
) => {
  const userData: Partial<TUser> = {}
  userData.password = password || config.defaultPassword
  userData.role = 'faculty'
  // set user email
  userData.email = facultyData.email
  const generateId = await generateFacultyId()
  userData.id = generateId
  const session = await mongoose.startSession()
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
export const CreateAdminDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  const userData: Partial<TUser> = {}
  userData.password = password || config.defaultPassword

  const generateId = await generateAdminUserId()
  userData.id = generateId
  userData.role = 'admin'
  // set user email
  userData.email = payload.email
  const imageName = `${generateId}-${payload?.name?.firstName}`

  const { secure_url } = (await sendImageToCloudinary(
    imageName,
    file?.path,
  )) as any

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
    payload.profileImg = secure_url
    const newAdmin = await AdminModel.create([payload], [session])
    await session.commitTransaction()
    await session.endSession()
    return newAdmin
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new CustomError(httpStatus.BAD_REQUEST, error)
  }
}

export const getSingleUserDB = async (payload: JwtPayload) => {
  let result
  if (payload.role === 'student') {
    result = await StudentModel.findOne({ id: payload.userId })
      .populate({
        path: 'admissionSemester',
      })
      .populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
      })
  } else if (payload.role === 'faculty') {
    result = await FacultyModel.findOne({ id: payload.userId })
  } else if (payload.role === 'admin') {
    result = await AdminModel.findOne({ id: payload.userId })
  }
  return result
}

export const changeStatusDB = async (
  id: string,
  payload: { status: string },
) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}
