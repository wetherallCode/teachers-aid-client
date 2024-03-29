import React, { FC, useEffect } from 'react'
import { useUserContextProvider } from '../../contexts/UserContext'
import {
  me_me,
  findLessonByCourseAndDate,
  findLessonByCourseAndDateVariables,
  studentSignedInCheck,
  studentSignedInCheckVariables,
  studentSignInVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  studentSignIn,
  SchoolDayType,
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
  SchoolDayLengthEnum,
  me_me_Student,
  me_me_Teacher,
} from '../../schemaTypes'
import { capitalizer, timeFinder, date } from '../../utils'
import { useDailyAgendaContextProvider } from './state-n-styles/DailyAgendaContext'
import { useLazyQuery, gql, useQuery, useMutation } from '@apollo/client'

import {
  LessonMainMenuContainer,
  GreetingsContainer,
  LessonSelectorContainer,
  CurrentLessonContainer,
  CurrentLesson,
  GoToLessonButton,
  LessonNameStyle,
} from './state-n-styles/lessonStyles'
import { DynamicLesson } from './lessson-types/DynamicLesson'
import { StaticLesson } from './lessson-types/StaticLesson'

import { useNavigate, Navigate } from 'react-router'
import { FIND_CURRENT_SCHOOL_DAY_QUERY } from '../dashboard/school-day/SchoolDay'
import { useTime } from '../../hooks/useTime'
import { LessonLoader } from './LessonLoader'
import { useClassTimeIndicator } from '../../hooks/useClassTimeIndicator'

export type LessonMainMenuProps = {}

export const FIND_LESSON_QUERY = gql`
  query findLessonByCourseAndDate($input: FindLessonByCourseAndDateInput!) {
    findLessonByCourseAndDate(input: $input) {
      lesson {
        _id
        lessonName
        vocabList {
          word
          definition
        }
        assignedMarkingPeriod
        pageNumbers {
          startingPage
          endingPage
        }
        assignedCourses {
          _id
          name
          hasCourseInfo {
            assignedSeats {
              deskNumber
              student {
                firstName
                lastName
              }
            }
          }
          hasSignInSheets {
            studentsSignInlog {
              _id
            }
          }
        }
        assignedSections {
          startingSection
          endingSection
        }
        objectives
        essentialQuestion
        protocolCount
        duringActivities {
          task
          activityType
          academicOutcomeTypes
          isActive
          completed
          directions
        }
        beforeActivity {
          task
          activityType
          academicOutcomeTypes
          isActive
          completed
        }
        afterActivity {
          task
          activityType
          academicOutcomeTypes
          isActive
          completed
        }
        dynamicLesson
        lessonType
        lessonStarted
      }
    }
  }
`

export const STUDENT_SIGNED_IN_CHECK_QUERY = gql`
  query studentSignedInCheck($input: FindSchoolDayByDateInput!) {
    findSchoolDayByDate(input: $input) {
      schoolDay {
        _id
        signInSheets {
          studentsSignInlog {
            _id
          }
        }
      }
    }
  }
`
export const STUDENT_SIGN_IN_MUTATION = gql`
  mutation studentSignIn($input: StudentSignInInput!) {
    studentSignIn(input: $input) {
      schoolDay {
        _id
      }
    }
  }
`

export const LessonMainMenu = ({}: LessonMainMenuProps) => {
  const me: me_me_Student | me_me_Teacher = useUserContextProvider()
  const [state, event] = useDailyAgendaContextProvider()
  // const classTime = useClassTimeIndicator()
  const { dateTime } = useTime()

  const { data: schoolDayData, loading: schoolDayLoading } = useQuery<
    findCurrentSchoolDay,
    findCurrentSchoolDayVariables
  >(FIND_CURRENT_SCHOOL_DAY_QUERY, {
    variables: {
      input: { date: date },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  const [loadLesson, { loading, data, startPolling, stopPolling }] =
    useLazyQuery<findLessonByCourseAndDate, findLessonByCourseAndDateVariables>(
      FIND_LESSON_QUERY,
      {
        onCompleted: (data) => {
          data
            ? console.log(data.findLessonByCourseAndDate.lesson)
            : console.log('No class yet')
        },
        onError: (error) => console.error(error),
      },
    )

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
                    : schoolDayLength === SchoolDayLengthEnum.ONE_HOUR_DELAY
                      ? course.hasCourseInfo.hourDelayStartsAt
                      : course.hasCourseInfo?.startsAt!,
                ),
              ) &&
            Date.parse(dateTime) <
              Date.parse(
                timeFinder(
                  schoolDayLength === SchoolDayLengthEnum.HALF
                    ? course.hasCourseInfo?.halfDayEndsAt!
                    : schoolDayLength === SchoolDayLengthEnum.ONE_HOUR_DELAY
                      ? course.hasCourseInfo.hourDelayEndsAt
                      : course.hasCourseInfo?.endsAt!,
                ),
              ) &&
            course.hasCourseInfo?.schoolDayType === schoolDayType,
        )
      : me.inCourses.filter(
          (course) =>
            Date.parse(dateTime) >
              Date.parse(
                timeFinder(
                  schoolDayLength === SchoolDayLengthEnum.HALF
                    ? course.hasCourseInfo?.halfDayStartsAt!
                    : schoolDayLength === SchoolDayLengthEnum.ONE_HOUR_DELAY
                      ? course.hasCourseInfo.hourDelayStartsAt
                      : course.hasCourseInfo?.startsAt!,
                ),
              ) &&
            Date.parse(dateTime) <
              Date.parse(
                timeFinder(
                  schoolDayLength === SchoolDayLengthEnum.HALF
                    ? course.hasCourseInfo?.halfDayEndsAt!
                    : schoolDayLength === SchoolDayLengthEnum.ONE_HOUR_DELAY
                      ? course.hasCourseInfo.hourDelayEndsAt
                      : course.hasCourseInfo?.endsAt!,
                ),
              ),
        )

  const course = data?.findLessonByCourseAndDate.lesson?.assignedCourses.filter(
    (course) => course._id === courseToLoad?._id,
  )
  console.log(course)

  const handleSignInCheck = (_id: string) => {
    const check = course?.some((stuff) => {
      if (
        stuff.hasSignInSheets.some(
          (sheet) =>
            sheet.studentsSignInlog?.some((signIn) => signIn._id === _id),
        )
      ) {
        return true
      } else return false
    })
    return check
  }

  const [studentSignIn] = useMutation<studentSignIn, studentSignInVariables>(
    STUDENT_SIGN_IN_MUTATION,
    {
      variables: {
        input: {
          courseId: courseToLoad?._id!,
          lessonDate: date,
          studentId: me._id!,
          virtual: true,
        },
      },
      onCompleted: () => {
        event({ type: 'TODAYS_LESSON' })
        startPolling!(100)
        event({ type: 'POLLING' })
      },
      refetchQueries: ['studentSignedInCheck', 'me'],
    },
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
      if (data?.findLessonByCourseAndDate.lesson) {
        event({ type: 'TODAYS_LESSON' })
        startPolling!(100)
        event({ type: 'POLLING' })
      }
    }
  }, [courseToLoad, dateTime])

  if (!me) return <Navigate to="/" />
  return (
    <>
      {state.matches('getLesson') && (
        <div
          style={{
            display: 'grid',
            justifyItems: 'center',
            alignItems: 'center',
            fontSize: '3vh',
            height: '95vh',
          }}
        >
          <div>
            {courseToLoad ? 'Loading Lesson' : 'Class has not started yet'}
          </div>
        </div>
      )}
      {state.matches('todaysLesson') && (
        <>
          <LessonLoader
            lessonId={data?.findLessonByCourseAndDate.lesson?._id!}
            courseToLoad={courseToLoad}
          />
        </>
      )}
    </>
  )
}
