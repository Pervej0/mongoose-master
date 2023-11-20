import { z } from 'zod'

const studentNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[a-zA-Z]+$/, { message: 'Please use a proper name' }),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[a-zA-Z]+$/, {
      message: 'Last name cannot be more than 20 characters',
    }),
  middleName: z.string().optional(),
})

const guardianSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContact: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContact: z.string().min(1),
})

const localGuardianSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
})

const studentZodValidationSchema = z.object({
  id: z.string(),
  name: studentNameSchema,
  studentProfile: z.string().optional(),
  gender: z.enum(['male', 'female', 'others']),
  dob: z.string(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContact: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAdd: z.string(),
  permanentAdd: z.string(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  isActive: z.enum(['active', 'block']).default('active'),
})

export default studentZodValidationSchema
