import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  createLessonVariables,
  MarkingPeriodEnum,
} from '../../../../../schemaTypes'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'
import { dateConverter } from '../../../../../utils'

export type CreateLessonProps = {
  mp: MarkingPeriodEnum
}

export const CREATE_LESSON_MUTATION = gql`
  mutation createLesson($input: CreateLessonInput!) {
    createLesson(input: $input) {
      lesson {
        _id
        assignedMarkingPeriod
      }
    }
  }
`

export const CreateLesson: FC<CreateLessonProps> = ({ mp }) => {
  const [state] = useLessonPlannerContextProvider()

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
  } = state.context

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createLesson] = useMutation<createLessonVariables>(
    CREATE_LESSON_MUTATION,
    {
      variables: {
        input: {
          assignedCourses: courses,
          assignedDate: dateConverter(date),
          assignedMarkingPeriod: mp,
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
          duringActivities: duringActivity,
          essentialQuestion: essentialQuestion.question,
          pageNumbers: {
            startingPage,
            endingPage,
          },
        },
      },
      onCompleted: (data) => console.log(data),
      onError: (error) => console.log(error),

      refetchQueries: ['findLessonByCourseAndDate'],
    }
  )
  return (
    <div>
      <div>Create Lesson</div>
      <button onClick={() => createLesson()}>Create</button>
    </div>
  )
}
