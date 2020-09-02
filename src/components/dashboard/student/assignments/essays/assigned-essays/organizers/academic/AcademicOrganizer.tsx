import React, { FC } from 'react'
import { gql, useMutation, MutationFunctionOptions } from '@apollo/client'
import {
  updateAcademicOrganizer,
  updateAcademicOrganizerVariables,
} from '../../../../../../../../schemaTypes'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { AcademicAnswerTypes } from './AcademicAnswerTypes'
import { AcademicRestatement } from './AcademicRestatement'
import { AcademicConclusion } from './AcademicConclusion'
import {
  OrganizerTitleContainer,
  OrganizerTitleStyle,
  QuestionContainer,
  QuestionStyle,
} from '../../state-and-styles/assignedEssayStyles'

export type AcademicOrganizerProps = {
  question: string
}

export const UPDATE_ACADEMIC_ORGANIZER_MUTATION = gql`
  mutation updateAcademicOrganizer($input: UpdateAcademicOrganizerInput!) {
    updateAcademicOrganizer(input: $input) {
      essay {
        _id
      }
    }
  }
`

export type UpdateAcademicOrganizerType = (
  options?:
    | MutationFunctionOptions<
        updateAcademicOrganizer,
        updateAcademicOrganizerVariables
      >
    | undefined
) => void

export const AcademicOrganizer: FC<AcademicOrganizerProps> = ({ question }) => {
  const [state] = useStudentEssayContextProvider()

  const [updateAcademicOrganizer] = useMutation<
    updateAcademicOrganizer,
    updateAcademicOrganizerVariables
  >(UPDATE_ACADEMIC_ORGANIZER_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        academicSentenceStructure:
          state.context.academicOrganizer.academicSentenceStructure,
        restatement: state.context.academicOrganizer.restatement,
        conclusion: state.context.academicOrganizer.conclusion,
      },
    },
    onCompleted: (data) => console.log(data),
    onError: (err) => console.error(err),
    refetchQueries: ['findEssayById'],
  })

  return (
    <>
      <OrganizerTitleContainer>
        <OrganizerTitleStyle>Organize for this Question</OrganizerTitleStyle>
      </OrganizerTitleContainer>
      <QuestionContainer>
        <QuestionStyle>{question}</QuestionStyle>
      </QuestionContainer>
      {state.matches('organizers.academicOrganizer.restatement') && (
        <AcademicRestatement
          updateAcademicOrganizer={updateAcademicOrganizer}
        />
      )}
      {state.matches('organizers.academicOrganizer.answer') && (
        <AcademicAnswerTypes />
      )}
      {state.matches('organizers.academicOrganizer.conclusion') && (
        <AcademicConclusion updateAcademicOrganizer={updateAcademicOrganizer} />
      )}
    </>
  )
}
