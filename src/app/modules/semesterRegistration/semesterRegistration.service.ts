/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import CustomError from '../../error/customError'
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model'
import { semesterRegistrationStatus } from './semesterRegistration.const'
import { TSemesterRegistration } from './semesterRegistration.interface'
import SemesterRegistrationModel from './semesterRegistration.model'
import mongoose from 'mongoose'
import OffoeredCourseModel from '../offeredCourse/offeredCourse.model'

export const createSemesterRagistrationDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemesterId = payload.academicSemester

  // check the semester already upcoming or ongoing
  const registratedSemesterStatus = await SemesterRegistrationModel.findOne({
    $or: [{ status: 'ONGOING' }, { status: 'UPCOMING' }],
  })

  if (registratedSemesterStatus) {
    throw new Error(
      `You can not created the registerd semester for ${registratedSemesterStatus.status}`,
    )
  }

  // check if the semester is exist
  const isAcademicSemesterExist =
    await AcademicSemesterModel.findById(academicSemesterId)
  if (!isAcademicSemesterExist) {
    throw new Error('This academic semister not found!')
  }

  //   check if the semsester already exist
  const isSemesterExist = await SemesterRegistrationModel.findOne({
    academicSemester: academicSemesterId,
  })

  if (isSemesterExist) {
    throw new Error('The semester is already exist!')
  }

  const result = await SemesterRegistrationModel.create(payload)
  return result
}

export const GetAllSemesterRegistrationDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate({ path: 'academicSemester' }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await semesterRegistrationQuery.modelQuery
  return result
}

export const GetSingleSemesterRegistrationDB = async (id: string) => {
  const filter = { _id: id }
  const result = await SemesterRegistrationModel.findById(filter)
  return result
}

export const UpdateSingleSemesterRagistrationDB = async (
  payload: TSemesterRegistration,
  id: string,
) => {
  const requestedStatus = payload.status
  const registratedSemester = await SemesterRegistrationModel.findById(id)
  // check the Registered semester found or not
  if (!registratedSemester) {
    throw new Error('The semester dose not exist!')
  }
  // check does the registered semester already ended
  const currentSemesterStatus = registratedSemester?.status
  if (currentSemesterStatus === 'ENDED') {
    throw new Error('The semester already ended. Create a new one.')
  }

  // status update will be = UPCOMING > ONGOING > ENDED
  if (
    currentSemesterStatus === semesterRegistrationStatus.UPCOMING &&
    requestedStatus === semesterRegistrationStatus.ENDED
  ) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      `You can not change directly ${currentSemesterStatus} to ${requestedStatus}`,
    )
  }
  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  )

  return result
}

export const deleteSemesterRegistrationDB = async (id: string) => {
  const isSemesterRegistrationExist =
    await SemesterRegistrationModel.findById(id)
  if (!isSemesterRegistrationExist) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      'Semester Registration is not found',
    )
  }
  const status = isSemesterRegistrationExist.status
  if (status !== 'UPCOMING') {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      `You can not update as the registered semester is ${semesterRegistrationStatus}`,
    )
  }

  const session = await mongoose.startSession()

  // deleting registered semister
  try {
    session.startTransaction()
    // delete all offered course for that registerd semister
    const deleteOfferedCourse = await OffoeredCourseModel.deleteMany(
      { semesterRegistration: id },
      { session },
    )
    if (!deleteOfferedCourse) {
      throw new CustomError(
        httpStatus.BAD_REQUEST,
        'Failed to delete offered course !',
      )
    }

    const deletedSemisterRegistration =
      await SemesterRegistrationModel.findByIdAndDelete(id, {
        session,
        new: true,
      })

    if (!deletedSemisterRegistration) {
      throw new CustomError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      )
    }
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new CustomError(httpStatus.BAD_REQUEST, err)
  }
}
