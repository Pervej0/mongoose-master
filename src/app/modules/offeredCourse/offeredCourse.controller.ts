import httpStatus from 'http-status'
import SendResponse from '../../utils/sendResponse'
import useAsyncCatch from '../../utils/useAsyncCatch'
import {
  DeleteOfferedCourseDB,
  GetAllOfferedCourseDB,
  GetSingleOfferdCourseDB,
  MyOfferedCourseDB,
  UpdateSingleOfferedCourseDB,
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
    message: 'Offered courses retrieved successfully!',
    data: result,
  })
})

export const GetSingleOfferdCourse = useAsyncCatch(async (req, res) => {
  const result = await GetSingleOfferdCourseDB(req.params.id)
  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Offered course retrieved successfully!',
    data: result,
  })
})

export const UpdateSingleOfferedCourse = useAsyncCatch(async (req, res) => {
  const id = req.params.courseId
  const result = await UpdateSingleOfferedCourseDB(id, req.body)
  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Offered course retrieved successfully!',
    data: result,
  })
})

export const DeleteOfferedCourse = useAsyncCatch(async (req, res) => {
  const id = req.params.courseId
  const result = await DeleteOfferedCourseDB(id)
  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Offered course deleted successfully!',
    data: result,
  })
})
export const MyOfferedCourse = useAsyncCatch(async (req, res) => {
  const userId = req.user.userId
  const result = await MyOfferedCourseDB(userId, req.query)
  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'My Offered course retrieved successfully!',
    meta: result.meta,
    data: result.result,
  })
})
