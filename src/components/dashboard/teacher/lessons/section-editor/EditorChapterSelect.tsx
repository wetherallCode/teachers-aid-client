import React, { FC } from 'react'
import { State } from 'xstate'
import {
  sectionEditorMachineContext,
  sectionEditorMachineEvent,
} from './sectionEditorMachine'
import { FIND_CHAPTERS_IN_TEXT_QUERY } from '../section-builder/ChapterSelect'
import { useQuery } from '@apollo/client'
import {
  findChaptersInText,
  findChaptersInTextVariables,
} from '../../../../../schemaTypes'

type EditorChapterSelectProps = {
  state: State<sectionEditorMachineContext, sectionEditorMachineEvent, any, any>
  event: (event: sectionEditorMachineEvent) => void
}
export const EditorChapterSelect: FC<EditorChapterSelectProps> = ({
  state,
  event,
}) => {
  const { loading, error, data } = useQuery<
    findChaptersInText,
    findChaptersInTextVariables
  >(FIND_CHAPTERS_IN_TEXT_QUERY, {
    variables: { input: { textTitle: state.context.fromText } },
  })
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <div>
      <div>Chapter</div>
      <select
        onChange={(e: any) => {
          console.log(e.target.value)
          if (e.target.value !== 'Choose a Chapter') {
            const arr = e.target.value.split(',')
            event({ type: 'SET_CHAPTER_ID', payload: arr[0] })
            // event({ type: 'SET_CHAPTER_TITLE', payload: arr[1] })
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
      </select>
    </div>
  )
}
