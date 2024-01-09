import React, { FC, useEffect } from 'react'
import { UpdateAcademicOrganizerType } from './AcademicOrganizer'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'
import {
  RestatementTitle,
  AcademicConclusionInput,
  AcademicConclusionOutput,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
} from '../../../assigned-essays/state-and-styles/assignedEssayStyles'

export type AcademicConclusionProps = {
  updateAcademicOrganizer: UpdateAcademicOrganizerType
}

export const AcademicConclusion: FC<AcademicConclusionProps> = ({
  updateAcademicOrganizer,
}) => {
  const [state, event] = useCompletedEssayContextProvider()

  useEffect(() => {
    updateAcademicOrganizer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.academicOrganizer.conclusion])

  return (
    <>
      <RestatementTitle>Write your conclusion</RestatementTitle>
      <AcademicConclusionInput
        type="text"
        value={state.context.academicOrganizer.conclusion}
        onChange={(e: any) => {
          event({ type: 'SET_CONCLUSION', payload: e.target.value })
        }}
      />
      <AcademicConclusionOutput>
        <div> {state.context.academicOrganizer.conclusion}</div>
      </AcademicConclusionOutput>
      <OrganizerControlButtonContainer>
        <OrganizerControlButton onClick={() => event({ type: 'ANSWER' })}>
          Back
        </OrganizerControlButton>
        <OrganizerControlButton onClick={() => event({ type: 'ESSAY' })}>
          Next
        </OrganizerControlButton>
      </OrganizerControlButtonContainer>
    </>
  )
}
