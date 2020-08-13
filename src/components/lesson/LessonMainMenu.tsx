import React, { FC, useEffect } from 'react'
import { Greetings } from '../home/Greetings'
import { useUserContextProvider } from '../../contexts/UserContext'
import {
  me_me,
  findLessonByCourseAndDate,
  findLessonByCourseAndDateVariables,
} from '../../schemaTypes'
import { capitalizer, time, timeFinder, date } from '../../utils'
import { useDailyAgendaContextProvider } from './state/DailyAgendaContext'
import { useLazyQuery, gql } from '@apollo/client'

import { DailyAgenda } from './DailyAgenda'

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
        pageNumbers {
          startingPage
          endingPage
        }
        assignedSections {
          startingSection
          endingSection
        }
        objectives
        essentialQuestion
        duringActivities {
          task
          activityType
          academicOutcomeTypes
          isActive
        }
        beforeActivity {
          task
          activityType
          academicOutcomeTypes
        }
        afterActivity {
          task
          activityType
          academicOutcomeTypes
        }
        dynamicLesson
      }
    }
  }
`

export const LessonMainMenu: FC<LessonMainMenuProps> = () => {
  const me: me_me = useUserContextProvider()
  const [state, event] = useDailyAgendaContextProvider()
  const [courseToLoad] =
    me.__typename === 'Teacher' &&
    me.teachesCourses.filter(
      (course) =>
        Date.parse(time) >
          Date.parse(timeFinder(course.hasCourseInfo.startsAt)) &&
        Date.parse(time) < Date.parse(timeFinder(course.hasCourseInfo.endsAt))
    )
  const courses =
    me.__typename === 'Teacher' &&
    me.teachesCourses.map((course) => course.name)
  const [
    loadLesson,
    { loading, data, startPolling, stopPolling },
  ] = useLazyQuery<
    findLessonByCourseAndDate,
    findLessonByCourseAndDateVariables
  >(FIND_LESSON_QUERY, {
    onCompleted: (data) => {
      console.log(data.findLessonByCourseAndDate.lesson)
    },
    onError: (error) => console.error(error),
  })

  useEffect(() => {
    if (courseToLoad) {
      loadLesson({
        variables: { input: { courseId: courseToLoad._id!, lessonDate: date } },
      })
    }
  }, [courseToLoad, loadLesson])

  // console.log(courseToLoad._id, date)

  if (loading) return <div>Loading </div>
  return (
    <>
      {state.matches('getLesson') && (
        <>
          <Greetings
            phrase={
              me.__typename === 'Teacher'
                ? `${capitalizer(me.title)}. ${me.lastName}`
                : `${me.firstName}`
            }
          />

          {/* <div>{courses.map(course=> <div>)}</div> */}
          <div>
            Current Lessons:{' '}
            {data ? (
              <>
                {courseToLoad.name}:{' '}
                {data.findLessonByCourseAndDate.lesson.lessonName}{' '}
                <button
                  onClick={() => {
                    if (courseToLoad) event({ type: 'TODAYS_LESSON' })
                  }}
                >
                  Get Lesson
                </button>
              </>
            ) : (
              <span>No Lesson Scheduled</span>
            )}
          </div>
          <div>Get Old Lessons</div>
        </>
      )}
      {state.matches('todaysLesson') && (
        <div>
          {courseToLoad && (
            <DailyAgenda
              lesson={data?.findLessonByCourseAndDate.lesson!}
              courseToLoad={courseToLoad}
              startPolling={startPolling!}
              stopPolling={stopPolling!}
            />
          )}
        </div>
      )}
    </>
  )
}
