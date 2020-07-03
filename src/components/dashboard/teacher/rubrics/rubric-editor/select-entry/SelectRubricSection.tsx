import React, { FC, useEffect } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useRubricEditorContextProvider } from '../RubricEditorContext'

export type SelectRubricSectionProps = {}

export const SelectRubricSection: FC<SelectRubricSectionProps> = () => {
  const { rubricSectionEnum } = useEnumContextProvider()

  const [state, event] = useRubricEditorContextProvider()
  const { rubricSectionSelector } = state.context

  useEffect(() => {
    event({
      type: 'SET_RUBRIC_SECTION',
      payload: rubricSectionEnum[rubricSectionSelector],
    })
  }, [event, rubricSectionEnum, rubricSectionSelector])

  return (
    <div>
      <span>
        <button
          onClick={() => {
            if (rubricSectionSelector > 0) {
              event({
                type: 'SET_RUBRIC_SECTION_SELECTOR',
                payload: rubricSectionSelector - 1,
              })
            }
          }}
        >
          &lt;
        </button>
      </span>{' '}
      <span>{rubricSectionEnum[rubricSectionSelector]}</span>{' '}
      <span>
        <button
          onClick={() => {
            if (rubricSectionSelector < rubricSectionEnum.length - 1) {
              event({
                type: 'SET_RUBRIC_SECTION_SELECTOR',
                payload: rubricSectionSelector + 1,
              })
            }
          }}
        >
          &gt;
        </button>
      </span>
    </div>
  )
}
