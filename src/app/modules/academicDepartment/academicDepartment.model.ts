import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import CustomError from '../../error/customError'
import httpStatus from 'http-status'

const academicDepartMentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Academic Department Name Created Successfully!'],
    },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'Academic-faculty' },
  },
  {
    timestamps: true,
  },
)

academicDepartMentSchema.pre('save', async function (next) {
  const filter = { name: this.name }
  const isDepartmentExist = await AcademicDepartmentModel.findOne(filter)
  if (isDepartmentExist)
    throw new CustomError(500, 'The department is already exist!')
  next()
})

academicDepartMentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    _id: query,
  })
  if (!isDepartmentExist)
    throw new CustomError(
      httpStatus.NOT_FOUND,
      'The department does not exist!',
    )

  next()
})

const AcademicDepartmentModel = model<TAcademicDepartment>(
  'Academic-department',
  academicDepartMentSchema,
)

export default AcademicDepartmentModel
