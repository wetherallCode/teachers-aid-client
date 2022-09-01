import { useQuery, useLazyQuery } from '@apollo/client'
import { FIND_CURRENT_SCHOOL_DAY_QUERY } from '../components/dashboard/school-day/SchoolDay'
import { FIND_LESSON_QUERY } from '../components/lesson/LessonMainMenu'
import { useDailyAgendaContextProvider } from '../components/lesson/state-n-styles/DailyAgendaContext'
import { useUserContextProvider } from '../contexts/UserContext'
import {
  me_me,
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
  SchoolDayLengthEnum,
  findLessonByCourseAndDate,
  findLessonByCourseAndDateVariables,
  me_me_Student,
  me_me_Teacher,
} from '../schemaTypes'
import { date, timeFinder } from '../utils'
import { useTime } from './useTime'

export const useGetCurrentCourse = () => {
  const me: me_me_Student | me_me_Teacher = useUserContextProvider()
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
  if (courseToLoad) {
    return courseToLoad
  } else return null
}
