import React, { FC, useEffect } from 'react'
import { UpdateDevelopingOrganizerType } from './DevelopingOrganizer'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'
import {
  RestatementTitle,
  RestatementInput,
  RestatementOutput,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
} from '../../../assigned-essays/state-and-styles/assignedEssayStyles'

export type DevelopingConclusionProps = {
  updateDevelopingOrganizer: UpdateDevelopingOrganizerType
}

export const DevelopingConclusion: FC<DevelopingConclusionProps> = ({
  updateDevelopingOrganizer,
}) => {
  const [state, event] = useCompletedEssayContextProvider()
  const sentenceStructure = {
    subject:
      state.context.developingOrganizer.developingSentenceStructure.subject,
    verb: state.context.developingOrganizer.developingSentenceStructure.verb,
  }

  useEffect(() => {
    updateDevelopingOrganizer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.developingOrganizer.conclusion])
  return (
    <>
      <RestatementTitle>
        Write your conclusion (pay attention to the hints!)
      </RestatementTitle>
      <RestatementInput
        autoFocus={true}
        value={state.context.developingOrganizer.conclusion}
        onChange={(e: any) =>
          event({ type: 'SET_CONCLUSION', payload: e.target.value })
        }
      />
      <RestatementOutput>
        <div> {state.context.developingOrganizer.conclusion}</div>
      </RestatementOutput>
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
