export type TAcademicSemesterName = 'autumn' | 'summer' | 'fall'

export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type TAcademicSemester = {
  name: TAcademicSemesterName
  year: number
  code: '01' | '02' | '03'
  startMonth: string
  endMonth: string
}
