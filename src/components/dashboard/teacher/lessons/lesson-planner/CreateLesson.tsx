import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  createLessonVariables,
  LessonTypeEnum,
  MarkingPeriodEnum,
} from '../../../../../schemaTypes'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { dateConverter } from '../../../../../utils'
import { LessonPlannerButton } from './state-and-styles/lessonPlannerStyles'
import { useNavigate } from 'react-router'

export type CreateLessonProps = {}

export const CREATE_LESSON_MUTATION = gql`
  mutation createLesson($input: CreateLessonInput!) {
    createLesson(input: $input) {
      lessons {
        _id
        assignedMarkingPeriod
      }
    }
  }
`

export const CreateLesson = ({}: CreateLessonProps) => {
  const [state] = useLessonPlannerContextProvider()
  const navigate = useNavigate()
  const {
    afterActivity,
    beforeActivity,
    courses,
    date,
    duringActivity,
    endingSection,
    textSectionList,
    essentialQuestion,
    questionList,
    startingSection,
    vocabList,
    inUnit,
    lessonName,
    startingPage,
    endingPage,
    markingPeriod,
    lessonType,
  } = state.context

  const [createLesson] = useMutation<createLessonVariables>(
    CREATE_LESSON_MUTATION,
    {
      variables: {
        input: {
          assignedCourses: courses,
          assignedDate: date,
          assignedMarkingPeriod: markingPeriod,
          inUnit,
          assignedSections: {
            startingSection,
            endingSection,
          },
          lessonName,
          assignedSectionIdList: textSectionList,
          vocabList,
          beforeActivity,
          afterActivity,
          questionList,
          duringActivities:
            state.context.lessonType === LessonTypeEnum.INTRODUCTORY
              ? []
              : duringActivity,
          essentialQuestion: essentialQuestion,
          pageNumbers: {
            startingPage,
            endingPage,
          },
          lessonType: lessonType,
        },
      },
      onCompleted: (data) => {
        console.log(data)
        navigate('/dashboard/lessons')
      },
      onError: (error) => console.log(error),

      refetchQueries: [
        'findLessonByCourseAndDate',
        'findLessonsByAssignedDate',
      ],
    },
  )

  return (
    <>
      <LessonPlannerButton onClick={() => createLesson()}>
        Create Lesson
      </LessonPlannerButton>
    </>
  )
}
