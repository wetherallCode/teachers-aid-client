import React, { FC } from 'react'
import { gql, useMutation, MutationFunctionOptions } from '@apollo/client'
import {
  findEssayById_findEssayById_essay_topic,
  findEssayById_findEssayById_essay_workingDraft_organizer,
  updateAdvancedOrganizer,
  updateAdvancedOrganizerVariables,
} from '../../../../../../../../schemaTypes'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'

import { AdvancedAnswerTypes } from './AdvancedAnswerTypes'

import { AdvancedRestatement } from './AdvancedRestatement'
import { AdvancedConclusion } from './AdvancedConclusion'
import {
  OrganizerTitleContainer,
  OrganizerTitleStyle,
  QuestionContainer,
  QuestionStyle,
} from '../../state-and-styles/assignedEssayStyles'

export type AdvancedOrganizerProps = {
  topic: findEssayById_findEssayById_essay_topic
  organizer: findEssayById_findEssayById_essay_workingDraft_organizer
}

export const UPDATE_ADVANCED_ORGANIZER_MUTATION = gql`
  mutation updateAdvancedOrganizer($input: UpdateAdvancedOrganizerInput!) {
    updateAdvancedOrganizer(input: $input) {
      essay {
        _id
      }
    }
  }
`
export type UpdateAdvancedOrganizerType = (
  options?:
    | MutationFunctionOptions<
        updateAdvancedOrganizer,
        updateAdvancedOrganizerVariables
      >
    | undefined
) => void

export const AdvancedOrganizer: FC<AdvancedOrganizerProps> = ({
  topic,
  organizer,
}) => {
  const [state] = useStudentEssayContextProvider()

  const [updateAdvancedOrganizer] = useMutation<
    updateAdvancedOrganizer,
    updateAdvancedOrganizerVariables
  >(UPDATE_ADVANCED_ORGANIZER_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        advancedSentenceStructure:
          state.context.advancedOrganizer.advancedSentenceStructure,
        restatement: state.context.advancedOrganizer.restatement,
        conclusion: state.context.advancedOrganizer.conclusion,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssayById'],
  })

  return (
    <>
      <OrganizerTitleContainer>
        <OrganizerTitleStyle>Organize for this Question</OrganizerTitleStyle>
      </OrganizerTitleContainer>
      <QuestionContainer>
        <QuestionStyle>{topic.question}</QuestionStyle>
      </QuestionContainer>
      {state.matches('organizers.advancedOrganizer.restatement') && (
        <AdvancedRestatement
          updateAdvancedOrganizer={updateAdvancedOrganizer}
        />
      )}
      {state.matches('organizers.advancedOrganizer.answer') && (
        <AdvancedAnswerTypes organizer={organizer} />
      )}
      {state.matches('organizers.advancedOrganizer.conclusion') && (
        <AdvancedConclusion updateAdvancedOrganizer={updateAdvancedOrganizer} />
      )}
    </>
  )
}
