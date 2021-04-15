import React, { Dispatch, SetStateAction, FC, useEffect } from 'react'
import {
  updateTextSectionVariables,
  updateTextSection,
  TextSectionQuestionsInput,
  questionTypeEnum,
} from '../../../../../../schemaTypes'
import {
  sectionEditorMachineEvent,
  sectionEditorMachineContext,
} from '../state-n-styles/sectionEditorMachine'
import { State } from 'xstate'
import { MutationFunctionOptions, useQuery } from '@apollo/client'
import { QUESTION_TYPE_ENUM_QUERY } from '../../section-builder/QuestionsInfo'

type AddVocabWordProps = {
  setQuestionsItem: Dispatch<SetStateAction<TextSectionQuestionsInput>>
  questionsItem: TextSectionQuestionsInput
  event: (event: sectionEditorMachineEvent) => void
  state: State<sectionEditorMachineContext, sectionEditorMachineEvent, any, any>
  currentIndexForItem: number
  updateTextSection: (
    options?:
      | MutationFunctionOptions<updateTextSection, updateTextSectionVariables>
      | undefined
  ) => void
}

export const AddQuestion = ({
  questionsItem,
  setQuestionsItem,
  event,
  state,
  currentIndexForItem,
  updateTextSection,
}: AddVocabWordProps) => {
  useEffect(() => {
    updateTextSection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.hasQuestions])

  const { loading, error, data } = useQuery<questionTypeEnum>(
    QUESTION_TYPE_ENUM_QUERY
  )
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  const newList = [
    ...state.context.hasQuestions.slice(0, currentIndexForItem + 1),
    questionsItem,
    ...state.context.hasQuestions.slice(currentIndexForItem + 1),
  ]

  //   console.log(currentIndexForItem + 1)
  return (
    <form>
      <div>Question Type</div>
      <select
        onChange={(e: any) =>
          setQuestionsItem({ ...questionsItem, questionType: e.target.value })
        }
      >
        <option value={undefined}>Select a Question Type</option>
        {data?.QuestionTypeEnum?.enumValues?.map((questionType) => (
          <option key={questionType.name!} value={questionType.name!}>
            {questionType.name}
          </option>
        ))}
      </select>
      <div>Question</div>
      <input
        type='text'
        onChange={(e: any) =>
          setQuestionsItem({
            ...questionsItem,
            question: e.target.value,
          })
        }
      />
      <>
        <button onClick={() => event({ type: 'IDLE' })}>Cancel</button>
        <button
          type='reset'
          onClick={() => {
            event({
              type: 'SET_QUESTIONS_LIST',
              payload: newList,
            })
            event({ type: 'IDLE' })
            // toggleQuestionsItemInputs(false)
          }}
        >
          Add Word
        </button>
      </>
    </form>
  )
}
