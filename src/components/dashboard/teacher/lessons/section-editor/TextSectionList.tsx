import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findTextSectionsByChapter,
  findTextSectionsByChapterVariables,
} from '../../../../../schemaTypes'
import { useSectionEditorContextProvider } from './state-n-styles/sectionEditorContext'

export const FIND_TEXT_SECTIONS_BY_CHAPTER_QUERY = gql`
  query findTextSectionsByChapter($input: FindTextSectionsByChapterInput!) {
    findTextSectionsByChapter(input: $input) {
      textSections {
        _id
        header
        orderNumber
      }
    }
  }
`

export const TextSectionList = () => {
  const [state, event] = useSectionEditorContextProvider()
  const { loading, error, data } = useQuery<
    findTextSectionsByChapter,
    findTextSectionsByChapterVariables
  >(FIND_TEXT_SECTIONS_BY_CHAPTER_QUERY, {
    variables: {
      input: { fromChapterId: state.context.fromChapterId },
    },
  })
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <div>
      {data?.findTextSectionsByChapter.textSections
        .filter((textSection) => textSection.orderNumber)
        .sort((a, b) => a.orderNumber! - b.orderNumber!)
        .map((section) => (
          <div
            key={section._id!}
            onClick={() =>
              event({ type: 'SET_SECTION_ID', payload: section._id! })
            }
          >
            {section.header}
          </div>
        ))}
      {data?.findTextSectionsByChapter.textSections
        .filter((textSection) => !textSection.orderNumber)
        // .sort((a, b) => a.orderNumber! - b.orderNumber!)
        .map((section) => (
          <div
            key={section._id!}
            style={{ color: 'var(--grey)' }}
            onClick={() =>
              event({ type: 'SET_SECTION_ID', payload: section._id! })
            }
          >
            {section.header}
          </div>
        ))}
    </div>
  )
}
