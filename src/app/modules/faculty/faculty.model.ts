import mongoose, { Schema } from 'mongoose'

const FacultySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Faculty name is requried!'],
    },
    id: {
      type: String,
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const FacultyModel = mongoose.model('Faculty', FacultySchema)

export default FacultyModel
