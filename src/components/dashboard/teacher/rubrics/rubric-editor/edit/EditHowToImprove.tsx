import React from 'react'
import { useRubricEditorContextProvider } from '../RubricEditorContext'

export type EditHowToImproveProps = {}

export const EditHowToImprove = ({}: EditHowToImproveProps) => {
  const [state, event] = useRubricEditorContextProvider()
  return (
    <>
      <div>How To Improve</div>
      <textarea
        style={{ width: '25%', color: 'var(--blue)' }}
        value={state.context.editableRubricEntry.howToImprove!}
        onChange={(e: any) => {
          event({
            type: 'SET_EDITABLE_ENTRY',
            payload: {
              ...state.context.editableRubricEntry,
              howToImprove: e.target.value,
            },
          })
        }}
      />
    </>
  )
}
