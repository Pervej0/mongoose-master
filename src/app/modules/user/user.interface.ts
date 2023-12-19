import { Model } from 'mongoose'

// export type TUser {
//   id: string
//   password: string
//   needsPasswordChange?: boolean
//   role: 'student' | 'faculty' | 'admin'
//   status: 'active' | 'blocked'
//   email?: string
//   isDeleted: boolean
// }

// user
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface TUser {
  id: string
  password: string
  needsPasswordChange?: boolean
  role: 'student' | 'faculty' | 'admin'
  status: 'active' | 'blocked'
  email?: string
  isDeleted: boolean
  passwordUpdatedAt: Date
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface UserInterface extends Model<TUser> {
  isUserExistById(id: string): Promise<TUser>
  isPasswordMatched(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean>
}
