import { RequestHandler } from 'express'
import useAsyncCatch from '../../utils/useAsyncCatch'
import SendResponse from '../../utils/sendResponse'
import {
  CreateAcademicDepartmentDB,
  GetAllAcademicDepartmentDB,
  GetSingleAcademicDepartmentDB,
  UpdateSingeAcademicDepartmentDB,
} from './academicDepartment.service'

export const CreateAcademicDepartment: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const academicDepartmentData = req.body
    const result = await CreateAcademicDepartmentDB(academicDepartmentData)
    SendResponse(res, {
      statusCode: 200,
      message: 'Academic Department created successfully!',
      data: result,
    })
  },
)

export const GetAllAcademicDepartment: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const result = await GetAllAcademicDepartmentDB(req.query)
    SendResponse(res, {
      statusCode: 200,
      message: 'Academic Department retrieved successfully!',
      meta: result.meta,
      data: result.result,
    })
  },
)

export const GetSingleAcademicDepartment = useAsyncCatch(async (req, res) => {
  const id = req.params.departmentId
  const result = await GetSingleAcademicDepartmentDB(id)
  SendResponse(res, {
    statusCode: 200,
    message: 'Academic semester retrieved successfully!',
    data: result,
  })
})

export const UpdateSingeAcademicDepartment: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.departmentId
    const updateData = req.body
    const result = await UpdateSingeAcademicDepartmentDB(id, updateData)
    SendResponse(res, {
      statusCode: 200,
      message: 'Academic semesters updated successfully!',
      data: result,
    })
  },
)
