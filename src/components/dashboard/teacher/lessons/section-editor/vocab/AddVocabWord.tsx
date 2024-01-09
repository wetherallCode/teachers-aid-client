import React, { Dispatch, SetStateAction, FC, useEffect } from 'react'
import {
  TextSectionVocabInput,
  updateTextSectionVariables,
  updateTextSection,
} from '../../../../../../schemaTypes'
import {
  sectionEditorMachineEvent,
  sectionEditorMachineContext,
} from '../state-n-styles/sectionEditorMachine'
import { State } from 'xstate'
import { MutationFunctionOptions } from '@apollo/client'

type AddVocabWordProps = {
  setVocabWord: Dispatch<SetStateAction<TextSectionVocabInput>>
  vocabWord: TextSectionVocabInput
  event: (event: sectionEditorMachineEvent) => void
  state: State<sectionEditorMachineContext, sectionEditorMachineEvent, any, any>
  currentIndexForItem: number
  updateTextSection: (
    options?:
      | MutationFunctionOptions<updateTextSection, updateTextSectionVariables>
      | undefined,
  ) => void
}

export const AddVocabWord = ({
  setVocabWord,
  vocabWord,
  event,
  state,
  currentIndexForItem,
  updateTextSection,
}: AddVocabWordProps) => {
  useEffect(() => {
    updateTextSection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.hasVocab])

  const newList = [
    ...state.context.hasVocab.slice(0, currentIndexForItem + 1),
    vocabWord,
    ...state.context.hasVocab.slice(currentIndexForItem + 1),
  ]

  return (
    <form>
      <div>Word</div>
      <input
        type="text"
        autoFocus
        onChange={(e: any) =>
          setVocabWord({ ...vocabWord, word: e.target.value })
        }
      />
      <div>Defintion</div>
      <input
        type="text"
        onChange={(e: any) =>
          setVocabWord({
            ...vocabWord,
            definition: e.target.value,
          })
        }
      />
      <>
        <button onClick={() => event({ type: 'IDLE' })}>Cancel</button>
        <button
          type="reset"
          onClick={() => {
            event({
              type: 'SET_VOCAB_LIST',
              payload: newList,
            })
            event({ type: 'IDLE' })
          }}
        >
          Add Word
        </button>
      </>
    </form>
  )
}
