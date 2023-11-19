import { Schema, model } from 'mongoose'
import {
  Guardian,
  LocalGuardian,
  Student,
  studentName,
} from './student.interface'

const studentNameSchema = new Schema<studentName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContact: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContact: { type: String, required: true },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

const studenSchema = new Schema<Student>({
  id: String,
  name: studentNameSchema,
  studentProfile: { type: String },
  gender: ['male', 'female', 'others'],
  dob: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAdd: { type: String, required: true },
  permanentAdd: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  isActive: ['active', 'block'],
})

// student model
export const StudentModel = model<Student>('Student', studenSchema)
