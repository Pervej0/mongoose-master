import express from 'express'
import {
  GetAllFaculty,
  GetSingleFaculty,
  UpdateSingleFaculty,
  UpdateSingleFacultyDeleteField,
} from './faculty.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { updateFacultyValidationSchema } from './faculty.validation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from '../user/user.const'
const router = express.Router()

router.get('/', auth(USER_ROLE.admin, USER_ROLE.superAdmin), GetAllFaculty)
router.get(
  '/:facultyId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  GetSingleFaculty,
)
router.patch(
  '/:facultyId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  createDataValidation(updateFacultyValidationSchema),
  UpdateSingleFaculty,
)
router.delete(
  '/:facultyId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  UpdateSingleFacultyDeleteField,
)

const facultyRouter = router

export default facultyRouter
