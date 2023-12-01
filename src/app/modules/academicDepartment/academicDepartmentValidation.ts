import { z } from 'zod'

const academicDepartMentZodValidation = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Department Name must be a string!' }),
    academicFaculty: z.string().optional(),
  }),
})

export default academicDepartMentZodValidation
