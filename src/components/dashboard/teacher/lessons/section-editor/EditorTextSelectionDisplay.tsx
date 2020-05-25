import React, { FC } from 'react'
import { findTexts_findTexts_texts } from '../../../../../schemaTypes'

import { sectionEditorMachineEvent } from './sectionEditorMachine'

export type TextSelectionDisplayProps = {
  event: (event: sectionEditorMachineEvent) => void
  textList: findTexts_findTexts_texts[]
}
export const EditorTextSelectionDisplay: FC<TextSelectionDisplayProps> = ({
  event,
  textList,
}) => {
  return (
    <div>
      <div>Texts: </div>
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
    </div>
  )
}
