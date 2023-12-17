import express, { Router } from 'express'
import {
  GetAllSemesterRegistraion,
  GetSingleSemesterRagistration,
  UpdateSingleSemesterRagistration,
  createSemesterRagistration,
} from './semesterRegistration.controller'
import { semesterRegistrationZodValidation } from './semesterRegistration.validation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
const router = express.Router()

router.post(
  '/create-semester-ragistration',
  createDataValidation(semesterRegistrationZodValidation),
  createSemesterRagistration,
)
router.get('/', GetAllSemesterRegistraion)
router.get('/', GetSingleSemesterRagistration)
router.put('/:registrationId', UpdateSingleSemesterRagistration)

const semesterRegistrationRouter: Router = router

export default semesterRegistrationRouter
