import React, { FC } from 'react'
import { useMutation, MutationFunctionOptions } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateDevelopingOrganizer,
  updateDevelopingOrganizerVariables,
  findCompletedEssayById_findEssayById_essay,
} from '../../../../../../../../schemaTypes'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'
import { UPDATE_DEVELOPING_ORGANIZER_MUTATION } from '../../../assigned-essays/organizers/developing/DevelopingOrganizer'
import { DevelopingAnswer } from './DevelopingAnswer'
import { DevelopingRestatement } from './DevelopingRestatement'
import { DevelopingConclusion } from './DevelopingConclusion'
import {
  RestatementTitle,
  RestatementInput,
  RestatementOutput,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
  OrganizerTitleContainer,
  OrganizerTitleStyle,
  QuestionContainer,
  QuestionStyle,
} from '../../../assigned-essays/state-and-styles/assignedEssayStyles'

type DevelopingOrganizerProps = {
  essay: findCompletedEssayById_findEssayById_essay
}

export type UpdateDevelopingOrganizerType = (
  options?:
    | MutationFunctionOptions<
        updateDevelopingOrganizer,
        updateDevelopingOrganizerVariables
      >
    | undefined
) => void

export const DevelopingOrganizer: FC<DevelopingOrganizerProps> = ({
  essay,
}) => {
  const [state, event] = useCompletedEssayContextProvider()

  const [updateDevelopingOrganizer] = useMutation<
    updateDevelopingOrganizer,
    updateDevelopingOrganizerVariables
  >(UPDATE_DEVELOPING_ORGANIZER_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        answer: state.context.developingOrganizer.answer,
        basicQuestionType: state.context.developingOrganizer.questionType,
        conclusion: state.context.developingOrganizer.conclusion,
        developingSentenceStructure:
          state.context.developingOrganizer.developingSentenceStructure,
        restatement: state.context.developingOrganizer.restatement,
      },
    },
    // onCompleted: (data) => console.log('updateOrganizer'),
    onError: (error) => console.error(error),
    // refetchQueries: ['findCompletedEssayById'],
  })

  return (
    <>
      <OrganizerTitleContainer>
        <OrganizerTitleStyle>Organize for this Question</OrganizerTitleStyle>
      </OrganizerTitleContainer>
      <QuestionContainer>
        <QuestionStyle>{essay.topic.question}</QuestionStyle>
      </QuestionContainer>
      <>
        {state.matches(
          'reviewOrganizer.organizers.developingOrganizer.identifications'
        ) && (
          <DevelopingRestatement
            updateDevelopingOrganizer={updateDevelopingOrganizer}
          />
        )}
        {state.matches(
          'reviewOrganizer.organizers.developingOrganizer.restatement'
        ) && (
          <>
            <RestatementTitle>
              <div>
                Restate the question in the form of a statement with the correct
                ending:
              </div>
            </RestatementTitle>
            <RestatementInput
              autoFocus={true}
              value={state.context.developingOrganizer.restatement}
              onChange={(e: any) =>
                event({ type: 'SET_RESTATEMENT', payload: e.target.value })
              }
            />
            <RestatementOutput>
              <div> {state.context.developingOrganizer.restatement}</div>
            </RestatementOutput>
            <OrganizerControlButtonContainer>
              <OrganizerControlButton
                onClick={() => event({ type: 'IDENTIFICATIONS' })}
              >
                Back
              </OrganizerControlButton>
              <OrganizerControlButton onClick={() => event({ type: 'ANSWER' })}>
                Next
              </OrganizerControlButton>
            </OrganizerControlButtonContainer>
          </>
        )}
        {state.matches(
          'reviewOrganizer.organizers.developingOrganizer.answer'
        ) && (
          <DevelopingAnswer
            updateDevelopingOrganizer={updateDevelopingOrganizer}
          />
        )}
        {state.matches(
          'reviewOrganizer.organizers.developingOrganizer.conclusion'
        ) && (
          <DevelopingConclusion
            updateDevelopingOrganizer={updateDevelopingOrganizer}
          />
        )}
      </>
    </>
  )
}
