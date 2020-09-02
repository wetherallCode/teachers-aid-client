import React, { FC } from 'react'
import { findReadingGuideById_findReadingGuideById_readingGuide_lessonInfo_vocabList } from '../../../../../schemaTypes'
import {
  ReadingGuideInfoTitle,
  ReadingGuideInfoBody,
} from './state-and-styles/readingGuideStyles'

export type VocabListProps = {
  words: findReadingGuideById_findReadingGuideById_readingGuide_lessonInfo_vocabList[]
}

export const VocabList: FC<VocabListProps> = ({ words }) => {
  return (
    <>
      <ReadingGuideInfoTitle>Vocabulary</ReadingGuideInfoTitle>
      <ReadingGuideInfoBody>
        {words.map((word, i) => (
          <ul key={i}>
            <li>
              <span>{word.word}: </span>
              <span>{word.definition}</span>
            </li>
          </ul>
        ))}
      </ReadingGuideInfoBody>
    </>
  )
}
