import React, { FC } from 'react'
import { useRubricEditorContextProvider } from '../RubricEditorContext'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { RubricSectionEnum } from '../../../../../../schemaTypes'

export type EditSectionProps = {}

export const EditSection: FC<EditSectionProps> = () => {
  const [state, event] = useRubricEditorContextProvider()
  const { rubricSectionEnum } = useEnumContextProvider()
  return (
    <>
      <div>Rubric Section</div>
      <select
        value={state.context.editableRubricEntry.rubricSection}
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            event({
              type: 'SET_EDITABLE_ENTRY',
              payload: {
                ...state.context.editableRubricEntry,
                rubricSection: e.target.value,
              },
            })
          }
        }}
      >
        <option key={'none'}>Pick a Section</option>
        {rubricSectionEnum.map((section: RubricSectionEnum) => (
          <option key={section} value={section}>
            {section}
          </option>
        ))}
      </select>
    </>
  )
}
