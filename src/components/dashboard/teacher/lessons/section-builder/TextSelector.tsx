import React, { FC, Dispatch, SetStateAction, useState } from 'react'
import { CenterItems } from './sectionBuilderStyles'
import {
  findChaptersInText_findChaptersInText_chapters,
  findTextTitles_findTexts_texts,
  findChaptersInText,
  findChaptersInTextVariables,
} from '../../../../../schemaTypes'
import { useQuery, gql } from '@apollo/client'
import { TextSelectorDisplay } from './TextSelectorDisplay'

export type TextSelectorProps = {
  textList: findTextTitles_findTexts_texts[]
  setChapterList: Dispatch<
    SetStateAction<findChaptersInText_findChaptersInText_chapters[]>
  >
}

export const FIND_CHAPTERS_IN_TEXT_QUERY = gql`
  query findChaptersInText($input: FindChaptersInTextInput!) {
    findChaptersInText(input: $input) {
      chapters {
        _id
        chapterTitle
        chapterNumber
      }
    }
  }
`
export const TextSelector: FC<TextSelectorProps> = ({
  textList,
  setChapterList,
}) => {
  const [title, setTitle] = useState<
    findTextTitles_findTexts_texts['textTitle']
  >('')

  const { loading, error, data } = useQuery<
    findChaptersInText,
    findChaptersInTextVariables
  >(FIND_CHAPTERS_IN_TEXT_QUERY, {
    variables: {
      input: { textTitle: title },
    },
  })
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <div>
      <CenterItems>
        <div>Text</div>
        <TextSelectorDisplay
          setTitle={setTitle}
          textList={textList}
          chapterList={data!.findChaptersInText.chapters}
          setChapterList={setChapterList}
        />
      </CenterItems>
    </div>
  )
}
