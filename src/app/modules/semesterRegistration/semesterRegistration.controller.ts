import { RequestHandler } from 'express'
import useAsyncCatch from '../../utils/useAsyncCatch'
import {
  GetAllSemesterRegistrationDB,
  GetSingleSemesterRegistrationDB,
  UpdateSingleSemesterRagistrationDB,
  createSemesterRagistrationDB,
} from './semesterRegistration.service'
import SendResponse from '../../utils/sendResponse'

export const createSemesterRagistration: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const ragistrationData = req.body
    const result = await createSemesterRagistrationDB(ragistrationData)
    SendResponse(res, {
      statusCode: 200,
      message: 'Semeseter Registration created successfully!',
      data: result,
    })
  },
)

export const GetAllSemesterRegistraion: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const result = await GetAllSemesterRegistrationDB(req.query)
    SendResponse(res, {
      statusCode: 200,
      message: 'All Semeseter Registration retrieved successfully!',
      data: result,
    })
  },
)

export const GetSingleSemesterRagistration: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const result = await GetSingleSemesterRegistrationDB(
      req.params.registrationId,
    )
    SendResponse(res, {
      statusCode: 200,
      message: 'Semeseter Registration retrieved successfully!',
      data: result,
    })
  },
)

export const UpdateSingleSemesterRagistration: RequestHandler = useAsyncCatch(
  async (req, res) => {
    const updatedData = req.body
    const id = req.params.registrationId
    console.log(id)
    const result = await UpdateSingleSemesterRagistrationDB(updatedData, id)
    SendResponse(res, {
      statusCode: 200,
      message: 'Semeseter Registration updated successfully!',
      data: result,
    })
  },
)
