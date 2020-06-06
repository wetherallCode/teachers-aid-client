import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import {
  findChaptersInText,
  findChaptersInTextVariables,
} from '../../../../../schemaTypes'
import { FIND_CHAPTERS_IN_TEXT_QUERY } from '../section-builder/ChapterSelect'
import { useLessonEditorContextProvider } from './LessonEditorContext'

export type ChapterSelectProps = {}

export const ChapterSelect: FC<ChapterSelectProps> = () => {
  const [state, event] = useLessonEditorContextProvider()
  const { loading, error, data } = useQuery<
    findChaptersInText,
    findChaptersInTextVariables
  >(FIND_CHAPTERS_IN_TEXT_QUERY, {
    variables: { input: { textTitle: state.context.text } },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'Choose a Chapter') {
            event({ type: 'SET_CHAPTER', payload: e.target.value })
          }
        }}
      >
        <option value={undefined}>Choose a Chapter</option>
        {data?.findChaptersInText.chapters.map((chapter) => (
          <option key={chapter._id!} value={chapter._id!}>
            {chapter.chapterTitle}
          </option>
        ))}
      </select>
    </>
  )
}
