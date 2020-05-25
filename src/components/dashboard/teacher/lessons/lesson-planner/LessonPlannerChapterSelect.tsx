import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import {
  findChaptersInText,
  findChaptersInTextVariables,
} from '../../../../../schemaTypes'
import { FIND_CHAPTERS_IN_TEXT_QUERY } from '../section-builder/ChapterSelect'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'

export type LessonPlannerChapterSelectProps = {
  text: string
}

export const LessonPlannerChapterSelect: FC<LessonPlannerChapterSelectProps> = ({
  text,
}) => {
  const [, event] = useLessonPlannerContextProvider()
  const { loading, error, data } = useQuery<
    findChaptersInText,
    findChaptersInTextVariables
  >(FIND_CHAPTERS_IN_TEXT_QUERY, {
    variables: { input: { textTitle: text } },
  })
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <div>
      <div>Chapter</div>
      <select
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
      </select>
    </div>
  )
}
