import { z } from 'zod'

export const facultyValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.string({ required_error: 'name is required!' }),
      id: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
})
