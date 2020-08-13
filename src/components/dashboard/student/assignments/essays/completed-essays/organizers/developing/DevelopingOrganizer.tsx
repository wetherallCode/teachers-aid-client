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
  const [state] = useCompletedEssayContextProvider()

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
    onCompleted: (data) => console.log('updateOrganizer'),
    onError: (error) => console.error(error),
    refetchQueries: ['findEssayById'],
  })

  return (
    <>
      <>
        <div>Developing Organizer</div>
        <DevelopingRestatement
          updateDevelopingOrganizer={updateDevelopingOrganizer}
        />
        <DevelopingAnswer
          updateDevelopingOrganizer={updateDevelopingOrganizer}
        />
        <DevelopingConclusion
          updateDevelopingOrganizer={updateDevelopingOrganizer}
        />
      </>
    </>
  )
}
