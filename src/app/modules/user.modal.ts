import { Schema, model } from 'mongoose'
import { TUser } from './user/user.interface'

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
    },
    password: { type: String, required: [true, 'Password is required'] },
    needsPasswordChange: { type: Boolean, default: true },
    email: { type: String, required: false },
    role: { type: String, enum: ['student', 'faculty', 'admin'] },
    status: {
      type: String,
      enum: ['active', 'blocked'],
    },
    // instead of this two line by default mongoose provide that when "timestamps: true"
    // createdAt: { type: Date, required: [true, 'Created Date is required'] },
    // updatedAt: { type: String, required: [true, 'Updated Date is required'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

const UserModel = model<TUser>('Practice_User', userSchema)

export default UserModel
