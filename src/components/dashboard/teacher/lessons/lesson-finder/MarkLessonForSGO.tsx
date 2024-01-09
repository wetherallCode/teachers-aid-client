import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import {
  findEssayQuestionsForLesson,
  findEssayQuestionsForLessonVariables,
  markLessonForSGOVariables,
  markLessonForSGO,
} from '../../../../../schemaTypes'

export type MarkLessonForSGOProps = {
  sectionIds: string[]
}

export const FIND_ESSAY_QUESTIONS_FOR_SGO_QUERY = gql`
  query findEssayQuestionsForLesson($input: FindEssayQuestionsForLessonInput!) {
    findEssayQuestionsForLesson(input: $input) {
      essayQuestions {
        _id
        questionParts {
          originalQuestion
        }
        sgoQuestion
      }
    }
  }
`
export const MARK_LESSON_FOR_SGO_MUTATION = gql`
  mutation markLessonForSGO($input: MarkLessonForSGOInput!) {
    markLessonForSGO(input: $input) {
      marked
    }
  }
`

export const MarkLessonForSGO = ({ sectionIds }: MarkLessonForSGOProps) => {
  const { loading, data } = useQuery<
    findEssayQuestionsForLesson,
    findEssayQuestionsForLessonVariables
  >(FIND_ESSAY_QUESTIONS_FOR_SGO_QUERY, {
    variables: {
      input: { sectionIds },
    },
    onCompleted: (data) =>
      console.log(
        data.findEssayQuestionsForLesson.essayQuestions.map(
          (q) => q.sgoQuestion,
        ),
      ),
    onError: (error) => console.error(error),
  })

  const [markLessonForSGO] = useMutation<
    markLessonForSGO,
    markLessonForSGOVariables
  >(MARK_LESSON_FOR_SGO_MUTATION, {
    variables: { input: { sectionIds } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssayQuestionsForLesson'],
  })
  if (loading) return <div>Loading </div>
  return (
    <>
      <br />
      <ul>
        {data?.findEssayQuestionsForLesson.essayQuestions.map((q) => (
          <li key={q._id!}>
            {q.questionParts.originalQuestion} {q.sgoQuestion ? 'SGO' : ''}
          </li>
        ))}
      </ul>
      <br />
      {data?.findEssayQuestionsForLesson.essayQuestions.length! > 0 && (
        <button onClick={() => markLessonForSGO()}>Mark for SGOs</button>
      )}
    </>
  )
}
