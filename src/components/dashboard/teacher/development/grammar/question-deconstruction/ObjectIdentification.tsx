import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useToggle } from '../../../../../../hooks'
import { useSelectedText } from '../../../../../../hooks/useSelectedText'
import { irregularPastTenseVerbList } from '../../../../../../utils'
import { objectGrader } from '../objects/ObjectGrader'
import {
  QuestionDeconstructProps,
  QuestionProps,
} from './QuestionDeconstruction'
import { LineToManipulate } from './VerbIdentification'

export type ObjectIdentificationProps = {
  setState: Dispatch<SetStateAction<QuestionDeconstructProps>>
  questionToModify: string[]
  question: QuestionProps
  object: string | null
  setObject: Dispatch<SetStateAction<string | null>>
}

export const ObjectIdentification = ({
  setState,
  question,
  questionToModify,
  object,
  setObject,
}: ObjectIdentificationProps) => {
  const [select, text, reset] = useSelectedText()
  const [step, setStep] = useState<'stepOne' | 'stepTwo'>('stepOne')
  const [transitiveQuestionMessage, setTransitiveQuestionMessage] =
    useState<string | null>(null)
  const { correctObject, message, correctMessage, howToFix } = objectGrader({
    completePredicate: question.completePredicate,
    completeSubject: question.completeSubject,
    correctObject: question.object!,
    givenObject: text,
    simplePredicate: question.simplePredicate,
  })

  const transitiveVerb = question.object

  const conjugatedVerb =
    irregularPastTenseVerbList(question.simplePredicate) ===
    question.simplePredicate
      ? question.simplePredicate + 'ed'
      : irregularPastTenseVerbList(question.simplePredicate)

  const indexOfVerb = questionToModify
    .join(' ')
    .split(' ')
    .findIndex((word) => word === conjugatedVerb)

  const sentenceAfterVerb = questionToModify
    .join(' ')
    .split(' ')
    .slice(indexOfVerb + 1)

  useEffect(() => {
    if (correctObject && text !== '') {
      setTimeout(() => {
        setState('ending-phrase')
      }, 3000)
    }
  }, [correctObject])

  console.log(!correctObject && text !== '')

  return (
    <div>
      {step === 'stepOne' && (
        <div>
          <div>
            The next step is to figure out the object of the verb. Some verbs
            transitive and have an object, and some verbs are intransitive and
            have no object. To find out if the verb {question.simplePredicate}{' '}
            has an object read your sentence
          </div>
          <br />
          <div>{questionToModify.join(' ')}</div>
          <div>
            and ask yourself: Did {question.completeSubject}{' '}
            {question.simplePredicate} something? If there is a clear answer to
            this quesiton, the answer is yes. If there isn't a clear answer, the
            answer is no.
          </div>
          <button
            onClick={() => {
              if (transitiveVerb) {
                setTransitiveQuestionMessage(
                  'Correct, this verb has an object and we are going to find it!'
                )
                setTimeout(() => {
                  setStep('stepTwo')
                }, 2000)
              } else {
                setTransitiveQuestionMessage(`Nope, the verb doesn't have an object therefore it is intransitive because{' '}
							${sentenceAfterVerb[0]} isn't a noun or adjective.`)
                setTimeout(() => {
                  setTransitiveQuestionMessage(null)
                  setStep('stepTwo')
                }, 3000)
              }
            }}
          >
            Yes there IS an object
          </button>
          <button
            onClick={() => {
              if (transitiveVerb) {
                setTransitiveQuestionMessage(
                  'Incorrect, the verb has an object. Now we are going to find it!'
                )
                setTimeout(() => {
                  setStep('stepTwo')
                }, 3000)
              } else {
                setTransitiveQuestionMessage(
                  'You are correct! This verb is intransitive and has no object.'
                )
                setState('ending-phrase')
              }
            }}
          >
            No there is NOT an object
          </button>
          <br />
          {transitiveQuestionMessage && <div>{transitiveQuestionMessage}</div>}
        </div>
      )}

      {step === 'stepTwo' && (
        <div>
          <div>Now we must find the object.</div>
          <div>
            Things to remember: the object comes directly after the verb and is
            a noun or an adjective that describes the noun and the noun
            together.
          </div>
          <br />
          <LineToManipulate onMouseUp={select}>
            {questionToModify.map((word, i: number) => (
              <span key={i}>
                <span>{word}</span>
                {word !== questionToModify[questionToModify.length - 1] && (
                  <span> </span>
                )}
              </span>
            ))}
          </LineToManipulate>
          {text !== '' && (
            <div>
              {!correctObject ? (
                <>
                  <div>What went wrong? {message}</div>
                  <div>How do I fix it? {howToFix}</div>
                </>
              ) : (
                <div>{correctMessage}</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
