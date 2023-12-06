import mongoose, { Schema } from 'mongoose'

const FacultySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Faculty name is requried!'],
    },
    id: { type: String, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'Academic-department',
    },
  },
  {
    timestamps: true,
  },
)

const FacultyModel = mongoose.model('Faculty', FacultySchema)

export default FacultyModel
