import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { endingPhraseGrader } from './EndingPhraseGrader'
import {
  QuestionDeconstructProps,
  QuestionProps,
} from './QuestionDeconstruction'

export type EndingPhraseProps = {
  setState: Dispatch<SetStateAction<QuestionDeconstructProps>>
  questionToModify: string[]
  question: QuestionProps
}

export const EndingPhrase = ({
  setState,
  question,
  questionToModify,
}: EndingPhraseProps) => {
  const [answer, setAnswer] = useState<'how' | 'why' | ''>('')
  const { correct, ending, message, waitTime } = endingPhraseGrader({
    correctQuestionWord: question.questionWord,
    givenQuestionWord: answer,
  })
  useEffect(() => {
    if (!answer) {
      if (correct) {
        setTimeout(() => {
          setState('complete')
        }, waitTime * 1000)
      } else {
        setTimeout(() => {
          setAnswer('')
        }, waitTime * 1000)
      }
    }
  }, [answer])
  return (
    <div>
      <div>Now we'll figure out how to end the sentence.</div>
      <div>There are different endings for different kinds of questions.</div>
      <div>For the question: {question.original}</div>
      {/* <span>
        Does the question ask How {question.helpingVerb}{' '}
        {question.completeSubject} {question.simplePredicate}{' '}
        <button onClick={() => setAnswer('how')}>Click</button>
      </span>
      <br />
      <div>Or</div>
      <span>
        Does the question ask Why {question.helpingVerb}{' '}
        {question.completeSubject} {question.simplePredicate}{' '}
        <button onClick={() => setAnswer('why')}>Click</button>
      </span> */}
      <div>Click on the appropriate ending.</div>
      <div onClick={() => setAnswer('how')}>...in a certain way.</div>
      <div onClick={() => setAnswer('why')}> ...for a certain reason.</div>
      <br />
      {answer && (
        <div>
          {correct ? (
            <>
              <div>{message}</div>
              <div>
                Here's the final sentence:{' '}
                {questionToModify
                  .join(' ')
                  .replace('|', '')
                  .replace('?', ' ' + ending)}
              </div>
            </>
          ) : (
            <>
              <div>{message}</div>
            </>
          )}
        </div>
      )}
      {/* <LineToManipulate>
        {questionToModify.map((part, i: number) => (
          <span key={i}>
            <span>{part}</span>
            {part !== questionToModify[questionToModify.length - 1] && (
              <span> </span>
            )}
          </span>
        ))}
      </LineToManipulate> */}
    </div>
  )
}
