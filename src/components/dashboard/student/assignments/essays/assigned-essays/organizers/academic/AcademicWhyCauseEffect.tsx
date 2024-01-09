import React, { FC, SyntheticEvent, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { useMutation, gql } from '@apollo/client'
import {
  findEssayById_findEssayById_essay_topic,
  findEssayById_findEssayById_essay_workingDraft_organizer,
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateWhyCauseEffect,
  updateWhyCauseEffectVariables,
} from '../../../../../../../../schemaTypes'
import {
  AcademicQuestionAnswerTypeContainer,
  AcademicRestatementTitle,
  AnswerTypeContainter,
  PartInput,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
  OrganizerTitleContainer,
  OrganizerTitleStyle,
  QuestionContainer,
  QuestionStyle,
  PartTextArea,
} from '../../state-and-styles/assignedEssayStyles'
import { irregularPastTenseVerbList } from '../../../../../../../../utils'

export type AcademicWhyCauseEffectProps = {
  questionParts: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  topic: findEssayById_findEssayById_essay_topic
  organizer: findEssayById_findEssayById_essay_workingDraft_organizer
}

export const UPDATE_WHY_CAUSE_EFFECT_MUTATION = gql`
  mutation updateWhyCauseEffect($input: UpdateWhyCauseEffectInput!) {
    updateWhyCauseEffect(input: $input) {
      essay {
        _id
      }
    }
  }
`

export const AcademicWhyCauseEffect = ({
  questionParts,
  topic,
  organizer,
}: AcademicWhyCauseEffectProps) => {
  const [state, event] = useStudentEssayContextProvider()

  const auxilaryVerbCheck =
    questionParts.helpingVerb !== 'did' &&
    questionParts.simplePredicate.split(' ').length > 1 &&
    questionParts.simplePredicate.split(' ').includes(questionParts.helpingVerb)

  const { whyCauseEffect } = state.context.academicOrganizer.answer

  const { verb, object } =
    state.context.academicOrganizer.academicSentenceStructure

  const [updateWhyCauseEffect] = useMutation<
    updateWhyCauseEffect,
    updateWhyCauseEffectVariables
  >(UPDATE_WHY_CAUSE_EFFECT_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        ultimateCause:
          state.context.academicOrganizer.answer.whyCauseEffect.ultimateCause,
        proximateCause:
          state.context.academicOrganizer.answer.whyCauseEffect.proximateCause,
      },
    },
    onCompleted: () => console.log('update Complete'),
    refetchQueries: ['findEssayById'],
  })

  useEffect(() => {
    // updateWhyCauseEffect()
  }, [whyCauseEffect, updateWhyCauseEffect])

  const verbPhraseCheck = verb.split(' ').length > 1
  const verbPhraseSplitter = verb.split(' ')
  console.log(state.value)
  // const irregularVerbCheck = irregularPastTenseVerbList(verbPhraseSplitter[0])

  // const congugatedVerb =
  //   verbPhraseSplitter[0] === irregularVerbCheck
  //     ? irregularVerbCheck
  //         .charAt(irregularVerbCheck.length - 1)
  //         .toLowerCase() === 'e'
  //       ? verb + 'd'
  //       : verb + 'ed'
  //     : irregularVerbCheck
  // console.log(verb !== 'was')
  return (
    <>
      <OrganizerTitleContainer>
        <OrganizerTitleStyle>Answer the Question</OrganizerTitleStyle>
      </OrganizerTitleContainer>
      <QuestionContainer>
        <QuestionStyle>{organizer.restatement}</QuestionStyle>
      </QuestionContainer>
      <AcademicQuestionAnswerTypeContainer>
        <AcademicRestatementTitle>
          <div>Why Question: Cause and Effect</div>
        </AcademicRestatementTitle>
        <AnswerTypeContainter>
          {questionParts.helpingVerb === 'did' ? (
            <div>
              Why did {questionParts.simpleSubject}{' '}
              {questionParts.simplePredicate}
              {object ? ' ' + object : null}?
            </div>
          ) : questionParts.subjectCompliment ? (
            <div>
              Why {questionParts.helpingVerb} {questionParts.simpleSubject}{' '}
              {questionParts.subjectCompliment}?
            </div>
          ) : !object ? (
            <div>
              Why {questionParts.helpingVerb} {questionParts.simpleSubject}{' '}
              {verbPhraseSplitter[0]}?
            </div>
          ) : (
            <div>
              Why {verb} {questionParts.simpleSubject} {object}?
            </div>
          )}
          <PartTextArea
            placeholder="Proximate Cause..."
            value={
              state.context.academicOrganizer.answer.whyCauseEffect
                .proximateCause
            }
            onPaste={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onCopy={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onChange={(e: any) => {
              updateWhyCauseEffect()
              event({
                type: 'SET_WHY_CAUSE_EFFECT',
                payload: { ...whyCauseEffect, proximateCause: e.target.value },
              })
            }}
          />
        </AnswerTypeContainter>
        <AnswerTypeContainter>
          <div>Why did your Proximate Cause happen?</div>
          <PartTextArea
            placeholder="Ultimate Cause..."
            value={
              state.context.academicOrganizer.answer.whyCauseEffect
                .ultimateCause
            }
            onPaste={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onCopy={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onChange={(e: any) => {
              event({
                type: 'SET_WHY_CAUSE_EFFECT',
                payload: { ...whyCauseEffect, ultimateCause: e.target.value },
              })
            }}
          />
        </AnswerTypeContainter>
      </AcademicQuestionAnswerTypeContainer>
      <OrganizerControlButtonContainer>
        <OrganizerControlButton
          onClick={() => {
            event({ type: 'PREVIOUS' })
            event({ type: 'SET_PRE_LOADED', payload: false })
            updateWhyCauseEffect()
          }}
        >
          Back
        </OrganizerControlButton>
        <OrganizerControlButton
          onClick={() => {
            event({ type: 'NEXT' })
            updateWhyCauseEffect()
          }}
        >
          Next
        </OrganizerControlButton>
      </OrganizerControlButtonContainer>
    </>
  )
}
