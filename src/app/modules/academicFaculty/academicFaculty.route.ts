import express from 'express'
import {
  CreateAcademicFaculty,
  GetAllAcademicFaculty,
  GetSingleAcademicFaculty,
  UpdateSingleAcademicFaculty,
} from './academicFaculty.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import academicFacultyZodValidationSchema from './academicFacultyValidation'
const router = express.Router()

router.post(
  '/create-academic-faculty',
  createDataValidation(academicFacultyZodValidationSchema),
  CreateAcademicFaculty,
)
router.get('/create-academic-faculty', GetAllAcademicFaculty)
router.get('/:facultyId', GetSingleAcademicFaculty)
router.patch('/:facultyId', UpdateSingleAcademicFaculty)

export const academicFacultyRouter = router
