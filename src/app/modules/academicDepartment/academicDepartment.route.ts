import express from 'express'
import {
  CreateAcademicDepartment,
  GetAllAcademicDepartment,
  GetSingleAcademicDepartment,
  UpdateSingeAcademicDepartment,
} from './academicDepartment.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import academicDepartmentZodValidation from './academicDepartmentValidation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from '../user/user.const'

const router = express.Router()

router.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  createDataValidation(academicDepartmentZodValidation),
  CreateAcademicDepartment,
)
router.get('/', GetAllAcademicDepartment)
router.get('/:departmentId', GetSingleAcademicDepartment)
router.patch('/:departmentId', UpdateSingeAcademicDepartment)

export const academicDepartmentRouter = router
