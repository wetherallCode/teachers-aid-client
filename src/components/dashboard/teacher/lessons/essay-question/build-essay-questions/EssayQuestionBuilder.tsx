import React from 'react'
import { ChapterSelect } from './ChapterSelect'
import { EssayQuestionInformation } from './EssayQuestionInformation'
import { SectionSelect } from './SectionSelect'
import { useBuildEssayQuestionContextProvider } from './state-n-styles/BuildEssayQuestionContext'

import { TextSelect } from './TextSelect'

export type EssayQuestionBuilderProps = {}

export const EssayQuestionBuilder = ({}: EssayQuestionBuilderProps) => {
  const [state, event] = useBuildEssayQuestionContextProvider()

  return (
    <>
      <div>Essay Questions</div>
      {state.matches('sections.text') && <TextSelect />}
      {state.matches('sections.chapter') && <ChapterSelect />}
      {state.matches('sections.sectionList') && <SectionSelect />}
      {state.matches('questionInfo') && <EssayQuestionInformation />}
    </>
  )
}
