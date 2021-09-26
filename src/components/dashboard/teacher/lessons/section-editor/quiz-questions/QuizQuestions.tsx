import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findQuizQuestionsByTextSectionId,
  findQuizQuestionsByTextSectionIdVariables,
} from '../../../../../../schemaTypes'
import { useSectionEditorContextProvider } from '../state-n-styles/sectionEditorContext'
import { AddQuizQuestion } from './AddQuizQuestion'

export type QuizQuestionsProps = {}

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
    <div>
      <div>Quiz Questions</div>
      <div>
        {data?.findQuizQuestionsByTextSectionId.quizQuestions.map(
          (question, i: number) => (
            <div key={i}>
              {question.difficultyLevel}: {question.question}
            </div>
          )
        )}
      </div>
      <AddQuizQuestion />
    </div>
  )
}
