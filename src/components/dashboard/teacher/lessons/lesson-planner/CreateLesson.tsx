import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  createLessonVariables,
  MarkingPeriodEnum,
} from '../../../../../schemaTypes'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'
import { dateConverter } from '../../../../../utils'

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

export const CreateLesson: FC<CreateLessonProps> = () => {
  const [state] = useLessonPlannerContextProvider()
  const {
    afterActivity,
    beforeActivity,
    courses,
    date,
    duringActivity,
    endingSection,
    essentialQuestion,
    questionList,
    startingSection,
    vocabList,
  } = state.context

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createLesson, { data }] = useMutation<createLessonVariables>(
    CREATE_LESSON_MUTATION,
    {
      variables: {
        input: {
          assignedCourse: courses,
          assignedDate: dateConverter(date),
          assignedMarkingPeriod: MarkingPeriodEnum.FOURTH,
          assignedSections: {
            startingSection: startingSection,
            endingSection,
          },
          vocabList,
          beforeActivity,
          afterActivity,
          questionList,
          duringActivities: duringActivity,
          essentialQuestion: essentialQuestion.question,
        },
      },
      onCompleted: (data) => console.log(data),
      refetchQueries: [],
    }
  )
  return (
    <div>
      <div>Create Lesson</div>
      <button onClick={() => createLesson()}>Create</button>
    </div>
  )
}
