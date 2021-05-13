import React from 'react'
import { useSelectedText } from '../../../../../hooks/useSelectedText'

export type AdjectivesAndPrepositonalPhrasesProps = {}

export const AdjectivesAndPrepositonalPhrases = ({}: AdjectivesAndPrepositonalPhrasesProps) => {
  const [select, text, reset] = useSelectedText()
  const testCompleteSubject = 'A good player with high reputation '
  const adjectiveList: string[] = ['good']
  const prepostionalPhrasesList: string[] = ['with high reputation']
  return (
    <>
      <div>
        Find the adjectives and prepositional phrases that modify the simple
        subject
      </div>
    </>
  )
}
