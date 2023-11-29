import { Schema, model } from 'mongoose'
import {
  Guardian,
  LocalGuardian,
  Student,
  studentName,
} from './student.interface'
import validator from 'validator'
import config from '../../config'
import bcrypt from 'bcrypt'

const studentNameSchema = new Schema<studentName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxlength: [20, 'First name cannot be 20 character'],
    trim: true,
    validate: {
      validator: (value: string) => {
        return /^[a-zA-Z]+$/.test(value)
      },
      message: 'Please use a proper name',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Last name cannot be more than 20 character'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: `{VALUE} is not valid`,
    },
  },
  middleName: { type: String },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'Father Name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContact: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  motherName: { type: String, required: [true, 'Mother Name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContact: {
    type: String,
    required: [true, 'Mother Contact number is required'],
  },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact No is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
})

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    max: [20, 'Password can not be more than 20 characters'],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'UserId is required'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: studentNameSchema,
    required: [true, 'Name is required to submit'],
  },
  studentProfile: { type: String },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: `{VALUE} is not in correct format`,
    },
    required: true,
  },
  dob: { type: String, required: [true, 'Date of Birth is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  contactNo: { type: String, required: [true, 'Contact Number is required'] },
  emergencyContact: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAdd: { type: String, required: [true, 'Present Address is required'] },
  permanentAdd: {
    type: String,
    required: [true, 'Permanent Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian Details is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian details is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

// mongoose save hook/middleware
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.salt_round))
  next()
})

studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

// mongoose query hook/middleware
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// aggregate hooks
studentSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: {} })
})

// student model
export const StudentModel = model<Student>('Student', studentSchema)
