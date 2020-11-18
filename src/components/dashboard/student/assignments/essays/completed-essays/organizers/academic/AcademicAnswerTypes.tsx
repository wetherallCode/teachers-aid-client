import React, { FC, useState } from 'react'

import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAnswerType,
  setAnswerTypeVariables,
  QuestionTypeEnum,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer,
} from '../../../../../../../../schemaTypes'
import { useMutation } from '@apollo/client'
import { AcademicProblemSolution } from './AcademicProblemSolution'
import { AcademicHowCauseEffect } from './AcademicHowCauseEffect'
import { AcademicWhyCauseEffect } from './AcademicWhyCauseEffect'
import { useEnumContextProvider } from '../../../../../../../../contexts/EnumContext'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'
import { SET_ANSWER_TYPE_MUTATION } from '../../../assigned-essays/organizers/academic/AcademicAnswerTypes'
import { Modal } from '../../../../../../../../animations'
import {
  AcademicQuestionTypeContainer,
  AcademicRestatementTitle,
  AcademicQuestionTypeSelect,
  AcademicRestatementContainer,
  AcademicRestatementInput,
  RestatementOutput,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
} from '../../../assigned-essays/state-and-styles/assignedEssayStyles'

export type AcademicAnswerTypesProps = {
  academicOrganizer: findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer
}

export const AcademicAnswerTypes: FC<AcademicAnswerTypesProps> = ({
  academicOrganizer,
}) => {
  const [state, event] = useCompletedEssayContextProvider()
  const { questionTypeEnum } = useEnumContextProvider()

  const [setAnswerType] = useMutation<setAnswerType, setAnswerTypeVariables>(
    SET_ANSWER_TYPE_MUTATION,
    {
      variables: {
        input: {
          essayId: state.context.essayId,
          questionType: state.context.academicOrganizer.questionType,
        },
      },
      // onCompleted: (data) => console.log(data),

      refetchQueries: [''],
    }
  )

  return (
    <>
      {state.matches(
        'reviewOrganizer.organizers.academicOrganizer.answer.questionType'
      ) && (
        <>
          <AcademicQuestionTypeContainer>
            <AcademicRestatementTitle>
              <div>What is the Question Type: </div>
            </AcademicRestatementTitle>
            <AcademicQuestionTypeContainer>
              <AcademicQuestionTypeSelect
                value={state.context.academicOrganizer.questionType}
                onChange={(e: any) => {
                  if (e.target.value !== 'none') {
                    event({
                      type: 'SET_FULL_QUESTION_TYPE',
                      payload: e.target.value,
                    })
                    setAnswerType({
                      variables: {
                        input: {
                          essayId: state.context.essayId,
                          questionType: e.target.value,
                        },
                      },
                    })
                  }
                }}
              >
                <option value={'none'}>Pick a Question Type</option>
                {questionTypeEnum.map((question: QuestionTypeEnum) => (
                  <option key={question} value={question}>
                    {question === 'HOW_PROBLEM_SOLUTION'
                      ? 'How: Problem and Solution'
                      : question === 'HOW_CAUSE_EFFECT'
                      ? 'How: Cause and Effect'
                      : 'Why: Cause and Effect'}
                  </option>
                ))}
              </AcademicQuestionTypeSelect>
            </AcademicQuestionTypeContainer>
            <AcademicRestatementContainer>
              <AcademicRestatementTitle>
                <div>Restatement</div>
              </AcademicRestatementTitle>
              <AcademicRestatementInput
                type='text'
                value={state.context.academicOrganizer.restatement}
                onChange={(e: any) =>
                  event({
                    type: 'SET_RESTATEMENT',
                    payload: e.target.value,
                  })
                }
              />
              <RestatementOutput>
                <div> {state.context.academicOrganizer.restatement}</div>
              </RestatementOutput>
            </AcademicRestatementContainer>
          </AcademicQuestionTypeContainer>
          <OrganizerControlButtonContainer>
            <OrganizerControlButton
              onClick={() => {
                event({ type: 'RESTATEMENT' })
              }}
            >
              Back
            </OrganizerControlButton>
            <OrganizerControlButton
              onClick={() => {
                console.log(academicOrganizer.answerType !== null)
                if (
                  academicOrganizer.__typename === 'AcademicOrganizer' &&
                  academicOrganizer.answerType !== null
                )
                  event({ type: 'TRANSITION' })
              }}
            >
              Next
            </OrganizerControlButton>
          </OrganizerControlButtonContainer>
        </>
      )}

      {state.matches(
        'reviewOrganizer.organizers.academicOrganizer.answer.problemSolution'
      ) &&
        state.context.academicOrganizer.questionType ===
          QuestionTypeEnum.HOW_PROBLEM_SOLUTION && <AcademicProblemSolution />}
      {state.matches(
        'reviewOrganizer.organizers.academicOrganizer.answer.howCauseEffect'
      ) &&
        state.context.academicOrganizer.questionType ===
          QuestionTypeEnum.HOW_CAUSE_EFFECT && <AcademicHowCauseEffect />}
      {state.matches(
        'reviewOrganizer.organizers.academicOrganizer.answer.whyCauseEffect'
      ) &&
        state.context.academicOrganizer.questionType ===
          QuestionTypeEnum.WHY_CAUSE_EFFECT && <AcademicWhyCauseEffect />}
    </>
  )
}
