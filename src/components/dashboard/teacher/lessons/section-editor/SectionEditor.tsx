import React from 'react'

import { TextSectionList } from './TextSectionList'
import { useSectionEditorContextProvider } from './state-n-styles/sectionEditorContext'
import { EditorChapterSelect } from './EditorChapterSelect'
import { TextSectionEditorDisplay } from './TextSectionEditorDisplay'
import { EditorTextListLoader } from './EditorTextListLoader'

export type SectionEditorProps = {}

export const SectionEditor = ({}: SectionEditorProps) => {
  const [state] = useSectionEditorContextProvider()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 5fr',
        height: '100%',
      }}
    >
      <div>
        <div>Section Editor</div>
        <EditorTextListLoader />
        <EditorChapterSelect />
        <TextSectionList />
      </div>

      {state.context.sectionId && <TextSectionEditorDisplay />}
    </div>
  )
}
