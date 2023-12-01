import express from 'express'
import {
  CreateAcademicDepartment,
  GetAllAcademicDepartment,
  GetSingleAcademicDepartment,
  UpdateSingeAcademicDepartment,
} from './academicDepartment.controller'

const router = express.Router()

router.post('/create-academic-department', CreateAcademicDepartment)
router.get('/create-academic-department', GetAllAcademicDepartment)
router.get('/:departmentId', GetSingleAcademicDepartment)
router.patch('/:departmentId', UpdateSingeAcademicDepartment)

export const academicDepartmentRouter = router
