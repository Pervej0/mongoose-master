import express from 'express'
import {
  CreateAcademicFaculty,
  GetAllAcademicFaculty,
  GetSingleAcademicFaculty,
  UpdateSingleAcademicFaculty,
} from './academicFaculty.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import academicFacultyZodValidationSchema from './academicFacultyValidation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from '../user/user.const'
const router = express.Router()

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  createDataValidation(academicFacultyZodValidationSchema),
  CreateAcademicFaculty,
)
router.get('/', GetAllAcademicFaculty)
router.get('/:facultyId', GetSingleAcademicFaculty)
router.patch('/:facultyId', UpdateSingleAcademicFaculty)

export const academicFacultyRouter = router
