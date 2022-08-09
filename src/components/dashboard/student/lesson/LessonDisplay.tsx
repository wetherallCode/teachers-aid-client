import { useQuery } from '@apollo/client'
import React, { Dispatch, SetStateAction } from 'react'
import { useTime } from '../../../../hooks/useTime'
import {
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
  me_me,
  me_me_Student,
  SchoolDayLengthEnum,
} from '../../../../schemaTypes'
import { date, timeFinder } from '../../../../utils'
import {
  OptionTitle,
  StudentHomeScreenOptions,
  StudentOptionsLinkButton,
  StyledLink,
} from '../../../home/homeStyles'
import { DailyAgendaContextProvider } from '../../../lesson/state-n-styles/DailyAgendaContext'
import { TodaysLessonPlan } from '../../../lesson/TodaysLessonPlan'
import { FIND_CURRENT_SCHOOL_DAY_QUERY } from '../../school-day/SchoolDay'

export type LessonDisplayProps = {
  setHasLessonNow: Dispatch<SetStateAction<boolean>>
  me: me_me_Student
  lessonLink: '' | 'lesson-home'
}

export const LessonDisplay = ({
  setHasLessonNow,
  me,
  lessonLink,
}: LessonDisplayProps) => {
  const { dateTime } = useTime()
  const { data: schoolDayData } = useQuery<
    findCurrentSchoolDay,
    findCurrentSchoolDayVariables
  >(FIND_CURRENT_SCHOOL_DAY_QUERY, {
    variables: {
      input: { date: date },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  const schoolDayLength =
    schoolDayData?.findSchoolDayByDate.schoolDay?.schoolDayLength!
  const [courseToLoad] = me.inCourses.filter(
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

  return (
    <StudentHomeScreenOptions to={lessonLink}>
      {!schoolDayData?.findSchoolDayByDate.schoolDay ? (
        <OptionTitle>Not a school day</OptionTitle>
      ) : (
        <OptionTitle>Today's Lesson Plan</OptionTitle>
      )}
      <DailyAgendaContextProvider>
        <TodaysLessonPlan setHasLessonNow={setHasLessonNow} />
      </DailyAgendaContextProvider>
      {courseToLoad && (
        <StyledLink to='/lesson-home'>
          <StudentOptionsLinkButton>Go</StudentOptionsLinkButton>
        </StyledLink>
      )}
    </StudentHomeScreenOptions>
  )
}
