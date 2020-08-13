import React, { FC } from 'react'
import { findReadingGuideById_findReadingGuideById_readingGuide_lessonInfo_vocabList } from '../../../../../schemaTypes'

export type VocabListProps = {
  words: findReadingGuideById_findReadingGuideById_readingGuide_lessonInfo_vocabList[]
}

export const VocabList: FC<VocabListProps> = ({ words }) => {
  return (
    <>
      Vocabulary
      {words.map((word, i) => (
        <div key={i}>
          <span>{word.word}: </span>
          <span>{word.definition}</span>
        </div>
      ))}
    </>
  )
}
