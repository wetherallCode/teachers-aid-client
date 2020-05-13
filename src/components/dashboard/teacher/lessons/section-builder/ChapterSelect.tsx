import React, { FC } from 'react'
import { useQuery, gql } from '@apollo/client'
import {
  findChaptersInText,
  findChaptersInTextVariables,
} from '../../../../../schemaTypes'
import {
  sectionBuilderFSMContext,
  sectionBuilderFSMEvent,
} from './sectionBuilderFSM'
import { State } from 'xstate'

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
  state: State<sectionBuilderFSMContext, sectionBuilderFSMEvent, any, any>
  event: any
}

export type sectionBuilderFSMState = State<
  sectionBuilderFSMContext,
  sectionBuilderFSMEvent,
  any,
  any
>

export const ChapterSelect: FC<ChapterSelectProps> = ({ state, event }) => {
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
      <select
        onChange={(e: any) => {
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
    </div>
  )
}
