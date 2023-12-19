import { RequestHandler } from 'express'
import useAsyncCatch from '../../utils/useAsyncCatch'
import {
  GetAllFacultyDB,
  GetSingleFacultyDB,
  UpdateSingleFacultyDB,
  UpdateSingleFacultyDeleteFieldDB,
} from './faculty.service'
import SendResponse from '../../utils/sendResponse'

export const GetAllFaculty: RequestHandler = useAsyncCatch(async (req, res) => {
  const query = req.query
  const result = await GetAllFacultyDB(query)
  console.log(req.user, 'xxx')
  SendResponse(res, {
    statusCode: 200,
    message: 'Faculty data retrieved successfully!',
    data: result,
  })
})

export const GetSingleFaculty: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.facultyId
    const result = await GetSingleFacultyDB(id)
    SendResponse(res, {
      statusCode: 200,
      message: 'Faculty retrieved successfully!',
      data: result,
    })
  },
)

export const UpdateSingleFaculty: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.facultyId
    const updateData = req.body.faculty
    const result = await UpdateSingleFacultyDB(id, updateData)
    SendResponse(res, {
      statusCode: 200,
      message: 'Faculty updated successfully!',
      data: result,
    })
  },
)

export const UpdateSingleFacultyDeleteField: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.facultyId
    const result = await UpdateSingleFacultyDeleteFieldDB(id)
    SendResponse(res, {
      statusCode: 200,
      message: 'Faculty updated successfully!',
      data: result,
    })
  },
)
