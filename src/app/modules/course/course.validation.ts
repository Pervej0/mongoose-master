import { z } from 'zod'

const preRequisiteCoursesSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false).optional(),
})

export const CourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim(),
    prefix: z.string().trim(),
    code: z.number({ required_error: 'Code must be in number!' }),
    credits: z.number({ required_error: 'Credits must be in number!' }),
    isDeleted: z.boolean().default(false),
    preRequisiteCourses: z.array(preRequisiteCoursesSchema).optional(),
  }),
})

export const UpdateCourseValidationSchema = CourseValidationSchema.partial()

export const courseFaculitesValidationSchema = z.object({
  body: z.object({
    course: z.string(),
    faculties: z.array(z.string()),
  }),
})
