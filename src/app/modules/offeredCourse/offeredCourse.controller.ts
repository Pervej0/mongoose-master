import httpStatus from 'http-status'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
import {
  GetAllOfferedCourseDB,
  createOfferedCourseDB,
} from './offeredCourse.service'

export const createOfferedCourse = useAsyncCatch(async (req, res) => {
  const result = await createOfferedCourseDB(req.body)
  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Offered course created successfully!',
    data: result,
  })
})

export const GetAllOfferedCourse = useAsyncCatch(async (req, res) => {
  const result = await GetAllOfferedCourseDB(req.query)
  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Offered course retrieved successfully!',
    data: result,
  })
})
