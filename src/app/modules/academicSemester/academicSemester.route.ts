import express, { Router } from 'express'
import {
  CreateAcademicSemester,
  GetAllAcademicSemester,
  GetSingleAcademicSemester,
  UpdateSingleAcademicSemester,
} from './academicSemester.controller'
import academiSemesterZodValidationSchema from './academicSemesterValidation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from '../user/user.const'
const router = express.Router()

router.post(
  '/create-academic-semester',
  createDataValidation(academiSemesterZodValidationSchema),
  CreateAcademicSemester,
)

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  GetAllAcademicSemester,
)
router.get('/:semesterId', GetSingleAcademicSemester)
router.patch('/:semesterId', UpdateSingleAcademicSemester)

export const academicSemesterRouter: Router = router
