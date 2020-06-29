import React, { FC } from 'react'
import { useRubricEditorContextProvider } from '../RubricEditorContext'

export type EditEntryProps = {}

export const EditEntry: FC<EditEntryProps> = () => {
  const [state, event] = useRubricEditorContextProvider()
  return (
    <>
      <div>Entry: </div>
      <div>
        <input
          value={state.context.editableRubricEntry.entry}
          onChange={(e: any) =>
            event({
              type: 'SET_EDITABLE_ENTRY',
              payload: {
                ...state.context.editableRubricEntry,
                entry: e.target.value,
              },
            })
          }
        />
      </div>
    </>
  )
}
