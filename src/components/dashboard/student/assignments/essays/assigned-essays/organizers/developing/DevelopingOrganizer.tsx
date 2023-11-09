import React, { FC, SyntheticEvent, useEffect } from 'react'
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
  RestatementDirectionsContainer,
} from '../../state-and-styles/assignedEssayStyles'
import { QuestionDeconstruction } from '../question-deconstruction/QuestionDeconstruction'
import { verbsThatChangeInIngFormat } from '../../../../../../../../utils'
import { UnderlinedText } from '../../../../../../../../appStyles'

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

  const auxilaryVerbCheck =
    (questionParts.helpingVerb !== 'did' &&
      questionParts.simplePredicate.split(' ').length > 1 &&
      questionParts.simplePredicate
        .split(' ')
        .includes(questionParts.helpingVerb)) ||
    (questionParts.helpingVerb !== 'did' && !questionParts.subjectCompliment)

  const sentenceStructure = {
    subject:
      state.context.developingOrganizer.developingSentenceStructure.subject,
    verb: state.context.developingOrganizer.developingSentenceStructure.verb,
    object:
      state.context.developingOrganizer.developingSentenceStructure.object,
    subjectCompliment:
      state.context.developingOrganizer.developingSentenceStructure
        .subjectCompliment,
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

  const { subject, object, subjectCompliment } =
    state.context.developingOrganizer.developingSentenceStructure
  const { simplePredicate, helpingVerb } = questionParts

  const verbConverter = auxilaryVerbCheck
    ? 'being ' + simplePredicate
    : verbsThatChangeInIngFormat(simplePredicate).replace('ed', '')

  const conclusionSetup = `${subject.charAt(0).toLowerCase() + subject.slice(1)}
${verbConverter} 
${object ? object : subjectCompliment ? subjectCompliment : ''}`

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
              onPaste={(e: SyntheticEvent) => {
                e.preventDefault()
              }}
              value={state.context.developingOrganizer.answer}
              onChange={(e: any) =>
                event({ type: 'SET_ANSWER', payload: e.target.value })
              }
            />

            <OrganizerControlButtonContainer>
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
              <OrganizerTitleStyle>Think of a Conclusion</OrganizerTitleStyle>
            </OrganizerTitleContainer>
            <RestatementDirectionsContainer>
              <UnderlinedText>Directions</UnderlinedText>
              <div>
                Conclusions should show the consequence of the topic, so think
                of a result of {conclusionSetup} that makes sense with what you
                wrote in your answer. Be careful not to give a result of your
                answer.
              </div>
            </RestatementDirectionsContainer>
            <AnswerInput
              autoFocus={true}
              onPaste={(e: SyntheticEvent) => {
                e.preventDefault()
              }}
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
