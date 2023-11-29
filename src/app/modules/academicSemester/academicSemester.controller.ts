import { RequestHandler } from 'express'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
import {
  CreateAcademicSemesterDB,
  GetAllAcademicSemesterDB,
  GetSingleAcademicSemesterDB,
  UpdateSingleAcademicSemesterDB,
} from './academicSemester.service'

export const CreateAcademicSemester: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const academicSemeterData = req.body
    const result = await CreateAcademicSemesterDB(academicSemeterData)
    SendResponse(res, {
      statusCode: 200,
      message: 'Academic semeseter created successfully!',
      data: result,
    })
  },
)

export const GetAllAcademicSemester: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const result = await GetAllAcademicSemesterDB()
    SendResponse(res, {
      statusCode: 200,
      message: 'Academic semesters retrieved successfully!',
      data: result,
    })
  },
)

export const GetSingleAcademicSemester = useAsyncCatch(async (req, res) => {
  const id = req.params.semeseterId
  const result = await GetSingleAcademicSemesterDB(id)
  SendResponse(res, {
    statusCode: 200,
    message: 'Academic semester retrieved successfully!',
    data: result,
  })
})

export const UpdateSingleAcademicSemester: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.semesterId
    const updateData = req.body
    const result = await UpdateSingleAcademicSemesterDB(id, updateData)
    SendResponse(res, {
      statusCode: 200,
      message: 'Academic semesters updated successfully!',
      data: result,
    })
  },
)
