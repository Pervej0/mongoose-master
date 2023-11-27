import express, { Router } from 'express'
import { createAUser } from './user.controller'
const router = express.Router()

console.log('user route')

router.post('/create-student', createAUser)

export const userRoutes: Router = router
