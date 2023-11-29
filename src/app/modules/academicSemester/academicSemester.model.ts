import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Month,
} from './acadmicSemester.constent'

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: [...AcademicSemesterName],
    require: [true, 'Semester Name is required!'],
  },
  year: {
    type: Number,
    required: [true, 'Year is required!'],
  },
  code: {
    type: String,
    enum: [...AcademicSemesterCode],
    require: [true, 'Semester Code is required!'],
  },
  startMonth: {
    type: String,
    enum: [...Month],
    require: [true, 'Start month is required!'],
  },
  endMonth: {
    type: String,
    enum: [...Month],
    require: [true, 'End month is required!'],
  },
})

academicSemesterSchema.pre('save', async function (next) {
  const filter1 = { name: this.name }
  const filter2 = { year: this.year }
  const isSemesterExist = await AcademicSemesterModel.findOne(filter1, filter2)
  if (isSemesterExist) {
    throw new Error('The Semester is already exist!')
  }
  next()
})

export const AcademicSemesterModel = model<TAcademicSemester>(
  'Academic-semester',
  academicSemesterSchema,
)
