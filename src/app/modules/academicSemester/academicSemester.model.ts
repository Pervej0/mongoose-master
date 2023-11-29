import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: ['Autumn', 'Summar', 'Fall'],
    require: [true, 'Semester Name is required!'],
  },
  year: {
    type: Number,
    required: [true, 'Year is required!'],
  },
  code: {
    type: String,
    enum: ['01', '02', '03'],
    require: [true, 'Semester Code is required!'],
  },
  startMonth: {
    type: String,
    require: [true, 'Start month is required!'],
  },
  endMonth: {
    type: String,
    require: [true, 'End month is required!'],
  },
})

export const AcademicSemesterModel = model<TAcademicSemester>(
  'Academic-semester',
  academicSemesterSchema,
)
