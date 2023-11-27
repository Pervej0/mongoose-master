import { NextFunction, Request, Response } from 'express'
import { createAUserDB } from './user.service'

export const createAUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('user controller')
  try {
    const { password, student: studentData } = req.body
    const query = await createAUserDB(password, studentData)
    res.status(200).json({
      success: true,
      message: 'Successfully user has been created!',
      data: query,
    })
  } catch (error) {
    next(error)
  }
}
