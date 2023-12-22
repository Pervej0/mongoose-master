import { RequestHandler } from 'express'
import {
  CreateAdminDB,
  CreateFacultyDB,
  changeStatusDB,
  createAUserDB,
  getSingleUserDB,
} from './user.service'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
import CustomError from '../../error/customError'
import httpStatus from 'http-status'

export const createAUser: RequestHandler = useAsyncCatch(async (req, res) => {
  const { password, student: studentData } = req.body
  const result = await createAUserDB(password, studentData)

  SendResponse(res, {
    statusCode: 200,
    message: 'Successfully user has been created!',
    data: result,
  })
})

export const CreateFaculty: RequestHandler = useAsyncCatch(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await CreateFacultyDB(password, facultyData)
  SendResponse(res, {
    statusCode: 200,
    message: 'Faculty Created Successfully!',
    data: result,
  })
})

export const CreateAdmin: RequestHandler = useAsyncCatch(async (req, res) => {
  const { password, admin: adminData } = req.body

  const result = await CreateAdminDB(password, adminData)
  SendResponse(res, {
    statusCode: 200,
    message: 'Admin Created Successfully!',
    data: result,
  })
})

export const getSingleUser: RequestHandler = useAsyncCatch(async (req, res) => {
  const user = req.user
  if (!user) {
    throw new CustomError(httpStatus.UNAUTHORIZED, 'token not found!')
  }
  const result = await getSingleUserDB(user)
  SendResponse(res, {
    statusCode: 200,
    message: 'User retrieved Successfully!',
    data: result,
  })
})

export const changeStatus: RequestHandler = useAsyncCatch(async (req, res) => {
  const id = req.params.id
  const status = req.body.status
  console.log('controller')
  const result = await changeStatusDB(id, status)
  SendResponse(res, {
    statusCode: 200,
    message: 'User retrieved Successfully!',
    data: result,
  })
})
