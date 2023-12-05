import { startSession } from 'mongoose'
import TFaculty from './faculty.interface'
import FacultyModel from './faculty.model'
import { generateFacultyId } from './faculty.util'
import CustomError from '../../error/customError'
import httpStatus from 'http-status'

export const CreateFacultyDB = async (payload: TFaculty) => {
  const generateId = await generateFacultyId()
  payload.id = generateId
  const session = await startSession()
  try {
    session.startTransaction()
    const result = await FacultyModel.create([payload], { session })
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new CustomError(httpStatus.BAD_REQUEST, 'User creation failed!')
  }
}

export const GetAllFacultyDB = async () => {
  const result = await FacultyModel.find({})
  return result
}

export const GetSingleFacultyDB = async (id: string) => {
  const result = await FacultyModel.findOne({ id })
  return result
}

export const UpdateSingleFacultyDB = async (id: string, update: TFaculty) => {
  const result = await FacultyModel.findOneAndUpdate({ id }, update, {
    new: true,
    runValidators: true, 
  })
  return result
}

export const UpdateSingleFacultyDeleteFieldDB = async (id: string) => {
  const result = await FacultyModel.findOneAndUpdate(
    { id },
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}
