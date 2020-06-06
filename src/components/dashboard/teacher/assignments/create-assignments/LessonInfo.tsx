import React, { FC } from 'react'
import { useCreateAssignmentContextPovider } from './CreateAssignmentContext'
import { gql, useQuery } from '@apollo/client'
import {
  findLessonById,
  findLessonByIdVariables,
} from '../../../../../schemaTypes'

export type LessonInfoProps = {}

export const FIND_LESSON_BY_ID_QUERY = gql`
  query findLessonById($input: FindLessonByIdInput!) {
    findLessonById(input: $input) {
      lesson {
        _id
        questionList {
          question
          questionType
        }
      }
    }
  }
`

export const LessonInfo: FC<LessonInfoProps> = () => {
  const [state, event] = useCreateAssignmentContextPovider()
  console.log(state.context.questionList)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery<
    findLessonById,
    findLessonByIdVariables
  >(FIND_LESSON_BY_ID_QUERY, {
    variables: {
      input: { _id: state.context.fromLesson },
    },
    onCompleted: (data) => {
      event({
        type: 'SET_QUESTION_LIST',
        payload: data?.findLessonById.lesson.questionList,
      })
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      <div>
        <button onClick={() => event({ type: 'PREVIOUS' })}>
          Pick Different Lesson
        </button>
      </div>
    </>
  )
}
