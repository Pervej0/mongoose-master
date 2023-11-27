import { Request, Response } from 'express'
import { studentServices } from './student.services'
// import studentZodValidationSchema from './student.zod.validation'
// import studentValidationSchema from './student.validation'

const createAStudent = async (req: Request, res: Response) => {
  try {
    const data = req.body.student
    // const zodparseData = studentZodValidationSchema.parse(data)
    // console.log(zodparseData)

    // data validation by using joi
    // const { error, value } = studentValidationSchema.validate(data)
    // console.log({ error: error?.details }, value)

    const result = await studentServices.createAStudentDB(data)

    res.status(200).json({
      success: true,
      message: 'Student has been created Successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const query = await studentServices.getAllStudentDB()
    res.status(200).send({
      success: true,
      message: 'Successfully all students data retrieved',
      data: query,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.studentId
    const query = await studentServices.getSingleStudentDB(id)
    res.status(200).send({
      success: true,
      message: 'Successfully student data retrieved',
      data: query,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const updateIsDeletedField = async (req: Request, res: Response) => {
  try {
    const stoudentId = req.params.studentId
    const result = await studentServices.updateIsDeletedFieldDB(stoudentId)
    res.status(200).json({
      success: true,
      message: 'Student Field successfully deleted',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

export const studentControllers = {
  createAStudent,
  getAllStudent,
  getSingleStudent,
  updateIsDeletedField,
}
