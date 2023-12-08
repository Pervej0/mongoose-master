import { TAdmin } from './admin.interface'
import AdminModel from './admin.model'

// export const GetAllFacultyDB = async (query: Record<string, unknown>) => {
//     const facultyQuery = new QueryBuilder(
//       FacultyModel.find().populate({
//         path: 'academicDepartment',
//         populate: 'academicFaculty',
//       }),
//       query,
//     )
//       .search(FacultySearchableFields)
//       .filter()
//       .sort()
//       .paginate()
//       .fields()
//     const result = await facultyQuery.modelQuery
//     return result
//   }

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
