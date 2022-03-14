import { gql, useQuery } from '@apollo/client'
import React from 'react'
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
          completed
        }
        beforeActivity {
          task
          activityType
          academicOutcomeTypes
          isActive
        }
        afterActivity {
          task
          activityType
          academicOutcomeTypes
          isActive
        }
        dynamicLesson
        lessonType
      }
    }
  }
`
export const LessonLoader = ({ lessonId, courseToLoad }: LessonLoaderProps) => {
  const { loading, data } = useQuery<
    findLessonStatus,
    findLessonStatusVariables
  >(FIND_LESSON_STATUS_QUERY, {
    variables: {
      input: { lessonId },
    },
    onCompleted: (data) => console.log(data.findLessonStatus.lesson),
    pollInterval: 500,
    onError: (error) => console.error(error),
  })

  if (loading) return <div>Loading </div>
  return (
    <>
      {data?.findLessonStatus.lesson!.dynamicLesson !== 'OFF' ? (
        <>
          <DynamicLesson
            lesson={data?.findLessonStatus.lesson!}
            // stopPolling={stopPolling!}
            courseToLoad={courseToLoad}
            // fakeCourse={fakeCourse}
          />
        </>
      ) : (
        <StaticLesson
          lesson={data?.findLessonStatus.lesson!}
          courseToLoad={courseToLoad}
        />
      )}
    </>
  )
}
