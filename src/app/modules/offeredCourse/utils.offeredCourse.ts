import { TSchedule } from './offeredCourse.interface'

export const hasTimeConflict = (
  assignSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignSchedules) {
    const existingStartTime = new Date(`2000-06-06T${schedule.startTime}`)
    const existingEndTime = new Date(`2000-06-06T${schedule.endTime}`)
    const newStartTime = new Date(`2000-06-06T${newSchedule.endTime}`)
    const newEndTime = new Date(`2000-06-06T${newSchedule.endTime}`)

    if (existingStartTime < newEndTime && existingEndTime > newStartTime) {
      return true
    }
  }
  return false
}
