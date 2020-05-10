import React, { useState } from 'react'
import {
  BuilderContainer,
  Title,
  EditorContainer,
} from './sectionBuilderStyles'

import { TextAndChapterLoader } from './TextAndChapterLoader'
import { SectionBuilderInfo } from './SectionBuilderInfo'

export const SectionBuilder = () => {
  const [chapterID, setChapterID] = useState('')
  console.log(chapterID)
  return (
    <BuilderContainer>
      <Title>
        <div>Section Builder</div>
      </Title>
      <EditorContainer>
        <TextAndChapterLoader setChapterID={setChapterID} />
        {chapterID && <SectionBuilderInfo chapterID={chapterID} />}
      </EditorContainer>
    </BuilderContainer>
  )
}
