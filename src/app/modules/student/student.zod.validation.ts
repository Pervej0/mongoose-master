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

export const studentZodValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
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
      admissionSemester: z.string(),
      // academicFaculty: z.string(),
      // academicDepartment: z.string(),
      localGuardian: localGuardianSchema,
      isDeleted: z.boolean().optional(),
    }),
  }),
})

// update student data

const UpdateStudentNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[a-zA-Z]+$/, { message: 'Please use a proper name' })
    .optional(),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[a-zA-Z]+$/, {
      message: 'Last name cannot be more than 20 characters',
    })
    .optional(),
  middleName: z.string().optional(),
})

const UpdateGuardianSchema = z.object({
  fatherName: z.string().min(1).optional(),
  fatherOccupation: z.string().min(1).optional(),
  fatherContact: z.string().min(1).optional(),
  motherName: z.string().min(1).optional(),
  motherOccupation: z.string().min(1).optional(),
  motherContact: z.string().min(1).optional(),
})

const UpdateLocalGuardianSchema = z.object({
  name: z.string().min(1).optional(),
  occupation: z.string().min(1).optional(),
  contactNo: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
})

export const UpdateStudentZodValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: UpdateStudentNameSchema.optional(),
      studentProfile: z.string().optional(),
      gender: z.enum(['male', 'female', 'others']).optional(),
      dob: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContact: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAdd: z.string().optional(),
      permanentAdd: z.string().optional(),
      guardian: UpdateGuardianSchema.optional(),
      admissionSemester: z.string().optional(),
      localGuardian: UpdateLocalGuardianSchema.optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
})
