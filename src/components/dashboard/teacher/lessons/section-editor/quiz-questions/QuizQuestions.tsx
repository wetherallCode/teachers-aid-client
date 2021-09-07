import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findQuizQuestionsByTextSectionId,
  findQuizQuestionsByTextSectionIdVariables,
} from '../../../../../../schemaTypes'
import { useSectionEditorContextProvider } from '../state-n-styles/sectionEditorContext'

export type QuizQuestionsProps = {}

export const CREATE_QUIZ_QUESTION_MUTATION = gql`
  mutation createQuizQuestion($input: CreateQuizQuestionInput!) {
    createQuizQuestion(input: $input) {
      quizQuestion {
        _id
      }
    }
  }
`

export const FIND_QUIZ_QUESTIONS_BY_TEXT_SECTION_ID_QUERY = gql`
  query findQuizQuestionsByTextSectionId(
    $input: FindQuizQuestionsByTextSectionIdInput!
  ) {
    findQuizQuestionsByTextSectionId(input: $input) {
      quizQuestions {
        _id
        question
        answerList {
          correct
          partiallyCorrect
        }
        questionType
        difficultyLevel
      }
    }
  }
`

export const QuizQuestions = ({}: QuizQuestionsProps) => {
  const [state] = useSectionEditorContextProvider()
  const { loading, data } = useQuery<
    findQuizQuestionsByTextSectionId,
    findQuizQuestionsByTextSectionIdVariables
  >(FIND_QUIZ_QUESTIONS_BY_TEXT_SECTION_ID_QUERY, {
    variables: {
      input: { associatedTextSectionId: state.context.sectionId },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  return (
    <>
      <div>Add Quiz Question</div>
    </>
  )
}
