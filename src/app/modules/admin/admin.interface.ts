import { Types } from 'mongoose'

export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContact: string
  motherName: string
  motherOccupation: string
  motherContact: string
}

export type adminName = {
  firstName: string
  lastName: string
  middleName?: string | undefined
}

export type TStudent = {
  id: string
  password: string
  user?: Types.ObjectId
  name: adminName
  adminProfile?: string
  gender: 'male' | 'female' | 'others'
  dob: string
  email: string
  contactNo: string
  emergencyContact: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAdd: string
  permanentAdd: string
  guardian: Guardian
  admissionSemester: Types.ObjectId
  academicDepartment: Types.ObjectId
  isDeleted: boolean
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
