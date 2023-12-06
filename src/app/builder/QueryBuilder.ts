import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }
  search(searchableFields: string[]) {
    const searchTearm = this.query.searchTerm || ''
    this.modelQuery = this.modelQuery.find({
      $or: searchableFields?.map((field) => ({
        [field]: { $regex: searchTearm, $options: 'i' },
      })),
    } as FilterQuery<T>)
    return this
  }
  filter() {
    const queryObj: Record<string, unknown> = { ...this.query }
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    excludeFields.forEach((el) => delete queryObj[el])
    this.modelQuery = this.modelQuery.find(queryObj)
    return this
  }
  sort() {
    const sortable = ((this.query.sort as string)?.split(',').join(' ') ||
      '-createdAt') as string
    this.modelQuery = this.modelQuery.sort(sortable)
    return this
  }
  limit() {
    const limitable = Number(this.query.limit || 1) as number
    this.modelQuery = this.modelQuery.limit(limitable)
  }
  paginate() {
    const limit = Number(this.query.limit || 10)
    const page = Number(this.query.page || 1)
    const skip = (page - 1) * limit
    this.modelQuery = this.modelQuery.skip(skip).limit(limit)
    return this
  }
  fields() {
    let fieldsData = '-__v'
    fieldsData = (this.query.fields as string)?.split(',').join(' ')
    this.modelQuery = this.modelQuery.select(fieldsData)
    return this
  }
}

export default QueryBuilder
