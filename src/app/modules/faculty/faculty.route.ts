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
const router = express.Router()

router.get('/', auth(), GetAllFaculty)
router.get('/:facultyId', GetSingleFaculty)
router.patch(
  '/:facultyId',
  createDataValidation(updateFacultyValidationSchema),
  UpdateSingleFaculty,
)
router.delete('/:facultyId', UpdateSingleFacultyDeleteField)

const facultyRouter = router

export default facultyRouter
