import { gql, useQuery } from '@apollo/client'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useTime } from '../../../../hooks/useTime'
import {
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
  findSchoolDayAndLesson,
  findSchoolDayAndLessonVariables,
  me_me,
  me_me_Student,
  SchoolDayLengthEnum,
} from '../../../../schemaTypes'
import { date, timeFinder } from '../../../../utils'
import {
  OptionTitle,
  StudentHomeScreenOptions,
  StudentOptionsLinkButton,
  StudentHomeScreenOptionsNonLink,
  StyledLink,
} from '../../../home/homeStyles'
import { DailyAgendaContextProvider } from '../../../lesson/state-n-styles/DailyAgendaContext'
import { TodaysLessonPlan } from '../../../lesson/TodaysLessonPlan'
import { FIND_CURRENT_SCHOOL_DAY_QUERY } from '../../school-day/SchoolDay'

export type LessonDisplayProps = {
  hasLessonNow: boolean
  setHasLessonNow: Dispatch<SetStateAction<boolean>>
  me: me_me_Student
  lessonLink: '' | 'lesson-home'
}

export const IS_THERE_A_LESSON_TODAY_QUERY = gql`
  query findSchoolDayAndLesson($input: FindSchoolDayAndLessonInput!) {
    findSchoolDayAndLesson(input: $input) {
      lessonToday
    }
  }
`
export const LessonDisplay = ({
  setHasLessonNow,
  hasLessonNow,
  me,
  lessonLink,
}: LessonDisplayProps) => {
  const { loading, data } = useQuery<
    findSchoolDayAndLesson,
    findSchoolDayAndLessonVariables
  >(IS_THERE_A_LESSON_TODAY_QUERY, {
    variables: {
      input: {
        courseId: me.inCourses[0]._id!,
        todaysDate: new Date().toLocaleDateString(),
      },
    },
    pollInterval: 1000,
    onCompleted: (data) => {},
    onError: (error) => console.error(error),
  })
  console.log(data)
  useEffect(() => {
    data?.findSchoolDayAndLesson.lessonToday
      ? setHasLessonNow(true)
      : setHasLessonNow(false)
  }, [data])

  // const { dateTime } = useTime()

  // const { data: schoolDayData } = useQuery<
  //   findCurrentSchoolDay,
  //   findCurrentSchoolDayVariables
  // >(FIND_CURRENT_SCHOOL_DAY_QUERY, {
  //   variables: {
  //     input: { date: date },
  //   },
  //   pollInterval: 1000,
  //   onCompleted: (data) => console.log(data),
  //   onError: (error) => console.error(error),
  // })
  // const schoolDayLength =
  //   schoolDayData?.findSchoolDayByDate.schoolDay?.schoolDayLength!

  // const [courseToLoad] = me.inCourses.filter(
  //   (course) =>
  //     Date.parse(dateTime) >
  //       Date.parse(
  //         timeFinder(
  //           schoolDayLength === SchoolDayLengthEnum.HALF
  //             ? course.hasCourseInfo?.halfDayStartsAt!
  //             : course.hasCourseInfo?.startsAt!
  //         )
  //       ) &&
  //     Date.parse(dateTime) <
  //       Date.parse(
  //         timeFinder(
  //           schoolDayLength === SchoolDayLengthEnum.HALF
  //             ? course.hasCourseInfo?.halfDayEndsAt!
  //             : course.hasCourseInfo?.endsAt!
  //         )
  //       )
  // )

  return (
    <StudentHomeScreenOptionsNonLink
      style={{ gridTemplateRows: '1fr 1fr 2fr' }}
    >
      <OptionTitle>{new Date().toLocaleDateString()}</OptionTitle>
      {!hasLessonNow ? (
        <OptionTitle>No Lesson Today</OptionTitle>
      ) : (
        <>
          <div>
            <OptionTitle>Today's Lesson Plan</OptionTitle>
            <DailyAgendaContextProvider>
              <TodaysLessonPlan setHasLessonNow={setHasLessonNow} />
            </DailyAgendaContextProvider>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <StyledLink to="/lesson-home">
              <StudentOptionsLinkButton>Go</StudentOptionsLinkButton>
            </StyledLink>
          )}
        </>
      )}
    </StudentHomeScreenOptionsNonLink>
  )
}
