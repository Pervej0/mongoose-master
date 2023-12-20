import express from 'express'
import {
  GetAllAdmin,
  GetSingleAdmin,
  UpdateSingleAdmin,
  UpdateSingleFacultyDeleteField,
} from './admin.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { updateAdminValidationSchema } from './admin.validation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from '../user/user.const'
const router = express.Router()

router.get('/', auth(USER_ROLE.admin), GetAllAdmin)
router.get('/:adminId', GetSingleAdmin)
router.patch(
  '/:adminId',
  createDataValidation(updateAdminValidationSchema),
  UpdateSingleAdmin,
)
router.delete('/:adminId', UpdateSingleFacultyDeleteField)

const AdminRouter = router
export default AdminRouter
