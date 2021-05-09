import React, { useEffect, useState } from 'react'
import { useSelectedText } from '../../../../../hooks/useSelectedText'

export type SimpleSubjectPredicateProps = { sentence: string }

export const SimpleSubjectPredicate = ({
  sentence,
}: SimpleSubjectPredicateProps) => {
  const [select, text, reset] = useSelectedText()
  const [state, setState] = useState<'subject' | 'predicate' | 'final'>(
    'subject'
  )

  const [simpleSubject, setSimpleSubject] = useState('')
  const [simplePredicate, setSimplePredicate] = useState('')

  const newSentence = sentence.split(' ')

  const correctSubject = 'player'
  const correctPredicate = 'respects'
  const correct =
    simpleSubject === correctSubject.trim() &&
    simplePredicate.trim() === correctPredicate

  useEffect(() => {
    if (correct) {
      setState('final')
    }
  }, [correct])
  return (
    <div>
      {state === 'subject' && (
        <>
          <span>Find the simple subject of the sentence: {text} </span>
          {text && (
            <span>
              <button
                onClick={() => {
                  setSimpleSubject(text)
                  reset()
                  setState('predicate')
                }}
              >
                Set
              </button>
            </span>
          )}
          <div>(Double click the word to highlight)</div>
          <div></div>
        </>
      )}
      {state === 'predicate' && (
        <>
          <span>Find the simple predicate of the sentence: {text} </span>

          <button
            onClick={() => {
              setSimplePredicate(text)
              reset()

              // else {
              //   setSimplePredicate('')
              //   setSimpleSubject('')
              //   setState('subject')
              // }
            }}
          >
            Set
          </button>

          <div>(Double click the word to highlight)</div>
          <div></div>
        </>
      )}
      <br />
      <div onMouseUp={select}>
        {newSentence.map((word, i: number) => (
          <span
            key={i}
            style={
              word === simpleSubject
                ? { textDecoration: 'underline' }
                : word === simplePredicate
                ? {
                    textDecoration: 'underline',
                    textDecorationStyle: 'double',
                  }
                : {}
            }
          >
            {word}{' '}
          </span>
        ))}
      </div>
      {state === 'final' && <div>Correct</div>}
    </div>
  )
}
