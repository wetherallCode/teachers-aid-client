import { useQuery } from '@apollo/client'
import React from 'react'
import {
  findTextSectionsByChapter,
  findTextSectionsByChapterVariables,
} from '../../../../../../schemaTypes'
import {
  SectionPickerHeader,
  SectionSelectorOption,
} from '../../lesson-planner/state-and-styles/lessonPlannerStyles'
import { FIND_TEXT_SECTIONS_BY_CHAPTER_QUERY } from '../../section-editor/TextSectionList'
import { useBuildEssayQuestionContextProvider } from './state-n-styles/BuildEssayQuestionContext'

export type SectionSelectProps = {}

export const SectionSelect = ({}: SectionSelectProps) => {
  const [state, event] = useBuildEssayQuestionContextProvider()
  const { loading, data } = useQuery<
    findTextSectionsByChapter,
    findTextSectionsByChapterVariables
  >(FIND_TEXT_SECTIONS_BY_CHAPTER_QUERY, {
    variables: {
      input: { fromChapterId: state.context.chapterId },
    },
    onCompleted: (data) =>
      console.log(data.findTextSectionsByChapter.textSections),
    onError: (error) => console.error(error),
  })

  return (
    <>
      <SectionPickerHeader>What Sections?</SectionPickerHeader>
      <div style={{ overflow: 'scroll', height: '35vh' }}>
        {data?.findTextSectionsByChapter.textSections.map((section) =>
          loading ? (
            'Loading Sections...'
          ) : (
            <>
              <SectionSelectorOption
                key={section._id!}
                // selected={section._id === state.context.currentSection[0]}
                selected={state.context.essayQuestionInfo.associatedTextSectionsIds.includes(
                  section._id!,
                )}
                onClick={() => {
                  // event({
                  //   type: 'SET_CURRENT_SECTION',
                  //   payload: [section._id!, section.header],
                  // })
                  // event({
                  //   type: 'ADD_SECTIONS',
                  //   payload: [section._id!, section.header],
                  // })
                  event({ type: 'SET_SECTION_IDS', payload: section._id! })
                }}
              >
                {section.header}
              </SectionSelectorOption>
            </>
          ),
        )}
      </div>
      <button onClick={() => event({ type: 'NEXT' })}>Next</button>
    </>
  )
}
