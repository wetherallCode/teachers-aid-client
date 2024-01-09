import React, { FC, useState, Dispatch, SetStateAction, useEffect } from 'react'
import {
  Boxes,
  BoxTitle,
  ListItem,
  AddRemoveButtons,
  ListItemContainer,
} from '../state-n-styles/sectionEditorStyles'
import { useSectionEditorContextProvider } from '../state-n-styles/sectionEditorContext'
import { MutationFunctionOptions } from '@apollo/client'
import {
  updateTextSection,
  updateTextSectionVariables,
} from '../../../../../../schemaTypes'

export type QuestionsBoxProps = {
  setCurrentIndexForItem: Dispatch<SetStateAction<number>>
  toggleQuestionsItemInputs: Dispatch<SetStateAction<boolean>>
  updateTextSection: (
    options?:
      | MutationFunctionOptions<updateTextSection, updateTextSectionVariables>
      | undefined,
  ) => void
}

export const QuestionsBox: FC<QuestionsBoxProps> = ({
  setCurrentIndexForItem,
  toggleQuestionsItemInputs,
  updateTextSection,
}) => {
  const [state, event] = useSectionEditorContextProvider()

  useEffect(() => {
    updateTextSection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.hasQuestions])

  const [index, setIndex] = useState(-1)

  function handleAdd(index: number) {
    setCurrentIndexForItem(index)
  }

  function handleRemove(index: number) {
    event({
      type: 'SET_QUESTIONS_LIST',
      payload: [
        ...state.context.hasQuestions.slice(0, index),
        ...state.context.hasQuestions.slice(index + 1),
      ],
    })
  }

  return (
    <>
      <Boxes onMouseOut={() => setIndex(-1)}>
        <BoxTitle>Questions</BoxTitle>
        {state.context.hasQuestions.length > 0 ? (
          <div>
            {state.context.hasQuestions.map((q, i) => (
              <ListItemContainer
                key={q.question}
                onMouseOver={() => setIndex(i)}
              >
                <ListItem
                  onClick={() => {
                    const questionIndex = state.context.hasQuestions.findIndex(
                      (question) => question.question === q.question,
                    )
                    event({
                      type: 'SET_QUESTION_TO_EDIT',
                      payload: q,
                      index: questionIndex,
                    })
                    event({ type: 'QUESTION_EDITOR' })
                  }}
                >
                  {q.question}
                </ListItem>
                <AddRemoveButtons>
                  <div
                    hidden={i !== index || undefined}
                    onClick={() => {
                      // toggleQuestionsItemInputs(true)
                      handleAdd(i)
                      event({ type: 'QUESTION_ADDER' })
                    }}
                  >
                    +
                  </div>
                  <div
                    hidden={i !== index || undefined}
                    onClick={() => handleRemove(index)}
                  >
                    -
                  </div>
                </AddRemoveButtons>
              </ListItemContainer>
            ))}
          </div>
        ) : (
          <div
            onClick={() => {
              toggleQuestionsItemInputs(true)
              handleAdd(0)
            }}
          >
            Add a Question
          </div>
        )}
      </Boxes>
    </>
  )
}
