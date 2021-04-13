import React from 'react'
import { findTexts_findTexts_texts } from '../../../../../schemaTypes'
import { useSectionEditorContextProvider } from './state-n-styles/sectionEditorContext'

export type TextSelectionDisplayProps = {
  textList: findTexts_findTexts_texts[]
}
export const EditorTextSelectionDisplay = ({
  textList,
}: TextSelectionDisplayProps) => {
  const [, event] = useSectionEditorContextProvider()

  return (
    <div>
      <div>Texts: </div>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            event({ type: 'SET_TEXT_TITLE', textTitle: e.target.value })
          }
        }}
      >
        <option value={'none'}>Select your text</option>
        {textList.map((text) => (
          <option key={text._id!} value={text.textTitle!}>
            {text.textTitle}
          </option>
        ))}
      </select>
    </div>
  )
}
