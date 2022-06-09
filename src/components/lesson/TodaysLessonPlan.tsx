import { useLazyQuery, useQuery } from '@apollo/client'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Navigate } from 'react-router'
import { useUserContextProvider } from '../../contexts/UserContext'
import { useTime } from '../../hooks/useTime'
import {
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
  findLessonByCourseAndDate,
  findLessonByCourseAndDateVariables,
  me_me,
  SchoolDayLengthEnum,
} from '../../schemaTypes'
import { date, timeFinder } from '../../utils'
import { FIND_CURRENT_SCHOOL_DAY_QUERY } from '../dashboard/school-day/SchoolDay'

import { FIND_LESSON_QUERY } from './LessonMainMenu'
import { useDailyAgendaContextProvider } from './state-n-styles/DailyAgendaContext'

export type TodaysLessonPlanProps = {
  setHasLessonNow?: Dispatch<SetStateAction<boolean>>
}

export const TodaysLessonPlan = ({
  setHasLessonNow,
}: TodaysLessonPlanProps) => {
  const me: me_me = useUserContextProvider()
  const [state, event] = useDailyAgendaContextProvider()
  const { dateTime } = useTime()

  const { data: schoolDayData } = useQuery<
    findCurrentSchoolDay,
    findCurrentSchoolDayVariables
  >(FIND_CURRENT_SCHOOL_DAY_QUERY, {
    variables: {
      input: { date: date },
    },
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  const schoolDayType =
    schoolDayData?.findSchoolDayByDate.schoolDay?.currentSchoolDayType!

  const schoolDayLength =
    schoolDayData?.findSchoolDayByDate.schoolDay?.schoolDayLength!
  const [courseToLoad] =
    me.__typename === 'Teacher'
      ? me.teachesCourses.filter(
          (course) =>
            Date.parse(dateTime) >
              Date.parse(
                timeFinder(
                  schoolDayLength === SchoolDayLengthEnum.HALF
                    ? course.hasCourseInfo?.halfDayStartsAt!
                    : course.hasCourseInfo?.startsAt!
                )
              ) &&
            Date.parse(dateTime) <
              Date.parse(
                timeFinder(
                  schoolDayLength === SchoolDayLengthEnum.HALF
                    ? course.hasCourseInfo?.halfDayEndsAt!
                    : course.hasCourseInfo?.endsAt!
                )
              ) &&
            course.hasCourseInfo?.schoolDayType === schoolDayType
        )
      : me.inCourses.filter(
          (course) =>
            Date.parse(dateTime) >
              Date.parse(
                timeFinder(
                  schoolDayLength === SchoolDayLengthEnum.HALF
                    ? course.hasCourseInfo?.halfDayStartsAt!
                    : course.hasCourseInfo?.startsAt!
                )
              ) &&
            Date.parse(dateTime) <
              Date.parse(
                timeFinder(
                  schoolDayLength === SchoolDayLengthEnum.HALF
                    ? course.hasCourseInfo?.halfDayEndsAt!
                    : course.hasCourseInfo?.endsAt!
                )
              )
        )

  const [loadLesson, { loading, data, startPolling, stopPolling }] =
    useLazyQuery<findLessonByCourseAndDate, findLessonByCourseAndDateVariables>(
      FIND_LESSON_QUERY,
      {
        // onCompleted: () => {},
        onError: (error) => console.error(error),
      }
    )

  const course = data?.findLessonByCourseAndDate.lesson?.assignedCourses.filter(
    (course) => course._id === courseToLoad?._id
  )
  const useFake = false
  useEffect(() => {
    if (useFake) {
      loadLesson({
        variables: {
          input: { courseId: '6125056b8fde6b861b4a8c6e', lessonDate: date },
        },
      })
    } else if (courseToLoad) {
      loadLesson({
        variables: { input: { courseId: courseToLoad._id!, lessonDate: date } },
      })
    }
  }, [courseToLoad, dateTime])

  useEffect(() => {
    if (
      data?.findLessonByCourseAndDate.lesson !== null &&
      courseToLoad !== undefined
    )
      setHasLessonNow!(true)
  }, [courseToLoad, data])

  if (!me) return <Navigate to='/' />
  return null
}
