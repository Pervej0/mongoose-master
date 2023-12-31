import QueryBuilder from '../../builder/QueryBuilder'
import { FacultySearchableFields } from './admin.const'
import { TAdmin } from './admin.interface'
import AdminModel from './admin.model'

export const GetAllAdminDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(AdminModel.find(), query)
    .search(FacultySearchableFields)
    .filter()

  const result = await adminQuery.modelQuery
  return result
}

export const GetSingleAdminDB = async (id: string) => {
  const filter = { _id: id }
  const result = await AdminModel.findOne(filter)
  return result
}

export const UpdateSingleAdminDB = async (id: string, update: TAdmin) => {
  const { name, ...remainingPrimitiveFields } = update
  const filter = { _id: id }
  const modifiedData: Record<string, unknown> = { ...remainingPrimitiveFields }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value
    }
  }
  const result = await AdminModel.findOneAndUpdate(filter, modifiedData, {
    new: true,
    runValidators: true,
  })
  return result
}

export const UpdateSingleAdminDeleteFieldDB = async (id: string) => {
  const result = await AdminModel.findOneAndUpdate(
    { id },
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}
