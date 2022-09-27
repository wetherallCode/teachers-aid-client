import React, { FC, useEffect } from 'react'
import { gql, MutationFunctionOptions, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateDevelopingOrganizer,
  updateDevelopingOrganizerVariables,
  BasicQuestionEnum,
  findEssayById_findEssayById_essay_topic,
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
  findEssayById_findEssayById_essay_workingDraft_organizer,
} from '../../../../../../../../schemaTypes'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import {
  OrganizerTitleContainer,
  QuestionTypeContainer,
  OrganizerControlButtonContainer,
  QuestionTypeQuestionStyle,
  QuestionTypeAnswerSelectStyle,
  PartsOfQuestionContainer,
  PartsOfQuestionTitle,
  OrganizerTitleStyle,
  QuestionStyle,
  PartContainer,
  PartInput,
  OrganizerControlButton,
  QuestionContainer,
  RestatementContainer,
  RestatementTitle,
  RestatementInput,
  RestatementOutput,
  AnswerInput,
  AnswerOutput,
  OrganizerControlButtonContainerIdentifications,
  OrganizerControlButtonMessageContainer,
  OrganizerSectionDirectionsContainer,
} from '../../state-and-styles/assignedEssayStyles'
import { QuestionDeconstruction } from '../question-deconstruction/QuestionDeconstruction'

export type DevelopingOrganizerProps = {
  topic: findEssayById_findEssayById_essay_topic
  questionParts: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  organizer: findEssayById_findEssayById_essay_workingDraft_organizer
}

export const UPDATE_DEVELOPING_ORGANIZER_MUTATION = gql`
  mutation updateDevelopingOrganizer($input: UpdateDevelopingOrganizerInput!) {
    updateDevelopingOrganizer(input: $input) {
      essay {
        _id
      }
    }
  }
`

export const DevelopingOrganizer = ({
  topic,
  questionParts,
  organizer,
}: DevelopingOrganizerProps) => {
  const [state, event] = useStudentEssayContextProvider()

  const sentenceStructure = {
    subject:
      state.context.developingOrganizer.developingSentenceStructure.subject,
    verb: state.context.developingOrganizer.developingSentenceStructure.verb,
  }

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
    onCompleted: (data) => {
      console.log(data.updateDevelopingOrganizer.essay._id)
    },
    onError: (error) => console.error(error),
    refetchQueries: ['findEssayById'],
  })

  useEffect(() => {
    updateDevelopingOrganizer()
  }, [state.context.developingOrganizer.questionType])

  const handleNext = () => {
    // updateDevelopingOrganizer({ onCompleted: () => event({ type: 'NEXT' }) })
    updateDevelopingOrganizer()
    event({ type: 'NEXT' })
  }

  return (
    <>
      <>
        {state.matches('organizers.developingOrganizer.identifications') && (
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
        {state.matches('organizers.developingOrganizer.restatement') && (
          <>
            <QuestionDeconstruction
              questionParts={questionParts}
              topic={topic}
            />
            {/* <RestatementTitle>
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
                onClick={() => event({ type: 'PREVIOUS' })}
              >
                Back
              </OrganizerControlButton>
              <OrganizerControlButton onClick={() => event({ type: 'NEXT' })}>
                Next
              </OrganizerControlButton>
            </OrganizerControlButtonContainer> */}
          </>
        )}
        {state.matches('organizers.developingOrganizer.answer') && (
          <>
            <OrganizerTitleContainer>
              <OrganizerTitleStyle>Answer the Question</OrganizerTitleStyle>
            </OrganizerTitleContainer>
            <QuestionContainer>
              <QuestionStyle>{topic.question}</QuestionStyle>
            </QuestionContainer>
            <OrganizerSectionDirectionsContainer>
              Answer the Question to the best of your ability.
            </OrganizerSectionDirectionsContainer>
            <AnswerInput
              autoFocus={true}
              value={state.context.developingOrganizer.answer}
              onChange={(e: any) =>
                event({ type: 'SET_ANSWER', payload: e.target.value })
              }
            />
            {/* <AnswerOutput>
              <div> {state.context.developingOrganizer.answer}</div>
            </AnswerOutput> */}
            <OrganizerControlButtonContainer>
              {/* <OrganizerControlButton
                onClick={() => event({ type: 'PREVIOUS' })}
              >
                Back
              </OrganizerControlButton> */}
              <OrganizerControlButton
                onClick={() => updateDevelopingOrganizer()}
              >
                Save
              </OrganizerControlButton>
              <OrganizerControlButton onClick={handleNext}>
                Next
              </OrganizerControlButton>
            </OrganizerControlButtonContainer>
          </>
        )}
        {state.matches('organizers.developingOrganizer.conclusion') && (
          <>
            <OrganizerTitleContainer>
              <OrganizerTitleStyle>Add a Conclusion</OrganizerTitleStyle>
            </OrganizerTitleContainer>
            <QuestionContainer>
              <QuestionStyle>
                {state.context.developingOrganizer.restatement}
              </QuestionStyle>
            </QuestionContainer>
            <OrganizerSectionDirectionsContainer>
              Write your conclusion by giving a consequence or direct result of
              your topic sentence.
            </OrganizerSectionDirectionsContainer>
            <AnswerInput
              autoFocus={true}
              value={state.context.developingOrganizer.conclusion}
              onChange={(e: any) =>
                event({ type: 'SET_CONCLUSION', payload: e.target.value })
              }
            />
            {/* <RestatementOutput>
              <div> {state.context.developingOrganizer.conclusion}</div>
            </RestatementOutput> */}
            <OrganizerControlButtonContainer>
              <OrganizerControlButton
                onClick={() => event({ type: 'PREVIOUS' })}
              >
                Back
              </OrganizerControlButton>
              <OrganizerControlButton
                onClick={() => updateDevelopingOrganizer()}
              >
                Save
              </OrganizerControlButton>
              <OrganizerControlButton onClick={handleNext}>
                Next
              </OrganizerControlButton>
            </OrganizerControlButtonContainer>
          </>
        )}
      </>
    </>
  )
}
