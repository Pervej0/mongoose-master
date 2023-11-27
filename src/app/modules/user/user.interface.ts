export type TUser = {
  id: string
  password: string
  needsPasswordChange?: boolean
  role: 'student' | 'teacher' | 'admin'
  status: 'active' | 'blocked'
  email?: string
  isDeleted: boolean
}
