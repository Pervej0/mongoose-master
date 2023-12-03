import express, { Router } from 'express'
import {
  CreateAcademicSemester,
  GetAllAcademicSemester,
  GetSingleAcademicSemester,
  UpdateSingleAcademicSemester,
} from './academicSemester.controller'
import academiSemesterZodValidationSchema from './academicSemesterValidation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
const router = express.Router()

router.post(
  '/create-academic-semester',
  createDataValidation(academiSemesterZodValidationSchema),
  CreateAcademicSemester,
)

router.get('/', GetAllAcademicSemester)
router.get('/:semesterId', GetSingleAcademicSemester)
router.patch('/:semesterId', UpdateSingleAcademicSemester)

export const academicSemesterRouter: Router = router
