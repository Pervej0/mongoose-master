import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'

const academicDepartMentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Academic Department Name Created Successfully!'],
    },
    academicFaculty: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  },
)

academicDepartMentSchema.pre('save', async function (next) {
  const filter = { name: this.name }
  const isDepartmentExist = await AcademicDepartmentModel.findOne(filter)
  if (isDepartmentExist) throw new Error('The department is already exist!')
  next()
})

academicDepartMentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepartmentModel.findById({
    _id: query.departmentId,
  })
  if (!isDepartmentExist) throw new Error('The department does not exist!')

  next()
})

const AcademicDepartmentModel = model<TAcademicDepartment>(
  'Academic-department',
  academicDepartMentSchema,
)

export default AcademicDepartmentModel
