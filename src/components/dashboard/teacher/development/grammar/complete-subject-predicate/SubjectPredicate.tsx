import React, { useEffect, useState } from 'react'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'

export type SubjectPredicateProps = {
  sentence: string
}

export const SubjectPredicate = ({ sentence }: SubjectPredicateProps) => {
  const [select, text, reset] = useSelectedText()
  const [state, setState] = useState<'subject' | 'predicate' | 'final'>(
    'subject'
  )
  const [subject, setSubject] = useState('')
  const [predicate, setPredicate] = useState('')
  const endOfSubject = subject.length + sentence.indexOf(subject)

  let subjectOfSentence = sentence.slice(
    sentence.indexOf(subject),
    subject.length + sentence.indexOf(subject)
  )

  let predicateOfSentence = sentence
    .slice(sentence.indexOf(predicate), sentence.length + 1)
    .trim()

  let newSentence =
    subject && !predicate
      ? [
          sentence.slice(0, sentence.indexOf(subject)),
          subjectOfSentence,
          ' ',
          sentence.slice(endOfSubject),
        ]
      : subject && predicate
      ? [
          sentence.slice(0, sentence.indexOf(subject)),
          subjectOfSentence,
          ' | ',
          predicateOfSentence,
        ]
      : [sentence]

  const correctSubject = 'A good player'
  const correctPredicate = 'respects their team.'
  const correct = subject === correctSubject && predicate === correctPredicate

  useEffect(() => {
    if (correct) {
      setState('final')
    }
    if (subject && predicate && !correct) {
      setSubject('')
      setPredicate('')
      setState('subject')
    }
  }, [correct])

  return (
    <div>
      <div onMouseUp={select}>
        {newSentence.map((part, i) => {
          return (
            <span
              style={
                part === subjectOfSentence
                  ? { textDecoration: 'underline' }
                  : part === predicateOfSentence && predicate !== ''
                  ? {
                      textDecoration: 'underline',
                      textDecorationStyle: 'double',
                    }
                  : {}
              }
              key={part}
            >
              {part}
            </span>
          )
        })}
      </div>
      {state === 'subject' && (
        <div>
          <div>Subject: {subject ? subject : text}</div>
          <button
            onClick={() => {
              setSubject(text)
              reset()
              setState('predicate')
            }}
          >
            Set
          </button>
        </div>
      )}
      {state === 'predicate' && (
        <div>
          <div>Predicate: {predicate ? predicate : text}</div>
          <button
            onClick={() => {
              setPredicate(text)
              reset()
              // if (correct) {
              //   setState('final')
              // } else {
              //   setSubject('')
              //   setPredicate('')
              //   setState('subject')
              // }
            }}
          >
            Set
          </button>
        </div>
      )}
      {state === 'final' && (
        <div>
          <span style={{ textDecoration: 'underline' }}>{subject}</span> |{' '}
          <span
            style={{
              textDecoration: 'underline',
              textDecorationStyle: 'double',
            }}
          >
            {predicate}
          </span>
        </div>
      )}
    </div>
  )
}
