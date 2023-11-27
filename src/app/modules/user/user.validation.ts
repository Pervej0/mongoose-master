import { z } from 'zod'

const ZUser = z.object({
  name: z
    .string({ required_error: 'username is required!' })
    .max(30, { message: 'usrename can not be more than 30 characters!' })
    .trim(),
  password: z
    .string({ required_error: 'password is required!' })
    .min(6, { message: 'password must be more than 6 characters' })
    .max(20, { message: 'maximum limits extended!' }),
  needsPasswordChange: z.boolean().optional().default(true),
  email: z.string().optional(),
  role: z.enum(['student', 'teacher', 'admin']),
  staus: z.enum(['active', 'blocked']).default('active'),
  isDeletd: z.boolean().default(false),
})

export default ZUser
