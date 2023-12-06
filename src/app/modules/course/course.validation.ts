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
    preRequisiteCourses: z.array(preRequisiteCoursesSchema),
  }),
})

const UpdatePreRequisiteCoursesSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
})

export const UpdateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().optional(),
    prefix: z.string().trim().optional(),
    code: z.number({ required_error: 'Code must be in number!' }).optional(),
    credits: z
      .number({ required_error: 'Credits must be in number!' })
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
    preRequisiteCourses: z.array(UpdatePreRequisiteCoursesSchema).optional(),
  }),
})
