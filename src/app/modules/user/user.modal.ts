import { Schema, model } from 'mongoose'
import { TUser, UserInterface } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser, UserInterface>(
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
      default: 'active',
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

// mongoose save hook/middleware
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.salt_round))
  next()
})

// static method
userSchema.statics.isUserExistById = async function (id) {
  return await UserModel.findOne({ id })
}
userSchema.statics.isPasswordMatched = async function (
  plainPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainPassword, hashPassword)
}

const UserModel = model<TUser, UserInterface>('Practice_User', userSchema)

export default UserModel
