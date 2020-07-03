import React, { FC, useState } from 'react'
import { SelectEntry } from './select-entry/SelectEntry'
import { useRubricEditorContextProvider } from './RubricEditorContext'
import { RubricEditorDisplay } from './edit/RubricEditorDisplay'

export type RubricEditorProps = {}

export const RubricEditor: FC<RubricEditorProps> = () => {
  const [state] = useRubricEditorContextProvider()
  const [deleteEntry, setDeleteEntry] = useState(false)
  console.log(state.value)
  return (
    <>
      <div>Edit Rubric Entry</div>

      {state.matches('selectEntry') && <SelectEntry />}
      {state.matches('edit') && (
        <RubricEditorDisplay
          deleteEntry={deleteEntry}
          setDeleteEntry={setDeleteEntry}
        />
      )}
    </>
  )
}
