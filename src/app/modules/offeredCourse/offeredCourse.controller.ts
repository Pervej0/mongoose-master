import httpStatus from 'http-status'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
import { createOfferedCourseDB } from './offeredCourse.service'

export const createOfferedCourse = useAsyncCatch(async (req, res) => {
  const result = await createOfferedCourseDB(req.body.body)
  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Offered course created successfully!',
    data: result,
  })
})
