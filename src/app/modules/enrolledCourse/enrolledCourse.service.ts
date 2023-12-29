import { TEnrolledCourse } from './enrolledCourse.interface'
import EnrolledCourseModel from './enrolledCourse.model'

export const createEnrolledCourseIntoDB = async (
  id: string,
  payload: TEnrolledCourse,
) => {
  console.log(id, payload)

  const result = await EnrolledCourseModel.create(payload)
  return result
}
