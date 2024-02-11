/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import { StudentModel } from './student.model'
import { TStudent } from './student.interface'
import mongoose from 'mongoose'
import CustomError from '../../error/customError'
import UserModel from '../user/user.modal'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableFields } from './student.constant'

const createAStudentDB = async (student: TStudent) => {
  const result = await StudentModel.create(student)
  return result
}

const getAllStudentDB = async (query: Record<string, unknown>) => {
  // const searchTerm = query.searchText || ''
  // const queryObj = { ...query }

  // const searchQuery = StudentModel.find({
  //   $or: ['name.firstName', 'email', 'presentAdd'].map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // // filter
  // const excludeField = ['searchText', 'sort', 'limit', 'page', 'fields']
  // // removing search query so that filter query become specefic
  // excludeField.forEach((el) => delete queryObj[el])
  // const filterSearch = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   })

  // const sort = ('-createdAt' || query.sort) as string

  // const sortQuery = filterSearch.sort(sort)
  // const limit = (Number(query.limit) || 1) as number
  // let page = 1
  // let skip = 0
  // const limitQuery = sortQuery.limit(limit)
  // if (query.page) {
  //   page = Number(query.page) as number
  //   skip = (page - 1) * limit
  // }

  // // const pagination = limitQuery.skip(skip)

  // // field filtering
  // let fields = ''
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  // }

  // const fieldQuery = await limitQuery.select(fields)

  // return fieldQuery

  // if (!Object.keys(query).length) {
  //   const result = await StudentModel.find({})
  //   return result
  // }

  const studentQuery = new QueryBuilder(
    StudentModel.find().populate('admissionSemester').populate({
      path: 'academicDepartment academicFaculty',
    }),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await studentQuery.modelQuery
  const meta = await studentQuery.countTotal()
  return {
    meta,
    result,
  }
}
const getSingleStudentDB = async (studentId: string) => {
  const result = await StudentModel.findById(studentId)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment academicFaculty',
    })
    .exec()

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
    throw new CustomError(httpStatus.BAD_REQUEST, 'Failed To delete student!')
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
