import express from 'express'
import {
  GetAllFaculty,
  GetSingleFaculty,
  UpdateSingleFaculty,
  UpdateSingleFacultyDeleteField,
} from './faculty.controller'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { updateFacultyValidationSchema } from './faculty.validation'
const router = express.Router()

router.get('/', GetAllFaculty)
router.get('/:facultyId', GetSingleFaculty)
router.patch(
  '/:facultyId',
  createDataValidation(updateFacultyValidationSchema),
  UpdateSingleFaculty,
)
router.delete('/:facultyId', UpdateSingleFacultyDeleteField)

const facultyRouter = router

export default facultyRouter
