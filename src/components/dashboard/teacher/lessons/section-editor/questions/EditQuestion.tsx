import React from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { QuestionTypeEnum } from '../../../../../../schemaTypes'
import {
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../../utils'
import { useSectionEditorContextProvider } from '../state-n-styles/sectionEditorContext'

export type EditQuestionProps = {}

export const EditQuestion = ({}: EditQuestionProps) => {
  const [state, event] = useSectionEditorContextProvider()
  const { questionTypeEnum } = useEnumContextProvider()
  const questionToReplace = [
    ...state.context.hasQuestions.slice(0, state.context.questionToEditIndex!),
    state.context.questionToEdit!,
    ...state.context.hasQuestions.slice(state.context.questionToEditIndex! + 1),
  ]
  return (
    <>
      <form>
        <div>Question Type</div>
        <select
          value={state.context.questionToEdit?.questionType}
          onChange={(e: any) =>
            event({
              type: 'EDIT_QUESTION',
              payload: {
                ...state.context.questionToEdit!,
                questionType: e.target.value,
              },
            })
          }
        >
          <option value={'none'}>Select a Question Type</option>
          {questionTypeEnum.map((questionType: QuestionTypeEnum) => {
            const formatteQuestionTypeEnum = underscoreEliminator(questionType)
            return (
              <option key={questionType} value={questionType}>
                {phraseCapitalizer(formatteQuestionTypeEnum)}
              </option>
            )
          })}
        </select>
        <div>Question</div>
        <input
          type="text"
          value={state.context.questionToEdit?.question}
          onChange={(e: any) =>
            event({
              type: 'EDIT_QUESTION',
              payload: {
                ...state.context.questionToEdit!,
                question: e.target.value,
              },
            })
          }
        />
        <button
          type="reset"
          onClick={() => {
            event({
              type: 'SET_QUESTIONS_LIST',
              payload: questionToReplace,
            })
            event({ type: 'SET_QUESTION_TO_EDIT', payload: null, index: null })
            event({ type: 'IDLE' })
          }}
        >
          Edit Question
        </button>
      </form>
    </>
  )
}
