import express, { Router } from 'express'
import { studentControllers } from './student.controller'

const router = express.Router()

router.post('/create-student', studentControllers.createAStudent)
router.get('/:studentId', studentControllers.getSingleStudent)
router.get('/', studentControllers.getAllStudent)

export const StudentRoutes: Router = router
