import express from 'express'
import {
  GetSingleAdmin,
  UpdateSingleAdmin,
  UpdateSingleFacultyDeleteField,
} from './admin.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { updateAdminValidationSchema } from './admin.validation'
const router = express.Router()

// router.get('/')
router.get('/:adminId', GetSingleAdmin)
router.patch(
  '/:adminId',
  createDataValidation(updateAdminValidationSchema),
  UpdateSingleAdmin,
)
router.delete('/:adminId', UpdateSingleFacultyDeleteField)

const AdminRouter = router
export default AdminRouter
