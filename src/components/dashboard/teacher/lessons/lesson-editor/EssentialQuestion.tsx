import React, { FC } from 'react'
import {
  TextSectionQuestionsInput,
  QuestionTypeEnum,
} from '../../../../../schemaTypes'
import { useLessonEditorContextProvider } from './LessonEditorContext'

export type EssentialQuestionProps = {
  questions: TextSectionQuestionsInput[]
}

export const EssentialQuestion: FC<EssentialQuestionProps> = ({
  questions,
}) => {
  const [state, event] = useLessonEditorContextProvider()
  return (
    <>
      <div>Current Essential Question</div>
      <div>{state.context.essentialQuestion}</div>
      <div>Set Essential Question</div>
      <div>
        {questions.map((question) => (
          <div
            key={question.question}
            onClick={() =>
              event({
                type: 'SET_ESSENTIAL_QUESTION',
                payload: question.question,
              })
            }
          >
            {question.question}
          </div>
        ))}
      </div>
    </>
  )
}
