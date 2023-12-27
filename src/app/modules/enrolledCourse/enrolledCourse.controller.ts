import httpStatus from 'http-status'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
import { createEnrolledCourseDB } from './enrolledCourse.service'

export const createEnrolledCourse = useAsyncCatch(async (req, res) => {
  const userId = req.user.userId
  const result = await createEnrolledCourseDB(userId, req.body)

  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student is enrolled succesfully',
    data: result,
  })
})