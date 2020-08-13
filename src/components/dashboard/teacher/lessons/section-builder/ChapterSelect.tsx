import React, { FC } from 'react'
import { useQuery, gql } from '@apollo/client'
import {
  findChaptersInText,
  findChaptersInTextVariables,
} from '../../../../../schemaTypes'

import { State } from 'xstate'
import { AddChapter } from './AddChapter'
import { useToggle } from '../../../../../hooks'
import { useSectionBuilderContextProvider } from './state/SectionBuilderContext'

export const FIND_CHAPTERS_IN_TEXT_QUERY = gql`
  query findChaptersInText($input: FindChaptersInTextInput!) {
    findChaptersInText(input: $input) {
      chapters {
        _id
        chapterTitle
      }
    }
  }
`

type ChapterSelectProps = {
  // state: State<sectionBuilderFSMContext, sectionBuilderFSMEvent, any, any>
  // event: (event: sectionBuilderFSMEvent) => void
}

export const ChapterSelect: FC<ChapterSelectProps> = () => {
  const [isAddChapterVisible, toggleVisible] = useToggle(false)
  const [state, event] = useSectionBuilderContextProvider()
  const { loading, error, data } = useQuery<
    findChaptersInText,
    findChaptersInTextVariables
  >(FIND_CHAPTERS_IN_TEXT_QUERY, {
    variables: { input: { textTitle: state.context.fromText } },
  })
  if (loading) return <div>Loading </div>
  if (error) console.error(error)
  console.log(data)
  return (
    <div>
      <div>Chapter</div>
      {data?.findChaptersInText.chapters.length! > 0 ? (
        <>
          <select
            onChange={(e: any) => {
              console.log(e.target.value)
              if (e.target.value !== 'Choose a Chapter') {
                const arr = e.target.value.split(',')
                event({ type: 'SET_CHAPTER_ID', payload: arr[0] })
                event({ type: 'SET_CHAPTER_TITLE', payload: arr[1] })
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
          <div onClick={toggleVisible}>Add a New Chapter</div>
          {isAddChapterVisible && <AddChapter />}
        </>
      ) : (
        <AddChapter />
      )}
    </div>
  )
}
