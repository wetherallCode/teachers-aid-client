import React, { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import {
  findTextSectionsByChapter,
  findTextSectionsByChapterVariables,
} from '../../../../../schemaTypes'
import { FIND_TEXT_SECTIONS_BY_CHAPTER_QUERY } from '../section-editor/TextSectionList'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import {
  TextPickerHeader,
  TextPickerBody,
  SectionPickerBody,
  SectionPickerHeader,
  SectionPickerButtonContainer,
  SectionPickerNextButton,
  SectionSelectorOption,
  SectionSelectorOptionAddButton,
  SectionPickerSelectOptionsForm,
  SectionSelectorOptionAddButtonContainer,
} from './state-and-styles/lessonPlannerStyles'

export type SectionSelectProps = {}

export const SectionSelect: FC<SectionSelectProps> = () => {
  const [state, event] = useLessonPlannerContextProvider()

  useEffect(() => {
    if (state.context.textSectionList.length > 0) {
      event({
        type: 'SET_STARTING_SECTION',
        payload: state.context.texSectionListHeaders[0],
      })
      event({
        type: 'SET_ENDING_SECTION',
        payload:
          state.context.texSectionListHeaders[
            state.context.texSectionListHeaders.length - 1
          ],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.texSectionListHeaders])

  const { loading, error, data } = useQuery<
    findTextSectionsByChapter,
    findTextSectionsByChapterVariables
  >(FIND_TEXT_SECTIONS_BY_CHAPTER_QUERY, {
    variables: {
      input: { fromChapterId: state.context.fromChapterId },
    },
    onError: (error) => console.error(error),
  })

  return (
    <>
      <SectionPickerHeader>
        What Sections are in the Lesson?
      </SectionPickerHeader>
      <SectionPickerBody>
        <SectionPickerSelectOptionsForm
          onSubmit={(e: any) => e.preventDefault()}
        >
          {/* <select
            onChange={(e: any) => {
              console.log(e.target.value)
              if (e.target.value !== 'Select a Section') {
                const arr = e.target.value.split(',')
                event({
                  type: 'SET_CURRENT_SECTION',
                  payload: [arr[0], arr[1]],
                })
              } else event({ type: 'SET_CURRENT_SECTION', payload: ['none'] })
            }}
          >
            <option value={undefined}>Select a Section</option>
            {data?.findTextSectionsByChapter.textSections.map((sections) => (
              <option
                key={sections._id!}
                value={[sections._id!, sections.header]}
              >
                {sections.header}
              </option>
            ))}
          </select> */}
          <div style={{ overflow: 'scroll', height: '35vh' }}>
            {data?.findTextSectionsByChapter.textSections.map((section) =>
              loading ? (
                'Loading Sections...'
              ) : (
                <SectionSelectorOption
                  key={section._id!}
                  // selected={section._id === state.context.currentSection[0]}
                  selected={state.context.textSectionList.includes(
                    section._id!
                  )}
                  onClick={() => {
                    // event({
                    //   type: 'SET_CURRENT_SECTION',
                    //   payload: [section._id!, section.header],
                    // })
                    event({
                      type: 'ADD_SECTIONS',
                      payload: [section._id!, section.header],
                    })
                  }}
                >
                  {section.header}
                </SectionSelectorOption>
              )
            )}
          </div>
          {/* <SectionSelectorOptionAddButtonContainer>
            <SectionSelectorOptionAddButton
              type='reset'
              onClick={() => {
                if (
                  state.context.currentSection.length > 0 &&
                  !state.context.currentSection.includes('none')
                ) {
                  event({
                    type: 'ADD_SECTIONS',
                    payload: [
                      state.context.currentSection[0],
                      state.context.currentSection[1],
                    ],
                  })
                  event({ type: 'SET_CURRENT_SECTION', payload: ['none'] })
                }
              }}
            >
              Add Section
            </SectionSelectorOptionAddButton>
          </SectionSelectorOptionAddButtonContainer> */}
        </SectionPickerSelectOptionsForm>
        <div>
          <div>Starting Section: {state.context.startingSection}</div>
          {state.context.endingSection !== state.context.startingSection && (
            <div>Ending Section: {state.context.endingSection}</div>
          )}
        </div>
      </SectionPickerBody>
      <SectionPickerButtonContainer>
        <SectionPickerNextButton onClick={() => event({ type: 'PREVIOUS' })}>
          Back
        </SectionPickerNextButton>
        {state.context.startingSection && (
          <SectionPickerNextButton onClick={() => event({ type: 'NEXT' })}>
            Next
          </SectionPickerNextButton>
        )}
      </SectionPickerButtonContainer>
    </>
  )
}
