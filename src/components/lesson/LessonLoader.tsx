import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {
  findLessonStatus,
  findLessonStatusVariables,
  me_me_Teacher_teachesCourses,
} from '../../schemaTypes'
import { DynamicLesson } from './lessson-types/DynamicLesson'
import { StaticLesson } from './lessson-types/StaticLesson'

export type LessonLoaderProps = {
  lessonId: string
  courseToLoad?: me_me_Teacher_teachesCourses
}

export const FIND_LESSON_STATUS_QUERY = gql`
  query findLessonStatus($input: FindLessonStatusInput!) {
    findLessonStatus(input: $input) {
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
        duringActivities {
          task
          activityType
          academicOutcomeTypes
          isActive
          directions
          completed
        }
        protocolCount
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
export const LessonLoader = ({ lessonId, courseToLoad }: LessonLoaderProps) => {
  const [polling, setPolling] = useState<number>(2000)
  console.log(polling)
  const { loading, data } = useQuery<
    findLessonStatus,
    findLessonStatusVariables
  >(FIND_LESSON_STATUS_QUERY, {
    variables: {
      input: { lessonId },
    },
    onCompleted: (data) => console.log(data.findLessonStatus.lesson),
    pollInterval: polling,
    onError: (error) => console.error(error),
  })

  if (loading) return <div>Loading stuff</div>
  return (
    <>
      {data?.findLessonStatus.lesson!.dynamicLesson !== 'OFF' ? (
        <>
          <DynamicLesson
            lesson={data?.findLessonStatus.lesson!}
            // stopPolling={stopPolling!}
            courseToLoad={courseToLoad}
            setPolling={setPolling}
            // fakeCourse={fakeCourse}
          />
        </>
      ) : (
        <StaticLesson
          lesson={data?.findLessonStatus.lesson!}
          courseToLoad={courseToLoad}
          setPolling={setPolling}
        />
      )}
    </>
  )
}
