export const USER_ROLE = {
  student: 'student',
  admin: 'admin',
  faculty: 'faculty',
} as const

export type TUser_role = keyof typeof USER_ROLE

export const userStatus = ['active', 'blocked']
