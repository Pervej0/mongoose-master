import express, { Router } from 'express'
import {
  GetAllSemesterRegistraion,
  GetSingleSemesterRagistration,
  UpdateSingleSemesterRagistration,
  createSemesterRagistration,
} from './semesterRegistration.controller'
import { semesterRegistrationZodValidation } from './semesterRegistration.validation'
import { createDataValidation } from '../../config/middleware/createDataValidation'
import { auth } from '../../config/middleware/auth'
import { USER_ROLE } from '../user/user.const'
const router = express.Router()

router.post(
  '/create-semester-ragistration',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  createDataValidation(semesterRegistrationZodValidation),
  createSemesterRagistration,
)
router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  GetAllSemesterRegistraion,
)
router.get(
  '/:registrationId',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  GetSingleSemesterRagistration,
)

router.delete('/:registrationId', auth(USER_ROLE.admin, USER_ROLE.superAdmin))

router.put(
  '/:registrationId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  UpdateSingleSemesterRagistration,
)

const semesterRegistrationRouter: Router = router

export default semesterRegistrationRouter
