import { RequestHandler } from 'express'
import useAsyncCatch from '../../utils/useAsyncCatch'
import SendResponse from '../../utils/sendResponse'
import {
  CreateAcademicFacultyDB,
  GetAllAcademicFacultyDB,
  GetSingleAcademicFacultyDB,
  UpdateSingleAcademicFacultyDB,
} from './academicFaculty.service'

export const CreateAcademicFaculty: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const academicFacultyData = req.body
    const result = await CreateAcademicFacultyDB(academicFacultyData)
    SendResponse(res, {
      statusCode: 200,
      message: 'Academic Faculty created successfully!',
      data: result,
    })
  },
)

export const GetAllAcademicFaculty: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const result = await GetAllAcademicFacultyDB()
    SendResponse(res, {
      statusCode: 200,
      message: 'All Academic Faculty retrieved successfully!',
      data: result,
    })
  },
)

export const GetSingleAcademicFaculty: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.facultyId
    const result = await GetSingleAcademicFacultyDB(id)
    SendResponse(res, {
      statusCode: 200,
      message: 'Academic Faculty retrieved successfully!',
      data: result,
    })
  },
)

export const UpdateSingleAcademicFaculty: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.facultyId
    const updateData = req.body
    const result = await UpdateSingleAcademicFacultyDB(id, updateData)
    SendResponse(res, {
      statusCode: 200,
      message: 'Academic Faculty updated successfully!',
      data: result,
    })
  },
)
