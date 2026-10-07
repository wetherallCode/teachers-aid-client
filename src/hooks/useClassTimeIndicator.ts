import { useQuery } from '@apollo/client'
import { FIND_CURRENT_SCHOOL_DAY_QUERY } from '../components/dashboard/school-day/SchoolDay'
import { useSchoolDayContextProvider } from '../components/dashboard/school-day/state/SchoolDayContext'

import {
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
  me_me_Student,
  SchoolDayLengthEnum,
} from '../schemaTypes'
import { timeFinder, timeToMinutes } from '../utils'
import { useTime } from './useTime'

export const useClassTimeIndicator = (student: me_me_Student) => {
  const [currentSchoolDayState] = useSchoolDayContextProvider()

  const { dateTime } = useTime()
  const now = new Date()

  const currentTime =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
  console.log('currentTime: ', currentTime)

  const { data: schoolDayData } = useQuery<
    findCurrentSchoolDay,
    findCurrentSchoolDayVariables
  >(FIND_CURRENT_SCHOOL_DAY_QUERY, {
    variables: {
      input: { date: new Date().toLocaleDateString() },
    },
    onError: (error) => console.error(error),
  })
  const schoolDay = schoolDayData?.findSchoolDayByDate.schoolDay !== null
  const { schoolDayLength } = currentSchoolDayState.context.currentSchoolDay

  const classTimeStartsAt = timeToMinutes(
    schoolDayLength === SchoolDayLengthEnum.HALF
      ? student.inCourses[0].hasCourseInfo?.halfDayStartsAt!
      : schoolDayLength === SchoolDayLengthEnum.ONE_HOUR_DELAY
        ? student.inCourses[0].hasCourseInfo?.hourDelayStartsAt
        : student.inCourses[0].hasCourseInfo?.startsAt!,
  )

  const classTimeEndsAt = timeToMinutes(
    schoolDayLength === SchoolDayLengthEnum.HALF
      ? student.inCourses[0].hasCourseInfo?.halfDayEndsAt!
      : schoolDayLength === SchoolDayLengthEnum.ONE_HOUR_DELAY
        ? student.inCourses[0].hasCourseInfo?.hourDelayEndsAt
        : student.inCourses[0].hasCourseInfo?.endsAt!,
  )
  // console.log(currentTime > classTimeStartsAt && currentTime < classTimeEndsAt)

  const bIsClassTime =
    currentTime > classTimeStartsAt && currentTime < classTimeEndsAt

  const classTime =
    schoolDay &&
    Date.parse(dateTime.toLocaleString('en-US')) >
      Date.parse(
        timeFinder(
          schoolDayLength === SchoolDayLengthEnum.HALF
            ? student.inCourses[0].hasCourseInfo?.halfDayStartsAt!
            : schoolDayLength === SchoolDayLengthEnum.ONE_HOUR_DELAY
              ? student.inCourses[0].hasCourseInfo?.hourDelayStartsAt
              : student.inCourses[0].hasCourseInfo?.startsAt!,
        ),
      ) &&
    Date.parse(dateTime.toLocaleString('en-US')) <
      Date.parse(
        timeFinder(
          schoolDayLength === SchoolDayLengthEnum.HALF
            ? student.inCourses[0].hasCourseInfo?.halfDayEndsAt!
            : schoolDayLength === SchoolDayLengthEnum.ONE_HOUR_DELAY
              ? student.inCourses[0].hasCourseInfo.hourDelayEndsAt
              : student.inCourses[0].hasCourseInfo?.endsAt!,
        ),
      )

  return { classTime, bIsClassTime }
}
