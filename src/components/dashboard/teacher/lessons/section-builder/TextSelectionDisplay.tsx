import React, { FC } from 'react'
import { findTexts_findTexts_texts } from '../../../../../schemaTypes'

import { AddText } from './AddText'
import { useSectionBuilderContextProvider } from './state/SectionBuilderContext'

export type TextSelectionDisplayProps = {
  textList: findTexts_findTexts_texts[]
}
export const TextSelectionDisplay: FC<TextSelectionDisplayProps> = ({
  textList,
}) => {
  const [, event] = useSectionBuilderContextProvider()
  return (
    <div>
      <div>Texts: </div>
      {textList.length > 0 ? (
        <select
          onChange={(e: any) => {
            if (e.target.value !== 'Select your text') {
              event({ type: 'SET_TEXT_TITLE', textTitle: e.target.value })
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
      ) : (
        <AddText />
      )}
    </div>
  )
}
