import config from '../config'
import { USER_ROLE } from '../modules/user/user.const'
import UserModel from '../modules/user/user.modal'

const superAdminData = {
  id: '0001',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'active',
  email: 'mdparvez222khan@gmail.com',
  isDeleted: false,
}

const createSuperAdmin = async () => {
  const isSuperAdminExist = await UserModel.findOne({
    role: USER_ROLE.superAdmin,
  })
  if (!isSuperAdminExist) {
    await UserModel.create(superAdminData)
  }
}

export default createSuperAdmin
