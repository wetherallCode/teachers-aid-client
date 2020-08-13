import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  questionTypeEnum,
  TextSectionQuestionsInput,
  QuestionTypeEnum,
} from '../../../../../schemaTypes'
import { useSectionBuilderContextProvider } from './state/SectionBuilderContext'

export const QUESTION_TYPE_ENUM_QUERY = gql`
  query questionTypeEnum {
    QuestionTypeEnum: __type(name: "QuestionTypeEnum") {
      enumValues {
        name
      }
    }
  }
`

export const QuestionsInfo = () => {
  const [questionInfo, setQuestionInfo] = useState<TextSectionQuestionsInput>({
    question: '',
    questionType: QuestionTypeEnum.HOW_PROBLEM_SOLUTION,
  })
  console.log(questionInfo)
  const [, event] = useSectionBuilderContextProvider()
  const { loading, error, data } = useQuery<questionTypeEnum>(
    QUESTION_TYPE_ENUM_QUERY
  )
  if (loading) return <div>Loading </div>
  if (error) console.error(error)
  const questionTypes = data?.QuestionTypeEnum?.enumValues?.map(
    (value) => value.name
  )

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault()
      }}
    >
      <div>Questions</div>
      <div>Question: </div>
      <input
        type='text'
        onChange={(e: any) =>
          setQuestionInfo({ ...questionInfo, question: e.target.value })
        }
      />
      <div>Question Type: </div>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'Pick a Question Type') {
            setQuestionInfo({ ...questionInfo, questionType: e.target.value })
          }
        }}
      >
        <option value={undefined}>Pick a Question Type</option>
        {questionTypes?.map((type) => (
          <option key={type!} value={type!}>
            {type!}
          </option>
        ))}
      </select>
      <button
        type={
          questionInfo.question && questionInfo.questionType
            ? 'reset'
            : 'button'
        }
        onClick={() => {
          if (questionInfo.question && questionInfo.questionType) {
            event({ type: 'SET_QUESTIONS_LIST', payload: questionInfo })
          } else console.log('one or both is blank')
        }}
      >
        Add Question
      </button>
    </form>
  )
}
