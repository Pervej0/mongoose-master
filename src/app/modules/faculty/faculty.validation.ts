import { z } from 'zod'

export const facultyValidationSchema = z.object({
  name: z.string({ required_error: 'name is required!' }),
  id: z.string().optional(),
  isDeleted: z.boolean().default(false),
})
