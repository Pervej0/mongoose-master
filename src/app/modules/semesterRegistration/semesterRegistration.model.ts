import mongoose, { Schema } from 'mongoose'
import { semesterStatus } from './semesterRegistration.const'
import { TSemesterRegistration } from './semesterRegistration.interface'

const semesterRegistrationSchema = new Schema(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'Academic-semester',
    },
    status: {
      type: String,
      enum: semesterStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
)

const SemesterRegistrationModel = mongoose.model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
)

export default SemesterRegistrationModel
