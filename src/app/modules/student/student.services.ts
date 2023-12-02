/* eslint-disable no-undef */
import { StudentModel } from './student.model'
import { TStudent } from './student.interface'
import mongoose from 'mongoose'
import CustomError from '../../error/customError'
import UserModel from '../user/user.modal'
import httpStatus from 'http-status'

const createAStudentDB = async (student: TStudent) => {
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
  const filter = { id: studentId }
  const isStudentExists = await StudentModel.findOne(filter)
  if (!isStudentExists) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'User does not exist!')
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedStudent = await StudentModel.findOneAndUpdate(
      filter,
      {
        isDeleted: true,
      },
      { new: true, session },
    )
    if (!deletedStudent) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to delete student!')
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      filter,
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedUser) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to delete user!')
    }
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new CustomError(httpStatus.BAD_REQUEST, 'Failed To create student!')
  }
}

const updateSingleStudentDB = async (
  studentId: string,
  payload: Partial<TStudent>,
) => {
  const filter = { id: studentId }
  const { name, guardian, localGuardian, ...remainingData } = payload
  const modifiedUpdatedStudentData: Record<string, unknown> = {
    ...remainingData,
  }

  // update non-primitive name data for student
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedStudentData[`name.${key}`] = value
    }
  }
  // update non-primitive guardina data for student
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedStudentData[`guardian.${key}`] = value
    }
  }
  // update non-primitive localGuardian data for student
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedStudentData[`localGuardian.${key}`] = value
    }
  }
  const result = await StudentModel.findOneAndUpdate(
    filter,
    modifiedUpdatedStudentData,
    { new: true, runValidators: true },
  )
  return result
}

export const studentServices = {
  createAStudentDB,
  getAllStudentDB,
  getSingleStudentDB,
  updateIsDeletedFieldDB,
  updateSingleStudentDB,
}
