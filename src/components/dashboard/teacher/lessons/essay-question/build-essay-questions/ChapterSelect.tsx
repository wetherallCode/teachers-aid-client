import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findChaptersByTextId,
  findChaptersByTextIdVariables,
} from '../../../../../../schemaTypes'
import {
  TextPickerHeader,
  TextPickerBody,
  TextPickerTextSelection,
  SectionPickerButtonContainer,
  SectionPickerNextButton,
} from '../../lesson-planner/state-and-styles/lessonPlannerStyles'
import { useBuildEssayQuestionContextProvider } from './state-n-styles/BuildEssayQuestionContext'

export type ChapterSelectProps = {}
export const FIND_SECTIONS_BY_CHAPTER_QUERY = gql`
  query findChaptersByTextId($input: FindChaptersByTextIdInput!) {
    findChaptersByTextId(input: $input) {
      chapters {
        _id
        chapterTitle
      }
    }
  }
`

export const ChapterSelect = ({}: ChapterSelectProps) => {
  const [state, event] = useBuildEssayQuestionContextProvider()
  const { loading, data } = useQuery<
    findChaptersByTextId,
    findChaptersByTextIdVariables
  >(FIND_SECTIONS_BY_CHAPTER_QUERY, {
    variables: {
      input: { textId: state.context.textId },
    },
    onError: (error) => console.error(error),
  })

  const chapters = data?.findChaptersByTextId.chapters!

  return (
    <>
      <TextPickerHeader>
        Select Chapter from {state.context.textName}
      </TextPickerHeader>
      {loading ? (
        <TextPickerBody>Loading</TextPickerBody>
      ) : (
        <TextPickerBody>
          {chapters &&
            chapters.map((chapter) => (
              <TextPickerTextSelection
                onClick={() => {
                  event({ type: 'SET_CHAPTER_ID', payload: chapter._id! })
                  event({
                    type: 'SET_CHAPTER_TITLE',
                    payload: chapter.chapterTitle,
                  })
                  // event({
                  //   type: 'SET_CHAPTER_TITLE',
                  //   payload: chapter.chapterTitle,
                  // })
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
      <button onClick={() => event({ type: 'PREVIOUS' })}>Back</button>
    </>
  )
}
