import express, { Router } from 'express'
import {
  CreateAcademicSemester,
  GetAllAcademicSemester,
  GetSingleAcademicSemester,
  UpdateSingleAcademicSemester,
} from './academicSemester.controller'
import academiSemesterZodValidationSchema, {
  UpdateAcademiSemesterZodValidationSchema,
} from './academicSemesterValidation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from '../user/user.const'
const router = express.Router()

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  createDataValidation(academiSemesterZodValidationSchema),
  CreateAcademicSemester,
)

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  GetAllAcademicSemester,
)
router.get(
  '/:semesterId',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  GetSingleAcademicSemester,
)
router.patch(
  '/:semesterId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  createDataValidation(UpdateAcademiSemesterZodValidationSchema),
  UpdateSingleAcademicSemester,
)

export const academicSemesterRouter: Router = router
