import React, { useState } from 'react'
import { splitSentenceByWord } from '../../../../../../utils'
import { EndingPhrase } from './EndingPhrase'
import { HelpingVerbIdentification } from './HelpingVerbIdentification'
import { ObjectIdentification } from './ObjectIdentification'
import { QuestionWordRemoval } from './QuestionWordRemoval'
import { SubjectIdentification } from './SubjectIdentification'
import { SubjectPredicateSplit } from './SubjectPredicateSplit'
import { VerbIdentification } from './VerbIdentification'

export type QuestionDeconstructionProps = {}

export type QuestionProps = {
  original: string
  modifiedQuestion: string
  questionWord: string
  helpingVerb: string
  completeSubject: string
  simpleSubject: string
  nounType: 'PERSON' | 'PLACE' | 'THING' | 'IDEA'
  verbType: 'ACTION' | 'BEING' | 'FEELING'
  compoundNoun: boolean
  completePredicate: string
  simplePredicate: string
  object: null | string
}

export type QuestionDeconstructProps =
  | 'question-word-removal'
  | 'subject-predicate-split'
  | 'helping-verb-id'
  | 'subject-identification'
  | 'verb-identification'
  | 'object-identification'
  | 'ending-phrase'
  | 'complete'

export const QuestionDeconstruction = ({}: QuestionDeconstructionProps) => {
  const whyWasQuestion: QuestionProps = {
    original: `Why was John Brown executed for treason?`,
    modifiedQuestion: `Why was John Brown executed for treason?`,
    questionWord: 'why',
    helpingVerb: 'was',
    completeSubject: 'John Brown',
    simpleSubject: 'John Brown',
    nounType: 'PERSON',
    verbType: 'ACTION',
    compoundNoun: true,
    completePredicate: ' was executed for treason?',
    simplePredicate: 'was executed',
    object: null,
  }

  const howDidQuestion: QuestionProps = {
    original: `How did John Brown affect the nation?`,
    modifiedQuestion: `How did John Brown affect the nation?`,
    questionWord: 'how',
    helpingVerb: 'did',
    completeSubject: 'John Brown',
    simpleSubject: 'John Brown',
    nounType: 'PERSON',
    verbType: 'ACTION',
    compoundNoun: true,
    completePredicate: 'affect the nation',
    simplePredicate: 'affect',
    object: 'the nation',
  }

  const howDidPrepositionQuestion: QuestionProps = {
    original: 'How did John Brown kill five men in Kansas?',
    modifiedQuestion: 'How did John Brown kill five men in Kansas?',
    questionWord: 'how',
    helpingVerb: 'did',
    completeSubject: 'John Brown',
    simpleSubject: 'John Brown',
    nounType: 'PERSON',
    verbType: 'ACTION',
    compoundNoun: false,
    completePredicate: 'kill five men in Kansas?',
    simplePredicate: 'kill',
    object: 'five men',
  }

  // const question = howDidQuestion
  // const question = howDidPrepositionQuestion
  const question = whyWasQuestion
  const [questionToModify, setQuestionToModify] = useState(
    splitSentenceByWord(question.original)
  )
  const [subject, setSubject] = useState<string | null>(null)
  const [verb, setVerb] = useState<string | null>(null)
  const [object, setObject] = useState<string | null>(null)

  const [state, setState] = useState<QuestionDeconstructProps>(
    'question-word-removal'
  )

  return (
    <div>
      <div>Deconstruct the Question</div>

      {state === 'question-word-removal' && (
        <QuestionWordRemoval
          question={question}
          questionToModify={questionToModify}
          setQuestionToModify={setQuestionToModify}
          setState={setState}
        />
      )}
      {state === 'subject-predicate-split' && (
        <SubjectPredicateSplit
          questionToModify={questionToModify}
          setQuestionToModify={setQuestionToModify}
          setState={setState}
          question={question}
        />
      )}
      {state === 'helping-verb-id' && (
        <HelpingVerbIdentification
          questionToModify={questionToModify}
          setQuestionToModify={setQuestionToModify}
          setState={setState}
          question={question}
        />
      )}
      {state === 'subject-identification' && (
        <SubjectIdentification
          setState={setState}
          questionToModify={questionToModify}
          question={question}
          subject={subject}
          setSubject={setSubject}
        />
      )}
      {state === 'verb-identification' && (
        <VerbIdentification
          setState={setState}
          questionToModify={questionToModify}
          setQuestionToModify={setQuestionToModify}
          question={question}
          verb={verb}
          setVerb={setVerb}
        />
      )}
      {state === 'object-identification' && (
        <ObjectIdentification
          setState={setState}
          questionToModify={questionToModify}
          question={question}
          object={object}
          setObject={setVerb}
        />
      )}
      {state === 'ending-phrase' && (
        <EndingPhrase
          setState={setState}
          questionToModify={questionToModify}
          question={question}
        />
      )}
    </div>
  )
}
