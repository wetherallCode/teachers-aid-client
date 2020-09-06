import React, { FC } from 'react'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import { TextSectionQuestionsInput } from '../../../../../schemaTypes'
import {
  EssentialQuestionContainer,
  EssentialQuestionTitle,
  EssentialQuestionOptionSelect,
  EssentialQuestionAddContainter,
  EssentialQuestionInput,
  EssentialQuestionAddTitle,
  EssentialQuestionOptionsContainer,
} from './state-and-styles/lessonPlannerStyles'

export type EssentialQuestionProps = {
  questionsList: TextSectionQuestionsInput[]
}

export const EssentialQuestion: FC<EssentialQuestionProps> = ({
  questionsList,
}) => {
  const [state, event] = useLessonPlannerContextProvider()

  return (
    <EssentialQuestionContainer>
      <EssentialQuestionTitle>Essential Question</EssentialQuestionTitle>
      <EssentialQuestionOptionsContainer>
        {questionsList.map((question, i) => (
          <EssentialQuestionOptionSelect
            key={i}
            selected={state.context.essentialQuestion === question.question}
            onClick={() => {
              if (state.context.essentialQuestion !== question.question) {
                event({
                  type: 'SET_ESSENTIAL_QUESTION',
                  payload: question.question,
                })
              } else
                event({
                  type: 'SET_ESSENTIAL_QUESTION',
                  payload: '',
                })
            }}
          >
            {question.question}
          </EssentialQuestionOptionSelect>
        ))}
      </EssentialQuestionOptionsContainer>
      <EssentialQuestionAddContainter>
        <EssentialQuestionAddTitle>
          Use different Question:{' '}
        </EssentialQuestionAddTitle>
        <EssentialQuestionInput
          onChange={(e: any) =>
            event({
              type: 'SET_ESSENTIAL_QUESTION',
              payload: e.target.value,
            })
          }
        />
      </EssentialQuestionAddContainter>
    </EssentialQuestionContainer>
  )
}
