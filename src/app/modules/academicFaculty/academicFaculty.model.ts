import { Schema, model } from 'mongoose'
import TAcademicFaculty from './academicFaculty.interface'

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, 'Academic Faculty name is required!'],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)

const AcademicFacultyModel = model<TAcademicFaculty>(
  'academic-faculty',
  academicFacultySchema,
)

export default AcademicFacultyModel
