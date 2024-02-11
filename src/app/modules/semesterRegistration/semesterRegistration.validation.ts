import { z } from 'zod'
import { semesterStatus } from './semesterRegistration.const'

export const semesterRegistrationZodValidation = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...semesterStatus] as [string, ...string[]]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
})

export const UpdateSemesterRegistrationZodValidation = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z.enum([...semesterStatus] as [string, ...string[]]).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
})
