import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import useAsyncCatch from '../../utils/useAsyncCatch'

export const createDataValidation = (zodValidataion: AnyZodObject) => {
  return useAsyncCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      await zodValidataion.parseAsync({
        body: req.body,
      })
      next()
    },
  )
}
