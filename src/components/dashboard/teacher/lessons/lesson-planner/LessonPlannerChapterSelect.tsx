import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import {
  findChaptersInText,
  findChaptersInTextVariables,
} from '../../../../../schemaTypes'
import { FIND_CHAPTERS_IN_TEXT_QUERY } from '../section-builder/ChapterSelect'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import {
  TextPickerTextSelection,
  TextPickerHeader,
  TextPickerBody,
  SectionPickerButtonContainer,
  SectionPickerNextButton,
} from './state-and-styles/lessonPlannerStyles'

export type LessonPlannerChapterSelectProps = {
  text: string
}

export const LessonPlannerChapterSelect: FC<
  LessonPlannerChapterSelectProps
> = ({ text }) => {
  const [state, event] = useLessonPlannerContextProvider()
  const { loading, error, data } = useQuery<
    findChaptersInText,
    findChaptersInTextVariables
  >(FIND_CHAPTERS_IN_TEXT_QUERY, {
    variables: { input: { textTitle: text } },
    onError: (error) => console.error(error),
  })

  return (
    <>
      <TextPickerHeader>
        Select Chapter from {state.context.fromText}
      </TextPickerHeader>
      {loading ? (
        <TextPickerBody></TextPickerBody>
      ) : (
        <TextPickerBody>
          {/* <select
        onChange={(e: any) => {
          if (e.target.value !== 'Choose a Chapter') {
            const arr = e.target.value.split(',')
            event({ type: 'SET_CHAPTER_ID', payload: arr[0] })
            event({ type: 'SET_CHAPTER_TITLE', payload: arr[1] })
            event({ type: 'NEXT' })
          }
        }}
      >
        <option value={undefined}>Choose a Chapter</option>
        {data?.findChaptersInText.chapters.map((chapter) => (
          <option
            key={chapter._id!}
            value={[chapter._id!, chapter.chapterTitle]}
          >
            {chapter.chapterTitle}
          </option>
        ))}
      </select> */}
          {data?.findChaptersInText.chapters.map((chapter) => (
            <TextPickerTextSelection
              onClick={() => {
                event({ type: 'SET_CHAPTER_ID', payload: chapter._id! })
                event({
                  type: 'SET_CHAPTER_TITLE',
                  payload: chapter.chapterTitle,
                })
                event({ type: 'NEXT' })
              }}
              key={chapter._id!}
              // value={[chapter._id!, chapter.chapterTitle]}
            >
              {chapter.chapterTitle}
            </TextPickerTextSelection>
          ))}
        </TextPickerBody>
      )}
      <SectionPickerButtonContainer>
        <SectionPickerNextButton onClick={() => event({ type: 'PREVIOUS' })}>
          Back
        </SectionPickerNextButton>
      </SectionPickerButtonContainer>
    </>
  )
}
