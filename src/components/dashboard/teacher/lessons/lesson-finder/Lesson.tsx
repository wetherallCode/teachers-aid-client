import { gql, useQuery } from '@apollo/client'
import { access } from 'fs/promises'
import React, { FC, useState } from 'react'
import { CalendarTileProperties } from 'react-calendar'
import { Link } from 'react-router-dom'
import {
  findLessonsByAssignedDate,
  findLessonsByAssignedDateVariables,
} from '../../../../../schemaTypes'
import { useLessonFinderContextProvider } from './state-n-styles/LessonFinderContext'

export type LessonProps = {
  date: CalendarTileProperties
}

export const FIND_LESSONS_BY_ASSIGNED_DATE = gql`
  query findLessonsByAssignedDate($input: FindLessonsByAssignedDateInput!) {
    findLessonsByAssignedDate(input: $input) {
      lessons {
        _id
        lessonName
        assignedDate
        inUnit {
          _id
          unitName
        }
        assignedMarkingPeriod
        assignedCourses {
          _id
          name
        }
        assignedSections {
          startingSection
          endingSection
        }
        pageNumbers {
          startingPage
          endingPage
        }
        assignedSectionIdList
        vocabList {
          word
          definition
        }
        beforeActivity {
          academicOutcomeTypes
          activityType
          task
        }
        duringActivities {
          academicOutcomeTypes
          activityType
          task
        }
        afterActivity {
          academicOutcomeTypes
          activityType
          task
        }
        questionList {
          question
          questionType
        }
        essentialQuestion
        lessonName
        lessonType
      }
    }
  }
`
export const Lesson = ({ date }: LessonProps) => {
  const [, event] = useLessonFinderContextProvider()

  const { loading, data } = useQuery<
    findLessonsByAssignedDate,
    findLessonsByAssignedDateVariables
  >(FIND_LESSONS_BY_ASSIGNED_DATE, {
    variables: {
      input: { assignedDate: new Date(date.date).toLocaleDateString() },
    },
    onCompleted: (data) => console.log(data),
    pollInterval: 1000,
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const courseLessons = data?.findLessonsByAssignedDate.lessons!
  const weekendCheck =
    date.date.toString().substr(0, 3) === 'Sat' ||
    date.date.toString().substr(0, 3) === 'Sun'

  const dateValue = Date.parse(new Date(date.date).toLocaleDateString())
  console.log(data?.findLessonsByAssignedDate.lessons)
  loading && <div>loading</div>
  return (
    <div>
      {/* {data?.findLessonsByAssignedDate.lessons?.length !== 0 ? ( */}
      <>
        {data && data?.findLessonsByAssignedDate.lessons?.length !== 0 && (
          <div
            style={{
              height: '6vh',
              overflow: 'scroll',
              borderBottom: '1px solid var(--white)',
            }}
          >
            {courseLessons.map((lesson, i: number) => (
              <div
                key={i}
                onClick={() => {
                  event({ type: 'GET_LESSON', payload: lesson })
                  event({ type: 'NEXT' })
                }}
              >
                {lesson.assignedCourses.map((course) => course.name)}
              </div>
            ))}
          </div>
        )}
        <Link
          style={{
            color: 'var(--white)',
            textDecoration: 'none',
            display: 'grid',
            alignItems: 'center',
          }}
          to={`lesson-planner/${dateValue}`}
        >
          Create Lesson
        </Link>
        <Link
          style={{
            color: 'var(--white)',
            textDecoration: 'none',
            display: 'grid',
            alignItems: 'center',
          }}
          to={`create-quiz/${dateValue}`}
        >
          Create Quiz
        </Link>
      </>
    </div>
  )
}
