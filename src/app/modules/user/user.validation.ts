import { z } from 'zod'
import { userStatus } from './user.const'

const UserZodValidatationSchema = z.object({
  body: z.object({
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
    role: z.enum(['student', 'faculty', 'admin']),
    status: z.enum(['active', 'blocked']).default('active'),
    isDeleted: z.boolean().optional().default(false),
  }),
})

export const changeStatusValidataionSchema = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]]),
  }),
})

export default UserZodValidatationSchema
