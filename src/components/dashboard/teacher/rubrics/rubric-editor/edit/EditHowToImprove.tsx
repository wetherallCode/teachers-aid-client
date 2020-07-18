import React, { FC } from 'react'
import { useRubricEditorContextProvider } from '../RubricEditorContext'

export type EditHowToImproveProps = {}

export const EditHowToImprove: FC<EditHowToImproveProps> = () => {
  const [state, event] = useRubricEditorContextProvider()
  return (
    <>
      <div>How To Improve</div>
      <input
        // type='text'
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
