import React, { FC } from 'react'
import { findTexts_findTexts_texts } from '../../../../../schemaTypes'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'

export type TextPickerProps = {
  textList: findTexts_findTexts_texts[]
}

export const TextPicker: FC<TextPickerProps> = ({ textList }) => {
  const [, event] = useLessonPlannerContextProvider()
  return (
    <>
      <div>Texts: </div>
      {textList.length > 0 && (
        <select
          onChange={(e: any) => {
            if (e.target.value !== 'Select your text') {
              event({ type: 'SET_TEXT_TITLE', payload: e.target.value })
              event({ type: 'NEXT' })
            }
          }}
        >
          <option value={undefined}>Select your text</option>
          {textList.map((text) => (
            <option key={text._id!} value={text.textTitle!}>
              {text.textTitle}
            </option>
          ))}
        </select>
      )}
    </>
  )
}
