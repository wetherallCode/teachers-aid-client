import React, { useState, SetStateAction, Dispatch, FC, useEffect } from 'react'
import { useSectionEditorContextProvider } from '../state-n-styles/sectionEditorContext'
import {
  Boxes,
  BoxTitle,
  ListItem,
  AddRemoveButtons,
  ListItemContainer,
} from '../state-n-styles/sectionEditorStyles'
import { MutationFunctionOptions } from '@apollo/client'
import {
  updateTextSection,
  updateTextSectionVariables,
} from '../../../../../../schemaTypes'

type VocabBoxProps = {
  toggleVocabItemInputs: Dispatch<SetStateAction<boolean>>
  setCurrentIndexForItem: Dispatch<SetStateAction<number>>
  updateTextSection: (
    options?:
      | MutationFunctionOptions<updateTextSection, updateTextSectionVariables>
      | undefined,
  ) => void
}

export const VocabBox: FC<VocabBoxProps> = ({
  toggleVocabItemInputs,
  setCurrentIndexForItem,
  updateTextSection,
}) => {
  const [state, event] = useSectionEditorContextProvider()

  useEffect(() => {
    updateTextSection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.hasVocab])

  const [index, setIndex] = useState(-1)

  function handleAdd(index: number) {
    setCurrentIndexForItem(index)
  }

  function handleRemove(index: number) {
    event({
      type: 'SET_VOCAB_LIST',
      payload: [
        ...state.context.hasVocab.slice(0, index),
        ...state.context.hasVocab.slice(index + 1),
      ],
    })
  }

  return (
    <>
      <Boxes onMouseOut={() => setIndex(-1)}>
        <BoxTitle>Vocab</BoxTitle>
        {state.context.hasVocab.length > 0 ? (
          <div>
            {state.context.hasVocab.map((word, i) => (
              <ListItemContainer key={i} onMouseOver={() => setIndex(i)}>
                <ListItem
                  onClick={() => {
                    const vocabWordIndex = state.context.hasVocab.findIndex(
                      (vocabWord) => vocabWord.word === word.word,
                    )
                    event({
                      type: 'SET_VOCAB_WORD_TO_EDIT',
                      payload: word,
                      index: vocabWordIndex,
                    })
                    event({ type: 'VOCAB_WORD_EDITOR' })
                  }}
                >
                  {word.word}: {word.definition}
                </ListItem>
                {/* {!state.context.isHidden && state.context.currentIndex === i && ( */}
                <AddRemoveButtons>
                  <div
                    hidden={i !== index || undefined}
                    onClick={() => {
                      // toggleVocabItemInputs(true)
                      handleAdd(i)
                      event({ type: 'VOCAB_WORD_ADDER' })
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
              toggleVocabItemInputs(true)
              handleAdd(0)
            }}
          >
            Add a Vocab Word
          </div>
        )}
      </Boxes>
    </>
  )
}
