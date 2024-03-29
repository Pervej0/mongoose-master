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
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['student', 'faculty', 'admin', 'superAdmin'] },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: { type: Boolean, default: false },
    passwordUpdatedAt: {
      type: Date,
    },
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

userSchema.post('save', function (doc, next) {
  doc.password = ''
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

userSchema.statics.jwtIssuedAndPasswordChangedTime = async function (
  jwtIssuedAt: number,
  passwordChangedAt: Date,
) {
  const passwordChangedTime = new Date(passwordChangedAt).getTime() / 1000
  return passwordChangedTime > jwtIssuedAt
}

const UserModel = model<TUser, UserInterface>('User', userSchema)

export default UserModel
