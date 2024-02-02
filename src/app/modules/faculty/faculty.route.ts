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
router.get('/:facultyId', GetSingleFaculty)
router.patch(
  '/:facultyId',
  createDataValidation(updateFacultyValidationSchema),
  UpdateSingleFaculty,
)
router.delete('/:facultyId', UpdateSingleFacultyDeleteField)

const facultyRouter = router

export default facultyRouter
