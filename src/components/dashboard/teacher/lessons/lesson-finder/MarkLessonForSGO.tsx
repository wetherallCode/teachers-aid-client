import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findEssayQuestionsForLesson,
  findEssayQuestionsForLessonVariables,
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
      }
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
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  return (
    <>
      <br />
      <ul>
        {data?.findEssayQuestionsForLesson.essayQuestions.map((q) => (
          <li key={q._id!}>{q.questionParts.originalQuestion}</li>
        ))}
      </ul>
      <br />
      <button>Mark for SGOs</button>
    </>
  )
}
