import { z } from 'zod'

const academicDepartmentZodValidation = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Department Name must be a string!' }),
    academicFaculty: z.string().optional(),
  }),
})

export default academicDepartmentZodValidation
