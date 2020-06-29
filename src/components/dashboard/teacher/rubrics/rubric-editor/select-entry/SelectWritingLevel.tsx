import React, { FC, useState, useEffect } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useRubricEditorContextProvider } from '../RubricEditorContext'

export type SelectWritingLevelProps = {}

export const SelectWritingLevel: FC<SelectWritingLevelProps> = () => {
  const { writingLevelEnum } = useEnumContextProvider()
  const [state, event] = useRubricEditorContextProvider()

  useEffect(() => {
    event({
      type: 'SET_WRITING_LEVEL',
      payload: writingLevelEnum[state.context.writingLevelSelector],
    })
  }, [event, state.context.writingLevelSelector, writingLevelEnum])

  return (
    <>
      <span>
        <button
          onClick={() => {
            if (state.context.writingLevelSelector > 0) {
              event({
                type: 'SET_WRITING_LEVEL_SELECTOR',
                payload: state.context.writingLevelSelector - 1,
              })
            }
          }}
        >
          &lt;
        </button>
      </span>{' '}
      <span>{writingLevelEnum[state.context.writingLevelSelector]}</span>{' '}
      <span>
        <button
          onClick={() => {
            if (
              state.context.writingLevelSelector <
              writingLevelEnum.length - 1
            ) {
              event({
                type: 'SET_WRITING_LEVEL_SELECTOR',
                payload: state.context.writingLevelSelector + 1,
              })
            }
          }}
        >
          &gt;
        </button>
      </span>
    </>
  )
}
