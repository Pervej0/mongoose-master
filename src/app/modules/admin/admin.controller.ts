import { RequestHandler } from 'express'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
import {
  GetSingleAdminDB,
  //   GetAllAdminDB,
  UpdateSingleAdminDB,
  UpdateSingleAdminDeleteFieldDB,
} from './admin.service'

// export const GetAllAdmin: RequestHandler = useAsyncCatch(async (req, res) => {
//   const query = req.query
//   const result = await GetAllAdminDB(query)
//   SendResponse(res, {
//     statusCode: 200,
//     message: 'Admin data retrieved successfully!',
//     data: result,
//   })
// })

export const GetSingleAdmin: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.facultyId
    const result = await GetSingleAdminDB(id)
    SendResponse(res, {
      statusCode: 200,
      message: 'Admin retrieved successfully!',
      data: result,
    })
  },
)

export const UpdateSingleAdmin: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.facultyId
    const updateData = req.body.faculty
    const result = await UpdateSingleAdminDB(id, updateData)
    SendResponse(res, {
      statusCode: 200,
      message: 'Admin updated successfully!',
      data: result,
    })
  },
)

export const UpdateSingleFacultyDeleteField: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.facultyId
    const result = await UpdateSingleAdminDeleteFieldDB(id)
    SendResponse(res, {
      statusCode: 200,
      message: 'Admin updated successfully!',
      data: result,
    })
  },
)
