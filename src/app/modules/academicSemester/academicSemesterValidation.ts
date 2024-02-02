import { z } from 'zod'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Month,
} from './acadmicSemester.constent'

const academiSemesterZodValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    year: z.number(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...Month] as [string, ...string[]]),
    endMonth: z.enum([...Month] as [string, ...string[]]),
  }),
})

export const UpdateAcademiSemesterZodValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    year: z.number().optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...Month] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Month] as [string, ...string[]]).optional(),
  }),
})

export default academiSemesterZodValidationSchema
