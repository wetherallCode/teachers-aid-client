import React, { FC } from 'react'
import { gql, useMutation, MutationFunctionOptions } from '@apollo/client'
import {
  findEssayById_findEssayById_essay_workingDraft_organizer,
  findEssayById_findEssayById_essay_topic,
  updateAcademicOrganizer,
  updateAcademicOrganizerVariables,
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
} from '../../../../../../../../schemaTypes'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { AcademicAnswerTypes } from './AcademicAnswerTypes'
import { AcademicRestatement } from './AcademicRestatement'
import { AcademicConclusion } from './AcademicConclusion'
import {
  OrganizerControlButton,
  OrganizerControlButtonContainerIdentifications,
  OrganizerControlButtonMessageContainer,
  OrganizerTitleContainer,
  OrganizerTitleStyle,
  QuestionContainer,
  QuestionStyle,
} from '../../state-and-styles/assignedEssayStyles'

export type AcademicOrganizerProps = {
  topic: findEssayById_findEssayById_essay_topic
  questionParts: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  organizer: findEssayById_findEssayById_essay_workingDraft_organizer
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

export const AcademicOrganizer: FC<AcademicOrganizerProps> = ({
  topic,
  questionParts,
  organizer,
}) => {
  const [state, event] = useStudentEssayContextProvider()

  const auxilaryVerbCheck =
    (questionParts.helpingVerb !== 'did' &&
      questionParts.simplePredicate.split(' ').length > 1 &&
      questionParts.simplePredicate
        .split(' ')
        .includes(questionParts.helpingVerb)) ||
    (questionParts.helpingVerb !== 'did' && !questionParts.subjectCompliment)

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
      {state.matches('organizers.academicOrganizer.identifications') && (
        <>
          <OrganizerTitleContainer>
            <OrganizerTitleStyle>
              Organize your essay for this Question
            </OrganizerTitleStyle>
          </OrganizerTitleContainer>
          <QuestionContainer>
            <QuestionStyle>{topic.question}</QuestionStyle>
          </QuestionContainer>
          {!organizer.restatement ? (
            <>
              <OrganizerControlButtonMessageContainer>
                The first step is to restate the question so click Start when
                ready!
              </OrganizerControlButtonMessageContainer>
              <OrganizerControlButtonContainerIdentifications>
                <OrganizerControlButton
                  onClick={() => event({ type: 'RESTATEMENT' })}
                >
                  Start
                </OrganizerControlButton>
              </OrganizerControlButtonContainerIdentifications>
            </>
          ) : (
            <>
              <OrganizerControlButtonMessageContainer>
                Since you've already completed the restatement, we're going to
                go right to the answer section of the organizer
              </OrganizerControlButtonMessageContainer>
              <OrganizerControlButtonContainerIdentifications>
                <OrganizerControlButton
                  onClick={() => event({ type: 'ANSWER' })}
                >
                  Start
                </OrganizerControlButton>
              </OrganizerControlButtonContainerIdentifications>
            </>
          )}
        </>
      )}
      {state.matches('organizers.academicOrganizer.restatement') && (
        <AcademicRestatement
          updateAcademicOrganizer={updateAcademicOrganizer}
          topic={topic}
          questionParts={questionParts}
          // organizer={organizer!}
        />
      )}
      {state.matches('organizers.academicOrganizer.answer') && (
        <AcademicAnswerTypes
          organizer={organizer}
          updateAcademicOrganizer={updateAcademicOrganizer}
          questionParts={questionParts}
          auxilaryVerbCheck={auxilaryVerbCheck}
          topic={topic}
        />
      )}
      {state.matches('organizers.academicOrganizer.conclusion') && (
        <AcademicConclusion
          updateAcademicOrganizer={updateAcademicOrganizer}
          questionParts={questionParts}
          auxilaryVerbCheck={auxilaryVerbCheck}
          topic={topic}
        />
      )}
    </>
  )
}
