import React, { useState } from 'react'
import { useSelectedText } from '../../../../../hooks/useSelectedText'

export type SimpleSubjectPredicateProps = { sentence: string }

export const SimpleSubjectPredicate = ({
  sentence,
}: SimpleSubjectPredicateProps) => {
  const [select, text, reset] = useSelectedText()
  const [simpleSubject, setSimpleSubject] = useState('')
  const [simplePredicate, setSimplePredicate] = useState('')

  console.log(sentence.split(' '))

  return (
    <div>
      <div onMouseUp={select}>{sentence}</div>
    </div>
  )
}
