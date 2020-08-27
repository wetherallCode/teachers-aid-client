import React, { FC, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateDevelopingOrganizer,
  updateDevelopingOrganizerVariables,
  BasicQuestionEnum,
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
} from '../../state-and-styles/assignedEssayStyles'

export type DevelopingOrganizerProps = {
  question: string
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

export const DevelopingOrganizer: FC<DevelopingOrganizerProps> = ({
  question,
}) => {
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
      console.log(data)
    },
    onError: (error) => console.error(error),
    refetchQueries: ['findEssayById'],
  })

  useEffect(() => {
    updateDevelopingOrganizer()
  }, [state.context.developingOrganizer, updateDevelopingOrganizer])

  return (
    <>
      <OrganizerTitleContainer>
        <OrganizerTitleStyle>Organize for this Question</OrganizerTitleStyle>
      </OrganizerTitleContainer>
      <QuestionContainer>
        <QuestionStyle>{question}</QuestionStyle>
      </QuestionContainer>
      <>
        {state.matches('organizers.developingOrganizer.identifications') && (
          <>
            <QuestionTypeContainer>
              <QuestionTypeQuestionStyle>
                What is the Question Type:
              </QuestionTypeQuestionStyle>
              <QuestionTypeAnswerSelectStyle
                autoFocus={true}
                value={state.context.developingOrganizer.questionType}
                onChange={(e: any) => {
                  if (e.target.value !== 'none')
                    event({
                      type: 'SET_BASIC_QUESTION_TYPE',
                      payload: e.target.value,
                    })
                }}
              >
                <option value={'none'}>Pick a Question Type</option>
                <option value={BasicQuestionEnum.HOW}>How</option>
                <option value={BasicQuestionEnum.WHY}>Why</option>
              </QuestionTypeAnswerSelectStyle>
            </QuestionTypeContainer>
            <PartsOfQuestionContainer>
              <PartsOfQuestionTitle>
                Set the Parts of the Question
              </PartsOfQuestionTitle>
              <PartContainer>
                <div>What is the Subject of the question: </div>
                <PartInput
                  value={
                    state.context.developingOrganizer
                      .developingSentenceStructure.subject
                  }
                  onChange={(e: any) =>
                    event({
                      type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_SUBJECT',
                      payload: e.target.value,
                    })
                  }
                />
              </PartContainer>
              <PartContainer>
                <div>What is the Verb of the question: </div>
                <PartInput
                  value={
                    state.context.developingOrganizer
                      .developingSentenceStructure.verb
                  }
                  onChange={(e: any) =>
                    event({
                      type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_VERB',
                      payload: e.target.value,
                    })
                  }
                />
              </PartContainer>
            </PartsOfQuestionContainer>
            <OrganizerControlButtonContainer>
              <OrganizerControlButton onClick={() => event({ type: 'NEXT' })}>
                Next
              </OrganizerControlButton>
            </OrganizerControlButtonContainer>
          </>
        )}
        {state.matches('organizers.developingOrganizer.restatement') && (
          <>
            <RestatementTitle>
              <div>Restate the Question in the form of a statement</div>
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
            </OrganizerControlButtonContainer>
          </>
        )}
        {state.matches('organizers.developingOrganizer.answer') && (
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
                onClick={() => event({ type: 'PREVIOUS' })}
              >
                Back
              </OrganizerControlButton>
              <OrganizerControlButton onClick={() => event({ type: 'NEXT' })}>
                Next
              </OrganizerControlButton>
            </OrganizerControlButtonContainer>
          </>
        )}
        {state.matches('organizers.developingOrganizer.conclusion') && (
          <>
            <RestatementTitle>
              Write your conlcusion (pay attention to the hints!)
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
              <OrganizerControlButton
                onClick={() => event({ type: 'PREVIOUS' })}
              >
                Back
              </OrganizerControlButton>
              <OrganizerControlButton onClick={() => event({ type: 'NEXT' })}>
                Next
              </OrganizerControlButton>
            </OrganizerControlButtonContainer>
          </>
        )}
      </>
    </>
  )
}
