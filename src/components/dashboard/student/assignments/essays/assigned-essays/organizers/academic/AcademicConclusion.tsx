import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { UpdateAcademicOrganizerType } from './AcademicOrganizer'
import {
  RestatementTitle,
  RestatementInput,
  RestatementOutput,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
  AcademicConclusionInput,
  AcademicConclusionOutput,
  OrganizerTitleStyle,
  OrganizerTitleContainer,
  RestatementDirectionsContainer,
  AnswerInput,
} from '../../state-and-styles/assignedEssayStyles'
import { UnderlinedText } from '../../../../../../../../appStyles'
import { verbsThatChangeInIngFormat } from '../../../../../../../../utils'
import {
  findEssayById_findEssayById_essay_topic,
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
} from '../../../../../../../../schemaTypes'

export type AcademicConclusionProps = {
  updateAcademicOrganizer: UpdateAcademicOrganizerType
  questionParts: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  auxilaryVerbCheck: boolean
  topic: findEssayById_findEssayById_essay_topic
}

export const AcademicConclusion = ({
  updateAcademicOrganizer,
  questionParts,
  auxilaryVerbCheck,
  topic,
}: AcademicConclusionProps) => {
  const [state, event] = useStudentEssayContextProvider()
  const { subject, object, subjectCompliment } =
    state.context.academicOrganizer.academicSentenceStructure
  const { simplePredicate, helpingVerb } = questionParts

  // const verbConverter = auxilaryVerbCheck
  //   ? verbsThatChangeInIngFormat(simplePredicate.split(' ')[0]) +
  //     ' ' +
  //     simplePredicate.split(' ')[1]
  //   : verbsThatChangeInIngFormat(simplePredicate).replace('ed', '')
  const verbConverter = auxilaryVerbCheck
    ? 'being ' + simplePredicate
    : verbsThatChangeInIngFormat(simplePredicate).replace('ed', '')

  useEffect(() => {
    updateAcademicOrganizer()
  }, [state.context.academicOrganizer.conclusion, updateAcademicOrganizer])

  const conclusionSetup = `As a result of ${subject}
  ${verbConverter} 
  ${
    object
      ? object
      : subjectCompliment !== null
      ? questionParts.subjectCompliment
      : ''
  }`

  return (
    <>
      <OrganizerTitleContainer>
        <OrganizerTitleStyle>Think of a Conclusion</OrganizerTitleStyle>
      </OrganizerTitleContainer>
      <RestatementDirectionsContainer>
        <UnderlinedText>Directions</UnderlinedText>
        <div>
          First start the conclusion this way: {conclusionSetup}, ..." Then put
          the consequence of this statement in place of the "...."
        </div>
      </RestatementDirectionsContainer>
      {/* <RestatementTitle>Write your conclusion</RestatementTitle> */}
      <AnswerInput
        // type='text'
        value={state.context.academicOrganizer.conclusion}
        onChange={(e: any) => {
          event({ type: 'SET_CONCLUSION', payload: e.target.value })
        }}
      />
      {/* <AcademicConclusionOutput>
        <div> {state.context.academicOrganizer.conclusion}</div>
      </AcademicConclusionOutput> */}
      <OrganizerControlButtonContainer>
        <OrganizerControlButton onClick={() => event({ type: 'PREVIOUS' })}>
          Back
        </OrganizerControlButton>
        <OrganizerControlButton onClick={() => event({ type: 'NEXT' })}>
          Next
        </OrganizerControlButton>
      </OrganizerControlButtonContainer>
    </>
  )
}
