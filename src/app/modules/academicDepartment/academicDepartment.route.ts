import express from 'express'
import {
  CreateAcademicDepartment,
  GetAllAcademicDepartment,
  GetSingleAcademicDepartment,
  UpdateSingeAcademicDepartment,
} from './academicDepartment.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import academicDepartmentZodValidation from './academicDepartmentValidation'

const router = express.Router()

router.post(
  '/create-academic-department',
  createDataValidation(academicDepartmentZodValidation),
  CreateAcademicDepartment,
)
router.get('/', GetAllAcademicDepartment)
router.get('/:departmentId', GetSingleAcademicDepartment)
router.patch('/:departmentId', UpdateSingeAcademicDepartment)

export const academicDepartmentRouter = router
