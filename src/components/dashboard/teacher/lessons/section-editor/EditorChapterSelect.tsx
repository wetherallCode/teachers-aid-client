import React from 'react'

import { FIND_CHAPTERS_IN_TEXT_QUERY } from '../section-builder/ChapterSelect'
import { useQuery } from '@apollo/client'
import {
  findChaptersInText,
  findChaptersInTextVariables,
} from '../../../../../schemaTypes'
import { useSectionEditorContextProvider } from './state-n-styles/sectionEditorContext'

type EditorChapterSelectProps = {}

export const EditorChapterSelect = ({}: EditorChapterSelectProps) => {
  const [state, event] = useSectionEditorContextProvider()
  const { loading, data } = useQuery<
    findChaptersInText,
    findChaptersInTextVariables
  >(FIND_CHAPTERS_IN_TEXT_QUERY, {
    variables: { input: { textTitle: state.context.fromText } },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <div>
      <div>Chapter</div>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            const arr = e.target.value.split(',')
            event({ type: 'SET_CHAPTER_ID', payload: arr[0] })
          }
        }}
      >
        <option value={'none'}>Choose a Chapter</option>
        {data?.findChaptersInText.chapters.map((chapter) => (
          <option
            key={chapter._id!}
            value={[chapter._id!, chapter.chapterTitle]}
          >
            {chapter.chapterTitle}
          </option>
        ))}
      </select>
    </div>
  )
}
