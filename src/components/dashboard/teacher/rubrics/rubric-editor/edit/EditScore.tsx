import React, { FC } from 'react'
import { useRubricEditorContextProvider } from '../RubricEditorContext'

export type EditScoreProps = {}

export const EditScore: FC<EditScoreProps> = () => {
  const [state, event] = useRubricEditorContextProvider()
  const { score } = state.context.editableRubricEntry

  return (
    <>
      <div>Score</div>
      <span>
        <button
          onClick={() => {
            if (state.context.editableRubricEntry.score > 0) {
              event({
                type: 'SET_EDITABLE_ENTRY',
                payload: {
                  ...state.context.editableRubricEntry,
                  score: score - 1,
                },
              })
            }
          }}
        >
          &lt;
        </button>{' '}
      </span>
      <span>{state.context.editableRubricEntry.score}</span>{' '}
      <button
        onClick={() => {
          if (state.context.editableRubricEntry.score < 5) {
            event({
              type: 'SET_EDITABLE_ENTRY',
              payload: {
                ...state.context.editableRubricEntry,
                score: score + 1,
              },
            })
          }
        }}
      >
        &gt;
      </button>
    </>
  )
}
