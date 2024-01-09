import React, { useState } from 'react'
import {
  findEssayById_findEssayById_essay_topic,
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
} from '../../../../../../../../schemaTypes'
import { splitSentenceByWord } from '../../../../../../../../utils'
import { QuestionDeconstructProps } from '../../../../../../teacher/development/grammar/question-deconstruction/QuestionDeconstruction'
import {
  OrganizerTitleContainer,
  OrganizerTitleStyle,
} from '../../state-and-styles/assignedEssayStyles'
import { EndingPhrase } from './EndingPhrase'
import { HelpingVerbIdentification } from './HelpingVerbIdentification'
import { ObjectIdentification } from './ObjectIdentification'
import { QuestionWordRemoval } from './QuestionWordRemoval'
import { SubjectComplimentIdentifier } from './SubjectComplimentIdentifier'
import { SubjectIdentification } from './SubjectIdentification'
import { SubjectPredicateSplit } from './SubjectPredicateSplit'
import { VerbIdentification } from './VerbIdentification'

export type DevelopingQuestionReconstructionProps = {
  questionParts: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  topic: findEssayById_findEssayById_essay_topic
}

export type QuestionDecontstructionStateProps =
  | 'question-word-removal'
  | 'subject-predicate-split'
  | 'helping-verb-id'
  | 'subject-identification'
  | 'verb-identification'
  | 'subject-complement-identification'
  | 'object-identification'
  | 'ending-phrase'
  | 'complete'

export const QuestionDeconstruction = ({
  questionParts,
  topic,
}: DevelopingQuestionReconstructionProps) => {
  const [state, setState] = useState<QuestionDecontstructionStateProps>(
    'question-word-removal',
  )
  const [questionToModify, setQuestionToModify] = useState(
    splitSentenceByWord(questionParts.originalQuestion),
  )

  const [subject, setSubject] = useState<string | null>(null)
  const [verb, setVerb] = useState<string | null>(null)
  const [object, setObject] = useState<string | null>(null)
  const writingLevel = topic.writingLevel

  const auxilaryVerbCheck =
    questionParts.helpingVerb !== 'did' &&
    questionParts.simplePredicate.split(' ').length > 1 &&
    questionParts.simplePredicate.split(' ').includes(questionParts.helpingVerb)

  return (
    <>
      <OrganizerTitleContainer>
        <OrganizerTitleStyle>Restate the Question</OrganizerTitleStyle>
      </OrganizerTitleContainer>
      {state === 'question-word-removal' && (
        <QuestionWordRemoval
          question={questionParts}
          questionToModify={questionToModify}
          setQuestionToModify={setQuestionToModify}
          setState={setState}
        />
      )}
      {state === 'helping-verb-id' && (
        <HelpingVerbIdentification
          questionToModify={questionToModify}
          setQuestionToModify={setQuestionToModify}
          setState={setState}
          question={questionParts}
          auxilaryVerbCheck={auxilaryVerbCheck}
        />
      )}
      {state === 'subject-predicate-split' && (
        <SubjectPredicateSplit
          questionToModify={questionToModify}
          setQuestionToModify={setQuestionToModify}
          setState={setState}
          question={questionParts}
          auxilaryVerbCheck={auxilaryVerbCheck}
        />
      )}
      {state === 'subject-identification' && (
        <SubjectIdentification
          setState={setState}
          questionToModify={questionToModify}
          question={questionParts}
          subject={subject}
          setSubject={setSubject}
          writingLevel={writingLevel}
        />
      )}
      {state === 'verb-identification' && (
        <VerbIdentification
          setState={setState}
          questionToModify={questionToModify}
          setQuestionToModify={setQuestionToModify}
          question={questionParts}
          verb={verb}
          setVerb={setVerb}
          writingLevel={writingLevel}
        />
      )}
      {state === 'subject-complement-identification' && (
        <SubjectComplimentIdentifier
          setState={setState}
          questionToModify={questionToModify}
          question={questionParts}
          object={object}
          setObject={setVerb}
          writingLevel={writingLevel}
        />
      )}
      {state === 'object-identification' && (
        <ObjectIdentification
          setState={setState}
          questionToModify={questionToModify}
          question={questionParts}
          object={object}
          setObject={setVerb}
          writingLevel={writingLevel}
        />
      )}
      {state === 'ending-phrase' && (
        <EndingPhrase
          setState={setState}
          questionToModify={questionToModify}
          question={questionParts}
          writingLevel={writingLevel}
        />
      )}
    </>
  )
}
