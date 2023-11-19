import { Request, Response } from 'express'
// import studentServices from './student.services'

export const createAStudent = async (req: Request, res: Response) => {
  try {
    // const data = req.body
    // await studentServices.createAStudentDB(data)

    res.status(200).json({
      success: true,
      message: 'Student has been created Successfully',
    })
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}
