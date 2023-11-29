import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

export const createDataValidation = (zodValidataion: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodValidataion.parseAsync({
        body: req.body,
      })
      next()
    } catch (error) {
      next(error)
    }
  }
}
