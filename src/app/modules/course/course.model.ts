import mongoose, { Schema } from 'mongoose'
import { TCourse, TPreRequisiteCourses } from './course.interface'

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
)

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, 'Course title is required!'],
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: [true, 'Prefix title is required!'],
    trim: true,
  },
  code: {
    type: Number,
    required: [true, 'Course code is required!'],
    trim: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const CourseModel = mongoose.model<TCourse>('Course', courseSchema)

export default CourseModel
