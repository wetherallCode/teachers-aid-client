import React from 'react'
import { useSectionEditorContextProvider } from '../state-n-styles/sectionEditorContext'

export type EditVocabWordProps = {}

export const EditVocabWord = ({}: EditVocabWordProps) => {
  const [state, event] = useSectionEditorContextProvider()
  const vocabWordToReplace = [
    ...state.context.hasVocab.slice(0, state.context.vocabWordToEditIndex!),
    state.context.vocabWordToEdit!,
    ...state.context.hasVocab.slice(state.context.vocabWordToEditIndex! + 1),
  ]
  console.log(state.context.vocabWordToEditIndex)
  return (
    <form>
      <div>Word</div>
      <input
        type='text'
        value={state.context.vocabWordToEdit?.word}
        onChange={(e: any) => {
          event({
            type: 'EDIT_VOCAB_WORD',
            payload: {
              ...state.context.vocabWordToEdit!,
              word: e.target.value,
            },
          })
        }}
      />
      <div>Defintion</div>
      <input
        type='text'
        value={state.context.vocabWordToEdit?.definition}
        onChange={(e: any) => {
          event({
            type: 'EDIT_VOCAB_WORD',
            payload: {
              ...state.context.vocabWordToEdit!,
              definition: e.target.value,
            },
          })
        }}
      />
      <button
        type='reset'
        onClick={() => {
          event({
            type: 'SET_VOCAB_LIST',
            payload: vocabWordToReplace,
          })
        }}
      >
        Edit Word
      </button>
    </form>
  )
}
