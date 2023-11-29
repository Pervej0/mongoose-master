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

export default academiSemesterZodValidationSchema
