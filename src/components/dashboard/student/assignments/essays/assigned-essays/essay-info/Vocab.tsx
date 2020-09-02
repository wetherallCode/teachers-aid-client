import React, { FC } from 'react'
import {
  EssayInfoTitle,
  EssayInfoBody,
} from '../state-and-styles/essayInfoStyles'
import { findEssayById_findEssayById_essay_lessonInfo_vocabList } from '../../../../../../../schemaTypes'

export type VocabProps = {
  vocabList: findEssayById_findEssayById_essay_lessonInfo_vocabList[]
}

export const Vocab: FC<VocabProps> = ({ vocabList }) => {
  return (
    <>
      <EssayInfoTitle>Vocabulary</EssayInfoTitle>
      <EssayInfoBody>
        {vocabList.map((word, i) => (
          <ul key={i}>
            <li>
              <span>{word.word}: </span>
              <span>{word.definition}</span>
            </li>
          </ul>
        ))}
      </EssayInfoBody>
    </>
  )
}
