import { Types } from 'mongoose'

type TFaculty = {
  id?: string
  user?: Types.ObjectId
  name: string
  academicDepartment?: Types.ObjectId
  isDeleted?: boolean
}

export default TFaculty
