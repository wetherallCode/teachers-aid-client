import React, { Dispatch, SetStateAction, FC, useState } from 'react'
import { TextandChapterContainer } from './sectionBuilderStyles'
import { TextSelector } from './TextSelector'
import { ChapterSelector } from './ChapterSelector'
import { gql, useQuery } from '@apollo/client'
import {
  findTextTitles,
  findChaptersInText_findChaptersInText_chapters,
} from '../../../../../schemaTypes'

export const FIND_TEXTS_QUERY = gql`
  query findTextTitles {
    findTexts {
      texts {
        _id
        textTitle
      }
    }
  }
`

type TextandChapterLoaderProps = {
  setChapterID: Dispatch<SetStateAction<string>>
}

export const TextAndChapterLoader: FC<TextandChapterLoaderProps> = ({
  setChapterID,
}) => {
  const [chapterList, setChapterList] = useState<
    findChaptersInText_findChaptersInText_chapters[]
  >([])

  const { loading, error, data } = useQuery<findTextTitles>(FIND_TEXTS_QUERY)
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  const textList = data!.findTexts

  return (
    <div>
      <TextandChapterContainer>
        <TextSelector
          textList={textList.texts}
          setChapterList={setChapterList}
        />
        <ChapterSelector
          setChapterID={setChapterID}
          chapterList={chapterList}
        />
      </TextandChapterContainer>
    </div>
  )
}
