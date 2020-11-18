import React, { FC, useEffect } from 'react'
import { UpdateAcademicOrganizerType } from './AcademicOrganizer'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'
import {
  AcademicPartsOfQuestionContainer,
  PartsOfQuestionTitle,
  AcademicPartContainer,
  PartInput,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
} from '../../../assigned-essays/state-and-styles/assignedEssayStyles'

export type AcademicRestatementProps = {
  updateAcademicOrganizer: UpdateAcademicOrganizerType
}

export const AcademicRestatement: FC<AcademicRestatementProps> = ({
  updateAcademicOrganizer,
}) => {
  const [state, event] = useCompletedEssayContextProvider()

  useEffect(() => {
    updateAcademicOrganizer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.context.academicOrganizer.restatement,
    state.context.academicOrganizer.academicSentenceStructure,
  ])

  return (
    <>
      <AcademicPartsOfQuestionContainer>
        <PartsOfQuestionTitle>
          Set the Parts of the Question
        </PartsOfQuestionTitle>
        <AcademicPartContainer>
          <div>What is the Subject of the question: </div>
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
          <div>What is the Verb of the question: </div>
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
          <div>What is the Object of the question: </div>

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
        <OrganizerControlButton onClick={() => event({ type: 'ANSWER' })}>
          Next
        </OrganizerControlButton>
      </OrganizerControlButtonContainer>
    </>
  )
}
