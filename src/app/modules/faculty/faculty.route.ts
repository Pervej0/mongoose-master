import express from 'express'
import {
  GetAllFaculty,
  GetSingleFaculty,
  UpdateSingleFaculty,
  UpdateSingleFacultyDeleteField,
} from './faculty.controller'
const router = express.Router()

router.get('/', GetAllFaculty)
router.get('/:facultyId', GetSingleFaculty)
router.patch('/:facultyId', UpdateSingleFaculty)
router.delete('/:facultyId', UpdateSingleFacultyDeleteField)

const facultyRouter = router

export default facultyRouter
