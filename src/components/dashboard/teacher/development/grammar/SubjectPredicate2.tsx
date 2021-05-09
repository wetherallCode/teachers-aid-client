import React, { useEffect, useState } from 'react'
import { subjectPredicateGrader } from './subPredGrading'

export type SubjectPredicate2Props = {
  sentence: string
}

export const SubjectPredicate2 = ({ sentence }: SubjectPredicate2Props) => {
  const [point, setPoint] = useState<number | null>(null)

  const separator = ' | '
  const newSentence = [
    sentence.slice(0, point!).trim(),
    separator,
    sentence.slice(point!, sentence.length).trim(),
  ]
  const correctSubject = 'A good player'
  const correctPredicate = 'respects their team.'

  const correct =
    newSentence[0] === correctSubject && newSentence[2] === correctPredicate

  useEffect(() => {
    if (point) {
      console.log(
        subjectPredicateGrader({
          correctSubject,
          correctPredicate,
          givenSubject: newSentence[0],
          givenPredicate: newSentence[2],
          noun: 'player',
          verb: 'respects',
          prepositionalPhrases: [],
        })
      )
    }
  }, [point])

  return (
    <div>
      {point ? (
        <div>
          <div>
            {newSentence.map((part, i) => (
              <span
                key={i}
                style={
                  i === 0
                    ? { cursor: 'pointer', textDecoration: 'underline' }
                    : i === 2
                    ? {
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        textDecorationStyle: 'double',
                      }
                    : { cursor: 'pointer' }
                }
                onClick={() => {
                  if (part === separator) {
                    setPoint(null)
                  }
                }}
              >
                {part}
              </span>
            ))}
          </div>
          {/* <button onClick={() => setPoint(null)}>reset</button> */}
        </div>
      ) : (
        <div>
          {sentence.split('').map((letter, i) => (
            <span
              key={i}
              style={{ cursor: 'pointer' }}
              onClick={() => setPoint(i)}
            >
              {letter}
            </span>
          ))}
        </div>
      )}
      <div>{correct && <div>Correct</div>}</div>
    </div>
  )
}
