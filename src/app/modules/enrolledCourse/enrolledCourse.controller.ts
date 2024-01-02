import httpStatus from 'http-status'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
import {
  createEnrolledCourseDB,
  getAllEnrolledCourseDB,
  updateEnrolledCourseDB,
} from './enrolledCourse.service'

export const createEnrolledCourse = useAsyncCatch(async (req, res) => {
  const userId = req.user.userId
  const result = await createEnrolledCourseDB(userId, req.body)

  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student is enrolled succesfully',
    data: result,
  })
})

export const updateEnrolledCourse = useAsyncCatch(async (req, res) => {
  const userId = req.user.userId
  const result = await updateEnrolledCourseDB(userId, req.body)

  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student is updated succesfully',
    data: result,
  })
})

export const getAllEnrolledCourse = useAsyncCatch(async (req, res) => {
  const query = req.query
  const result = await getAllEnrolledCourseDB(query)

  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'EnrolledCourse succesfully retrieved !',
    data: result,
  })
})
