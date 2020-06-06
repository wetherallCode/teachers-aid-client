import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import {
  findTextSectionsByChapter,
  findTextSectionsByChapterVariables,
} from '../../../../../schemaTypes'
import { FIND_TEXT_SECTIONS_BY_CHAPTER_QUERY } from '../section-editor/TextSectionList'
import { useLessonEditorContextProvider } from './LessonEditorContext'

export type SectionSelectProps = {}

export const SectionSelect: FC<SectionSelectProps> = () => {
  const [state, event] = useLessonEditorContextProvider()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery<
    findTextSectionsByChapter,
    findTextSectionsByChapterVariables
  >(FIND_TEXT_SECTIONS_BY_CHAPTER_QUERY, {
    variables: {
      input: { fromChapterId: state.context.chapter },
    },
    onError: (error) => console.error(error),
    onCompleted: (data) => console.log(data),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      <select
        onChange={(e: any) => {
          if (
            e.target.value === 'Pick a Section' ||
            state.context.textSectionList.includes(e.target.value)
          ) {
            console.log('not selectable')
          } else
            event({
              type: 'SET_TEMPORARY_SECTION_ID_LIST',
              payload: e.target.value,
            })
        }}
      >
        <option value={undefined}>Pick a Section</option>
        {data?.findTextSectionsByChapter.textSections.map((section) => (
          <option key={section._id!} value={[section._id!]}>
            {section.header}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          event({
            type: 'SET_SECTION_ID_LIST',
            payload: state.context.textSectionList,
          })
        }}
      >
        Set New Sections
      </button>
    </>
  )
}
