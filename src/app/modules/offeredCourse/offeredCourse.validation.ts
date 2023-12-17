import { z } from 'zod'
import { Days } from './offeredCourse.const'

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = '^(?:[01]d|2[0-3]):[0-5]d$'
    return time.match(regex)
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
)

const offeredCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema, // HH: MM   00-23: 00-59
      endTime: timeStringSchema,
    })
    .refine(
      (data) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30
        const start = new Date(`2000-06-06T${data.startTime}`)
        const end = new Date(`2000-06-06T${data.endTime}`)
        return start < end
      },
      {
        message: 'Start time should be before End time !  ',
      },
    ),
})

export default offeredCourseValidationSchema
