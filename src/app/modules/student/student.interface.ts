export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContact: string
  motherName: string
  motherOccupation: string
  motherContact: string
}

export type studentName = {
  firstName: string
  lastName: string
  middleName: string
}

export type Student = {
  id: string
  name: studentName
  studentProfile?: string
  gender: 'male' | 'female' | 'others'
  dob: string
  email: string
  contactNo: string
  emergencyContact: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAdd: string
  permanentAdd: string
  guardian: Guardian
  localGuardian: LocalGuardian
  isActive: 'active' | 'inActive'
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
