import React, { FC } from 'react'
import { useRubricEditorContextProvider } from '../RubricEditorContext'
import { findRubricEntries_findRubricEntries_rubricEntries } from '../../../../../../schemaTypes'

export type RubricEntryDisplayProps = {
  rubricEntries: findRubricEntries_findRubricEntries_rubricEntries[]
}

export const RubricEntries: FC<RubricEntryDisplayProps> = ({
  rubricEntries,
}) => {
  const [state, event] = useRubricEditorContextProvider()

  const filteredEntryList = rubricEntries.filter(
    (entry) =>
      entry.rubricWritingLevels.includes(state.context.writingLevel) &&
      entry.rubricSection === state.context.rubricSection
  )

  return (
    <>
      {filteredEntryList.map((entry) => (
        <div
          onClick={() => {
            event({ type: 'SET_RUBRIC_ENTRY', payload: entry })
            event({ type: 'NEXT' })
          }}
          key={entry._id!}
        >
          {entry.entry}
        </div>
      ))}
    </>
  )
}
