import React, { FC, useEffect } from 'react'
import {
  AnswerInput,
  AnswerOutput,
  OrganizerControlButton,
  OrganizerControlButtonContainer,
  RestatementTitle,
} from '../../../assigned-essays/state-and-styles/assignedEssayStyles'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'
import { UpdateDevelopingOrganizerType } from './DevelopingOrganizer'

export type DevelopingAnswerProps = {
  updateDevelopingOrganizer: UpdateDevelopingOrganizerType
}

export const DevelopingAnswer: FC<DevelopingAnswerProps> = ({
  updateDevelopingOrganizer,
}) => {
  const [state, event] = useCompletedEssayContextProvider()

  useEffect(() => {
    updateDevelopingOrganizer()
    // console.log('update')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.developingOrganizer.answer])

  return (
    <>
      <>
        <RestatementTitle>
          Answer the Question to the best of your ability.
        </RestatementTitle>
        <AnswerInput
          autoFocus={true}
          value={state.context.developingOrganizer.answer}
          onChange={(e: any) =>
            event({ type: 'SET_ANSWER', payload: e.target.value })
          }
        />
        <AnswerOutput>
          <div> {state.context.developingOrganizer.answer}</div>
        </AnswerOutput>
        <OrganizerControlButtonContainer>
          <OrganizerControlButton
            onClick={() => event({ type: 'RESTATEMENT' })}
          >
            Back
          </OrganizerControlButton>
          <OrganizerControlButton onClick={() => event({ type: 'CONCLUSION' })}>
            Next
          </OrganizerControlButton>
        </OrganizerControlButtonContainer>
      </>
    </>
  )
}
