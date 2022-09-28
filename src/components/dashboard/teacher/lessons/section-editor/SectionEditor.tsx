import React from 'react'

import { TextSectionList } from './TextSectionList'
import { useSectionEditorContextProvider } from './state-n-styles/sectionEditorContext'
import { EditorChapterSelect } from './EditorChapterSelect'
import { TextSectionEditorDisplay } from './TextSectionEditorDisplay'
import { EditorTextListLoader } from './EditorTextListLoader'
import { useNavigate } from 'react-router'
import { BackContainer } from '../../assignments/create-assignments/state-and-styles/createAssignmentsStyles'

export type SectionEditorProps = {}

export const SectionEditor = ({}: SectionEditorProps) => {
  const navigate = useNavigate()
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
        <BackContainer>
          <div onClick={() => navigate('/dashboard/lessons')}>Back</div>
        </BackContainer>
        <div>Section Editor</div>
        <EditorTextListLoader />
        <EditorChapterSelect />
        <TextSectionList />
      </div>

      {state.context.sectionId && <TextSectionEditorDisplay />}
    </div>
  )
}
