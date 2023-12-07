import { RequestHandler } from 'express'
import useAsyncCatch from '../../utils/useAsyncCatch'
import {
  CreateCourseDB,
  DeleteSingleCourseDB,
  GetAllCourseDB,
  GetSingleCourseDB,
  UpdateSingleCourseDB,
} from './course.service'
import SendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

export const CreateCourse: RequestHandler = useAsyncCatch(async (req, res) => {
  const courseData = req.body
  const result = await CreateCourseDB(courseData)
  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Course created successfully!',
    data: result,
  })
})

export const GetAllCourse: RequestHandler = useAsyncCatch(async (req, res) => {
  const query = req.query
  const result = await GetAllCourseDB(query)
  SendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All Courses retrieved successfully!',
    data: result,
  })
})

export const GetSingleCourse: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.courseId
    const result = await GetSingleCourseDB(id)
    SendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Course retrieved successfully!',
      data: result,
    })
  },
)

export const DeleteSingleCourse: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.courseId
    const result = await DeleteSingleCourseDB(id)
    SendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Course deleted successfully!',
      data: result,
    })
  },
)

export const UpdateSingleCourse: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.courseId
    const updatedData = req.body
    const result = await UpdateSingleCourseDB(id, updatedData)
    SendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Course updated successfully!',
      data: result,
    })
  },
)
