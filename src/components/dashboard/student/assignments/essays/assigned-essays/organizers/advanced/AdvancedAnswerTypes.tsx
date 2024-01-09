import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAnswerType,
  setAnswerTypeVariables,
  QuestionTypeEnum,
  findEssayById_findEssayById_essay_workingDraft_organizer,
} from '../../../../../../../../schemaTypes'
import { useMutation } from '@apollo/client'

import { AdvancedHowProblemSolution } from './AdvancedHowProblemSolution'
import { AdvancedHowCauseEffect } from './AdvancedHowCauseEffect'
import { AdvancedWhyCauseEffect } from './AdvancedWhyCauseEffect'
import { SET_ANSWER_TYPE_MUTATION } from '../academic/AcademicAnswerTypes'
import { useEnumContextProvider } from '../../../../../../../../contexts/EnumContext'

export type AdvancedAnswerTypesProps = {
  organizer: findEssayById_findEssayById_essay_workingDraft_organizer
}

export const AdvancedAnswerTypes: FC<AdvancedAnswerTypesProps> = ({
  organizer,
}) => {
  const [state, event] = useStudentEssayContextProvider()
  const { questionTypeEnum } = useEnumContextProvider()
  console.log(state.context.advancedOrganizer.answer.preLoaded)
  const [setAnswerType] = useMutation<setAnswerType, setAnswerTypeVariables>(
    SET_ANSWER_TYPE_MUTATION,
    {
      variables: {
        input: {
          essayId: state.context.essayId,
          questionType: state.context.advancedOrganizer.questionType,
        },
      },
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findEssayById'],
    },
  )
  useEffect(() => {
    if (!state.context.advancedOrganizer.answer.preLoaded) {
      setAnswerType()
    }
  }, [
    setAnswerType,
    state.context.advancedOrganizer.answer.preLoaded,
    state.context.advancedOrganizer.questionType,
  ])

  useEffect(() => {
    if (state.context.advancedOrganizer.answer.preLoaded) {
      event({ type: 'NEXT' })
    }
  }, [event, state.context.advancedOrganizer.answer.preLoaded])

  return (
    <>
      {state.matches('organizers.advancedOrganizer.answer.questionType') && (
        <>
          <span>What is the Question Type: </span>
          <span>
            <select
              value={state.context.advancedOrganizer.questionType}
              onChange={(e: any) => {
                if (e.target.value !== 'none') {
                  event({
                    type: 'SET_FULL_QUESTION_TYPE',
                    payload: e.target.value,
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
            </select>
            <div>Restatement</div>
            <input
              type="text"
              value={state.context.advancedOrganizer.restatement}
              onChange={(e: any) =>
                event({
                  type: 'SET_RESTATEMENT',
                  payload: e.target.value,
                })
              }
            />
            <button
              onClick={() => {
                if (
                  organizer.__typename === 'AdvancedOrganizer' &&
                  organizer.answerType !== null
                )
                  event({ type: 'NEXT' })
              }}
            >
              Use this Question Type
            </button>
          </span>
        </>
      )}

      {state.matches('organizers.advancedOrganizer.answer.problemSolution') &&
        state.context.advancedOrganizer.questionType ===
          QuestionTypeEnum.HOW_PROBLEM_SOLUTION && (
          <AdvancedHowProblemSolution />
        )}
      {state.matches('organizers.advancedOrganizer.answer.howCauseEffect') &&
        state.context.advancedOrganizer.questionType ===
          QuestionTypeEnum.HOW_CAUSE_EFFECT && <AdvancedHowCauseEffect />}
      {state.matches('organizers.advancedOrganizer.answer.whyCauseEffect') &&
        state.context.advancedOrganizer.questionType ===
          QuestionTypeEnum.WHY_CAUSE_EFFECT && <AdvancedWhyCauseEffect />}
    </>
  )
}
