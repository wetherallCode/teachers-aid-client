import React, { useState } from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'

export type AdjectivesAndPrepositonalPhrasesProps = {}

export const AdjectivesAndPrepositonalPhrases =
  ({}: AdjectivesAndPrepositonalPhrasesProps) => {
    const [select, text, reset] = useSelectedText()
    const [state, setState] = useState<
      | 'subject-adjectives'
      | 'subject-prepositions'
      | 'predicate-adjectives'
      | 'predicate-prepositions'
    >('subject-adjectives')
    const testSentence =
      'A good player with high reputation | respects their team.'
    const testCompleteSubject = testSentence.split('|')[0]
    const testCompletePredicate = testSentence.split('|')[1]

    const adjectiveList: string[] = ['good']
    const prepostionalPhrasesList: string[] = ['with high reputation']

    return (
      <div>
        <div>
          Find the adjectives and prepositional phrases that modify the simple
          subject
        </div>
        <div onMouseUp={select}>
          <span>{testCompleteSubject}</span>
          <span> | </span>
          <span>{testCompletePredicate}</span>
        </div>
        <div>{text}</div>
      </div>
    )
  }
