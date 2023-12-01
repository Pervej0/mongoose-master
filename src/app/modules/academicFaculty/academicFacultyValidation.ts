import { z } from 'zod'

const academicFacultyZodValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ invalid_type_error: 'Acadenic Faculty must be string' })
      .trim()
      .max(200),
  }),
})

export default academicFacultyZodValidationSchema
