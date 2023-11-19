import express from 'express'
import { createAStudent } from './student.controller'
const router = express.Router()

router.post('/create-student', createAStudent)

export const studentRoute = router
