import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { FIND_CURRENT_SCHOOL_DAY_QUERY } from '../components/dashboard/school-day/SchoolDay'
import { useSchoolDayContextProvider } from '../components/dashboard/school-day/state/SchoolDayContext'
import { useMarkingPeriodContextProvider } from '../contexts/markingPeriod/MarkingPeriodContext'
import { useUserContextProvider } from '../contexts/UserContext'
import {
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
  me_me_Student,
  SchoolDayLengthEnum,
} from '../schemaTypes'
import { timeFinder } from '../utils'
import { useTime } from './useTime'

export const useClassTimeIndicator = (student: me_me_Student) => {
  const [currentSchoolDayState] = useSchoolDayContextProvider()

  const { dateTime } = useTime()
  const { data: schoolDayData } = useQuery<
    findCurrentSchoolDay,
    findCurrentSchoolDayVariables
  >(FIND_CURRENT_SCHOOL_DAY_QUERY, {
    variables: {
      input: { date: new Date().toLocaleDateString() },
    },
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  const schoolDay = schoolDayData?.findSchoolDayByDate.schoolDay !== null

  const { assignmentsInClassNotAllowed } = student.inCourses[0].hasCourseInfo!
  const { schoolDayLength } = currentSchoolDayState.context.currentSchoolDay
  const classTime =
    schoolDay &&
    assignmentsInClassNotAllowed &&
    Date.parse(dateTime) >
      Date.parse(
        timeFinder(
          schoolDayLength === SchoolDayLengthEnum.HALF
            ? student.inCourses[0].hasCourseInfo?.halfDayStartsAt!
            : student.inCourses[0].hasCourseInfo?.startsAt!
        )
      ) &&
    Date.parse(dateTime) <
      Date.parse(
        timeFinder(
          schoolDayLength === SchoolDayLengthEnum.HALF
            ? student.inCourses[0].hasCourseInfo?.halfDayEndsAt!
            : student.inCourses[0].hasCourseInfo?.endsAt!
        )
      )
  return { classTime }
}
