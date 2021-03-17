import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { UpdateAcademicOrganizerType } from './AcademicOrganizer'
import {
  AcademicPartsOfQuestionContainer,
  PartsOfQuestionTitle,
  AcademicPartContainer,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
  PartInput,
  AcademicRestatementContainer,
  RestatementOutput,
  AcademicRestatementTitle,
  AcademicRestatementInput,
} from '../../state-and-styles/assignedEssayStyles'

export type AcademicRestatementProps = {
  updateAcademicOrganizer: UpdateAcademicOrganizerType
}

export const AcademicRestatement: FC<AcademicRestatementProps> = ({
  updateAcademicOrganizer,
}) => {
  const [state, event] = useStudentEssayContextProvider()

  useEffect(() => {
    updateAcademicOrganizer()
  }, [
    state.context.academicOrganizer.restatement,
    state.context.academicOrganizer.academicSentenceStructure,
    updateAcademicOrganizer,
  ])
  const {
    verb,
    subject,
  } = state.context.academicOrganizer.academicSentenceStructure
  const linkingVerbCheck =
    verb.toLowerCase() === 'was' || verb.toLowerCase() === 'were'
  return (
    <>
      <AcademicPartsOfQuestionContainer>
        <PartsOfQuestionTitle>
          Set the Parts of the Question
        </PartsOfQuestionTitle>
        <AcademicPartContainer>
          <div>What is the Subject of the question? </div>
          <PartInput
            value={
              state.context.academicOrganizer.academicSentenceStructure.subject
            }
            onChange={(e: any) =>
              event({
                type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_SUBJECT',
                payload: e.target.value,
              })
            }
          />
        </AcademicPartContainer>

        <AcademicPartContainer>
          <div>
            What is the Verb of the question (If the word 'was' or 'were' are in
            the question, that is the verb)?
          </div>
          <PartInput
            value={
              state.context.academicOrganizer.academicSentenceStructure.verb
            }
            onChange={(e: any) =>
              event({
                type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_VERB',
                payload: e.target.value,
              })
            }
          />
        </AcademicPartContainer>

        <AcademicPartContainer>
          {!linkingVerbCheck ? (
            <div>What is the Object of the question? </div>
          ) : (
            <div>What is the word or phrase describing {subject}?</div>
          )}

          <PartInput
            value={
              state.context.academicOrganizer.academicSentenceStructure.object!
            }
            onChange={(e: any) =>
              event({
                type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_OBJECT',
                payload: e.target.value,
              })
            }
          />
        </AcademicPartContainer>
      </AcademicPartsOfQuestionContainer>
      {/* <AcademicRestatementContainer>
        <AcademicRestatementTitle>
          <div>Restatement</div>
        </AcademicRestatementTitle>
        <AcademicRestatementInput
          type='text'
          value={state.context.academicOrganizer.restatement}
          onChange={(e: any) =>
            event({
              type: 'SET_RESTATEMENT',
              payload: e.target.value,
            })
          }
        />
        <RestatementOutput>
          <div> {state.context.academicOrganizer.restatement}</div>
        </RestatementOutput>
      </AcademicRestatementContainer> */}
      <OrganizerControlButtonContainer>
        <OrganizerControlButton onClick={() => event({ type: 'NEXT' })}>
          Next
        </OrganizerControlButton>
      </OrganizerControlButtonContainer>
    </>
  )
}
