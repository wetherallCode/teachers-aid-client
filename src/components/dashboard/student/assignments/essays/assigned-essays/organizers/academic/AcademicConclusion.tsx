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
} from '../../state-and-styles/assignedEssayStyles'

export type AcademicConclusionProps = {
  updateAcademicOrganizer: UpdateAcademicOrganizerType
}

export const AcademicConclusion: FC<AcademicConclusionProps> = ({
  updateAcademicOrganizer,
}) => {
  const [state, event] = useStudentEssayContextProvider()

  useEffect(() => {
    updateAcademicOrganizer()
  }, [state.context.academicOrganizer.conclusion, updateAcademicOrganizer])

  return (
    <>
      <RestatementTitle>Write your conclusion</RestatementTitle>
      <AcademicConclusionInput
        type='text'
        value={state.context.academicOrganizer.conclusion}
        onChange={(e: any) => {
          event({ type: 'SET_CONCLUSION', payload: e.target.value })
        }}
      />
      <AcademicConclusionOutput>
        <div> {state.context.academicOrganizer.conclusion}</div>
      </AcademicConclusionOutput>
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
