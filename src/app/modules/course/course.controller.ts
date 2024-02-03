import { RequestHandler } from 'express'
import useAsyncCatch from '../../utils/useAsyncCatch'
import {
  AssignCourseFacultiesDB,
  CreateCourseDB,
  DeleteSingleCourseDB,
  GetAllCourseDB,
  GetSingleCourseDB,
  GetSingleFacultyAndCourseDB,
  RemoveCourseFacultiesDB,
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
    meta: result.meta,
    data: result.result,
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

// faculties related request handling

export const GetSingleFacultyAndCourse: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.courseId
    const result = await GetSingleFacultyAndCourseDB(id)
    SendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Faculty with course retrieved successfully!',
      data: result,
    })
  },
)

export const AssignCourseFaculties: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.courseId
    const updatedData = req.body
    const result = await AssignCourseFacultiesDB(id, updatedData)
    SendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Course Faculties added successfully!',
      data: result,
    })
  },
)

export const RemoveCourseFaculties: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const id = req.params.courseId
    const deletedData = req.body
    const result = await RemoveCourseFacultiesDB(id, deletedData)
    SendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Course Faculties added successfully!',
      data: result,
    })
  },
)
