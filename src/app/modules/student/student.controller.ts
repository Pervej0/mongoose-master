import { RequestHandler } from 'express'
import { studentServices } from './student.services'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
// import studentZodValidationSchema from './student.zod.validation'
// import studentZodValidationSchema from './student.validation'

const createAStudent: RequestHandler = useAsyncCatch(async (req, res) => {
  const data = req.body.student
  console.log(data)
  const result = await studentServices.createAStudentDB(data)

  SendResponse(res, {
    statusCode: 200,
    message: 'Student has been created successfully!',
    data: result,
  })
})

const getAllStudent: RequestHandler = useAsyncCatch(async (req, res) => {
  const queryData = req.query
  const result = await studentServices.getAllStudentDB(queryData)
  SendResponse(res, {
    statusCode: 200,
    message: 'All students data retrieved successfully!',
    data: result,
  })
})

const getSingleStudent: RequestHandler = useAsyncCatch(async (req, res) => {
  const id = req.params.studentId
  const result = await studentServices.getSingleStudentDB(id)
  SendResponse(res, {
    statusCode: 200,
    message: 'Student data retrieved successfully!',
    data: result,
  })
})

const updateIsDeletedField: RequestHandler = useAsyncCatch(async (req, res) => {
  const stoudentId = req.params.studentId
  const result = await studentServices.updateIsDeletedFieldDB(stoudentId)
  SendResponse(res, {
    statusCode: 200,
    message: 'Student Field deleted successfully',
    data: result,
  })
})

const updateSingleStudent: RequestHandler = useAsyncCatch(async (req, res) => {
  const id = req.params.studentId
  const updatedData = req.body.student
  const result = await studentServices.updateSingleStudentDB(id, updatedData)
  SendResponse(res, {
    statusCode: 200,
    message: 'Student data updated successfully!',
    data: result,
  })
})

export const studentControllers = {
  createAStudent,
  getAllStudent,
  getSingleStudent,
  updateIsDeletedField,
  updateSingleStudent,
}
